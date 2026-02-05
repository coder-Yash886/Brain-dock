import mongoose, {Schema} from "mongoose";
import { IContent } from "../types";  // 👈 IContent (not Content)

const contentSchema = new Schema<IContent>({  // 👈 IContent
    userId:{
        type: String,
        required: true,
        index: true,
    },
    type:{
        type: String,
        required: true,
        enum: ['tweet', 'document','video','link'],
    },
    title:{  // 👈 title pehle rakho
        type: String,
        required: true,
        trim: true,
    },
    content:{
        type: String,
        trim: true,
    },
    link: {  // 👈 Link → link (lowercase)
        type: String,
        trim: true,
    },
    tags:[{
        type: String,
        trim: true,
        lowercase: true
    }],
},{ 
    timestamps: true,
});

contentSchema.index({ userId: 1, type: 1 });
contentSchema.index({ userId: 1, tags: 1 });

const Content = mongoose.model<IContent>('Content', contentSchema);  // 👈 IContent

export default Content;