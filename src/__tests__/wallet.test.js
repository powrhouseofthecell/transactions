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
const supertest_1 = __importDefault(require("supertest"));
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("../app"));
describe('GET /balance', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        // const DB_URI = process.env.DB_URI_TESTING as string
        const DB_URI = "mongodb+srv://zuhaib:zuhaibnazir@cluster0.dtssipk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
        yield mongoose_1.default.connect(DB_URI);
    }));
    it('featch the users total balance', () => __awaiter(void 0, void 0, void 0, function* () {
        const balance = yield (0, supertest_1.default)(app_1.default)
            .get('/api/v1/wallet/balance/66866b644182605dfde6f5a4');
        expect(balance.status).toEqual(200);
        expect(balance.body).toHaveProperty('balance');
    }));
    it('should pass if the new_balance equals balance', () => __awaiter(void 0, void 0, void 0, function* () {
        const topup_res = yield (0, supertest_1.default)(app_1.default)
            .post('/api/v1/wallet/topup')
            .send({
            user_id: '66866b644182605dfde6f5a4',
            amount: 200
        });
        const balance = yield (0, supertest_1.default)(app_1.default)
            .get('/api/v1/wallet/balance/66866b644182605dfde6f5a4');
        expect(topup_res.status).toEqual(201);
        expect(topup_res.body.new_balance).toEqual(balance.body.balance);
    }));
    it('should pass if the new_balance equals balance', () => __awaiter(void 0, void 0, void 0, function* () {
        const deduct_res = yield (0, supertest_1.default)(app_1.default)
            .post('/api/v1/wallet/deduct')
            .send({
            user_id: '66866b644182605dfde6f5a4',
            amount: 200
        });
        const balance = yield (0, supertest_1.default)(app_1.default)
            .get('/api/v1/wallet/balance/66866b644182605dfde6f5a4');
        console.log(balance.body.balance);
        console.log(deduct_res.body);
        expect(deduct_res.status).toEqual(200);
        expect(deduct_res.body.new_balance).toEqual(balance.body.balance);
    }));
});
