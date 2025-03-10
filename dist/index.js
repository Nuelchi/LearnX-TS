"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const passport_1 = __importDefault(require("passport"));
// Ensure passport strategy is loaded before using it
const express_session_1 = __importDefault(require("express-session"));
const cors_1 = __importDefault(require("cors"));
require("./Services/googleAuth.service");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8000;
//ROUTE IMPORTS
const mongoose_1 = __importDefault(require("mongoose"));
const user_route_1 = __importDefault(require("./Routes/user.route"));
const admin_route_1 = __importDefault(require("./Routes/admin.route"));
const course_route_1 = __importDefault(require("./Routes/course.route"));
const paystack_route_1 = __importDefault(require("./Routes/paystack.route"));
//MIDDLEWARES
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, express_session_1.default)({
    secret: 'my-session-secret',
    resave: false,
    saveUninitialized: true,
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
//ROUTES
app.use("/api/v1/user", user_route_1.default);
app.use("/api/v1/admin", admin_route_1.default);
app.use("/api/v1/course", course_route_1.default);
app.use("/api/v1/payment", paystack_route_1.default);
app.get('/auth/google', passport_1.default.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/auth/google/callback', passport_1.default.authenticate('google', {
    failureRedirect: '/',
}), (req, res) => {
    res.redirect('/profile'); // Redirect to user profile after login
});
//profile route
app.get('/profile', (req, res) => {
    const user = req.user;
    res.send(`welcome ${user.name} you have successfully signed into E-commerce app, you may continue your shopping now!!`);
});
//logout route
app.get("/logout", (req, res) => {
    req.logout(() => {
        res.redirect("/");
    });
});
//DATABASE CONNECTION
mongoose_1.default.connect(process.env.MONGO_URL)
    .then(() => console.log("mongoDb connected"))
    .catch((err) => console.log("mongoDB connection error", err));
//PORT
app.listen(PORT, () => console.log(`server is successfully connected at http://localhost:${PORT}`));
