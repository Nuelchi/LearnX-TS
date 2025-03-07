import { Request, Response } from "express";
import { paystackService } from "../Services/paystackService";
import Payment from "../Model/payment.model";
import User from "../Model/user.model";

// Initialize Payment
export class InitializePayment {
initPay = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        const userId = (req.user as any)._id;
        const name = (req.user as any).name;
        const userEmail = (req.user as any).email;
        const amount = 5000.00; // Subscription fee (convert to kobo)

        const payment = await paystackService.initializePayment(userEmail, amount);

        if (!payment || !payment.data) {
            return res.status(400).json({ error: "Payment initialization failed" });
        }

        // Save transaction as 'pending'
        const newPayment = new Payment({
            userId,
            name,
            userEmail,
            amount: 5000,
            reference: payment.data.reference,
            status: "pending",
        });

        await newPayment.save();

        return res.json({ authorization_url: payment.data.authorization_url });
    } catch (error: any) {
        console.error("Payment Error:", error);
        if (!res.headersSent) {
            return res.status(500).json({ error: "Payment initialization failed" });
        }
    }
};

// Verify Payment
verifyPayment = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        const { reference } = req.params;

        const payment = await paystackService.verifyPayment(reference);

        // Find payment in database
        const savedPayment = await Payment.findOne({ reference });
        if (!savedPayment) {
            return res.status(404).json({ message: "Transaction not found" });
        }

        if (payment.data.status === "success") {
            savedPayment.status = "success";

            // ✅ Mark user as subscribed
            await User.findByIdAndUpdate(savedPayment.userId, { isSubscribed: true });
        } else {
            savedPayment.status = "failed";
        }

        await savedPayment.save();

        return res.json({ message: "Payment verified successfully", payment: savedPayment });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}};