import { Request, Response } from "express";
import { AuthenticateUserService } from "../services/AuthenticateUserService";
class AuthenticateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { code } = req.body;

      const service = new AuthenticateUserService();
      const result = await service.execute(code);

      return res.json(result);
    } catch (error) {
      return res
        .status(error.code || 400)
        .json({ codeError: "auth.user", error: error.message });
    }
  }
}

export { AuthenticateUserController };
