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

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const secretKey = req.query.secretKey;
    const correctKey = process.env.UPDATE_SECRET_KEY;

    if (secretKey != correctKey) {
      res.status(403).send("Secret Key is Incorrect. Access Denied");
      return;
    }

    const guardianData = await getLowestRatedGuardianUserInfo();
    const guardianInfoRef = doc(db, "GuardianStats", "stats");

    await setDoc(guardianInfoRef, {
      ...guardianData,
      lastUpdated: serverTimestamp(),
    });

    res
      .status(200)
      .send({ guardianData, msg: "Guardian Data Updated Successfully." });
  } catch (err) {
    res.status(500).send(`Internal Server Error 500, ${err}`);
  }
});

export default router;
