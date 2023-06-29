require("dotenv").config();

const functions = require("firebase-functions");
const admin = require("firebase-admin");

// use the Firestore emulator in test environment
if (process.env.NODE_ENV === "test") {
  console.log("test environment");
  const projectId = "test";
  process.env.GCLOUD_PROJECT = projectId;
  process.env.FIRESTORE_EMULATOR_HOST = "localhost:8080";
  admin.initializeApp({ projectId });
} else {
  admin.initializeApp();
}

const db = admin.firestore();

// Frontend URL for redirecting after checkout
const FRONTEND_URL =
  process.env.NODE_ENV === "test"
    ? "http://localhost:3000"
    : functions.config().frontend.url_prod;

module.exports = {
  functions,
  admin,
  db,
  FRONTEND_URL,
};
