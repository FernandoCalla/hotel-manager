import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import clientRouter from './Routes/client.routes'
import paymentMethodRouter from './Routes/paymentMethod.routes'
import roomRouter from './Routes/room.routes'
import reservationRouter from './Routes/reservation.routes'
import reservationRoomRouter from './Routes/reservationRoom.routes'
import processesRouter from './Routes/processes.routes'

const app = express()
app.use(cors())
app.use(morgan("dev"))
app.use(express.json())
app.use(clientRouter)
app.use(paymentMethodRouter)
app.use(roomRouter)
app.use(reservationRouter)
app.use(reservationRoomRouter)
app.use(processesRouter)

export default app