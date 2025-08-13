import { Router } from "express";
import { getObject } from "../../controllers/storage.contorller";
import isAuthentaticUser from "../../middlewares/isAuthentaticUser";
const router = Router();

router
    .get("/",isAuthentaticUser, getObject)

export default router;