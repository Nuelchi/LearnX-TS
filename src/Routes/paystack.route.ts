import express from "express";
import { InitializePayment } from "../Controllers/paystack.controller";
// import { subAuth } from "../Authorization/auth.middleware";

const paymentController = new InitializePayment(); // ✅ Correctly instantiate the class
const router = express.Router();

// Initialize Payment (User must be authenticated)
// router.post("/pay", paymentController.initPay.bind(paymentController));

// // Verify Payment
// router.get("/verify/:reference", paymentController.verifyPayment.bind(paymentController));

export default router;