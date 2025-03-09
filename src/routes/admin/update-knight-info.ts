import { Router, Request, Response } from "express";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "../../app";
import getLowestRatedGuardianUserInfo from "../../handlers/lowest-rated-guardian-handler";
import getLowestRatedKnightUserInfo from "../../handlers/lowest-rated-knight-handler";
import revalidateFrontendRoute from "../../handlers/trigger-frontend-revalidation";

const router = Router();

const updateKnightInfoOnDatabase = async () => {
  const knightData = await getLowestRatedKnightUserInfo();
  const knightInfoRef = doc(db, "KnightStats", "stats");

  // Update the lastUpdated field in the KnightStats collection on firestore
  await setDoc(knightInfoRef, {
    ...knightData,
    lastUpdated: serverTimestamp(),
  });

  console.log("Knight Data Updated Successfully.");
  console.log("Knight Data: ", knightData);

  // Revalidate the frontend route
  revalidateFrontendRoute("/api/knight-stats");
  revalidateFrontendRoute("/");
};

router.get("/", async (req: Request, res: Response) => {
  try {
    const secretKey = req.query.secretKey;
    const correctKey = process.env.UPDATE_SECRET_KEY;

    if (secretKey != correctKey) {
      res.status(403).send("Secret Key is Incorrect. Access Denied");
      return;
    }

    res.status(200).send("Knight Data Update Initiated.");
  } catch (err) {
    res.status(500).send(`Internal Server Error 500, ${err}`);
  }
});

export default router;
