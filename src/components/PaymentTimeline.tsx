import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Debt, PaymentStrategy } from '../types/debt';
import { calculatePaymentSchedule } from '../utils/debtCalculator';
import { formatDate } from '../utils/dateUtils';
import { useLanguage } from '../contexts/LanguageContext';

interface PaymentTimelineProps {
  debts: Debt[];
  strategy: PaymentStrategy;
  monthlyExtra: number;
  startDate: Date;
}

export function PaymentTimeline({ 
  debts, 
  strategy, 
  monthlyExtra,
  startDate 
}: PaymentTimelineProps) {
  const { t } = useLanguage();
  const schedule = React.useMemo(
    () => calculatePaymentSchedule(debts, strategy, monthlyExtra, startDate),
    [debts, strategy, monthlyExtra, startDate]
  );

  if (debts.length === 0) {
    return null;
  }

  const totalMonths = schedule.length;
  const initialBalance = debts.reduce((sum, debt) => sum + debt.balance, 0);
  const totalPayments = schedule.reduce((sum, month) => 
    sum + month.payments.reduce((monthSum, payment) => monthSum + payment.amount, 0), 
    0
  );
  const totalInterestPaid = totalPayments - initialBalance;
  const debtFreeDate = schedule[schedule.length - 1]?.date;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="cyber-card p-3">
          <p className="text-neon-blue font-medium mb-1">{formatDate(new Date(label))}</p>
          <p className="text-white">
            {t('timeline.balance')}: <span className="text-neon-blue font-medium">
              ${Math.round(payload[0].value).toLocaleString()}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  const getStrategyImpactMessage = () => {
    const translationKey = strategy === 'snowball' ? 'timeline.snowballImpact' : 'timeline.avalancheImpact';
    const message = t(translationKey)
      .replace('${interest}', `$${Math.round(totalInterestPaid).toLocaleString()}`)
      .replace('${percentage}', ((totalInterestPaid / initialBalance) * 100).toFixed(1))
      .replace('${date}', formatDate(debtFreeDate || startDate));
    return message;
  };

  return (
    <div className="cyber-card p-6">
      <h2 className="text-xl font-semibold text-neon-blue mb-4">{t('timeline.title')}</h2>
      
      <div className="mb-6 grid grid-cols-3 gap-4">
        <div className="p-4 bg-cyber-light rounded-lg border border-neon-blue/20">
          <p className="text-sm text-gray-400">{t('timeline.timeToDebtFree')}</p>
          <p className="text-2xl font-bold text-neon-blue">
            {totalMonths} {t('timeline.months')}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            {Math.floor(totalMonths / 12)} {t('timeline.years')}, {totalMonths % 12} {t('timeline.months')}
          </p>
        </div>
        <div className="p-4 bg-cyber-light rounded-lg border border-neon-blue/20">
          <p className="text-sm text-gray-400">{t('timeline.debtFreeDate')}</p>
          <p className="text-2xl font-bold text-neon-blue">
            {debtFreeDate ? formatDate(debtFreeDate) : '-'}
          </p>
        </div>
        <div className="p-4 bg-cyber-light rounded-lg border border-neon-blue/20">
          <p className="text-sm text-gray-400">{t('timeline.totalInterest')}</p>
          <p className="text-2xl font-bold text-neon-blue">
            ${Math.round(totalInterestPaid).toLocaleString()}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            {((totalInterestPaid / initialBalance) * 100).toFixed(1)}% {t('timeline.ofPrincipal')}
          </p>
        </div>
      </div>

      <div className="h-[300px] text-gray-200">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={schedule}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 243, 255, 0.1)" />
            <XAxis 
              dataKey="date"
              tickFormatter={(date) => formatDate(new Date(date))}
              stroke="#9ca3af"
            />
            <YAxis
              stroke="#9ca3af"
              tickFormatter={(value) => `$${Math.round(value / 1000)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="totalBalance"
              stroke="#00f3ff"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 p-4 bg-cyber-light rounded-lg border border-neon-blue/20">
        <h3 className="font-medium text-neon-blue mb-2">{t('timeline.strategyImpact')}</h3>
        <p className="text-sm text-gray-300">
          {getStrategyImpactMessage()}
        </p>
      </div>
    </div>
  );
}