import mongoose, { Schema, Types } from "mongoose";


export interface Project extends Document {
    name: string,
    desc?: string,
    userId: Types.UUID,
    createdDate: Date,
    isDeleted: boolean
}

const ProjectSchema: Schema<Project> = new Schema({
    name: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: false
    },
    userId: {
        type: Types.UUID,
        required: true
    },
    createdDate: {
        type: Date,
        required: true,
        default: new Date()
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
})

const ProjectModel = (mongoose.models.Project as mongoose.Model<Project>) || (mongoose.model<Project>("Project", ProjectSchema))
export default ProjectModel