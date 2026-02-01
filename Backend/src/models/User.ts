import mongoose, {Schema} from "mongoose";
import bcrypt from 'bcryptjs'
import { User } from '../types';

const userSchema = new Schema<User>({
    username:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],

    },
    password:{
        type: String,
        required: true,
        minlength: 6
    },
},{ timestamps: true,

});

userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();

});
userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
     return await bcrypt.compare(candidatePassword, this.password);
}
const User = mongoose.model<User>('User', userSchema);

export default User;
