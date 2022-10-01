import { Router } from "express";
import { createReservaCompleta, deleteReservation, payReservation } from "../Controllers/processes.controller";

const processesRouter = Router()

processesRouter.post("/proceso/crear-reserva-completa",createReservaCompleta)
processesRouter.put("/proceso/eliminar-reserva/:id",deleteReservation)
processesRouter.put("/proceso/pagar-reserva/:id",payReservation)

export default processesRouter