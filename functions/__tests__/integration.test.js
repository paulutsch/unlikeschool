// IMPORTANT: run `NODE_ENV=test firebase emulators:start --only firestore` before testing in order to ensure using local emulation environment as db
const { functions, admin, db } = require("../init");
const { newUser, referrer, course, coupon } = require("./mock");
const {
  sanitizeUserData,
  createNewUser,
  fetchUser,
  createCoupon,
  fetchCoupon,
  priceIds,
  fetchStartDate,
  fetchStartDates,
  createCheckoutSession,
  handleCheckoutComplete,
} = require("../helpers");
const { handleCheckout } = require("../index");

async function populateTestData() {
  const userRef = db.collection("users").doc(newUser.id);
  await userRef.set(newUser.data());

  const referrerRef = db.collection("users").doc(referrer.id);
  await referrerRef.set(referrer.data());

  const courseRef = db.collection("courses").doc(course.id);
  await courseRef.set(course.data());

  const couponRef = await db.collection("coupons").add(coupon.data());

  // Retrieve the data from Firestore and compare it to your test data
  const userData = (await userRef.get()).data();
  const referrerData = (await referrerRef.get()).data();
  const courseData = (await courseRef.get()).data();
  const couponData = (await couponRef.get()).data();

  expect(userData).toEqual(newUser.data());
  // expect(courseData).toEqual(course.data());
  expect(referrerData).toEqual(referrer.data());
  expect(couponData).toEqual(coupon.data());
}

jest.mock("../helpers.js", () => {
  const originalModule = jest.requireActual("../helpers.js");

  return {
    ...originalModule,
    sendEmail: jest.fn().mockResolvedValue(true),
  };
});

describe("integration test", () => {
  beforeAll(async () => {
    try {
      await populateTestData();
      console.log("Test data populated!");
    } catch (err) {
      console.error("Error populating test data: ", err);
    }
  });

  it("should create a new user", async () => {
    const userId = await createNewUser(newUser.data(), "xyz");
    expect(userId).toEqual("xyz");
  });

  it("should fetch an existing user", async () => {
    const userData = await fetchUser(newUser.id);
    expect(userData.parentName).toEqual(newUser.data().parentName);
  });

  it("should sanitize user data", async () => {
    const userData = await sanitizeUserData(newUser.data());
    expect(userData).toEqual(newUser.data());
  });

  it("should create a new coupon", async () => {
    const cpn = await createCoupon(newUser.id, newUser.data().childName);
    expect(cpn.code).toBeDefined;
  });

  it("should fetch an existing coupon", async () => {
    const cpn = await fetchCoupon(newUser.data().coupon);
    expect(cpn.code).toEqual(newUser.data().coupon);
  });

  it("should fetch particular startDate", async () => {
    const courseDate = await fetchStartDate(
      course.id,
      course.data().startingDates[0].id
    );
    expect(courseDate.id).toEqual(course.data().startingDates[0].id);
  });

  it("should fetch startDates", async () => {
    const courseDates = await fetchStartDates();
    expect(courseDates["beginners"][0].id).toEqual(
      course.data().startingDates[0].id
    );
  });

  it("should create a checkout session", async () => {
    const session = await createCheckoutSession(newUser.id, null);
    expect(session.id).toBeDefined();
  });

  it("should handle checkout completion", async () => {
    const fakeSession = { metadata: { userId: newUser.id } };
    const res = {};
    const response = await handleCheckoutComplete(fakeSession, res);
  }, 40000);
});
