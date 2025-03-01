import { WebSocketServer, WebSocket } from "ws";
import db from "@repo/db";
import jwt, { JwtPayload } from "jsonwebtoken";
const rooms = new Map();

function checkUser(token: string): string | null {
  try {
    const decoded = jwt.verify(
      token,
      process.env.USER_JWT_SECRET!
    ) as JwtPayload;
     return decoded?.userId ?? null;
  } catch (error) {
    console.error("JWT verification failed:", error);
    return null;
  }
}



const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (ws) => {
  ws.on("message", (message) => {
    console.log(message);
  });
});
