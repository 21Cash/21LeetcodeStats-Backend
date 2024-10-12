import { Router, Request, Response } from "express";
import getUserInfo from "../handlers/user-info-handler";
const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const rank = parseInt(req.query.rank as string, 10);
    const data = await getUserInfo(rank);
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(`Internal Server Error 500, ${err}`);
  }
});

export default router;
