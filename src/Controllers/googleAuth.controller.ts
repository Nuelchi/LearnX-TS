import { Request, Response } from "express";
import {Iuser} from "../Interface/user.interface";

export class AuthController {
    // Callback after Google authentication
    static async googleAuthCallback(req: Request, res: Response): Promise<void> {
        res.redirect("/profile");
    }

    // Get user profile
    static async getProfile(req: Request, res: Response): Promise<void> {
        const user = req.user as Iuser;
        if (!user) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        res.send(`Welcome ${user.name}, you have successfully signed into the E-commerce app! Continue shopping now!!`);
    }

    // Logout user
    static async logout(req: Request, res: Response): Promise<void> {
        req.logout(() => {
            res.redirect("/");
        });
    }
}

export default AuthController;