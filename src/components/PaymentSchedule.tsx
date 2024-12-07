import React from 'react';
import { Download } from 'lucide-react';
import { Debt, PaymentStrategy } from '../types/debt';
import { calculatePaymentSchedule } from '../utils/debtCalculator';
import { useLanguage } from '../contexts/LanguageContext';
import { generatePaymentSchedulePDF } from '../utils/pdfGenerator';

interface PaymentScheduleProps {
  debts: Debt[];
  strategy: PaymentStrategy;
  monthlyExtra: number;
  startDate: Date;
}

export function PaymentSchedule({
  debts,
  strategy,
  monthlyExtra,
  startDate,
}: PaymentScheduleProps) {
  const { t, language } = useLanguage();
  const schedule = React.useMemo(
    () => calculatePaymentSchedule(debts, strategy, monthlyExtra, startDate),
    [debts, strategy, monthlyExtra, startDate]
  );

  const handleDownloadSchedule = async () => {
    const sortedDebts = [...debts].sort((a, b) => {
      if (strategy === 'snowball') {
        return a.balance - b.balance;
      }
      return b.interestRate - a.interestRate;
    });

    await generatePaymentSchedulePDF({
      debts: sortedDebts,
      schedule,
      strategy,
      monthlyExtra,
      startDate,
      language,
      t,
    });
  };

  return (
    <div className="cyber-card p-6">
      <button
        onClick={handleDownloadSchedule}
        className="cyber-button w-full inline-flex items-center justify-center gap-2"
      >
        <Download className="w-4 h-4" />
        {t('downloadSchedule')}
      </button>
    </div>
  );
}