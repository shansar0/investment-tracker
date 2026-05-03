import mongoose, { Schema, Document } from 'mongoose';

interface IInvestment extends Document {
  userId: mongoose.Types.ObjectId;
  companyName: string;
  investmentAmount: number;
  investmentDate: Date;
  category: string;
  marketSize: string;
  revenueModel: string;
  teamQuality: number;
  growthPotential: number;
  traction: string;
  competition: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  scalability: number;
  vision: string;
  exitStrategy: string;
  currentValue: number;
  status: 'Active' | 'Exited' | 'Loss' | 'Pending';
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

const InvestmentSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    companyName: { type: String, required: true },
    investmentAmount: { type: Number, required: true },
    investmentDate: { type: Date, required: true },
    category: { type: String, default: 'Tech' },
    marketSize: { type: String },
    revenueModel: { type: String },
    teamQuality: { type: Number, min: 1, max: 10 },
    growthPotential: { type: Number, min: 1, max: 10 },
    traction: { type: String },
    competition: { type: String },
    riskLevel: { type: String, enum: ['Low', 'Medium', 'High'] },
    scalability: { type: Number, min: 1, max: 10 },
    vision: { type: String },
    exitStrategy: { type: String },
    currentValue: { type: Number, default: 0 },
    status: { type: String, enum: ['Active', 'Exited', 'Loss', 'Pending'], default: 'Active' },
    notes: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<IInvestment>('Investment', InvestmentSchema);