import React from 'react';
import { PaymentStrategy } from '../types/debt';
import { formatDate } from '../utils/dateUtils';
import { useLanguage } from '../contexts/LanguageContext';

interface StrategySelectorProps {
  strategy: PaymentStrategy;
  monthlyExtra: number;
  startDate: Date;
  onStrategyChange: (strategy: PaymentStrategy) => void;
  onMonthlyExtraChange: (amount: number) => void;
  onStartDateChange: (date: Date) => void;
}

export function StrategySelector({
  strategy,
  monthlyExtra,
  startDate,
  onStrategyChange,
  onMonthlyExtraChange,
  onStartDateChange,
}: StrategySelectorProps) {
  const { t } = useLanguage();
  
  const handleMonthlyExtraChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === '' ? 0 : parseFloat(e.target.value);
    onMonthlyExtraChange(isNaN(value) ? 0 : value);
  };

  return (
    <div className="cyber-card p-6">
      <h2 className="text-xl font-semibold text-neon-blue mb-4">{t('strategy.title')}</h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            {t('strategy.startDate')}
          </label>
          <input
            type="date"
            value={startDate.toISOString().split('T')[0]}
            onChange={(e) => onStartDateChange(new Date(e.target.value))}
            min={new Date().toISOString().split('T')[0]}
            className="cyber-input w-full"
          />
          <p className="mt-1 text-sm text-gray-400">
            {formatDate(startDate)}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            {t('strategy.extraPayment')}
          </label>
          <div className="mt-1 relative rounded-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-400 sm:text-sm">$</span>
            </div>
            <input
              type="number"
              min="0"
              step="10"
              value={monthlyExtra || ''}
              onChange={handleMonthlyExtraChange}
              className="cyber-input w-full pl-7"
              placeholder="0.00"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300 mb-3">
            {t('strategy.method')}
          </label>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => onStrategyChange('snowball')}
              className={`cyber-button ${
                strategy === 'snowball' ? 'cyber-button-active' : ''
              }`}
            >
              {t('strategy.snowball')}
            </button>
            <button
              onClick={() => onStrategyChange('avalanche')}
              className={`cyber-button ${
                strategy === 'avalanche' ? 'cyber-button-active' : ''
              }`}
            >
              {t('strategy.avalanche')}
            </button>
          </div>
          <p className="text-sm text-gray-400 mt-3">
            {strategy === 'snowball'
              ? t('strategy.snowballDesc')
              : t('strategy.avalancheDesc')}
          </p>
        </div>
      </div>
    </div>
  );
}