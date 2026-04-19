import mongoose, {Schema} from "mongoose";
import { IContent } from "../types";  

const contentSchema = new Schema<IContent>({  
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
    title:{  
        type: String,
        required: true,
        trim: true,
    },
    content:{
        type: String,
        trim: true,
    },
    link: {  
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

const Content = mongoose.model<IContent>('Content', contentSchema);  

export default Content;