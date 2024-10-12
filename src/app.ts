import express, { Request, Response } from "express";
import rootRoutes from "./routes/index";
import totalParticipantRoute from "./routes/total-participants";
import usernameByRankRoute from "./routes/username-by-rank";
import userInfoRoute from "./routes/user-info";
import lowestRatedGuardianRoute from "./routes/lowest-rated-guardian";
import lowestRatedKnightRoute from "./routes/lowest-rated-knight";
import updateGuardianInfoRoute from "./routes/admin/update-guardian-info";
import updateKnightInfoRoute from "./routes/admin/update-knight-info";
import dotenv from "dotenv";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

dotenv.config();
const app = express();
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);

const port = process.env.PORT || 3000;

app.use("/", rootRoutes);
app.use("/total-participants", totalParticipantRoute);
app.use("/username-by-rank", usernameByRankRoute);
app.use("/user-info", userInfoRoute);
app.use("/lowest-rated-guardian", lowestRatedGuardianRoute);
app.use("/lowest-rated-knight", lowestRatedKnightRoute);

// Admin Routes
app.use("/admin/update-guardian-info", updateGuardianInfoRoute);
app.use("/admin/update-knight-info", updateKnightInfoRoute);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

export { db };
