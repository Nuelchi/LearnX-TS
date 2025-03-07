import { Router } from "express";
import passport from "passport";
import {AuthController} from "../Controllers/googleAuth.controller";


const router = Router();

// Google Authentication Route
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Google Callback Route
router.get("/google/callback", passport.authenticate("google", { failureRedirect: "/" }), AuthController.googleAuthCallback);

// Profile Route
router.get("/profile", AuthController.getProfile);

// Logout Route
router.get("/logout", AuthController.logout);

export default router;