import { Router } from "express";
import isAuthentaticUser from "../../middlewares/isAuthentaticUser";
import { createFolder, getFileFolder } from "../../controllers/folder.controller";
import validateRequest from "../../middlewares/validateRequest";
import { fileFolderSchema } from "../../schema/folderSchema";
const router = Router();

router
    .post("/",isAuthentaticUser,createFolder)
    .get("/",isAuthentaticUser,validateRequest(fileFolderSchema),getFileFolder)
    
export default router;