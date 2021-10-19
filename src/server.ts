import express from "express";
import "dotenv/config";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { router } from "./routes";

const PORT = process.env.PORT || 4000;

const app = express();

app.use(express.json());

app.use(router);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
