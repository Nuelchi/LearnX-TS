import express from "express";
import { InitializePayment } from "../Controllers/paystack.controller";
import { subAuth  } from "../Authorization/auth.middleware";

const { initPay, verifyPayment }= new InitializePayment
const router = express.Router();

// Initialize Payment (User must be authenticated)
// router.post("/pay" , initPay);

// // Verify Payment
// router.get("/verify/:reference", verifyPayment);

export default router;