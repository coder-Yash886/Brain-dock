import mongoose, {Schema} from "mongoose";
import crypto from 'crypto'
import {Link} from '../types'

const linkSchema = new Schema<Link>({
    hash:{
        type:String,
        required: true,
        unique: true,
        index: true,
    },
    userId:{
        type: String,
        required:true,
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

linkSchema.pre('save',function(next){
    if(!this.hash) {
      this.hash = crypto.randomBytes(8).toString('hex');
    }
    next();     
});
linkSchema.methods.isExpired = function(): boolean {
  if (!this.expiresAt) return false;
  return new Date() > this.expiresAt;
};

const Link = mongoose.model<Link>('Link', linkSchema);

export default Link;

