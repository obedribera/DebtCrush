import React from 'react';
import { Languages } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <button
      onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
      className="fixed top-4 right-4 cyber-button inline-flex items-center gap-2"
    >
      <Languages className="w-4 h-4" />
      {language === 'en' ? 'Español' : 'English'}
    </button>
  );
}