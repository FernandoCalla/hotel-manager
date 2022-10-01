import { Router } from "express";
import { createReservation, getReservationByDNIClient, getReservationById, getReservations } from "../Controllers/reservation.controller";

const reservationRouter = Router()

reservationRouter.get("/reservations",getReservations)
reservationRouter.get("/reservation/:id",getReservationById)
reservationRouter.get("/reservations/cliente/:dni",getReservationByDNIClient)
reservationRouter.post("/reservation",createReservation)
// clientRouter.put("/cliente/:id",updateClient)
// clientRouter.delete("/cliente/:id",deleteClient)

export default reservationRouter