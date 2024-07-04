import { Router } from "express";
const router = Router()

import wallet_router from './wallet_router'

router.use('/wallet', wallet_router)

export default router
