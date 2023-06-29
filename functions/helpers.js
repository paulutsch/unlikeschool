require("dotenv").config();

const { functions, admin, collection, db, FRONTEND_URL } = require("./init");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const validator = require("validator");

const {
  transporter,
  couponTypes,
  priceIds,
  minecraftCredentials,
} = require("./data");
const welcomeEmailTemplate = require("./data/email/welcome");

function sanitizeInput(input) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

function sanitizeUserData(userData) {
  userData.parentName = sanitizeInput(userData.parentName);
  userData.childName = sanitizeInput(userData.childName);
  userData.courseId = sanitizeInput(userData.courseId);
  userData.startDateId = sanitizeInput(userData.startDateId);
  userData.email = validator.normalizeEmail(userData.email);
  if (userData.coupon) userData.coupon = sanitizeInput(userData.coupon);

  const expectedStructure = {
    parentName: { type: "string", optional: false },
    childName: { type: "string", optional: false },
    email: { type: "string", optional: false },
    courseId: { type: "string", optional: false },
    startDateId: { type: "string", optional: false },
    coupon: { type: "string", optional: true },
    termsAccepted: { type: "boolean", optional: false },
    newsletter: { type: "boolean", optional: false },
    dataProcessingAccepted: { type: "boolean", optional: false },
  };

  for (const [key, value] of Object.entries(expectedStructure)) {
    const { type, optional } = value;

    if (!optional && userData[key] === undefined) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        `Missing required property ${key} in user data.`
      );
    }

    if (userData[key] !== undefined && typeof userData[key] !== type) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        `Invalid type for ${key}. Expected ${type}, got ${typeof userData[
          key
        ]}.`
      );
    }
  }

  // Check for any additional properties not expected in the userData
  for (const key in userData) {
    if (!(key in expectedStructure)) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        `Unexpected property ${key} in user data.`
      );
    }
  }

  return userData;
}

const transformStartDates = (startDatesArray) =>
  startDatesArray.map((startDate) => {
    const date = startDate.date.toDate().toISOString();
    const isAvailable = startDate.availableSeats > 0;
    return {
      id: startDate.id,
      date,
      ageGroup: startDate.ageGroup,
      isAvailable,
    };
  });

async function fetchStartDates() {
  try {
    const coursesRef = db.collection("courses");
    const coursesSnapshot = await coursesRef.get();

    const startDates = {};

    for (const course of coursesSnapshot.docs)
      startDates[course.id] = transformStartDates(course.data().startingDates);

    return startDates;
  } catch (e) {
    console.error("Error fetching start dates:", e);
  }
}

async function fetchStartDate(courseId, startDateId) {
  try {
    const courseRef = db.collection("courses").doc(courseId);
    const courseSnapshot = await courseRef.get();

    const startDate = courseSnapshot
      .data()
      .startingDates.find((date) => date.id === startDateId);

    return startDate;
  } catch (e) {
    console.error("Error fetching start date:", e);
    return null;
  }
}

function generateCouponCode(childName) {
  const namePart = childName.split(" ")[0];
  const randomPart = Math.random().toString(36).slice(-4);
  return `${namePart}-${randomPart}`;
}

async function createCoupon(userId, userName) {
  console.log("create coupon");
  const couponsRef = db.collection("coupons");
  const couponData = {
    referrerId: userId,
    code: generateCouponCode(userName),
    used: false,
    type: "referral",
  };

  const newCouponRef = await couponsRef.add(couponData);
  const newCouponSnapshot = await newCouponRef.get();

  return newCouponSnapshot.data();
}

async function fetchCoupon(code) {
  const couponsRef = db.collection("coupons");
  const couponsSnapshot = await couponsRef.where("code", "==", code).get();

  if (!couponsSnapshot.empty) {
    return couponsSnapshot.docs[0].data();
  } else {
    return null;
  }
}

async function fetchUser(userId) {
  try {
    const userRef = db.collection("users").doc(userId);
    const userSnapshot = await userRef.get();
    if (userSnapshot.exists) {
      return userSnapshot.data();
    } else {
      console.error("No user found with given id:", userId);
      return null;
    }
  } catch (e) {
    console.error("Error fetching user:", e);
    return null;
  }
}

async function fetchCourseDoc(courseId) {
  const courseRef = db.collection("courses").doc(courseId);
  const courseSnapshot = await courseRef.get();
  return courseSnapshot.data();
}

const createNewUser = async (userData, uid) => {
  const usersRef = db.collection("users");
  const userRef = usersRef.doc(uid);
  await userRef.set(userData);
  return userRef.id;
};

