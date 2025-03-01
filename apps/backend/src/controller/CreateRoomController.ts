import db from "@repo/db";
import { Request, Response } from "express";

export const CreateRoomController = async (req: Request, res: Response) => {
  const { slug } = req.body;

  if (!slug) {
    res.status(400).json({
      message: "Slug is required",
    });
    return;
  }

  try {
    const newRoom = await db.room.create({
      data: {
        slug,
        adminId: req.userId,
      },
    });

    res.status(201).json({
      message: "Room created successfully",
      newRoom,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
