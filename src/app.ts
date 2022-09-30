import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import clientRouter from './Routes/client.routes'

const app = express()
app.use(cors())
app.use(morgan("dev"))
app.use(express.json())
app.use(clientRouter)

export default app