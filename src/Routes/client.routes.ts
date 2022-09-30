import { Router } from "express";
import { createClient, deleteClient, getClientById, getClientByIdentytyNumber, getClients, updateClient} from "../Controllers/notes.controller";

const clientRouter = Router()

clientRouter.get("/clientes",getClients)
clientRouter.get("/cliente/:id",getClientById)
clientRouter.get("/cliente/identificador/:identityNumber",getClientByIdentytyNumber)
clientRouter.post("/cliente",createClient)
clientRouter.put("/cliente/:id",updateClient)
clientRouter.delete("/cliente/:id",deleteClient)

export default clientRouter