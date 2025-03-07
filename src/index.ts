import express, { Request, Response } from "express";
import dotenv from 'dotenv';
dotenv.config();
import mongoose from "mongoose";
import userRoute from "./Routes/user.route"
import adminRoute from "./Routes/admin.route"
import courseRoute from "./Routes/course.route"
import passport from "passport";
import session from 'express-session';

const app = express();
const PORT = process.env.PORT || 6000

//MIDDLEWARES
app.use(express.urlencoded({extended:true}));
app.use(express.json());


//ROUTES
app.use("/api/v1/user", userRoute)
app.use("/api/v1/admin", adminRoute)
app.use("/api/v1/course", courseRoute)




//DATABASE CONNECTION
mongoose.connect(process.env.MONGO_URL as string)
.then(()=>console.log("mongoDb connected"))
.catch((err)=>console.log("mongoDB connection error", err));

//PORT
app.listen(PORT, ()=>
    console.log(`server is successfully connected at http://localhost:${PORT}`));

