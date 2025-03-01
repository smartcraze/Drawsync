import db from "@repo/db";
import { Request, Response } from "express";

export const UpdateRoomController = async (req: Request, res: Response) => {
  const { slug, id } = req.body;

  if (!slug) {
    res.status(400).json({
      message: "Slug is required",
    });
    return;
  }

  try {
    const updatedRoom = await db.room.update({
      where: { id: parseInt(id) },
      data: { slug },
    });

    res.status(200).json({
      message: "Room updated successfully",
      updatedRoom,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
