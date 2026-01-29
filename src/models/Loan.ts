import mongoose, { Document, Schema } from 'mongoose';

export interface ILoan extends Document {
  userId: mongoose.Types.ObjectId;
  amount: number;
  interestRate: number;
  termMonths: number;
  status: 'pending' | 'approved' | 'rejected' | 'paid';
  purpose: string;
}

const loanSchema = new Schema<ILoan>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  interestRate: { type: Number, required: true },
  termMonths: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected', 'paid'], default: 'pending' },
  purpose: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model<ILoan>('Loan', loanSchema);
