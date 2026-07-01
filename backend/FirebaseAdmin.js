const admin = require("firebase-admin");

if (!admin.apps.length) {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const hasServiceAccount = projectId && clientEmail && privateKey;

  if (hasServiceAccount) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId,
        clientEmail,
        privateKey
      })
    });
  } else if (projectId) {
    // For token verification, projectId-only init is enough in many local setups.
    admin.initializeApp({ projectId });
  } else {
    // Fallback for environments using GOOGLE_APPLICATION_CREDENTIALS/ADC.
    admin.initializeApp({
      credential: admin.credential.applicationDefault()
    });
  }
}

module.exports = admin;
