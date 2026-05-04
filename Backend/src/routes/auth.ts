import express, { Response } from "express";
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import axios from 'axios';
import User from '../models/User';
import OTP from '../models/OTP';
import { protect } from '../middleware/auth';
import sendEmail from '../utils/sendEmail';
import { AuthRequest, ApiResponse } from '../types';

const router = express.Router();

const generateToken = (id: string): string => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: '30d',
  });
};

const verifyRecaptcha = async (token?: string) => {
  if (!token) return { success: false } as any;
  try {
    const secret = process.env.RECAPTCHA_SECRET!;
    const res = await axios.post('https://www.google.com/recaptcha/api/siteverify', null, {
      params: { secret, response: token }
    });
    return res.data;
  } catch (err) {
    console.error('reCAPTCHA verify error', err);
    return { success: false };
  }
};

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

router.post('/send-otp', [
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('username').trim().isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
], async (req: express.Request, res: Response<ApiResponse>) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        message: errors.array()[0].msg,
      });
      return;
    }

    const { email, username } = req.body;

    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) {
      res.status(400).json({
        success: false,
        message: userExists.email === email ? 'Email already registered' : 'Username already taken',
      });
      return;
    }

    const otp = generateOTP();
    
    // Check if an OTP already exists for this email, update it or create new
    await OTP.findOneAndUpdate(
      { email },
      { otp, createdAt: new Date() },
      { upsert: true, new: true }
    );

    const message = `Your BrainDock verification code is: ${otp}. It will expire in 5 minutes.`;
    
    try {
      await sendEmail({
        email,
        subject: 'BrainDock - Verify your email',
        message
      });
    } catch (sendErr) {
      console.error('Failed to send OTP email:', sendErr);
      return res.status(500).json({ success: false, message: 'Failed to send OTP email' });
    }

    res.status(200).json({
      success: true,
      message: 'OTP sent to your email',
    });
  } catch (error) {
    console.error('Send OTP error:', (error as Error).stack || error);
    res.status(500).json({
      success: false,
      message: (error as Error).message || 'Server error while sending OTP',
    });
  }
});

router.post('/signup', [
  body('username').trim().isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('otp').isLength({ min: 6, max: 6 }).withMessage('Invalid OTP'),

], async (req: express.Request, res: Response<ApiResponse>) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        message: errors.array()[0].msg,
      });
      return;
    }

    
    const recaptchaToken = req.body.recaptchaToken as string | undefined;
    const rc = await verifyRecaptcha(recaptchaToken);
    if (!rc.success || (rc.score !== undefined && rc.score < 0.5)) {
      return res.status(400).json({ success: false, message: 'reCAPTCHA verification failed' });
    }

    const { username, email, password, otp } = req.body;

    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) {
      res.status(400).json({
        success: false,
        message: userExists.email === email ? 'Email already registered' : 'Username already taken',
      });
      return;
    }

    const validOTP = await OTP.findOne({ email, otp });
    if (!validOTP) {
      res.status(400).json({
        success: false,
        message: 'Invalid or expired OTP',
      });
      return;
    }

    // Delete OTP after successful verification
    await OTP.deleteOne({ _id: validOTP._id });

    const user = await User.create({
      username,
      email,
      password,
    });

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        id: user._id.toString(),
        username: user.username,
        email: user.email,
        token: generateToken(user._id.toString()),
      },
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during registration',
    });
  }
});


router.post('/signin', [
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password').notEmpty().withMessage('Password is required'),
], async (req: express.Request, res: Response<ApiResponse>) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        message: errors.array()[0].msg,
      });
      return;
    }

    
    const recaptchaToken = req.body.recaptchaToken as string | undefined;
    const rc = await verifyRecaptcha(recaptchaToken);
    if (!rc.success || (rc.score !== undefined && rc.score < 0.5)) {
      return res.status(400).json({ success: false, message: 'reCAPTCHA verification failed' });
    }

    const { email, password } = req.body;


    const user = await User.findOne({ email });

    if (!user) {
      res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
      return;
    }


    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
      return;
    }

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        id: user._id.toString(),
        username: user.username,
        email: user.email,
        token: generateToken(user._id.toString()),
      },
    });
  } catch (error) {
    console.error('Signin error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login',
    });
  }
});

router.get('/me', protect, async (req: AuthRequest, res: Response<ApiResponse>) => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: 'User not found',
      });
      return;
    }

    res.json({
      success: true,
      data: {
        id: req.user._id.toString(),
        username: req.user.username,
        email: req.user.email,
      },
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
});

export default router;