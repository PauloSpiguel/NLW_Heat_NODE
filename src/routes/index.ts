import { Request, Response, Router } from "express";
import { AuthenticateUserController } from "../controllers/AuthenticateUserController";
import { CreateMessageController } from "../controllers/CreateMessageController";
import { GetMessageController } from "../controllers/GetMessageController";
import { ProfileUserController } from "../controllers/ProfileUserController";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated";

const router = Router();

const authenticateUserController = new AuthenticateUserController();
const createMessageController = new CreateMessageController();
const getMessageController = new GetMessageController();
const profileUserController = new ProfileUserController();

router.get("/github", (req: Request, res: Response) => {
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`
  );
});

router.get("/signin/callback", (req: Request, res: Response) => {
  const { code } = req.query;

  res.json({ code });
});

router.post("/authenticate", authenticateUserController.handle);

router.post("/messages", ensureAuthenticated, createMessageController.handle);

router.get("/messages", getMessageController.handle);

router.get("/profile", ensureAuthenticated, profileUserController.handle);

export { router };
