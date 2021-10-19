import { Request, Response, Router } from "express";
import { AuthenticateUserController } from "../controllers/AuthenticateUserController";

const router = Router();

const authenticateUserController = new AuthenticateUserController();

router.post("/authenticate", authenticateUserController.handle);

router.get("/github", (req: Request, res: Response) => {
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`
  );
});

router.get("/signin/callback", (req: Request, res: Response) => {
  const { code } = req.query;

  res.json({ code });
});

export { router };
