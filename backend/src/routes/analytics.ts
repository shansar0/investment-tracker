import express, { Router, Request, Response } from 'express';
import { authMiddleware } from '../middleware/auth';
import Investment from '../models/Investment';

const router: Router = express.Router();

// Portfolio Summary
router.get('/portfolio/summary', authMiddleware, async (req: Request, res: Response) => {
  try {
    const investments = await Investment.find({ userId: req.userId });

    const totalInvested = investments.reduce((sum, inv) => sum + inv.investmentAmount, 0);
    const currentValue = investments.reduce((sum, inv) => sum + inv.currentValue, 0);
    const totalGains = currentValue - totalInvested;
    const roi = totalInvested > 0 ? ((totalGains / totalInvested) * 100).toFixed(2) : '0.00';

    const byStatus = {
      active: investments.filter((inv) => inv.status === 'Active').length,
      exited: investments.filter((inv) => inv.status === 'Exited').length,
      loss: investments.filter((inv) => inv.status === 'Loss').length,
      pending: investments.filter((inv) => inv.status === 'Pending').length,
    };

    res.json({
      totalInvested,
      currentValue,
      totalGains,
      roi,
      totalInvestments: investments.length,
      byStatus,
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch summary', error: err });
  }
});

// ROI Analysis
router.get('/returns/roi', authMiddleware, async (req: Request, res: Response) => {
  try {
    const investments = await Investment.find({ userId: req.userId });

    const roi = investments.map((inv) => ({
      companyName: inv.companyName,
      investmentAmount: inv.investmentAmount,
      currentValue: inv.currentValue,
      gains: inv.currentValue - inv.investmentAmount,
      roiPercentage: inv.investmentAmount > 0
        ? ((inv.currentValue - inv.investmentAmount) / inv.investmentAmount * 100).toFixed(2)
        : '0.00',
      status: inv.status,
    }));

    res.json(roi);
  } catch (err) {
    res.status(500).json({ message: 'Failed to calculate ROI', error: err });
  }
});

// Growth Timeline
router.get('/growth/timeline', authMiddleware, async (req: Request, res: Response) => {
  try {
    const investments = await Investment.find({ userId: req.userId }).sort({ investmentDate: 1 });

    let cumulativeInvested = 0;
    const timeline = investments.map((inv) => {
      cumulativeInvested += inv.investmentAmount;
      return {
        date: inv.investmentDate,
        companyName: inv.companyName,
        amountInvested: inv.investmentAmount,
        cumulativeInvested,
        currentValue: inv.currentValue,
      };
    });

    res.json(timeline);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch timeline', error: err });
  }
});

export default router;