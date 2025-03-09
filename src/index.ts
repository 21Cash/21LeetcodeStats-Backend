import { Router, Request, Response } from "express";
import revalidateFrontendRoute from "./handlers/trigger-frontend-revalidation";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Hello from the root route!");
});

export default router;
