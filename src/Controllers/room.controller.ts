import { Request, Response } from "express"
import { Room } from "../Entities/room"

export const createRoom= async (req:Request,res:Response)=>{
    try{
        const {roomNumber,roomPrice,roomFloor,bedsNumber}=req.body
        const room=new Room()
        room.roomPrice=roomPrice
        room.roomNumber=roomNumber
        room.roomFloor=roomFloor
        room.bedsNumber=bedsNumber
        await room.save()
        return res.status(201).json(room)
    }catch(error){
        if(error instanceof Error){
            return res.status(500).json({message:error.message})
        }
    }
}
export const getRooms= async (req:Request,res:Response)=>{
    try{
        const rooms=await Room.find()
        return res.status(200).json(rooms)
    }catch(error){
        if(error instanceof Error){
            return res.status(500).json({message:error.message})
        }
    }
}
export const getRoomById= async (req:Request,res:Response)=>{
    try{
        const {id}=req.params
        const room=await Room.findOneBy({id:parseInt(id)})
        if(!room)return res.status(404).json({message:"Room not exists"})
        return res.status(200).json(room)
    }catch(error){
        if(error instanceof Error){
            return res.status(500).json({message:error.message})
        }
    }
}
export const getRoomByActiveStatus= async (req:Request,res:Response)=>{
    try{
        const room=await Room.findBy({state:true})
        if(!room)return res.status(404).json({message:"Rooms not exists"})
        return res.status(200).json(room)
    }catch(error){
        if(error instanceof Error){
            return res.status(500).json({message:error.message})
        }
    }
}

export const updateRoom= async (req:Request,res:Response)=>{
    try{
        const {id}=req.params
        const room=await Room.findOneBy({id:parseInt(id)})
        if(!room)return res.status(404).json({message:"Room not exists"})
        await Room.update({id:parseInt(id)},{...req.body})
        return res.status(200).json({message:"Room updated"})
    }catch(error){
        if(error instanceof Error){
            return res.status(500).json({message:error.message})
        }
    }
}
export const deleteRoom= async (req:Request,res:Response)=>{
    try{
        const {id}=req.params
        const room=await Room.findOneBy({id:parseInt(id)})
        if(!room)return res.status(404).json({message:"Room not found"})
        const deleted=await Room.delete({id:parseInt(id)})
        if(deleted.affected===0)return res.status(404).json({message:"Room not found"})
        return res.status(200).json({message:"Room deleted"})
    }catch(error){
        if(error instanceof Error){
            return res.status(500).json({message:error.message})
        }
    }
}
