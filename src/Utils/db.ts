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
    // url:"postgres://jrpngahizjbugl:78a0c2d9b0d15b95dc2f87bd0666a16842a921184a73032fb29a56eb90e15e57@ec2-34-235-198-25.compute-1.amazonaws.com:5432/d8t8mcjshv7ipc",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "12345",
    logging: true,
    database:'HotelDB',
    entities: [Client,Invoice,PaymentMethod,Reservation,ReservationRoom,ReservationRoomDays,Room],
    synchronize:true,
    // ssl:    true     && { rejectUnauthorized: false } 
})