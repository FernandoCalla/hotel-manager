import { Request, Response } from "express"
import { Client } from "../Entities/client"
import { PaymentMethod } from "../Entities/paymentMethod"
import { Reservation } from "../Entities/reservation"
import { ReservationRoom } from "../Entities/reservationRoom"
import { ReservationRoomDays } from "../Entities/reservationRoomDays"
import { Room } from "../Entities/room"
import { calcularListadoDeDias, calcularNumeroNoches, calcularPrecioParcial } from "../Utils/functions"
 

export const createReservationRoom= async (req:Request,res:Response)=>{
    try{
        const {checkIn,checkOut,reservation,room}=req.body
        //Proceso de validacion para ver si la reservacion existe y recuperar sus datos
        const reservationDetails=await Reservation.findOneBy({id:parseInt(reservation)})
        if(!reservation)return res.status(404).json({message:"Reservation not exists"})
        //Proceso de validacion para ver si la habitacion existe y recuperar sus datos
        const roomDetails=await Room.findOneBy({id:parseInt(room)})
        if(!room)return res.status(404).json({message:"Rooms not exists"})
        //Calcular la cantidad de noches entre la fecha de ingreso y salida
        const numberOfNights=calcularNumeroNoches(checkIn,checkOut)
        //Calcular el precio parcial por todas las noches seleccionadas para la habitacion
        const partialPrice=calcularPrecioParcial(numberOfNights,roomDetails!==null?roomDetails.roomPrice:0)
        
        //Generacion de los detalles de la reserva por habitacion
        const reservationRoom=new ReservationRoom()
        reservationRoom.checkIn= checkIn
        reservationRoom.checkOut= checkOut
        reservationRoom.reservation= reservationDetails as Reservation
        reservationRoom.room= roomDetails as Room
        reservationRoom.numberOfNights= numberOfNights
        reservationRoom.partialPrice= partialPrice
        await reservationRoom.save()
        //Calcular el monto de la reserva actual mas el nuevo monto
        const totalPriceUpdated=reservationDetails &&  reservationDetails.totalPrice !== null ? reservationDetails.totalPrice+reservationRoom.partialPrice:reservationRoom.partialPrice
        //Actualizar el monto de la reserva
        await Reservation.update({id:parseInt(reservation)},{totalPrice:totalPriceUpdated})
        //Creacion de reservas detalladas por dia
        const listadoDias=calcularListadoDeDias(checkIn,checkOut,numberOfNights,roomDetails!==null?roomDetails.roomPrice:0)
        await listadoDias.forEach(async (diaDetalle)=>{
            const reservationRoomDay=new ReservationRoomDays()
            reservationRoomDay.day=diaDetalle.dia
            reservationRoomDay.partialPriceDay=diaDetalle.precio
            reservationRoomDay.reservationRoom=reservationRoom
            await reservationRoomDay.save()
        })
        return res.status(201).json(reservationRoom)
    }catch(error){
        if(error instanceof Error){
            return res.status(500).json({message:error.message})
        }
    }
}
export const getReservationRooms= async (req:Request,res:Response)=>{
    try{
        const reservationRooms=await ReservationRoom.find({
            relations: {
                reservationRoomDays: true,
            },
        })
        return res.status(200).json(reservationRooms)
    }catch(error){
        if(error instanceof Error){
            return res.status(500).json({message:error.message})
        }
    }
}