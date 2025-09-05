import admin from "firebase-admin";
import path from "path";

// Make sure the path to your service account JSON is correct
const serviceAccountPath = path.join(
  process.cwd(),
  "config",
  "dentalcare-be7d2-firebase-adminsdk-fbsvc-f2a4de2240.json"
);

if (!admin.apps.length) {
  // check if app is already initialized
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccountPath),
  });
}

export default admin;
