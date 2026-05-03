// Investment data service - using localStorage instead of backend

interface Investment {
  _id: string;
  companyName: string;
  investmentAmount: number;
  currentValue: number;
  investmentDate: string;
  category: string;
  marketSize: string;
  revenueModel: string;
  teamQuality: number;
  growthPotential: number;
  traction: string;
  competition: string;
  riskLevel: string;
  scalability: number;
  vision: string;
  exitStrategy: string;
  status: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

const STORAGE_KEY = 'investments';
const USER_KEY = 'currentUser';

export const investmentService = {
  // Get all investments for current user
  getAll: (): Investment[] => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  // Get single investment
  getById: (id: string): Investment | null => {
    const investments = investmentService.getAll();
    return investments.find((inv) => inv._id === id) || null;
  },

  // Create new investment
  create: (investment: Omit<Investment, '_id' | 'createdAt' | 'updatedAt'>): Investment => {
    const investments = investmentService.getAll();
    const newInvestment: Investment = {
      ...investment,
      _id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    investments.push(newInvestment);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(investments));
    return newInvestment;
  },

  // Update investment
  update: (id: string, updates: Partial<Investment>): Investment | null => {
    const investments = investmentService.getAll();
    const index = investments.findIndex((inv) => inv._id === id);
    if (index === -1) return null;

    investments[index] = {
      ...investments[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(investments));
    return investments[index];
  },

  // Delete investment
  delete: (id: string): boolean => {
    const investments = investmentService.getAll();
    const filtered = investments.filter((inv) => inv._id !== id);
    if (filtered.length === investments.length) return false;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  },

  // Get portfolio summary
  getPortfolioSummary: () => {
    const investments = investmentService.getAll();
    const totalInvested = investments.reduce((sum, inv) => sum + inv.investmentAmount, 0);
    const currentValue = investments.reduce((sum, inv) => sum + inv.currentValue, 0);
    const totalGains = currentValue - totalInvested;
    const roi = totalInvested > 0 ? ((totalGains / totalInvested) * 100).toFixed(2) : '0.00';

    return {
      totalInvested,
      currentValue,
      totalGains,
      roi,
      totalInvestments: investments.length,
      byStatus: {
        active: investments.filter((inv) => inv.status === 'Active').length,
        exited: investments.filter((inv) => inv.status === 'Exited').length,
        loss: investments.filter((inv) => inv.status === 'Loss').length,
        pending: investments.filter((inv) => inv.status === 'Pending').length,
      },
    };
  },

  // Get ROI analysis
  getRoiAnalysis: () => {
    const investments = investmentService.getAll();
    return investments.map((inv) => ({
      companyName: inv.companyName,
      investmentAmount: inv.investmentAmount,
      currentValue: inv.currentValue,
      gains: inv.currentValue - inv.investmentAmount,
      roiPercentage: inv.investmentAmount > 0
        ? ((inv.currentValue - inv.investmentAmount) / inv.investmentAmount * 100).toFixed(2)
        : '0.00',
      status: inv.status,
    }));
  },

  // Get growth timeline
  getGrowthTimeline: () => {
    const investments = investmentService.getAll().sort(
      (a, b) => new Date(a.investmentDate).getTime() - new Date(b.investmentDate).getTime()
    );

    let cumulativeInvested = 0;
    return investments.map((inv) => {
      cumulativeInvested += inv.investmentAmount;
      return {
        date: inv.investmentDate,
        companyName: inv.companyName,
        amountInvested: inv.investmentAmount,
        cumulativeInvested,
        currentValue: inv.currentValue,
      };
    });
  },

  // Export data as JSON
  exportData: () => {
    const investments = investmentService.getAll();
    const dataStr = JSON.stringify(investments, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `investments-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  },

  // Import data from JSON
  importData: (file: File): Promise<boolean> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string);
          if (Array.isArray(data)) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
            resolve(true);
          } else {
            resolve(false);
          }
        } catch {
          resolve(false);
        }
      };
      reader.readAsText(file);
    });
  },
};

export default investmentService;