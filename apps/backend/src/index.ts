import express from "express";
import db from "@repo/db";
import { authRouter } from "./routes/auth.js";
import { roomsRouter } from "./routes/rooms.js";
import { chatRouter } from "./routes/chat.js"


const app = express();
app.use(express.json());


app.use("/auth", authRouter);
app.use("/rooms", roomsRouter);
app.use("/chat", chatRouter);

app.get("/health", (req, res) => {
  res.send("OK");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
