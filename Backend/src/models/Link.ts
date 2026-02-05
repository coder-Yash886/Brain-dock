import mongoose, {Schema} from "mongoose";
import crypto from 'crypto'
import { ILink } from '../types'  // 👈 ILink (not Link)

const linkSchema = new Schema<ILink>({  // 👈 ILink
    hash:{
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    userId:{
        type: String,
        required: true,
    },
    contentIds:[{
        type: String,
    }],
    expiresAt:{
        type: Date,
        default: undefined,
    },
},{ 
    timestamps: true,
});

linkSchema.pre('save', function(next){
    if(!this.hash) {
      this.hash = crypto.randomBytes(8).toString('hex');
    }
    next();     
});

linkSchema.methods.isExpired = function(): boolean {
  if (!this.expiresAt) return false;
  return new Date() > this.expiresAt;
};

const Link = mongoose.model<ILink>('Link', linkSchema);  // 👈 ILink

export default Link;