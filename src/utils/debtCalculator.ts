import { Debt, PaymentStrategy, MonthlySnapshot, MonthlyPayment } from '../types/debt';
import { addMonths } from './dateUtils';

export function calculatePaymentSchedule(
  debts: Debt[],
  strategy: PaymentStrategy,
  monthlyExtra: number,
  startDate: Date
): MonthlySnapshot[] {
  if (debts.length === 0) return [];

  // Sort debts based on strategy
  const sortedDebts = [...debts].sort((a, b) => {
    if (strategy === 'snowball') {
      // First by balance, then by interest rate if balances are equal
      return a.balance === b.balance 
        ? b.interestRate - a.interestRate 
        : a.balance - b.balance;
    }
    // First by interest rate, then by balance if rates are equal
    return b.interestRate === a.interestRate 
      ? a.balance - b.balance 
      : b.interestRate - a.interestRate;
  });

  const snapshots: MonthlySnapshot[] = [];
  let currentDebts = sortedDebts.map(debt => ({ ...debt }));
  let month = 0;
  let availableExtra = monthlyExtra;

  while (currentDebts.length > 0) {
    const payments: MonthlyPayment[] = [];
    let totalBalance = 0;

    // Calculate interest and apply minimum payments
    currentDebts = currentDebts.map(debt => {
      const monthlyInterest = (debt.balance * (debt.interestRate / 100)) / 12;
      const newBalance = debt.balance + monthlyInterest;
      const minimumPayment = Math.min(debt.minimumPayment, newBalance);
      
      payments.push({
        debtId: debt.id,
        amount: minimumPayment,
        isExtra: false,
      });

      return {
        ...debt,
        balance: newBalance - minimumPayment,
      };
    });

    // Apply extra payment to the target debt
    if (availableExtra > 0 && currentDebts.length > 0) {
      const targetDebt = currentDebts[0]; // First debt based on strategy
      const extraPayment = Math.min(availableExtra, targetDebt.balance);
      targetDebt.balance -= extraPayment;
      
      // Update the payment record for this debt
      const paymentIndex = payments.findIndex(p => p.debtId === targetDebt.id);
      if (paymentIndex !== -1) {
        payments[paymentIndex] = {
          ...payments[paymentIndex],
          amount: payments[paymentIndex].amount + extraPayment,
          isExtra: true,
        };
      }
    }

    // Remove paid off debts and resort the list
    currentDebts = currentDebts
      .filter(debt => debt.balance > 0.01)
      .sort((a, b) => {
        if (strategy === 'snowball') {
          return a.balance === b.balance 
            ? b.interestRate - a.interestRate 
            : a.balance - b.balance;
        }
        return b.interestRate === a.interestRate 
          ? a.balance - b.balance 
          : b.interestRate - a.interestRate;
      });
    
    // Calculate total remaining balance
    totalBalance = currentDebts.reduce((sum, debt) => sum + debt.balance, 0);

    snapshots.push({
      month,
      date: addMonths(startDate, month),
      totalBalance,
      payments,
      remainingDebts: currentDebts.length,
      currentDebts: currentDebts.map(d => ({ ...d })), // Store current state of debts
    });

    month++;

    // Safety check to prevent infinite loops
    if (month > 600) break;
  }

  return snapshots;
}