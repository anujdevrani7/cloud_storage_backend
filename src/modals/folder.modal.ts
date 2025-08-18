
import mongoose, { Document, Schema, Types } from 'mongoose';


export interface Ifolder extends Document {
    // userUniqueId: string;
    userId: Types.ObjectId,
    folderName: String,
    parentFolder: Types.ObjectId | null

}


const folderModel = new Schema<Ifolder>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    folderName: {
        type: String,
        required: true
    },
    parentFolder: {
        type: Schema.Types.ObjectId,
        ref: "Folder",
        default: null
    }

},
    {
        timestamps: true
    })

const Folder = mongoose.model<Ifolder>('Folder', folderModel);
export default Folder;
