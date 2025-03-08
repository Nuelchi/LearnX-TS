"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const googleAuth_controller_1 = require("../Controllers/googleAuth.controller");
const router = (0, express_1.Router)();
// Google Authentication Route
router.get("/google", passport_1.default.authenticate("google", { scope: ["profile", "email"] }));
// Google Callback Route
router.get("/google/callback", passport_1.default.authenticate("google", { failureRedirect: "/" }), googleAuth_controller_1.AuthController.googleAuthCallback);
// Profile Route
router.get("/profile", googleAuth_controller_1.AuthController.getProfile);
// Logout Route
router.get("/logout", googleAuth_controller_1.AuthController.logout);
exports.default = router;
