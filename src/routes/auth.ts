import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = Router();

router.post('/register', async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, name } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    const user = new User({ email, password, name });
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, { expiresIn: '24h' });
    res.status(201).json({ token, userId: user._id });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Server error', error: String(error) });
  }
});

router.post('/login', async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, { expiresIn: '24h' });
    res.json({ token, userId: user._id });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
