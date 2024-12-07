import React from 'react';
import { Quote } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { quotes } from '../utils/quotes';

export function MotivationalQuote() {
  const { language } = useLanguage();
  const currentMonth = new Date().getMonth();
  const quote = quotes[language][currentMonth];

  return (
    <div className="cyber-card p-6">
      <div className="flex items-start gap-4">
        <Quote className="w-8 h-8 text-neon-blue flex-shrink-0" />
        <div>
          <p className="text-gray-200 text-lg italic mb-2">{quote.text}</p>
          <p className="text-neon-blue">— {quote.author}</p>
        </div>
      </div>
    </div>
  );
}