import { Request, Response } from "express"
// import { Notes } from "../Entities/notes"
import { Client } from "../Entities/client"

export const createClient= async (req:Request,res:Response)=>{
    try{
        const {firstname,lastname,email,phonenumber,identityNumber}=req.body
        const client=new Client()
        client.firstname=firstname
        client.lastname=lastname
        client.email=email
        client.phonenumber=phonenumber
        client.identityNumber=identityNumber
        await client.save()
        return res.status(201).json(client)
    }catch(error){
        if(error instanceof Error){
            return res.status(500).json({message:error.message})
        }
    }
}
export const getClients= async (req:Request,res:Response)=>{
    try{
        const clientes=await Client.find()
        return res.status(200).json(clientes)
    }catch(error){
        if(error instanceof Error){
            return res.status(500).json({message:error.message})
        }
    }
}
export const getClientById= async (req:Request,res:Response)=>{
    try{
        const {id}=req.params
        // const {title,content}=req.body
        const cliente=await Client.findOneBy({id:parseInt(id)})
        if(!cliente)return res.status(404).json({message:"Client not exists"})
        return res.status(200).json(cliente)
    }catch(error){
        if(error instanceof Error){
            return res.status(500).json({message:error.message})
        }
    }
}
export const getClientByIdentytyNumber= async (req:Request,res:Response)=>{
    try{
        const {identityNumber}=req.params
        // const {title,content}=req.body
        const cliente=await Client.findOneBy({identityNumber:parseInt(identityNumber)})
        if(!cliente)return res.status(404).json({message:"Client not exists"})
        return res.status(200).json(cliente)
    }catch(error){
        if(error instanceof Error){
            return res.status(500).json({message:error.message})
        }
    }
}

export const updateClient= async (req:Request,res:Response)=>{
    try{
        const {id}=req.params
        // const {title,content}=req.body
        const cliente=await Client.findOneBy({id:parseInt(id)})
        if(!cliente)return res.status(404).json({message:"Client not exists"})
        await Client.update({id:parseInt(id)},{...req.body})
        return res.status(200).json({message:"Client updated"})
    }catch(error){
        if(error instanceof Error){
            return res.status(500).json({message:error.message})
        }
    }
}
export const deleteClient= async (req:Request,res:Response)=>{
    try{
        const {id}=req.params
        const note=await Client.findOneBy({id:parseInt(id)})
        if(!note)return res.status(404).json({message:"Client not found"})
        const deleted=await Client.delete({id:parseInt(id)})
        if(deleted.affected===0)return res.status(404).json({message:"Note not found"})
        return res.status(200).json({message:"Client deleted"})
    }catch(error){
        if(error instanceof Error){
            return res.status(500).json({message:error.message})
        }
    }
}
// export const updateArchivedState = async (req:Request,res:Response)=>{
//     try{
//         const {id}=req.params
//         const {archived}=req.body
//         const note=await Notes.findOneBy({id:parseInt(id)})
//         if(!note)return res.status(404).json({message:"Note does not exists"})
//         await Notes.update({id:parseInt(id)},{archived})
//         return res.status(200).json({message:"Note updated"})
//     }catch(error){
//         if(error instanceof Error){
//             return res.status(500).json({message:error.message})
//         }
//     }
// }
