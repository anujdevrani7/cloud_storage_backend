
import asyncHandler from "../middlewares/asyncHandler";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { ListObjectsV2Command, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from 'uuid';
import s3Client from "../s3Config";
import ApiResponse from "../middlewares/ApiResponse";
import Constants from "../constants/constants";
import { generateSignedUrlSchemaType } from "../schema/storagceSchema";
import { Files, fileTypes } from "../modals/file.modal";
import ErrorHandler from "../middlewares/ErrorHandler";
import { mapMimeTypeToFileType } from "../utils/helper.function";
import Folder from "../modals/folder.modal";
export const getObject = asyncHandler(async (req, res, next) => {
    const bucket = Constants.S3_BUCKET;
    const command = new ListObjectsV2Command({
        Bucket: bucket,
        // Prefix: prefix, // e.g. "folder/subfolder/"
        // Delimiter: "/", // separates folders
    });
    const data = await s3Client.send(command);

    return res.status(200).json(new ApiResponse("data fetch from the s3 successfully", data))
})

export const generateSignedUrl = asyncHandler(async (req, res, next) => {
    const userId = req.user?.id;
    const { fileName, mimeType, folderId }: generateSignedUrlSchemaType = req.body;
    // also take contentlength
    // first check is the file name should not same in the current directory 

    if (folderId) {
        const checkFolder = await Folder.findOne({ _id: folderId, userId }, { projection: { _id: 1 } });
        if (!checkFolder) {
            return next(new ErrorHandler("folder not found", 404));
        }
    }

    const checkUniqueFileName = await Files.findOne({ originalName: fileName, folderId })
    if (checkUniqueFileName) {
        return next(new ErrorHandler("file with the same name exist ", 400));
    }


    const typeOfFile = mapMimeTypeToFileType(mimeType);

    const checkType = await fileTypes.findOne({ fileType: typeOfFile }, { id: 1 });
    if (!checkType) {
        return next(new ErrorHandler("invalid file type ", 400))
    }
    console.log("value of the type of the file is  : ", folderId)


    const fileNameS3 = req.user?.id + '/' + uuidv4() + fileName
    await Files.insertOne({
        fileName: fileNameS3,
        fileTypeId: checkType.id,
        userId: req.user?.id,
        folderId,
        // fileSize:, will complete when we will be sending reqeust from the browser 
        originalName: fileName,

    })


    const command = new PutObjectCommand({
        Bucket: Constants.S3_BUCKET,
        Key: fileNameS3,
        ContentType: mimeType,
        // ContentLength:

    })
    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 180 });
    return res.status(200).json(new ApiResponse("pre-signed url generated successfully ", signedUrl))

}) 