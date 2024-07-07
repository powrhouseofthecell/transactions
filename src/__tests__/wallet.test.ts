import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app';

describe('GET /balance', () => {
  beforeAll(async () => {
    const DB_URI = process.env.DB_URI_TESTING as string
    await mongoose.connect(DB_URI);
  });

  it('featch the users total balance', async () => {
    const balance = await request(app)
      .get('/api/v1/wallet/balance/66866b644182605dfde6f5a4')

    expect(balance.status).toEqual(200)
    expect(balance.body).toHaveProperty('balance')
  });


  it('should pass if the new_balance equals balance', async () => {

    const topup_res = await request(app)
      .post('/api/v1/wallet/topup')
      .send({
        user_id: '66866b644182605dfde6f5a4',
        amount: 200
      })
    const balance = await request(app)
      .get('/api/v1/wallet/balance/66866b644182605dfde6f5a4')

    expect(topup_res.status).toEqual(201)
    expect(topup_res.body.new_balance).toEqual(balance.body.balance)
  });


  it('should pass if the new_balance equals balance', async () => {

    const deduct_res = await request(app)
      .post('/api/v1/wallet/deduct')
      .send({
        user_id: '66866b644182605dfde6f5a4',
        amount: 200
      })
    const balance = await request(app)
      .get('/api/v1/wallet/balance/66866b644182605dfde6f5a4')

    console.log(balance.body.balance)
    console.log(deduct_res.body)

    expect(deduct_res.status).toEqual(200)
    expect(deduct_res.body.new_balance).toEqual(balance.body.balance)
  });

});
