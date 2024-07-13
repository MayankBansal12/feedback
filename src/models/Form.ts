import mongoose, { Schema, Types } from "mongoose";

export enum FormType {
    SHORT = "short",
    BIG = "big",
    LONG = "long",
    CLICK = "click"
}

export interface Form extends Document {
    name: string,
    heading: string,
    type: FormType,
    createdDate: Date,
    projectId: Types.UUID,
    isDeleted: boolean
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
        required: true,
        enum: Object.values(FormType)
    },
    projectId: {
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

const FormModel = (mongoose.models.Form as mongoose.Model<Form>) || (mongoose.model<Form>("Form", Form))
export default FormModel