"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitializePayment = void 0;
const paystackService_1 = require("../Services/paystackService");
const payment_model_1 = __importDefault(require("../Model/payment.model"));
const user_model_1 = __importDefault(require("../Model/user.model"));
class InitializePayment {
    constructor() {
        this.initPay = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.params; // Get userId from request params
                const reference = Math.random().toString(36).substring(2, 15); // Generate a reference
                const amount = 100000; // Fixed amount
                // Check if user exists
                const user = yield user_model_1.default.findById(userId);
                if (!user) {
                    res.status(404).json({ message: "User not found" });
                    return;
                }
                // Save payment in the database
                const newPayment = new payment_model_1.default({
                    userId: user._id,
                    userEmail: user.email,
                    amount,
                    reference,
                    status: "pending",
                });
                yield newPayment.save();
                // Call Paystack to process payment
                const paymentResponse = yield paystackService_1.paystackService.initializePayment(user.email, amount);
                yield user_model_1.default.findByIdAndUpdate(userId, { isSubscribed: true });
                res.status(200).json(paymentResponse);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
        this.verifyPay = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, reference } = req.params;
                // Check if user exists
                const user = yield user_model_1.default.findById(userId);
                if (!user) {
                    res.status(404).json({ message: "User not found" });
                    return;
                }
                if (!reference) {
                    res.status(400).json({ message: "Reference is required" });
                    return;
                }
                // Verify payment via Paystack
                const verificationResponse = yield paystackService_1.paystackService.verifyPayment(reference);
                // Update payment status in DB
                yield payment_model_1.default.findOneAndUpdate({ reference }, { status: verificationResponse.status });
                res.status(200).json(verificationResponse);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
}
exports.InitializePayment = InitializePayment;
