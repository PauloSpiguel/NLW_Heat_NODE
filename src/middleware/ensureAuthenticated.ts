import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPlayload {
  sub: string;
}

function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).json({
      errorCode: "token.invalid",
      error: "Unauthorized",
    });
  }

  const [, token] = authToken.split(" ");

  try {
    const { sub } = verify(token, process.env.JWT_SECRET) as IPlayload;

    req.user = {
      user_id: sub,
    };

    return next();
  } catch (error) {
    return res.status(401).json({
      errorCode: "token.expired",
      error: "Token expired",
    });
  }
}

export { ensureAuthenticated };
