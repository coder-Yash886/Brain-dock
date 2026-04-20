import express, { Request, Response } from 'express';
import Link from '../models/Link';
import Content from '../models/Content';
import User from '../models/User';
import { protect } from '../middleware/auth';
import { AuthRequest, ApiResponse } from '../types';

const router = express.Router();

router.post('/share', protect, async (req: AuthRequest, res: Response<ApiResponse>) => {
  try {
    const { share } = req.body;
    const userId = req.user!._id.toString();

    if (share) {
    
      let link = await Link.findOne({ userId });

      if (!link) {
        link = await Link.create({
          userId: userId,
          contentIds: [], 
        });
      }

      res.json({
        success: true,
        message: 'Brain link generated',
        data: {
          hash: link.hash,
        },
      });
      return;
    } else {
      
      await Link.findOneAndDelete({ userId });
      res.json({
        success: true,
        message: 'Brain link disabled',
      });
      return;
    }
  } catch (error) {
    console.error('Share link error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating share link',
    });
  }
});


router.get('/:shareLink', async (req: Request, res: Response<ApiResponse>) => {
  try {
    const hash = req.params.shareLink;
    
    
    const link = await Link.findOne({ hash });

    if (!link) {
      res.status(404).json({
        success: false,
        message: 'Invalid or expired share link',
      });
      return;
    }

    
    const user = await User.findById(link.userId).select('username');
    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User no longer exists',
      });
      return;
    }

    
    const contents = await Content.find({ userId: link.userId }).sort({ createdAt: -1 });

    res.json({
      success: true,
      message: 'Brain contents fetched successfully',
      data: {
        username: user.username,
        contents: contents,
      },
    });
  } catch (error) {
    console.error('Fetch shared brain error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching shared brain',
    });
  }
});

export default router;
