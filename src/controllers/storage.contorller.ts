import asyncHandler from "../middlewares/asyncHandler";
import { ListObjectsV2Command,PutObjectCommand } from "@aws-sdk/client-s3";
import s3Client from "../s3Config";
import ApiResponse from "../middlewares/ApiResponse";
import Constants from "../constants/constants";
export const getObject = asyncHandler(async (req, res, next) => {
    const bucket = Constants.S3_BUCKET;
    const command = new ListObjectsV2Command({
        Bucket: bucket,
        // Prefix: prefix, // e.g. "folder/subfolder/"
        // Delimiter: "/", // separates folders
    });
    const data = await s3Client.send(command);

    return res.status(200).json(new ApiResponse(true, "data fetch from the s3 successfully", data))
})

export const makeUserFolder=asyncHandler(async(req,res,next)=>{

})