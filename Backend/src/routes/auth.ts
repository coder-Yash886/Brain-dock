import express, { Response } from "express";
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import axios from 'axios';
import User from '../models/User';
import { protect } from '../middleware/auth';
import { AuthRequest, ApiResponse } from '../types';

const router = express.Router();

const generateToken = (id: string): string => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: '30d',
  });
};

const verifyRecaptcha = async (token?: string) => {
  // Only enforce when RECAPTCHA_ENABLED=true AND a secret is configured
  if (process.env.RECAPTCHA_ENABLED !== 'true' || !process.env.RECAPTCHA_SECRET) {
    return { success: true, score: 1 };
  }

  if (!token) {
    return { success: false, 'error-codes': ['missing-input-response'] };
  }

  try {
    const secret = process.env.RECAPTCHA_SECRET;
    const res = await axios.post('https://www.google.com/recaptcha/api/siteverify', null, {
      params: { secret, response: token }
    });
    return res.data;
  } catch (err) {
    console.error('reCAPTCHA verify error', err);
    return { success: false, 'error-codes': ['verify-request-failed'] };
  }
};

router.post('/signup', [
  body('username').trim().isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
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
      console.error('Signup reCAPTCHA failed:', rc);
      return res.status(400).json({
        success: false,
        message: !recaptchaToken
          ? 'reCAPTCHA token missing. Restart frontend after updating VITE_RECAPTCHA_SITE_KEY.'
          : 'reCAPTCHA verification failed',
      });
    }

    const { username, email, password } = req.body;

    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) {
      res.status(400).json({
        success: false,
        message: userExists.email === email ? 'Email already registered' : 'Username already taken',
      });
      return;
    }

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
