import { Router, Request, Response } from "express";
import getUserInfo from "../handlers/user-info-handler";
import getLowestRatedKnightUserInfo from "../handlers/lowest-rated-knight-handler";
const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const data = await getLowestRatedKnightUserInfo();
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(`Internal Server Error 500, ${err}`);
  }
});

export default router;
