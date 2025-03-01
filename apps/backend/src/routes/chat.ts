import { Router } from "express";
import { GetMessagesController } from "../controller/GetMessagesController";
import { authMiddleware } from "../Middleware/authMiddleware";
import { SendMessageController } from "../controller/SendMessageController";

export const chatRouter: Router = Router();

chatRouter.use(authMiddleware);

chatRouter.get("/:roomId/messages", GetMessagesController);

chatRouter.post("/:roomId/messages", SendMessageController);
