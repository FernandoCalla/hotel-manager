import { Router } from "express";
import { createPaymentMethod, deletePaymentMethod, getPaymentMethodByActiveStatus, getPaymentMethodById, getPaymentMethods, updatePaymentMethod } from "../Controllers/paymentMethod.controller";

const paymentMethodRouter = Router()

paymentMethodRouter.get("/payment-methods",getPaymentMethods)
paymentMethodRouter.get("/payment-methods/active",getPaymentMethodByActiveStatus)
paymentMethodRouter.get("/payment-method/:id",getPaymentMethodById)
paymentMethodRouter.post("/payment-method",createPaymentMethod)
paymentMethodRouter.put("/payment-method/:id",updatePaymentMethod)
paymentMethodRouter.delete("/payment-method/:id",deletePaymentMethod)

export default paymentMethodRouter