import { Request, Response } from "express";
import { GetMessageService } from "../services/GetMessageService";

class GetMessageController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const getMessageService = new GetMessageService();

      const result = await getMessageService.execute({ limit: 3 });

      return res.json(result);
    } catch (error) {
      return res
        .status(400)
        .json({ errorCode: "bad.request", error: error.message });
    }
  }
}

export { GetMessageController };
