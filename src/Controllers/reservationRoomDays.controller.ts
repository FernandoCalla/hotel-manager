import { Request, Response } from "express"
import { ReservationRoomDays } from "../Entities/reservationRoomDays"
  

// export const getReservationRoomDaysByIdReservationRoom= async (req:Request,res:Response)=>{
//     try{
//         console.log("entre")
//         const {id}=req.params
//         const reservationRoomDays=await ReservationRoomDays.findBy({reservationRoom:id})
//         return res.status(200).json(reservationRoomDays)
//     }catch(error){
//         if(error instanceof Error){
//             return res.status(500).json({message:error.message})
//         }
//     }
// }
