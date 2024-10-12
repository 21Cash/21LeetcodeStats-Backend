import { Router, Request, Response } from "express";
import getTotalParticipantsCount from "../handlers/total-participants-handler";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const totalParticipants = await getTotalParticipantsCount();
    const data = {
      totalParticipants,
    };
    res.send(data);
  } catch (err) {
    res.status(500).send(`Internal Server Error 500, ${err}`);
  }
});

export default router;
