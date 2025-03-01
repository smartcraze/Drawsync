import { Router } from "express";
import { SignupController } from "../controller/SignupController.js";
import {
  SigninController,
  SignoutController,
} from "../controller/SigninController.js";
import { authMiddleware } from "../Middleware/authMiddleware.js";

export const authRouter: Router = Router();

authRouter.post("/signup", SignupController);
authRouter.post("/signin", SigninController);

authRouter.post("/signout", authMiddleware, SignoutController);
