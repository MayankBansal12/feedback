import mongoose, { Schema, Types } from "mongoose";


export interface Project extends Document {
    name: string,
    desc?: string,
    userId: Types.UUID,
    createdDate: Date
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
    createdDate: {
        type: Date,
        required: true,
        default: new Date()
    },
    userId: {
        type: Types.UUID,
        required: true
    }
})

const ProjectModel = (mongoose.models.Project as mongoose.Model<Project>) || (mongoose.model<Project>("Project", ProjectSchema))
export default ProjectModel