import { DataSource } from "typeorm";
import { Client } from "../Entities/client";
import { Invoice } from "../Entities/invoice";
import { PaymentMethod } from "../Entities/paymentMethod";
import { Reservation } from "../Entities/reservation";
import { ReservationRoom } from "../Entities/reservationRoom";
import { ReservationRoomDays } from "../Entities/reservationRoomDays";
import { Room } from "../Entities/room";


export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,// || "localhost",
    port:  Number(process.env.DB_PORT), //|| 5432,
    username: process.env.POSTGRES_USER, //|| "postgres",
    password: String(process.env.POSTGRES_PASSWORD), //|| "12345",
    logging: false,
    database: process.env.POSTGRES_DB,// || 'HotelDB2',
    entities: [Client,Invoice,PaymentMethod,Reservation,ReservationRoom,ReservationRoomDays,Room],
    migrations: [__dirname+"/../migrations/*{.ts,.js}"],
    migrationsRun:true

})