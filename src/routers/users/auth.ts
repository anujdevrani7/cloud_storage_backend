import { Router } from "express";
const router = Router();
import { login,signUp } from "../../controllers/users.controller";

router
    .post("/login",login)
    .post("/signup",signUp)

export default router