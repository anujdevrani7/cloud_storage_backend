import masterRouter from "./master"
import { Router } from "express"
const router = Router();

router.use(masterRouter)


export default router;