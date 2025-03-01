import db from "@repo/db";
import { Request, Response } from "express";

export const GetRoomsController = async (req: Request, res: Response) => {
  const rooms = await db.room.findMany({
    include: {
      users: true,
    },
  });

  res.status(200).json({
    rooms,
  });
};
