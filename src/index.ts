import express, { Request, Response } from "express";
import dotenv from 'dotenv';
dotenv.config();
import passport from "passport";
import "./Config/passport";
import session from 'express-session';
import cors from "cors";

//ROUTE IMPORTS
import mongoose from "mongoose";
import userRoute from "./Routes/user.route"
import adminRoute from "./Routes/admin.route"
import courseRoute from "./Routes/course.route"
import authRoutes from "./Routes/googleAuth.route"
import paymentRoute from "./Routes/paystack.route";

const app = express();
const PORT = process.env.PORT || 6000

//MIDDLEWARES
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());
app.use(session ({
    secret: 'my-session-secret',
    resave: false,
    saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());


//ROUTES
app.use("/api/v1/user", userRoute)
app.use("/api/v1/admin", adminRoute)
app.use("/api/v1/course", courseRoute)
app.use("/auth", authRoutes)
app.use("/api/payments", paymentRoute)




//DATABASE CONNECTION
mongoose.connect(process.env.MONGO_URL as string)
.then(()=>console.log("mongoDb connected"))
.catch((err)=>console.log("mongoDB connection error", err));

//PORT
app.listen(PORT, ()=>
    console.log(`server is successfully connected at http://localhost:${PORT}`));

