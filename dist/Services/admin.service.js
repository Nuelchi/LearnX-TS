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
exports.adminService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const admin_model_1 = __importDefault(require("../Model/admin.model"));
const user_model_1 = __importDefault(require("../Model/user.model"));
class adminService {
    signUp(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedPassword = yield bcrypt_1.default.hash(data.password, 10);
            const existingUser = yield admin_model_1.default.findOne({ email: data.email });
            if (existingUser) {
                throw new Error("user alredy exists");
            }
            const newUser = new admin_model_1.default({ email: data.email, password: hashedPassword });
            return yield newUser.save();
        });
    }
    ;
    signIn(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const Newuser = yield admin_model_1.default.findOne({ email: data.email });
            if (!Newuser || !(yield bcrypt_1.default.compare(data.password, Newuser.password))) {
                throw new Error('Invalid credentials');
            }
        });
    }
    ;
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield user_model_1.default.find().select('-password');
                return users;
            }
            catch (error) {
                throw new Error(`Failed to fetch users: ${error.message}`);
            }
        });
    }
    ;
    updateUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_model_1.default.findOneAndUpdate({ email: user.email }, user, { new: true });
        });
    }
}
exports.adminService = adminService;
;
