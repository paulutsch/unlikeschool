require("dotenv").config();

const { functions, admin } = require("./init");
const {
  sanitizeUserData,
  fetchStartDates,
  fetchCoupon,
  couponTypes,
  createNewUser,
  createCheckoutSession,
  handleCheckoutComplete,
} = require("./helpers");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.fetchCourseDates = functions.https.onCall(async (data, context) => {
  try {
    return await fetchStartDates();
  } catch (error) {
    console.error("Error fetching course dates:", error);
    throw new functions.https.HttpsError(
      "internal",
      "Failed to fetch course dates"
    );
  }
});

exports.verifyCoupon = functions.https.onCall(async (data, context) => {
  const { code } = data;

  const coupon = await fetchCoupon(code);

  if (!coupon) return { success: false, message: "invalid" };
  if (!coupon.used) return { success: true, message: "valid" };
  return { success: false, message: "used before" };
});

exports.createCheckout = functions.https.onCall(async (userData, context) => {
  if (!context.auth || !context.auth.uid) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "User must be authenticated."
    );
  }

  const user = await admin.auth().getUser(context.auth.uid);

  if (!userData || typeof userData !== "object") {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "userData must be a valid object."
    );
  }

  userData = sanitizeUserData(userData);

  userData.numberOfReferrals = 0;
  userData.checkoutCompleted = false;

  let couponId = "";
  if (userData.coupon) {
    const coupon = await fetchCoupon(userData.coupon);

    if (coupon && !coupon.used) couponId = couponTypes[coupon.type] || "";
    else userData.coupon = null;
  }

  const userId = await createNewUser(userData, context.auth.uid);

  const session = await createCheckoutSession(userId, couponId);

  return { id: session.id };
});

exports.checkoutComplete = functions.https.onRequest(async (req, res) => {
  if (req.method === "POST") {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    try {
      const sig = req.headers["stripe-signature"];

      const event = stripe.webhooks.constructEvent(
        req.rawBody,
        sig,
        webhookSecret
      );

      switch (event.type) {
        case "checkout.session.completed":
          try {
            await handleCheckoutComplete(event.data.object, res);
            res.setHeader("Content-Type", "application/json");
            res.status(200).json({ received: true });
          } catch (e) {
            res.setHeader("Content-Type", "application/json");
            res.status(500).json({
              error: "Failed to handle checkout completion: " + e.message,
            });
          }
          break;
        default:
          res.setHeader("Content-Type", "application/json");
          res.status(400).json({ error: "Unhandled event type" });
      }
    } catch (err) {
      console.log("webhook error", err.message);
      res.status(500).send(`Webhook Error: ${err.message}`);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
});
