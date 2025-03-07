import { Request, Response, NextFunction } from "express";
import User from "../Model/user.model";

interface AuthenticatedRequest extends Request {
  user?: { _id: string };
}

export const subAuth = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const user = await User.findById(req.user._id);
        if (!user || (!user.isSubscribed && user.role !== "admin")) {
            return res.status(403).json({ message: "Access denied. Subscription required." });
        }
        
        next();
    } catch (error: any) {
        res.status(500).json({ error: "Server error" });
    }
};