import mongoose, { Schema, Document, Types } from "mongoose";



interface IfilesTypes extends Document {
    fileType: string;
}
interface Ifiles extends Document {
    folderId: Types.ObjectId;
    userId: Types.ObjectId;
    fileTypeId: Types.ObjectId;
    fileSize: string
    originalName: string //the name of the actual file 
    fileName: string // unique name after adding uuid 
    isUploaded: boolean

}

const fileTypeModel = new Schema<IfilesTypes>({
    fileType: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }

})
export const fileTypes = mongoose.model<IfilesTypes>('filetypes', fileTypeModel)

const fileModel = new Schema<Ifiles>({
    folderId: {
        type: Schema.Types.ObjectId,
        ref: "Folder",
        required: false,
        default: null
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    fileTypeId: {
        type: Schema.Types.ObjectId,
        ref: "filetypes"
    },
    fileSize: {
        type: String,
    },
    originalName: {
        type: String,
        required: true, //this is file original name that user have provided 

    },
    fileName: {
        type: String,
        required: true,
        unique: true // this is the name fo the actual file that is created by using uuid 
    },
    isUploaded: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

export const Files = mongoose.model<Ifiles>("files", fileModel)

