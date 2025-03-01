import { Request, Response } from "express";
import db from "@repo/db";

export const SendMessageController = async (req: Request, res: Response) => {
  const { roomId } = req.params;
  const { message } = req.body;

  if (!roomId || !message) {
    res.status(400).json({
      message: "Room ID and message are required",
    });
    return;
  }

  try {
    const newMessage = await db.chat.create({
      data: {
        message,
        roomId: parseInt(roomId),
        userId: req.userId,
      },
    });

    res.status(201).json({
      message: "Message sent successfully",
      newMessage,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
