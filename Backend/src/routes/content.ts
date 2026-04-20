import express, { Response } from "express";
import { body, validationResult } from 'express-validator';
import Content from '../models/Content';
import { protect } from '../middleware/auth';
import { AuthRequest, ApiResponse } from '../types';

const router = express.Router();

// Apply protect middleware to all routes
router.use(protect);

// ========== CREATE CONTENT ==========
router.post('/', [
  body('type').isIn(['tweet', 'document', 'video', 'link']).withMessage('Invalid content type'),
  body('title').notEmpty().withMessage('Title is required'),
], async (req: AuthRequest, res: Response<ApiResponse>) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        message: errors.array()[0].msg,
      });
      return;
    }

    const { type, title, content, link, tags } = req.body;
    const userId = req.user!._id.toString();

    const newContent = await Content.create({
      userId,
      type,
      title,
      content,
      link,
      tags: tags || [],
    });

    res.status(201).json({
      success: true,
      message: 'Content created successfully',
      data: newContent,
    });
  } catch (error) {
    console.error('Create content error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error creating content',
    });
  }
});

// ========== GET ALL CONTENT FOR USER ==========
router.get('/', async (req: AuthRequest, res: Response<ApiResponse>) => {
  try {
    const userId = req.user!._id.toString();
    const contents = await Content.find({ userId }).sort({ createdAt: -1 });

    res.json({
      success: true,
      message: 'Contents fetched successfully',
      data: contents,
      count: contents.length,
    });
  } catch (error) {
    console.error('Fetch content error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching content',
    });
  }
});

// ========== DELETE CONTENT ==========
router.delete('/:id', async (req: AuthRequest, res: Response<ApiResponse>) => {
  try {
    const userId = req.user!._id.toString();
    const contentId = req.params.id;

    const content = await Content.findOneAndDelete({ _id: contentId, userId });

    if (!content) {
      res.status(404).json({
        success: false,
        message: 'Content not found or unauthorized',
      });
      return;
    }

    res.json({
      success: true,
      message: 'Content deleted successfully',
      data: { id: contentId },
    });
  } catch (error) {
    console.error('Delete content error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error deleting content',
    });
  }
});

export default router;
