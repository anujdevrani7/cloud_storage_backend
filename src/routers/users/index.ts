import masterRouter from "./master"
import authRouter from "./auth"
import { Router } from "express"
const router = Router();


router.use(masterRouter)
router.use(authRouter)


export default router