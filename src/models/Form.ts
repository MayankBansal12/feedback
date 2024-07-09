import mongoose, { Schema, Types } from "mongoose";



export interface Form extends Document {
    name: string,
    heading: string,
    type: string,
    createdDate: Date,
    projectId: Types.UUID
}

const Form: Schema<Form> = new Schema({
    name: {
        type: String,
        required: true
    },
    heading: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        required: true,
        default: new Date()
    },
    projectId: {
        type: Types.UUID,
        required: true
    }
})

const FormModel = (mongoose.models.Form as mongoose.Model<Form>) || (mongoose.model<Form>("Form", Form))
export default FormModel