import React from 'react';
import { Trash2 } from 'lucide-react';
import { Debt } from '../types/debt';
import { useLanguage } from '../contexts/LanguageContext';

interface DebtListProps {
  debts: Debt[];
  onDeleteDebt: (id: string) => void;
}

export function DebtList({ debts, onDeleteDebt }: DebtListProps) {
  const { t } = useLanguage();
  const totalDebt = debts.reduce((sum, debt) => sum + debt.balance, 0);

  return (
    <div className="cyber-card p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-neon-blue">{t('debts.title')}</h2>
        <div className="text-right">
          <p className="text-sm text-gray-400">{t('debts.totalDebt')}</p>
          <p className="text-lg font-bold text-neon-blue">${totalDebt.toLocaleString()}</p>
        </div>
      </div>
      
      <div className="space-y-4">
        {debts.map((debt) => (
          <div
            key={debt.id}
            className="flex items-center justify-between p-4 border border-neon-blue/20 rounded-lg hover:bg-cyber-light/50 transition-colors"
          >
            <div className="flex-1">
              <h3 className="font-medium text-gray-200">{debt.name}</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2 text-sm text-gray-400">
                <div>
                  <p className="font-medium">{t('addDebt.balance')}</p>
                  <p>${debt.balance.toLocaleString()}</p>
                </div>
                <div>
                  <p className="font-medium">{t('addDebt.interestRate')}</p>
                  <p>{debt.interestRate}%</p>
                </div>
                <div>
                  <p className="font-medium">{t('addDebt.minimumPayment')}</p>
                  <p>${debt.minimumPayment}</p>
                </div>
                <div>
                  <p className="font-medium">{t('addDebt.dueDate')}</p>
                  <p>{debt.dueDate.toString().padStart(2, '0')}<sup>th</sup></p>
                </div>
              </div>
            </div>
            <button
              onClick={() => onDeleteDebt(debt.id)}
              className="ml-4 p-2 text-gray-400 hover:text-red-500"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
        
        {debts.length === 0 && (
          <p className="text-center text-gray-500 py-4">{t('debts.noDebts')}</p>
        )}
      </div>
    </div>
  );
}