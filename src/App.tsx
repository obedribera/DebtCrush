import React from 'react';
import { DebtForm } from './components/DebtForm';
import { DebtList } from './components/DebtList';
import { StrategySelector } from './components/StrategySelector';
import { PaymentTimeline } from './components/PaymentTimeline';
import { PaymentSchedule } from './components/PaymentSchedule';
import { DebtBreakdown } from './components/DebtBreakdown';
import { LanguageToggle } from './components/LanguageToggle';
import { MotivationalQuote } from './components/MotivationalQuote';
import { AISuggestions } from './components/AISuggestions';
import { PricingPage } from './components/PricingPage';
import { Logo } from './components/Logo';
import { useLanguage } from './contexts/LanguageContext';
import { Debt, PaymentStrategy } from './types/debt';
import { getDefaultStartDate } from './utils/dateUtils';

export default function App() {
  const { t } = useLanguage();
  const [hasAccess, setHasAccess] = React.useState(false);
  const [debts, setDebts] = React.useState<Debt[]>([]);
  const [strategy, setStrategy] = React.useState<PaymentStrategy>('snowball');
  const [monthlyExtra, setMonthlyExtra] = React.useState(0);
  const [startDate, setStartDate] = React.useState(getDefaultStartDate());

  const handleAddDebt = (debt: Debt) => {
    setDebts([...debts, debt]);
  };

  const handleDeleteDebt = (id: string) => {
    setDebts(debts.filter(debt => debt.id !== id));
  };

  if (!hasAccess) {
    return <PricingPage onGetAccess={() => setHasAccess(true)} />;
  }

  return (
    <div className="min-h-screen py-8 px-4 bg-cyber-darker">
      <LanguageToggle />
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex flex-col items-center justify-center gap-3 mb-4">
            <Logo className="animate-pulse-slow" />
            <h1 className="text-5xl font-bold text-white" style={{ fontFamily: 'Orbitron' }}>
              {t('title')}
            </h1>
          </div>
          <p className="text-lg text-gray-400">
            {t('subtitle')}
          </p>
        </div>

        <div className="mb-6">
          <MotivationalQuote />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-6">
            <DebtForm onAddDebt={handleAddDebt} />
            {debts.length > 0 && <AISuggestions debts={debts} />}
            <PaymentTimeline
              debts={debts}
              strategy={strategy}
              monthlyExtra={monthlyExtra}
              startDate={startDate}
            />
            <DebtList debts={debts} onDeleteDebt={handleDeleteDebt} />
          </div>
          
          <div className="lg:col-span-4 space-y-6">
            <StrategySelector
              strategy={strategy}
              monthlyExtra={monthlyExtra}
              startDate={startDate}
              onStrategyChange={setStrategy}
              onMonthlyExtraChange={setMonthlyExtra}
              onStartDateChange={setStartDate}
            />
            <DebtBreakdown debts={debts} />
            {debts.length > 0 && (
              <PaymentSchedule
                debts={debts}
                strategy={strategy}
                monthlyExtra={monthlyExtra}
                startDate={startDate}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}