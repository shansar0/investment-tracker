import express, { Router, Request, Response } from 'express';
import { authMiddleware } from '../middleware/auth';
import Investment from '../models/Investment';

const router: Router = express.Router();

// Create Investment
router.post('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    const investment = new Investment({
      ...req.body,
      userId: req.userId,
    });
    await investment.save();
    res.status(201).json({ message: 'Investment created', investment });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create investment', error: err });
  }
});

// Get All Investments for User
router.get('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    const investments = await Investment.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(investments);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch investments', error: err });
  }
});

// Get Single Investment
router.get('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const investment = await Investment.findOne({ _id: req.params.id, userId: req.userId });
    if (!investment) {
      return res.status(404).json({ message: 'Investment not found' });
    }
    res.json(investment);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch investment', error: err });
  }
});

// Update Investment
router.put('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const investment = await Investment.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true }
    );
    if (!investment) {
      return res.status(404).json({ message: 'Investment not found' });
    }
    res.json({ message: 'Investment updated', investment });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update investment', error: err });
  }
});

// Delete Investment
router.delete('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const investment = await Investment.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!investment) {
      return res.status(404).json({ message: 'Investment not found' });
    }
    res.json({ message: 'Investment deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete investment', error: err });
  }
});

export default router;