import { Router } from "express";
import { CreateRoomController } from "../controller/CreateRoomController";
import { UpdateRoomController } from "../controller/UpdateRoomController";
import { DeleteRoomController } from "../controller/DeleteRoomController";
import { authMiddleware } from "../Middleware/authMiddleware";
import { GetRoomsController } from "../controller/GetRoomsController";

export const roomsRouter: Router = Router();
roomsRouter.use(authMiddleware);

roomsRouter.post("/create", CreateRoomController); // admin only

roomsRouter.put("/:id", UpdateRoomController); // admin only

roomsRouter.delete("/:id", DeleteRoomController); // admin only

roomsRouter.get("/", GetRoomsController); // admin only
