import mongoose from "mongoose";
import User from "./User";
import Transaction from "./Transactions";


export async function create_topup_uc({ user_id, amount }: any) {
  if (!user_id || !amount) {
    throw new Error('user_id and amount are required')
  } else {
    const id = new mongoose.Types.ObjectId(user_id)
    const user = await User.findOneAndUpdate(
      { _id: id },
      { $inc: { balance: amount } },
      { new: true, runValidators: true }
    );

    if (!user) {
      throw new Error('User not found')
    }
    return user.balance
  }
}

export async function create_transaction_uc({ user_id, amount }: any) {
  if (!user_id || !amount) {
    throw new Error('user_id and amount are required')
  }
  else {
    const id = new mongoose.Types.ObjectId(user_id)
    const transaction = await Transaction.create({ user: id, transaction_amount: amount })
    return transaction._id
  }
}

export async function create_deduction_uc({ user_id, amount }: any) {
  if (!user_id || !amount) {
    throw new Error('user_id and amount are required')
  } else {
    const id = new mongoose.Types.ObjectId(user_id)
    const user = await User.findOneAndUpdate(
      { _id: id },
      { $inc: { balance: -amount } },
      { new: true, runValidators: true }
    );

    if (!user) {
      throw new Error('User not found')
    }
    return user.balance
  }
}

export async function get_balance_uc({ user_id }: any) {
  if (!user_id) {
    throw new Error('user_id is required')
  } else {
    const id = new mongoose.Types.ObjectId(user_id)
    const user = await User.findById(id)
    return user?.balance
  }
}
