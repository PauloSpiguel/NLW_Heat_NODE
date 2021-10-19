import { Request, Response } from "express";
import { AuthenticateUserService } from "../services/AuthenticateUserService";

class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<any> {
    try {
      const { code } = request.body;

      const service = new AuthenticateUserService();
      const result = await service.execute(code);

      response.status(200).json(result);
    } catch (error) {
      response.status(error.code || 400).json({ error: error.message });
    }
  }
}

export { AuthenticateUserController };
