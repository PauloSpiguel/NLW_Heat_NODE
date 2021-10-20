import { Message } from ".prisma/client";
import prismaClient from "../prisma";

interface IGetMessageService {
  execute: (key: Object) => Promise<Message[]>;
}

class GetMessageService implements IGetMessageService {
  async execute({ limit }: { limit: number }): Promise<Message[]> {
    const messages: Message[] = await prismaClient.message.findMany({
      take: limit,
      orderBy: { created_at: "desc" },
      include: {
        user: true,
      },
    });

    return messages;
  }
}

export { GetMessageService, IGetMessageService };
