import { Router } from "express";
import { SignupController } from "../controller/SignupController";
import {
  SigninController,
  SignoutController,
} from "../controller/SigninController";
import { authMiddleware } from "../Middleware/authMiddleware";

export const authRouter: Router = Router();

authRouter.post("/signup", SignupController);
authRouter.post("/signin", SigninController);

authRouter.post("/signout", authMiddleware, SignoutController);
