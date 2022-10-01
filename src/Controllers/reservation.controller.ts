import { Request, Response } from "express"
import { Client } from "../Entities/client"
import { PaymentMethod } from "../Entities/paymentMethod"
import { Reservation } from "../Entities/reservation"

export const createReservation= async (req:Request,res:Response)=>{
    try{
        const {client,paymentMethod}=req.body
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
        return res.status(201).json(reservation)
    }catch(error){
        if(error instanceof Error){
            return res.status(500).json({message:error.message})
        }
    }
}
export const getReservations= async (req:Request,res:Response)=>{
    try{
        const reservations=await Reservation.find({
            relations: {
                client: true,
                paymentMethod:true,
                reservations:{
                    reservationRoomDays: true,
                },
                invoice:true                
            },
        })
        return res.status(200).json(reservations)
    }catch(error){
        if(error instanceof Error){
            return res.status(500).json({message:error.message})
        }
    }
}
export const getReservationById= async (req:Request,res:Response)=>{
    try{
        const {id}=req.params
        const reservation=await Reservation.find({relations: {
            client: true,
            paymentMethod:true,
            reservations:{
                reservationRoomDays: true,
            },
            invoice:true                
        },where:{id:parseInt(id)}})
        if(reservation.length===0)return res.status(404).json({message:"Reservation not exists"})
        return res.status(200).json(reservation[0])
    }catch(error){
        if(error instanceof Error){
            return res.status(500).json({message:error.message})
        }
    }
}
export const getReservationByDNIClient= async (req:Request,res:Response)=>{
    try{
        const {dni}=req.params
        const client=await Client.find({relations: {
                 reservations:{
                    client: true,
                    paymentMethod:true,
                    reservations:{
                        reservationRoomDays: true,
                    },
                    invoice:true     
                }      
        },where:{identityNumber:parseInt(dni)}})
        if(client.length===0)return res.status(404).json({message:"Reservation not exists"})
        return res.status(200).json(client[0])
    }catch(error){
        if(error instanceof Error){
            return res.status(500).json({message:error.message})
        }
    }
}

