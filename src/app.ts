import "dotenv/config";
import express from "express";

import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";

import { router } from "./routes";

const app = express();
app.use(cors());
app.use(express.json());

const serverHttp = createServer(app);

const io = new Server(serverHttp, {
  cors: {
    origin: "*",
  },
});

io.on("connetion", (socket) => {
  console.log(`User connected on Socket ${socket.id}`);
});

app.use(router);

export { serverHttp, io };
