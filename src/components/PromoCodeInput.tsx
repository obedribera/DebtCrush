import React from 'react';
import { validatePromoCode, usePromoCode } from '../utils/promoCodes';
import { useLanguage } from '../contexts/LanguageContext';

interface PromoCodeInputProps {
  onSuccess: () => void;
  onClose: () => void;
}

export function PromoCodeInput({ onSuccess, onClose }: PromoCodeInputProps) {
  const { t } = useLanguage();
  const [code, setCode] = React.useState('');
  const [error, setError] = React.useState('');
  const [isValidating, setIsValidating] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsValidating(true);
    setError('');

    if (validatePromoCode(code)) {
      if (usePromoCode(code)) {
        onSuccess();
      } else {
        setError('Failed to apply promo code');
      }
    } else {
      setError('This code is invalid or a code has already been used on this device');
    }
    setIsValidating(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Enter Influencer Code
        </label>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          className="cyber-input w-full"
          placeholder="DEBTFREE2024"
        />
      </div>

      {error && (
        <p className="text-red-400 text-sm">{error}</p>
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isValidating || !code}
          className="cyber-button flex-1"
        >
          {isValidating ? 'Validating...' : 'Apply Code'}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors"
        >
          Cancel
        </button>
      </div>

      <p className="text-sm text-gray-400 mt-4">
        Note: Each device can only use one promo code.
      </p>
    </form>
  );
}