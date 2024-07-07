import { Request, Response } from 'express'
import { create_deduction_uc, create_topup_uc, create_transaction_uc, get_balance_uc } from '../db'

async function topup(req: Request, res: Response) {
  try {
    const { user_id, amount } = req.body
    const new_balance = await create_topup_uc({ user_id, amount })
    const transaction_id = await create_transaction_uc({ user_id, amount })
    res.status(201).json({
      status: true,
      new_balance,
      transaction_id
    })
  } catch (error: any) {
    throw new Error(error)
  }
}

async function deduct(req: Request, res: Response) {
  try {
    const { user_id, amount } = req.body
    const new_balance = await create_deduction_uc({ user_id, amount })
    const transaction_id = await create_transaction_uc({ user_id, amount: amount - (2 * amount) })
    res.status(200).json({
      status: true,
      new_balance,
      transaction_id
    })
  } catch (error: any) {
    throw new Error(error)
  }
}

async function get_balance(req: Request, res: Response) {
  try {
    const { user_id } = req.params
    const balance = await get_balance_uc({ user_id })
    res.status(200).json({
      balance
    })
  } catch (error: any) {
    throw new Error(error)
  }
}

const wallet_controller = {
  topup, deduct, get_balance
}

export default wallet_controller
