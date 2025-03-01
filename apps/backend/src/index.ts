import express from "express";
import { authRouter } from "./routes/auth";
import { roomsRouter } from "./routes/rooms";
import { chatRouter } from "./routes/chat";

const app = express();
app.use(express.json());

app.use("/auth", authRouter);
// app.use("/rooms", roomsRouter);
// app.use("/chat", chatRouter);

app.get("/health", (req, res) => {
  res.send("OK");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
