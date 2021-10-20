import { Request, Response } from "express";
import { ProfileUserService } from "../services/ProfileUserService";

class ProfileUserController {
  async handle(req: Request, res: Response) {
    const profileUser = new ProfileUserService();

    const user = await profileUser.execute(req.user.user_id);

    return res.json(user);
  }
}

export { ProfileUserController };
