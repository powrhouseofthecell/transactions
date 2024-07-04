"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const wallet_controller_1 = __importDefault(require("../controller/wallet_controller"));
const router = (0, express_1.Router)();
router.post('/topup', wallet_controller_1.default.topup);
router.post('/deduct', wallet_controller_1.default.deduct);
router.get('/balance/:user_id', wallet_controller_1.default.get_balance);
exports.default = router;
