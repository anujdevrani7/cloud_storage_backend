import { Router } from "express";
import { addNewUser, getUser } from "../../controllers/users.controller";
import validateRequest from "../../middlewares/validateRequest";
import { addUserSchema } from "../../schema/userSchema";
import isAuthentaticUser from "../../middlewares/isAuthentaticUser";
const router = Router();
router
    .post("/",isAuthentaticUser, validateRequest(addUserSchema), addNewUser)
    .get("/",isAuthentaticUser, getUser)



export default router