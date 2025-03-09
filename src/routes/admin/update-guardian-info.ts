import { Router, Request, Response } from "express";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  FieldValue,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../app";
import getLowestRatedGuardianUserInfo from "../../handlers/lowest-rated-guardian-handler";
import revalidateFrontendRoute from "../../handlers/trigger-frontend-revalidation";

const router = Router();

const updateGuardianInfoOnDatabase = async () => {
  const guardianData = await getLowestRatedGuardianUserInfo();
  const guardianInfoRef = doc(db, "GuardianStats", "stats");

  // Update the lastUpdated field in the GuardianStats collection on firestore
  await setDoc(guardianInfoRef, {
    ...guardianData,
    lastUpdated: serverTimestamp(),
  });

  console.log("Guardian Data Updated Successfully.");
  console.log("Guardian Data: ", guardianData);

  // Revalidate the frontend route
  revalidateFrontendRoute("/api/guardian-stats");
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

    updateGuardianInfoOnDatabase();
    res.status(200).send("Guardian Data Update Initiated");
  } catch (err) {
    res.status(500).send(`Internal Server Error 500, ${err}`);
  }
});

export default router;
