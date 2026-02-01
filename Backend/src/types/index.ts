import { Document} from "mongoose";
import { Request } from "express";

export interface User extends Document{
    username: string;
    email: string;
    password: string;
    createAt: Date;
    uddateAt: Date;
    comparePassword(candidatePassword: string): Promise<boolean>;

}
export type ContentType = 'tweet' | 'document' | 'video' | 'Link';

export interface Content extends Document {
    userId: string;
    type: ContentType;
    title: string;
    content?: string;
    tags?:string[];
    Link?:string;
    createAt: Date;
    uddateAt: Date;
}

export interface Link extends Document {
    hash: string;
    userId: string;
    contentIds: string[];
    expiresAt?: Date;
    createdAt: Date;
    updatedAt: Date;
    isExpired(): boolean; 
}

export interface AuthRequest extends Request{
    user?: User
}

export interface JWTPayload {
    id: string;
}
export interface ApiResponse <T = any> {
    success: boolean;
    message: string;
    data?: T;
    count?: number;
}