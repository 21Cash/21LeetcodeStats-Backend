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

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const secretKey = req.query.secretKey;
    const correctKey = process.env.UPDATE_SECRET_KEY;

    if (secretKey != correctKey) {
      res.status(403).send("Secret Key is Incorrect. Access Denied");
      return;
    }

    const knightData = await getLowestRatedKnightUserInfo();
    const knightInfoRef = doc(db, "KnightStats", "stats");

    await setDoc(knightInfoRef, {
      ...knightData,
      lastUpdated: serverTimestamp(),
    });
    res
      .status(200)
      .send({ knightData, msg: "Knight Data Updated Successfully." });
  } catch (err) {
    res.status(500).send(`Internal Server Error 500, ${err}`);
  }
});

export default router;
