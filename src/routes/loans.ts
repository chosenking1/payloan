import { Router, Response } from 'express';
import Loan from '../models/Loan.js';
import { authMiddleware, AuthRequest } from '../middleware/auth.js';

const router = Router();

router.post('/', authMiddleware, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { amount, interestRate, termMonths, purpose } = req.body;
    const loan = new Loan({
      userId: req.userId,
      amount,
      interestRate,
      termMonths,
      purpose
    });
    await loan.save();
    res.status(201).json(loan);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/', authMiddleware, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const loans = await Loan.find({ userId: req.userId });
    res.json(loans);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:id', authMiddleware, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    console.log('Get loan - ID:', req.params.id, 'UserID:', req.userId);
    const loan = await Loan.findOne({ _id: req.params.id, userId: req.userId });
    console.log('Found loan:', loan);
    if (!loan) {
      res.status(404).json({ message: 'Loan not found' });
      return;
    }
    res.json(loan);
  } catch (error) {
    console.error('Get loan error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/:id', authMiddleware, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    console.log('Update loan - ID:', req.params.id, 'UserID:', req.userId);
    const { amount, interestRate, termMonths, purpose, status } = req.body;
    const loan = await Loan.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { amount, interestRate, termMonths, purpose, status },
      { new: true }
    );
    console.log('Updated loan:', loan);
    if (!loan) {
      res.status(404).json({ message: 'Loan not found' });
      return;
    }
    res.json(loan);
  } catch (error) {
    console.error('Update loan error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:id', authMiddleware, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    console.log('Delete loan - ID:', req.params.id, 'UserID:', req.userId);
    const loan = await Loan.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    console.log('Deleted loan:', loan);
    if (!loan) {
      res.status(404).json({ message: 'Loan not found' });
      return;
    }
    res.json({ message: 'Loan deleted successfully' });
  } catch (error) {
    console.error('Delete loan error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
