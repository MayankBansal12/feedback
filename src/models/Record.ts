import mongoose, { Schema, Types } from "mongoose";

export interface Record extends Document {
    text: string,
    rating: number,
    createdDate: Date,
    formId: Types.UUID,
    isDeleted: boolean
}

const Record: Schema<Record> = new Schema({
    text: {
        type: String,
        required: false
    },
    rating: {
        type: Number,
        required: false
    },
    formId: {
        type: Types.UUID,
        required: true
    },
    createdDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
})

const RecordModel = (mongoose.models.Record as mongoose.Model<Record>) || (mongoose.model<Record>("Record", Record))
export default RecordModel