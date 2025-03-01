import { Request, Response } from "express";
import { Signuptypes } from "../zodTypes/Types.js";
import bcrypt from "bcrypt";
import db from "@repo/db";

export const SignupController = async (req: Request, res: Response) => {
  const { name, email, password } = Signuptypes.parse(req.body);
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user: User = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
    return;
  }
};

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}
