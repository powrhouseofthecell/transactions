"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: 'config.env' });
require("./db/init");
// import User from './db/User';
const router_1 = __importDefault(require("./routes/router"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Temp middleware for creating users
//
// app.use('/u', async (req, res, next) => {
//   await User.create({ user_name: 'Zuhaib' })
// })
app.use('/api/v1', router_1.default);
// Global erorr handler
app.use((err, _req, res, _next) => {
    res.status(400).send({ error: true, message: err.message });
});
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
exports.default = app;
