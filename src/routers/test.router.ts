import { Router } from "express";
import { testing } from "../controllers/test.controller";
const router=Router();

router.get("/",testing)

export default router