import { Request, Response } from "express";
import { SigninTypes } from "../zodTypes/Types.js";
import db from "@repo/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const SigninController = async (req: Request, res: Response) => {
  const { email, password } = SigninTypes.parse(req.body);
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      res.status(401).json({
        message: "Invalid email or password",
      });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(401).json({
        message: "Invalid email or password",
      });
      return;
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET as string
    );

    res.status(200).json({
      message: "User logged in successfully",
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
    return;
  }
};

export const SignoutController = async (req: Request, res: Response) => {
  res.clearCookie("token");
  res.status(200).json({
    message: "User logged out successfully",
  });
};
