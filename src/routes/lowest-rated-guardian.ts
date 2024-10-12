import { Router, Request, Response } from "express";
import getUserInfo from "../handlers/user-info-handler";
import getLowestRatedGuardianUserInfo from "../handlers/lowest-rated-guardian-handler";
const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const data = await getLowestRatedGuardianUserInfo();
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(`Internal Server Error 500, ${err}`);
  }
});

export default router;
