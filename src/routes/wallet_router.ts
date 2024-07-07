import { Router } from "express";
import wallet_controller from '../controller/wallet_controller'

const router = Router()

router.post('/topup', wallet_controller.topup)
router.post('/deduct', wallet_controller.deduct)
router.get('/balance/:user_id', wallet_controller.get_balance)

export default router
