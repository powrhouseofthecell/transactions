import mongoose, { Schema, model } from 'mongoose'

const Transaction_Schema = new Schema({
  user: {
    type: mongoose.Types.ObjectId,
    required: [true, 'transaction must have a user associated with it']
  },
  transaction_amount: {
    type: Number,
    required: [true, 'transaction must have an amount associated with it']
  }
}, { timestamps: true })

const Transaction = model('transaction', Transaction_Schema)

export default Transaction
