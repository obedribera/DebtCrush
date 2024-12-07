import { Debt } from '../types/debt';

interface DebtAnalysis {
  highInterestDebts: Debt[];
  consolidationCandidates: Debt[];
  quickWins: Debt[];
  refinancingOpportunities: Debt[];
}

export function analyzeDebts(debts: Debt[]): DebtAnalysis {
  const averageInterestRate = debts.reduce((sum, debt) => sum + debt.interestRate, 0) / debts.length || 0;
  const totalDebt = debts.reduce((sum, debt) => sum + debt.balance, 0);

  return {
    // Debts with significantly higher interest rates than average
    highInterestDebts: debts.filter(debt => 
      debt.interestRate > averageInterestRate * 1.5
    ),

    // Potential consolidation candidates (multiple high-interest debts)
    consolidationCandidates: debts.filter(debt =>
      debt.interestRate > averageInterestRate &&
      debt.balance < totalDebt * 0.3 // Consider smaller debts for consolidation
    ),

    // Quick wins (small balances that can be paid off quickly)
    quickWins: debts.filter(debt =>
      debt.balance < totalDebt * 0.1 &&
      debt.balance < debt.minimumPayment * 6 // Can be paid off in ~6 months
    ),

    // Refinancing opportunities (high-interest, large balance debts)
    refinancingOpportunities: debts.filter(debt =>
      debt.interestRate > averageInterestRate * 1.3 &&
      debt.balance > totalDebt * 0.2
    ),
  };
}

export function generateSuggestions(analysis: DebtAnalysis, language: 'en' | 'es'): string[] {
  const suggestions: string[] = [];
  const messages = {
    en: {
      highInterest: (rate: number) => 
        `Consider prioritizing the debt with ${rate}% interest rate to minimize interest costs.`,
      consolidation: (count: number) => 
        `You have ${count} debts that could be consolidated to potentially lower your interest rates.`,
      quickWin: (name: string, balance: number) => 
        `Focus on paying off ${name} ($${balance}) for a quick motivational win.`,
      refinance: (rate: number) => 
        `Look into refinancing options for your debt with ${rate}% interest rate.`,
    },
    es: {
      highInterest: (rate: number) => 
        `Considera priorizar la deuda con tasa de interés del ${rate}% para minimizar los costos de interés.`,
      consolidation: (count: number) => 
        `Tienes ${count} deudas que podrían consolidarse para potencialmente reducir tus tasas de interés.`,
      quickWin: (name: string, balance: number) => 
        `Concéntrate en pagar ${name} ($${balance}) para una victoria motivacional rápida.`,
      refinance: (rate: number) => 
        `Explora opciones de refinanciamiento para tu deuda con tasa de interés del ${rate}%.`,
    }
  };

  // Add high-interest debt suggestions
  analysis.highInterestDebts.forEach(debt => {
    suggestions.push(messages[language].highInterest(debt.interestRate));
  });

  // Add consolidation suggestions
  if (analysis.consolidationCandidates.length >= 2) {
    suggestions.push(messages[language].consolidation(analysis.consolidationCandidates.length));
  }

  // Add quick win suggestions
  analysis.quickWins.forEach(debt => {
    suggestions.push(messages[language].quickWin(debt.name, Math.round(debt.balance)));
  });

  // Add refinancing suggestions
  analysis.refinancingOpportunities.forEach(debt => {
    suggestions.push(messages[language].refinance(debt.interestRate));
  });

  return suggestions;
}