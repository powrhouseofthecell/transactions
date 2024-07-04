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
exports.get_balance_uc = exports.create_deduction_uc = exports.create_transaction_uc = exports.create_topup_uc = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = __importDefault(require("./User"));
const Transactions_1 = __importDefault(require("./Transactions"));
function create_topup_uc(_a) {
    return __awaiter(this, arguments, void 0, function* ({ user_id, amount }) {
        if (!user_id || !amount) {
            throw new Error('user_id and amount are required');
        }
        else {
            const id = new mongoose_1.default.Types.ObjectId(user_id);
            const user = yield User_1.default.findOneAndUpdate({ _id: id }, { $inc: { balance: amount } }, { new: true, runValidators: true });
            if (!user) {
                throw new Error('User not found');
            }
            return user.balance;
        }
    });
}
exports.create_topup_uc = create_topup_uc;
function create_transaction_uc(_a) {
    return __awaiter(this, arguments, void 0, function* ({ user_id, amount }) {
        if (!user_id || !amount) {
            throw new Error('user_id and amount are required');
        }
        else {
            const id = new mongoose_1.default.Types.ObjectId(user_id);
            const transaction = yield Transactions_1.default.create({ user: id, transaction_amount: amount });
            return transaction._id;
        }
    });
}
exports.create_transaction_uc = create_transaction_uc;
function create_deduction_uc(_a) {
    return __awaiter(this, arguments, void 0, function* ({ user_id, amount }) {
        if (!user_id || amount) {
            throw new Error('user_id and amount are required');
        }
        else {
            const id = new mongoose_1.default.Types.ObjectId(user_id);
            const user = yield User_1.default.findOneAndUpdate({ _id: id }, { $inc: { balance: -amount } }, { new: true, runValidators: true });
            if (!user) {
                throw new Error('User not found');
            }
            return user.balance;
        }
    });
}
exports.create_deduction_uc = create_deduction_uc;
function get_balance_uc(_a) {
    return __awaiter(this, arguments, void 0, function* ({ user_id }) {
        if (!user_id) {
            throw new Error('user_id is required');
        }
        else {
            const id = new mongoose_1.default.Types.ObjectId(user_id);
            const user = yield User_1.default.findById(id);
            return user === null || user === void 0 ? void 0 : user.balance;
        }
    });
}
exports.get_balance_uc = get_balance_uc;
