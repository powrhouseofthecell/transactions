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
const db_1 = require("../db");
function topup(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { user_id, amount } = req.body;
        const new_balance = yield (0, db_1.create_topup_uc)({ user_id, amount });
        const transaction_id = yield (0, db_1.create_transaction_uc)({ user_id, amount });
        try {
            res.status(201).json({
                status: true,
                new_balance,
                transaction_id
            });
        }
        catch (error) {
            throw new Error(error);
        }
    });
}
function deduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { user_id, amount } = req.body;
        const new_balance = yield (0, db_1.create_deduction_uc)({ user_id, amount });
        const transaction_id = yield (0, db_1.create_transaction_uc)({ user_id, amount: amount - (2 * amount) });
        try {
            res.status(200).json({
                status: true,
                new_balance,
                transaction_id
            });
        }
        catch (error) {
            throw new Error(error);
        }
    });
}
function get_balance(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { user_id } = req.params;
        const balance = yield (0, db_1.get_balance_uc)({ user_id });
        try {
            res.status(200).json({
                balance
            });
        }
        catch (error) {
            throw new Error(error);
        }
    });
}
const wallet_controller = {
    topup, deduct, get_balance
};
exports.default = wallet_controller;
