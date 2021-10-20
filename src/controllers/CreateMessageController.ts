import { Request, Response } from "express";
import { CreateMessageService } from "../services/CreateMessageService";

class CreateMessageController {
  async handle(req: Request, res: Response) {
    try {
      const { message } = req.body;

      const { user_id } = req.user;

      const service = new CreateMessageService();

      const result = await service.execute(message, user_id);

      return res.json(result);
    } catch (error) {
      return res
        .status(error.code || 400)
        .json({ errorCode: "bad.request", error: error.message });
    }
  }
}

export { CreateMessageController };
