import { Document } from "mongoose";
import { Request } from "express";

// ========== USER INTERFACE ==========
export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    createdAt: Date;  // 👈 Fix: createAt → createdAt
    updatedAt: Date;  // 👈 Fix: uddateAt → updatedAt
    comparePassword(candidatePassword: string): Promise<boolean>;
}

// ========== CONTENT INTERFACE ==========
export type ContentType = 'tweet' | 'document' | 'video' | 'link';  // 👈 Fix: Link → link

export interface IContent extends Document {
    userId: string;
    type: ContentType;
    title: string;
    content?: string;
    link?: string;  // 👈 Fix: Link → link (lowercase)
    tags?: string[];
    createdAt: Date;  // 👈 Fix: createAt → createdAt
    updatedAt: Date;  // 👈 Fix: uddateAt → updatedAt
}

// ========== LINK INTERFACE ==========
export interface ILink extends Document {
    hash: string;
    userId: string;
    contentIds: string[];
    expiresAt?: Date;
    createdAt: Date;
    updatedAt: Date;
    isExpired(): boolean;
}

// ========== REQUEST TYPES ==========
export interface AuthRequest extends Request {
    user?: IUser;  // 👈 Fix: User → IUser
}

// ========== JWT PAYLOAD ==========
export interface JWTPayload {
    id: string;
}

// ========== API RESPONSE ==========
export interface ApiResponse<T = any> {
    success: boolean;
    message?: string;  // 👈 Fix: optional karo
    data?: T;
    count?: number;
}