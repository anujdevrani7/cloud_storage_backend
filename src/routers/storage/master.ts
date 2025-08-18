import { Router } from "express";
import { generateSignedUrl, getObject } from "../../controllers/storage.contorller";
import isAuthentaticUser from "../../middlewares/isAuthentaticUser";
import validateRequest from "../../middlewares/validateRequest";
import { generateSignedUrlSchema } from "../../schema/storagceSchema";
const router = Router();

router
    .get("/",isAuthentaticUser, getObject)
    .post("/",isAuthentaticUser,validateRequest(generateSignedUrlSchema),generateSignedUrl)

export default router;