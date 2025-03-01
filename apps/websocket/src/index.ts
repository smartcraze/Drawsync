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

type events = {
  "join-room": {
    roomId: string;
  };
  "leave-room": {
    roomId: string;
  };
  "send-message": {
    roomId: string;
    message: string;
  };
  "get-rooms": {};
  "create-room": {
    name: string;
  };
  "update-room": {
    roomId: string;
    name: string;
  };
  "canvas-update": {
    roomId: string;
    elements: any[];
  };
  "sync-request": {
    roomId: string;
  };
};

interface Room {
  id: string;
  name: string;
  users: Set<WebSocket>;
  canvasData: any[];
}

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", async (ws: WebSocket) => {
  const userRooms = new Set<string>();
  let userId: string | null = null;

  ws.on("authenticate", (token: string) => {
    userId = checkUser(token);
    if (!userId) {
      ws.close();
    }
  });

  ws.on("message", async (message) => {
    try {
      const data = JSON.parse(message.toString());
      const event = data.event as keyof events;
      const payload = data.payload as events[typeof event];

      switch (event) {
        case "create-room": {
          const roomId = crypto.randomUUID();
          rooms.set(roomId, {
            id: roomId,
            name: payload.name,
            users: new Set([ws]),
            canvasData: [],
          });
          ws.send(
            JSON.stringify({ event: "room-created", payload: { roomId } })
          );
          break;
        }

        case "join-room": {
          const room = rooms.get(payload.roomId);
          if (room) {
            room.users.add(ws);
            userRooms.add(payload.roomId);
            ws.send(
              JSON.stringify({
                event: "canvas-sync",
                payload: { elements: room.canvasData },
              })
            );
            broadcastToRoom(
              room,
              {
                event: "user-joined",
                payload: { userId },
              },
              ws
            );
          }
          break;
        }

        case "leave-room": {
          const room = rooms.get(payload.roomId);
          if (room) {
            room.users.delete(ws);
            userRooms.delete(payload.roomId);
            broadcastToRoom(room, {
              event: "user-left",
              payload: { userId },
            });
          }
          break;
        }

        case "send-message": {
          const room = rooms.get(payload.roomId);
          if (room) {
            broadcastToRoom(room, {
              event: "new-message",
              payload: { userId, message: payload.message },
            });
          }
          break;
        }

        case "canvas-update": {
          const room = rooms.get(payload.roomId);
          if (room) {
            room.canvasData = payload.elements;
            broadcastToRoom(
              room,
              {
                event: "canvas-updated",
                payload: { elements: payload.elements },
              },
              ws
            );
          }
          break;
        }

        case "get-rooms": {
          const roomList = Array.from(rooms.values()).map((room) => ({
            id: room.id,
            name: room.name,
            userCount: room.users.size,
          }));
          ws.send(
            JSON.stringify({
              event: "rooms-list",
              payload: { rooms: roomList },
            })
          );
          break;
        }
      }
    } catch (error) {
      console.error("Error processing message:", error);
    }
  });

  ws.on("close", () => {
    for (const roomId of userRooms) {
      const room = rooms.get(roomId);
      if (room) {
        room.users.delete(ws);
        broadcastToRoom(room, {
          event: "user-left",
          payload: { userId },
        });
        if (room.users.size === 0) {
          rooms.delete(roomId);
        }
      }
    }
  });
});

function broadcastToRoom(room: Room, message: any, exclude?: WebSocket) {
  const messageStr = JSON.stringify(message);
  room.users.forEach((client) => {
    if (client !== exclude && client.readyState === WebSocket.OPEN) {
      client.send(messageStr);
    }
  });
}
