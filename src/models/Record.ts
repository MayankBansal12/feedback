import mongoose, { Schema, Types } from "mongoose";

export interface Record extends Document {
    text: string,
    rating: number,
    createdDate: Date,
    formId: Types.UUID
}

const Record: Schema<Record> = new Schema({
    text: {
        type: String
    },
    rating: {
        type: Number
    },
    createdDate: {
        type: Date,
        required: true
    },
    formId: {
        type: Types.UUID,
        required: true
    }
})

const RecordModel = (mongoose.models.Record as mongoose.Model<Record>) || (mongoose.model<Record>("Record", Record))
export default RecordModel