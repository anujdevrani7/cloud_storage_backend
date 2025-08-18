import { createFolderType, fileFolderType } from './../schema/folderSchema';
import asyncHandler from "../middlewares/asyncHandler";
import Folder from '../modals/folder.modal';
import ApiResponse from '../middlewares/ApiResponse';
import ErrorHandler from '../middlewares/ErrorHandler';
import { Files } from '../modals/file.modal';

export const createFolder = asyncHandler(async (req, res, next) => {
    const { parentFolderId, folderName }: createFolderType = req.body;
    const { id } = req.user!; //this will always be there because this controller run before the isauth middleware


    // check the folder name should not be present in the same 
    const checkFolderExist = await Folder.findOne({ userId: id, folderName, parentFolder: parentFolderId })
    if (checkFolderExist) {
        return next(new ErrorHandler("folder already exist ", 400))
    }

    await Folder.create({
        folderName,
        parentFolder: parentFolderId,  //it can be nullable if it is so then it means user is creating folder in the root 
        userId: id
    })

    return res.status(200).json(new ApiResponse("folder created successfully"))
})


export const deleteFolder = asyncHandler(async (req, res, next) => {
    // the curr folder should be deleted also the inner files and the folders will also be deleted 

})
export const getFileFolder = asyncHandler(async (req, res, next) => {
    const { id: userId } = req.user!;
    const { folderId }: fileFolderType = req.body;

    const folderData = await Folder.find({ parentFolder: folderId, userId }, { folderName: 1, createdAt: 1, updatedAt: 1 })

    const fileData = await Files.find({ folderId })


    return res.status(200).json(new ApiResponse("file folder fetched ", { folderData, fileData }))


})