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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
class AuthController {
    // Callback after Google authentication
    static googleAuthCallback(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.redirect("/profile");
        });
    }
    // Get user profile
    static getProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.user;
            if (!user) {
                res.status(401).json({ message: "Unauthorized" });
                return;
            }
            res.send(`Welcome ${user.name}, you have successfully signed into the E-commerce app! Continue shopping now!!`);
        });
    }
    // Logout user
    static logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            req.logout(() => {
                res.redirect("/");
            });
        });
    }
}
exports.AuthController = AuthController;
exports.default = AuthController;