const createCheckoutSession = async (userId, coupon_id) => {
  try {
    const userData = await fetchUser(userId);
    const startDate = await fetchStartDate(
      userData.courseId,
      userData.startDateId
    );
    const trialEnd = startDate.date._seconds;

    return await stripe.checkout.sessions.create({
      mode: "subscription",
      customer_email: userData.email,
      line_items: [{ price: priceIds[userData.courseId], quantity: 1 }],
      custom_text: {
        submit: {
          message:
            "Nach der Registrierung senden wir dir eine Email mit allem, was du für den Start bei Unlike School brauchst.",
        },
      },
      discounts: coupon_id ? [{ coupon: coupon_id }] : [],
      metadata: {
        userId: userId,
      },
      success_url: `${FRONTEND_URL}/register/success`,
      cancel_url: `${FRONTEND_URL}/register/cancel`,
      subscription_data: { trial_end: trialEnd },
    });
  } catch (err) {
    throw new functions.https.HttpsError(
      "unknown",
      `Failed to create Checkout session. ${err.message}`
    );
  }
};

function createReferrerEmail(referrer) {
  const referrerEmail = referrer.email;
  const childName = referrer.childName.split(" ")[0];
  const referrerName = referrer.parentName.split(" ")[0];

  if (referrer.numberOfReferrals + 1 == 3) {
    return {
      from: "Unlike School <info@unlike.school>",
      to: referrerEmail,
      subject: `Glückwunsch! ${childName} erhält ein exklusives Unlike School T-Shirt!`,
      text: `Hi ${childName} und ${referrerName},\n\Glückwunsch – euer dritter Couponcode wurde soeben eingelöst! Damit erhältst du, ${childName}, dein exklusives Unlike School T-Shirt! Antworte einfach auf diese Mail mit deiner Klamottengröße und Anschrift, damit wir dir dein Geschenk zukommen lassen können.\n\nDanke für's Empfehlen – und: viel Spaß mit deinem neuen T-Shirt!\n\nPaul von Unlike School`,
    };
  }
  const subject = "10 € Rabatt – Coupon wurde eingelöst!";
  let text;

  if (referrer.numberOfReferrals + 1 < 3) {
    text = `Hi ${childName} und ${referrerName},\n\Euer Couponcode wurde soeben erfolgreich eingelöst! Damit erhaltet ihr 10 € Rabatt auf die nächste Session!\n\nJetzt nur noch ${
      3 - referrer.numberOfReferrals + 1
    } weitere Freunde einladen, dann erhältst du, ${childName}, dein exklusives Unlike School T-Shirt!\n\nDanke für's Empfehlen!\n\nPaul von Unlike School`;
  } else {
    text = `Hi ${childName} und ${referrerName},\n\Euer Couponcode wurde soeben erfolgreich eingelöst! Damit erhaltet ihr erneut 10 € Rabatt auf die nächste Session!\n\nWow, ihr habt jetzt schon ${
      referrer.numberOfReferrals + 1
    } Freunde für Unlike School begeistern können! Weiter so!\n\nDanke für's Empfehlen!\n\nPaul von Unlike School`;
  }

  return {
    from: "Unlike School <info@unlike.school>",
    to: referrerEmail,
    subject,
    text,
  };
}

async function updateCustomerWithCoupon(customerId, couponId) {
  await stripe.customers.update(customerId, {
    coupon: couponId,
  });
}

function getStartingDate(startingDates, startDateId) {
  return startingDates.find((startingDate) => startingDate.id === startDateId);
}

function getSomeUnusedCredentials(minecraftCredentials, usedCredentials) {
  console.log("used credentials:", usedCredentials);
  return minecraftCredentials.find(
    (login) => !usedCredentials.includes(login.username)
  );
}

async function updateUserCheckoutStatus(userId) {
  const userRef = db.collection("users").doc(userId);

  await userRef.update({
    checkoutCompleted: true,
  });

  const userSnapshot = await userRef.get();
  return userSnapshot.data();
}

async function sendEmail(emailData) {
  console.log("sendEmail");
  try {
    await transporter.sendMail(emailData);
    console.log("Email sent successfully");
  } catch (e) {
    console.error("Error sending email:", e);
  }
}

