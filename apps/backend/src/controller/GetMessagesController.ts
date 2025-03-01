import db from "@repo/db";
import { Request, Response } from "express";

export const GetMessagesController = async (req: Request, res: Response) => {
  const { roomId } = req.params;
};
