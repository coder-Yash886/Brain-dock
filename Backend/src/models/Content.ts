import mongoose, {Schema} from "mongoose";
import { Content } from "../types";

const contentSchema = new Schema <Content> ({
    userId:{
        type:String,
        required: true,
        index: true,
    },
    type:{
        type: String,
        required: true,
        enum: ['tweet', 'document','video','link'],
        trim: true,
    },
    content:{
        type: String,
        trim: true,
    },

    Link: {
        type: String,
        trim: true,
    },
    title:{
        type: String,
        required: true,
        trim: true,

    },
    tags:[{
        type: String,
        trim: true,
        lowercase: true
    }],
},{ timestamps: true,

})

contentSchema.index({ userId: 1, type: 1 });
contentSchema.index({ userId: 1, tags: 1 });

const Content = mongoose.model<Content>('Content', contentSchema);

export default Content;

