import { Request, Response } from "express"
import { Client } from "../Entities/client"
import { Invoice } from "../Entities/invoice"
import { PaymentMethod } from "../Entities/paymentMethod"
import { Reservation } from "../Entities/reservation"
import { ReservationRoom } from "../Entities/reservationRoom"
import { ReservationRoomDays } from "../Entities/reservationRoomDays"
import { Room } from "../Entities/room"
import { calcularListadoDeDias, calcularNumeroNoches, calcularPrecioParcial } from "../Utils/functions"

  
//Proceso para crear una reserva completa , para este proceso se necesita mandar todos los pasos recolectados.
export const createReservaCompleta= async (req:Request,res:Response)=>{
    try{
        const {client,paymentMethod,listRoomsReservations=[]}=req.body
        //Proceso de validacion para ver si el cliente existe y recuperar sus datos
        const cliente=await Client.findOneBy({id:parseInt(client)})
        if(!cliente)return res.status(404).json({message:"Client not exists"})
        //Proceso de validacion para ver si el metodo de pago existe y recuperar sus datos
        const paymentMethodSearch=await PaymentMethod.findOneBy({id:parseInt(paymentMethod)})
        if(!paymentMethod)return res.status(404).json({message:"Payment method not exists"})
        //Generacion de la reserva
        const reservation=new Reservation()
        reservation.client= cliente as Client
        reservation.paymentMethod= paymentMethodSearch as PaymentMethod
        await reservation.save()
        let montoUpdated:number=0
        // await listRoomsReservations.forEach(async(habitacion:any) => 
        for (let i=0;i<listRoomsReservations.length;i++){
            const {checkIn,checkOut,room}=listRoomsReservations[i];
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
            reservationRoom.reservation= reservation as Reservation
            reservationRoom.room= roomDetails as Room
            reservationRoom.numberOfNights= numberOfNights
            reservationRoom.partialPrice= partialPrice
            await reservationRoom.save()
            //Calcular el monto de la reserva actual mas el nuevo monto
            montoUpdated=montoUpdated+reservationRoom.partialPrice
             //Actualizar el monto de la reserva
            await Reservation.update({id:reservation.id},{totalPrice:montoUpdated})  
            
            //Creacion de reservas detalladas por dia
            const listadoDias=calcularListadoDeDias(checkIn,checkOut,numberOfNights,roomDetails!==null?roomDetails.roomPrice:0)
            // listadoDias.forEach(async (diaDetalle)=>{
            for (let j=0 ; j<listadoDias.length;j++){
                let diaDetalle=listadoDias[j]
                const reservationRoomDay=new ReservationRoomDays()
                reservationRoomDay.day=diaDetalle.dia
                reservationRoomDay.partialPriceDay=diaDetalle.precio
                reservationRoomDay.reservationRoom=reservationRoom
                await reservationRoomDay.save()
            }
        };    
       
        const reservationFinal=await Reservation.find({relations: {
            client: true,
            paymentMethod:true,
            reservations:{
                reservationRoomDays: true,
            },
            invoice:true                
        },where:{id:reservation.id}})
        return res.status(200).json(reservationFinal[0])
    }catch(error){
        if(error instanceof Error){
            return res.status(500).json({message:error.message})
        }
    }
}
//Proceso para eliminar una reserva , en este caso solo se coloca el estado en 2
export const deleteReservation= async (req:Request,res:Response)=>{
    try{
        const {id}=req.params
        const reserva=await Reservation.findOneBy({id:parseInt(id)})
        if(!reserva)return res.status(404).json({message:"Reservation not exists"})
        await Reservation.update({id:parseInt(id)},{state:2})
        const reservationFinal=await Reservation.find({relations: {
            client: true,           
        },where:{id:parseInt(id)}})
        return res.status(200).json({message:"Reservation deleted",reserva:reservationFinal})
    }catch(error){
        if(error instanceof Error){
            return res.status(500).json({message:error.message})
        }
    }
}
//Proceso para pagar una reserva
export const payReservation= async (req:Request,res:Response)=>{
    try{
        const {id}=req.params
        const reserva=await Reservation.findOneBy({id:parseInt(id)})
        if(!reserva)return res.status(404).json({message:"Reservation not exists"})
        const invoice=new Invoice()
        invoice.totalPrice=reserva.totalPrice
        invoice.reservation=reserva
        await invoice.save()
        await Reservation.update({id:parseInt(id)},{state:1})
        const reservationFinal=await Reservation.find({relations: {
            client: true,
            paymentMethod:true,
            invoice:true                
        },where:{id:parseInt(id)}})
        return res.status(200).json({message:"Reservation paid correctly",reservation:reservationFinal[0]})
    }catch(error){
        if(error instanceof Error){
            return res.status(500).json({message:error.message})
        }
    }
}