async function sendWelcomeMail(
  user,
  course,
  startingDate,
  credentials,
  coupon
) {
  const formattedStartDate = new Intl.DateTimeFormat("de-DE", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
    timeZone: "Europe/Berlin",
  }).format(startingDate.date.toDate());

  const welcomeData = {
    courseName: course.title,
    startDate: formattedStartDate,
    googleMeetLink: startingDate.googleMeetLink,
    minecraftUser: credentials.username,
    minecraftPassword: credentials.password,
    coupon: coupon.code,
  };

  const welcomeMessage = welcomeEmailTemplate(welcomeData);

  const emailData = {
    from: "Unlike School <info@unlike.school>",
    to: user.email,
    subject: "Willkommen bei Unlike School!",
    html: welcomeMessage,
  };

  try {
    console.log("sending email");
    await sendEmail(emailData);
  } catch (e) {
    console.error("Error sending email:", e);
    throw new functions.https.HttpsError("internal", "Failed to send email");
  }
}

async function sendReferrerMail(recruitedUser) {
  console.log("user used a coupon");
  const coupon = await fetchCoupon(recruitedUser.coupon);

  const referrerId = coupon.referrerId;
  const referrerSnapshot = await db.collection("users").doc(referrerId).get();
  const referrer = referrerSnapshot.data();

  await referrerSnapshot.ref.update({
    numberOfReferrals: referrer.numberOfReferrals + 1,
  });

  const referrerEmailData = createReferrerEmail(referrer);
  const referrer_coupon_stripe =
    process.env.STRIPE_COUPON_REFERRAL_10_EUROS_OFF;
  const customers = await stripe.customers.list({
    email: referrer.email,
    limit: 1,
  });

  if (customers.data.length === 0) {
    console.error(`No referrer found in Stripe for email: ${referrer.email}`);
  } else {
    const referrer_stripe = customers.data[0];
    await updateCustomerWithCoupon(referrer_stripe.id, referrer_coupon_stripe);
  }

  try {
    console.log("sending email to referrer");
    await sendEmail(referrerEmailData);
    console.log("Successfully sent email to referrer:", referrer.email);
  } catch (e) {
    console.error("Error sending email to referrer:", e);
  }
}

async function updateStartingDate(courseSlug, startingDateId, usedCredentials) {
  try {
    console.log("Decrement available seats and update used credentials");
    const credentials = getSomeUnusedCredentials(
      minecraftCredentials,
      usedCredentials
    );
    usedCredentials.push(credentials.username);

    const courseRef = db.collection("courses").doc(courseSlug);
    const courseSnapshot = await courseRef.get();
    const startingDates = courseSnapshot.data().startingDates;

    const updatedStartingDates = startingDates.map((date) =>
      date.id === startingDateId
        ? {
            ...date,
            availableSeats: date.availableSeats - 1,
            usedCredentials: usedCredentials,
          }
        : date
    );

    await courseRef.update({ startingDates: updatedStartingDates });
    console.log("Successfully updated start dates");
    return credentials;
  } catch (e) {
    console.error("Error: Failed to update start date", e);
    throw e;
  }
}

async function handleOperation(operation, errorMsg) {
  try {
    return await operation();
  } catch (e) {
    console.error(errorMsg, e);
    throw e;
  }
}

const handleCheckoutComplete = async (session, res) => {
  console.log("handleCheckoutComplete metadata", session.metadata);
  const userId = session.metadata.userId;

  try {
    const user = await handleOperation(
      () => updateUserCheckoutStatus(userId),
      "User's checkoutCompleted couldn't be updated:"
    );
    const newCoupon = await handleOperation(
      () => createCoupon(userId, user.childName),
      "Couldn't create coupon:"
    );
    const course = await handleOperation(
      () => fetchCourseDoc(user.courseId),
      "Couldn't fetch course doc:"
    );
    const startingDate = getStartingDate(
      course.startingDates,
      user.startDateId
    );
    console.log("starting date", startingDate);
    const credentials = await handleOperation(
      () =>
        updateStartingDate(
          user.courseId,
          user.startDateId,
          startingDate.usedCredentials
        ),
      "Couldn't update start date:"
    );
    console.log("credentials", credentials);
    await handleOperation(
      () => sendWelcomeMail(user, course, startingDate, credentials, newCoupon),
      "Couldn't send welcome mail:"
    );
    if (user.coupon)
      await handleOperation(
        () => sendReferrerMail(user),
        "Couldn't send referrer mail:"
      );

    console.log("Successfully updated checkout status for userId:", userId);
  } catch (e) {
    console.error("Error updating checkout status:", e);
    throw e;
  }
};

module.exports = {
  sanitizeUserData,
  fetchStartDate,
  fetchStartDates,
  fetchCoupon,
  createCoupon,
  couponTypes,
  priceIds,
  fetchUser,
  createNewUser,
  createCheckoutSession,
  handleCheckoutComplete,
};
