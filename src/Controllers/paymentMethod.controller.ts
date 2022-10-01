import { Request, Response } from "express"
import { PaymentMethod } from "../Entities/paymentMethod"

export const createPaymentMethod= async (req:Request,res:Response)=>{
    try{
        const {denomination}=req.body
        const paymentMethod=new PaymentMethod()
        paymentMethod.denomination=denomination
        await paymentMethod.save()
        return res.status(201).json(paymentMethod)
    }catch(error){
        if(error instanceof Error){
            return res.status(500).json({message:error.message})
        }
    }
}
export const getPaymentMethods= async (req:Request,res:Response)=>{
    try{
        const paymentMethod=await PaymentMethod.find()
        return res.status(200).json(paymentMethod)
    }catch(error){
        if(error instanceof Error){
            return res.status(500).json({message:error.message})
        }
    }
}
export const getPaymentMethodById= async (req:Request,res:Response)=>{
    try{
        const {id}=req.params
        const paymentMethod=await PaymentMethod.findOneBy({id:parseInt(id)})
        if(!paymentMethod)return res.status(404).json({message:"Payment method not exists"})
        return res.status(200).json(paymentMethod)
    }catch(error){
        if(error instanceof Error){
            return res.status(500).json({message:error.message})
        }
    }
}
export const getPaymentMethodByActiveStatus= async (req:Request,res:Response)=>{
    try{
        const paymentMethod=await PaymentMethod.findBy({paymentMethodStatus:true})
        if(!paymentMethod)return res.status(404).json({message:"Payment methods not exists"})
        return res.status(200).json(paymentMethod)
    }catch(error){
        if(error instanceof Error){
            return res.status(500).json({message:error.message})
        }
    }
}

export const updatePaymentMethod= async (req:Request,res:Response)=>{
    try{
        const {id}=req.params
        const paymentMethod=await PaymentMethod.findOneBy({id:parseInt(id)})
        if(!paymentMethod)return res.status(404).json({message:"Payment method not exists"})
        await PaymentMethod.update({id:parseInt(id)},{...req.body})
        return res.status(200).json({message:"Payment method updated"})
    }catch(error){
        if(error instanceof Error){
            return res.status(500).json({message:error.message})
        }
    }
}
export const deletePaymentMethod= async (req:Request,res:Response)=>{
    try{
        const {id}=req.params
        const paymentMethod=await PaymentMethod.findOneBy({id:parseInt(id)})
        if(!paymentMethod)return res.status(404).json({message:"Payment method not found"})
        const deleted=await PaymentMethod.delete({id:parseInt(id)})
        if(deleted.affected===0)return res.status(404).json({message:"Payment method not found"})
        return res.status(200).json({message:"Payment method deleted"})
    }catch(error){
        if(error instanceof Error){
            return res.status(500).json({message:error.message})
        }
    }
}
