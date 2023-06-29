const newUser = {
  id: "339",
  data: () => ({
    parentName: "Pippi Langstrumpf",
    childName: "Kleiner Onkel",
    courseId: "beginners",
    startDateId: "xxx",
    email: "unoutsch@gmail.com",
    coupon: "test",
    newsletter: true,
    termsAccepted: true,
    dataProcessingAccepted: true,
  }),
};

const referrer = {
  id: "123",
  data: () => ({
    parentName: "Weiser Stein",
    childName: "Helle Sonne",
    courseId: "testkurs",
    startDateId: "xxx",
    email: "unoutsch@googlemail.com",
    newsletter: true,
    termsAccepted: true,
    dataProcessingAccepted: true,
    checkoutCompleted: true,
  }),
};

const course = {
  id: "beginners",
  data: () => ({
    startingDates: [
      {
        ageGroup: "9-12",
        availableSeats: 4,
        totalSeats: 6,
        date: new Date("2023-08-23T17:00:00+0200"),
        googleMeetLink: "meet.google.com/xxx",
        id: "xxx",
        usedCredentials: [""],
      },
    ],
  }),
};

const coupon = {
  data: () => ({
    used: false,
    type: "referral",
    referrerId: "123",
    code: "test",
  }),
};

module.exports = { newUser, referrer, course, coupon };
