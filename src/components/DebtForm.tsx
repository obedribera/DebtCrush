import React from 'react';
import { PlusCircle } from 'lucide-react';
import { Debt } from '../types/debt';
import { useLanguage } from '../contexts/LanguageContext';

interface DebtFormProps {
  onAddDebt: (debt: Debt) => void;
}

export function DebtForm({ onAddDebt }: DebtFormProps) {
  const { t } = useLanguage();
  const [formData, setFormData] = React.useState<Omit<Debt, 'id'>>({
    name: '',
    balance: 0,
    interestRate: 0,
    minimumPayment: 0,
    dueDate: 1,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddDebt({
      ...formData,
      id: crypto.randomUUID(),
    });
    setFormData({
      name: '',
      balance: 0,
      interestRate: 0,
      minimumPayment: 0,
      dueDate: 1,
    });
  };

  const handleNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof Omit<Debt, 'id' | 'name'>
  ) => {
    const value = e.target.value === '' ? '' : Number(e.target.value);
    setFormData(prev => ({
      ...prev,
      [field]: value === '' ? 0 : value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="cyber-card p-6">
      <h2 className="text-xl font-semibold text-neon-blue mb-4">{t('addDebt.title')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="md:col-span-2 lg:col-span-1">
          <label className="block text-sm font-medium text-gray-300">{t('addDebt.name')}</label>
          <input
            type="text"
            required
            className="cyber-input w-full"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder={t('addDebt.placeholder.name')}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">{t('addDebt.balance')} ($)</label>
          <input
            type="number"
            required
            min="0"
            step="0.01"
            className="cyber-input w-full"
            value={formData.balance || ''}
            onChange={(e) => handleNumberChange(e, 'balance')}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">{t('addDebt.interestRate')} (%)</label>
          <input
            type="number"
            min="0"
            step="0.01"
            className="cyber-input w-full"
            value={formData.interestRate || ''}
            onChange={(e) => handleNumberChange(e, 'interestRate')}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">{t('addDebt.minimumPayment')} ($)</label>
          <input
            type="number"
            required
            min="0"
            step="0.01"
            className="cyber-input w-full"
            value={formData.minimumPayment || ''}
            onChange={(e) => handleNumberChange(e, 'minimumPayment')}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">{t('addDebt.dueDate')}</label>
          <input
            type="number"
            required
            min="1"
            max="31"
            className="cyber-input w-full"
            value={formData.dueDate || ''}
            onChange={(e) => handleNumberChange(e, 'dueDate')}
            placeholder={t('addDebt.placeholder.dueDate')}
          />
        </div>
      </div>
      <button
        type="submit"
        className="cyber-button mt-4 inline-flex items-center"
      >
        <PlusCircle className="w-4 h-4 mr-2" />
        {t('addDebt.addButton')}
      </button>
    </form>
  );
}