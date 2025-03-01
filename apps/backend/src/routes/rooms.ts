import { Router } from "express";
import { CreateRoomController } from "../controller/CreateRoomController.js";
import { UpdateRoomController } from "../controller/UpdateRoomController.js";
import { DeleteRoomController } from "../controller/DeleteRoomController.js";
import { authMiddleware } from "../Middleware/authMiddleware.js";

export const roomsRouter: Router = Router();
roomsRouter.use(authMiddleware);

roomsRouter.post("/create", CreateRoomController); // admin only

roomsRouter.put("/:id", UpdateRoomController); // admin only

roomsRouter.delete("/:id", DeleteRoomController); // admin only
