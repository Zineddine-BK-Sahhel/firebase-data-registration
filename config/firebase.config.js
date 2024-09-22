const admin = require("firebase-admin");
const serviceAccount = require("../firebase-config.json");
const dotenv = require("dotenv");

dotenv.config();

// Initialize Firebase Admin SDK with service account
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DB_URL,
});

const database = admin.database();

module.exports = { database };
