import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useLanguage } from '../contexts/LanguageContext';
import { PromoCodeInput } from './PromoCodeInput';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

interface PaymentModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export function PaymentModal({ onClose, onSuccess }: PaymentModalProps) {
  const { language } = useLanguage();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [showPromoCode, setShowPromoCode] = React.useState(false);

  const handlePayment = async () => {
    try {
      setLoading(true);
      setError(null);

      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe failed to load');

      const response = await fetch('http://localhost:3000/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: import.meta.env.VITE_STRIPE_PRICE_ID,
          language,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { sessionId } = await response.json();
      const { error: stripeError } = await stripe.redirectToCheckout({
        sessionId,
      });

      if (stripeError) {
        throw new Error(stripeError.message);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="cyber-card p-8 max-w-md w-full mx-4">
        {!showPromoCode ? (
          <>
            <h2 className="text-2xl font-bold text-white mb-6">Complete Your Purchase</h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Lifetime Access Pass</span>
                <div className="text-right">
                  <span className="text-neon-blue font-bold">$12</span>
                  <span className="text-gray-400 text-sm ml-2 line-through">$29</span>
                </div>
              </div>
              <div className="border-t border-neon-blue/20 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Total</span>
                  <span className="text-2xl font-bold text-neon-blue">$12</span>
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-red-900/20 border border-red-500 text-red-400 p-4 rounded-lg mb-6">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <button
                onClick={handlePayment}
                disabled={loading}
                className="cyber-button w-full py-3 text-lg font-semibold hover:scale-105 transition-transform"
              >
                {loading ? 'Processing...' : 'Pay with Stripe'}
              </button>
              <button
                onClick={() => setShowPromoCode(true)}
                className="cyber-button w-full py-2"
              >
                Have a Promo Code?
              </button>
              <button
                onClick={onClose}
                disabled={loading}
                className="w-full py-2 text-gray-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-400">
                Secure payment powered by Stripe
              </p>
            </div>
          </>
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Enter Promo Code</h2>
            <PromoCodeInput
              onSuccess={onSuccess}
              onClose={() => setShowPromoCode(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
}