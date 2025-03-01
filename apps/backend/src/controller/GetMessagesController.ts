import db from "@repo/db";
import { Request, Response } from "express";

export const GetMessagesController = async (req: Request, res: Response) => {
  const { roomId } = req.params;

  if (!roomId) {
    res.status(400).json({
      message: "Room ID is required",
    });
    return;
  }

  try {
    const messages = await db.chat.findMany({
      where: {
        roomId: parseInt(roomId),
      },
    });
    res.status(200).json({
      messages,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  } 
};

