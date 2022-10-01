import { Router } from "express";
import { createRoom, deleteRoom, getRoomByActiveStatus, getRoomById, getRooms, updateRoom } from "../Controllers/room.controller";

const roomRouter = Router()

roomRouter.get("/rooms",getRooms)
roomRouter.get("/room/:id",getRoomById)
roomRouter.get("/rooms/active",getRoomByActiveStatus)
roomRouter.post("/room",createRoom)
roomRouter.put("/room/:id",updateRoom)
roomRouter.delete("/room/:id",deleteRoom)

export default roomRouter