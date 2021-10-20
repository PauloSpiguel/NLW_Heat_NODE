import { Message } from ".prisma/client";
import prismaClient from "../prisma";

interface IGetMessageService {
  execute: () => Promise<Message[]>;
}

class GetMessageService implements IGetMessageService {
  async execute(): Promise<Message[]> {
    const messages: Message[] = await prismaClient.message.findMany();

    return messages;
  }
}

export { GetMessageService, IGetMessageService };
