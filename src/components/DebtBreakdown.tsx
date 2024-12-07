import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { Debt } from '../types/debt';
import { useLanguage } from '../contexts/LanguageContext';

interface DebtBreakdownProps {
  debts: Debt[];
}

const COLORS = [
  '#00f3ff', // neon blue
  '#b400ff', // neon purple
  '#ff00e5', // neon pink
  '#ff3d00', // neon orange
  '#00ff9d', // neon green
  '#ffe600', // neon yellow
];

export function DebtBreakdown({ debts }: DebtBreakdownProps) {
  const { t } = useLanguage();
  const totalDebt = debts.reduce((sum, debt) => sum + debt.balance, 0);
  const totalAnnualInterest = debts.reduce((sum, debt) => 
    sum + (debt.balance * (debt.interestRate / 100)), 0
  );
  
  const data = debts.map((debt, index) => ({
    name: debt.name,
    value: debt.balance,
    percentage: ((debt.balance / totalDebt) * 100).toFixed(1),
    annualInterest: (debt.balance * (debt.interestRate / 100)),
    interestPercentage: ((debt.balance * (debt.interestRate / 100) / totalAnnualInterest) * 100).toFixed(1),
    color: COLORS[index % COLORS.length],
  }));

  if (debts.length === 0) {
    return null;
  }

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="cyber-card p-3 text-white">
          <p className="text-neon-blue font-medium mb-1">{data.name}</p>
          <p>
            {t('addDebt.balance')}: <span className="text-neon-blue font-medium">
              ${data.value.toLocaleString()}
            </span>
          </p>
          <p>
            {t('breakdown.annualInterest')}: <span className="text-neon-blue font-medium">
              ${Math.round(data.annualInterest).toLocaleString()}
            </span>
          </p>
          <p>
            {t('breakdown.totalBalance')}: <span className="text-neon-blue font-medium">
              {data.percentage}%
            </span>
          </p>
          <p>
            {t('breakdown.ofTotalInterest')}: <span className="text-neon-blue font-medium">
              {data.interestPercentage}%
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    name,
    percentage,
  }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius * 1.2;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="#fff"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        className="text-xs"
      >
        {`${name} (${percentage}%)`}
      </text>
    );
  };

  return (
    <div className="cyber-card p-6">
      <h2 className="text-xl font-semibold text-neon-blue mb-4">{t('breakdown.title')}</h2>
      
      <div className="mb-6 grid grid-cols-2 gap-4">
        <div className="p-4 bg-cyber-light rounded-lg border border-neon-blue/20">
          <p className="text-sm text-gray-400">{t('breakdown.totalBalance')}</p>
          <p className="text-2xl font-bold text-neon-blue">
            ${totalDebt.toLocaleString()}
          </p>
        </div>
        <div className="p-4 bg-cyber-light rounded-lg border border-neon-blue/20">
          <p className="text-sm text-gray-400">{t('breakdown.annualInterest')}</p>
          <p className="text-2xl font-bold text-neon-blue">
            ${Math.round(totalAnnualInterest).toLocaleString()}
          </p>
        </div>
      </div>
      
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={120}
              label={renderCustomizedLabel}
              labelLine={{
                stroke: '#ffffff50',
                strokeWidth: 1,
              }}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={entry.name} 
                  fill={entry.color}
                  stroke="rgba(0,0,0,0.3)"
                  strokeWidth={1}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 space-y-4">
        <h3 className="text-lg font-medium text-neon-blue">{t('breakdown.interestBreakdown')}</h3>
        <div className="space-y-2">
          {data.map((debt) => (
            <div key={debt.name} className="flex justify-between items-center p-2 bg-cyber-light rounded border border-neon-blue/20">
              <div className="flex items-center">
                <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: debt.color }}
                />
                <span className="text-gray-300">{debt.name}</span>
              </div>
              <div className="text-right">
                <p className="text-neon-blue font-medium">
                  ${Math.round(debt.annualInterest).toLocaleString()}/year
                </p>
                <p className="text-sm text-gray-400">
                  {debt.interestPercentage}% {t('breakdown.ofTotalInterest')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}