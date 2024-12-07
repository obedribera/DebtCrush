export interface Debt {
  id: string;
  name: string;
  balance: number;
  interestRate: number;
  minimumPayment: number;
  dueDate: number; // Day of month (1-31)
}

export type PaymentStrategy = 'snowball' | 'avalanche';

export interface PaymentPlan {
  monthlyExtra: number;
  strategy: PaymentStrategy;
  startDate: Date;
}

export interface MonthlyPayment {
  debtId: string;
  amount: number;
  isExtra: boolean;
}

export interface MonthlySnapshot {
  month: number;
  date: Date;
  totalBalance: number;
  payments: MonthlyPayment[];
  remainingDebts: number;
  currentDebts: Debt[]; // Current state of each debt
}