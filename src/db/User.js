"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const User_Schema = new mongoose_1.Schema({
    user_name: {
        type: String,
        require: [true, 'user_name is required']
    },
    balance: {
        type: Number
    }
}, { timestamps: true });
const User = (0, mongoose_1.model)('user', User_Schema);
exports.default = User;
