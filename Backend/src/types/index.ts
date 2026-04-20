import { Document } from "mongoose";
import { Request } from "express";


export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    createdAt: Date;  
    updatedAt: Date;  
    comparePassword(candidatePassword: string): Promise<boolean>;
}
export type ContentType = 'tweet' | 'document' | 'video' | 'link'; 

export interface IContent extends Document {
    userId: string;
    type: ContentType;
    title: string;
    content?: string;
    link?: string;  
    tags?: string[];
    createdAt: Date;  
    updatedAt: Date;  
}
export interface ILink extends Document {
    hash: string;
    userId: string;
    contentIds: string[];
    expiresAt?: Date;
    createdAt: Date;
    updatedAt: Date;
    isExpired(): boolean;
}


export interface AuthRequest extends Request {
    user?: IUser;  
}

export interface JWTPayload {
    id: string;
}
export interface ApiResponse<T = any> {
    success: boolean;
    message?: string;  // 👈 Fix: optional karo
    data?: T;
    count?: number;
}
