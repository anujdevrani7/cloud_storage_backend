import { Router } from "express";
import isAuthentaticUser from "../../middlewares/isAuthentaticUser";
import { createFolder, getDashboardData, getFileFolder } from "../../controllers/folder.controller";
import validateRequest from "../../middlewares/validateRequest";
import { fileFolderSchema } from "../../schema/folderSchema";
const router = Router();

router
    .post("/",isAuthentaticUser,createFolder)
    .get("/",isAuthentaticUser,validateRequest(fileFolderSchema),getFileFolder)
    .get("/dash",isAuthentaticUser,getDashboardData)
    
export default router;