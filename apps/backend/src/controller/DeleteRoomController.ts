import { Request, Response } from "express";
import db from "@repo/db";
export const DeleteRoomController = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({
      message: "Room ID is required",
    });
    return;
  }

  try {
    const deletedRoom = await db.room.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({
      message: "Room deleted successfully",
      deletedRoom,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

