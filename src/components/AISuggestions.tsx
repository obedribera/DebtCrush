import React from 'react';
import { Lightbulb } from 'lucide-react';
import { Debt } from '../types/debt';
import { analyzeDebts, generateSuggestions } from '../utils/aiSuggestions';
import { useLanguage } from '../contexts/LanguageContext';

interface AISuggestionsProps {
  debts: Debt[];
}

export function AISuggestions({ debts }: AISuggestionsProps) {
  const { language, t } = useLanguage();
  const [currentSuggestion, setCurrentSuggestion] = React.useState(0);

  const analysis = React.useMemo(() => analyzeDebts(debts), [debts]);
  const suggestions = React.useMemo(
    () => generateSuggestions(analysis, language),
    [analysis, language]
  );

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSuggestion(current => 
        suggestions.length > 0 ? (current + 1) % suggestions.length : 0
      );
    }, 8000); // Rotate suggestions every 8 seconds

    return () => clearInterval(timer);
  }, [suggestions.length]);

  if (suggestions.length === 0) return null;

  return (
    <div className="cyber-card p-6 relative overflow-hidden">
      <div className="flex items-start gap-4">
        <Lightbulb className="w-6 h-6 text-neon-blue flex-shrink-0 animate-pulse" />
        <div>
          <h3 className="text-lg font-semibold text-neon-blue mb-2">
            {t('suggestions.title')}
          </h3>
          <p className="text-gray-200">
            {suggestions[currentSuggestion]}
          </p>
        </div>
      </div>
      {suggestions.length > 1 && (
        <div className="flex justify-center gap-1 mt-4">
          {suggestions.map((_, index) => (
            <div
              key={index}
              className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                index === currentSuggestion ? 'bg-neon-blue' : 'bg-gray-600'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}