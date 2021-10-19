import axios from "axios";
import { sign } from "jsonwebtoken";
import prismaClient from "../prisma";

interface ITokenResponse {
  access_token: string;
}

interface IUserResponse {
  id: number;
  avatar_url: string;
  login: string;
  name: string;
}

class AuthenticateUserService {
  async execute(code: string): Promise<any> {
    const url: string = "https://github.com/login/oauth/access_token";

    const { data } = await axios.post<ITokenResponse>(url, null, {
      params: {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      headers: {
        accept: "application/json",
      },
    });

    const { data: response } = await axios.get<IUserResponse>(
      "https://api.github.com/user",
      {
        headers: {
          Authorization: `Bearer ${data.access_token}`,
        },
      }
    );

    const { id, avatar_url, login, name } = response;

    let user = await prismaClient.user.findFirst({
      where: {
        github_id: id,
      },
    });

    if (!user) {
      user = await prismaClient.user.create({
        data: {
          github_id: id,
          avatar_url,
          login,
          name,
        },
      });
    }

    const token = sign(
      {
        user: {
          id: user.id,
          name: user.name,
          avatar_url: user.avatar_url,
        },
      },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: "1d",
      }
    );

    return { user, token };
  }
}

export { AuthenticateUserService };
