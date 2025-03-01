import { Router } from "express";
import { GetMessagesController } from "../controller/GetMessagesController.js";
import { authMiddleware } from "../Middleware/authMiddleware.js";

export const chatRouter: Router = Router();

chatRouter.use(authMiddleware);

chatRouter.get("/:roomId/messages", GetMessagesController);
