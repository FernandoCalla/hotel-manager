import { Router } from "express";
import { createReservationRoom, getReservationRooms } from "../Controllers/reservationRoom.controller";

const reservationRoomRouter = Router()

reservationRoomRouter.get("/reservation-rooms",getReservationRooms)
// clientRouter.get("/cliente/:id",getClientById)
// clientRouter.get("/cliente/identificador/:identityNumber",getClientByIdentytyNumber)
reservationRoomRouter.post("/reservation-room",createReservationRoom)
// clientRouter.put("/cliente/:id",updateClient)
// clientRouter.delete("/cliente/:id",deleteClient)

export default reservationRoomRouter