import React from 'react';
import { Shield, Zap, Infinity, ArrowRight, PieChart, LineChart, Calculator, Clock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Logo } from './Logo';
import { PaymentModal } from './PaymentModal';
import { LanguageToggle } from './LanguageToggle';

interface PricingPageProps {
  onGetAccess: () => void;
}

export function PricingPage({ onGetAccess }: PricingPageProps) {
  const { t } = useLanguage();
  const [showPayment, setShowPayment] = React.useState(false);
  
  return (
    <div className="min-h-screen py-12 px-4 bg-cyber-darker">
      <LanguageToggle />
      
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="flex flex-col items-center justify-center gap-3 mb-4">
            <Logo className="animate-pulse-slow" />
            <h1 className="text-6xl font-bold mb-6 text-white" style={{ fontFamily: 'Orbitron' }}>
              {t('title')}
            </h1>
          </div>
          <p className="text-2xl text-neon-blue mb-4">
            {t('landing.hero.tagline')}
          </p>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {t('landing.hero.description')}
          </p>
        </div>

        {/* Feature Highlights */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          <div className="cyber-card p-6 flex flex-col items-center text-center group hover:scale-105 transition-transform">
            <PieChart className="w-12 h-12 text-neon-blue mb-4 group-hover:animate-pulse" />
            <h3 className="text-lg font-semibold text-white mb-2">{t('landing.features.aiAnalysis.title')}</h3>
            <p className="text-gray-400">{t('landing.features.aiAnalysis.description')}</p>
          </div>
          <div className="cyber-card p-6 flex flex-col items-center text-center group hover:scale-105 transition-transform">
            <LineChart className="w-12 h-12 text-neon-purple mb-4 group-hover:animate-pulse" />
            <h3 className="text-lg font-semibold text-white mb-2">{t('landing.features.visualProgress.title')}</h3>
            <p className="text-gray-400">{t('landing.features.visualProgress.description')}</p>
          </div>
          <div className="cyber-card p-6 flex flex-col items-center text-center group hover:scale-105 transition-transform">
            <Calculator className="w-12 h-12 text-neon-pink mb-4 group-hover:animate-pulse" />
            <h3 className="text-lg font-semibold text-white mb-2">{t('landing.features.smartStrategies.title')}</h3>
            <p className="text-gray-400">{t('landing.features.smartStrategies.description')}</p>
          </div>
          <div className="cyber-card p-6 flex flex-col items-center text-center group hover:scale-105 transition-transform">
            <Clock className="w-12 h-12 text-[#00ff9d] mb-4 group-hover:animate-pulse" />
            <h3 className="text-lg font-semibold text-white mb-2">{t('landing.features.paymentMastery.title')}</h3>
            <p className="text-gray-400">{t('landing.features.paymentMastery.description')}</p>
          </div>
        </div>

        {/* Example Dashboard */}
        <div className="cyber-card p-8 mb-20">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">{t('landing.dashboard.title')}</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-neon-blue mb-4">{t('landing.dashboard.tracking.title')}</h3>
              <div className="space-y-4">
                <div className="bg-cyber-light p-4 rounded-lg transform hover:scale-102 transition-transform">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300">{t('landing.dashboard.tracking.creditCard')}</span>
                    <span className="text-neon-blue">$5,000</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-neon-blue h-2 rounded-full animate-pulse" style={{ width: '75%' }}></div>
                  </div>
                </div>
                <div className="bg-cyber-light p-4 rounded-lg transform hover:scale-102 transition-transform">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300">{t('landing.dashboard.tracking.carLoan')}</span>
                    <span className="text-neon-purple">$15,000</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-neon-purple h-2 rounded-full animate-pulse" style={{ width: '90%' }}></div>
                  </div>
                </div>
                <div className="bg-cyber-light p-4 rounded-lg transform hover:scale-102 transition-transform">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300">{t('landing.dashboard.tracking.personalLoan')}</span>
                    <span className="text-neon-pink">$3,000</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-neon-pink h-2 rounded-full animate-pulse" style={{ width: '40%' }}></div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-neon-blue mb-4">{t('landing.dashboard.insights.title')}</h3>
              <div className="bg-cyber-light p-6 rounded-lg">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-gray-400 text-sm">{t('landing.dashboard.insights.pathToFreedom')}</p>
                    <p className="text-2xl font-bold text-white">36 {t('landing.dashboard.insights.months')}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">{t('landing.dashboard.insights.projectedSavings')}</p>
                    <p className="text-2xl font-bold text-neon-blue">$2,845</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-300 text-sm">{t('landing.dashboard.insights.strategyOptimization')}</p>
                  <div className="w-full bg-cyber-dark rounded-full h-4">
                    <div className="bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink h-4 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>{t('landing.dashboard.insights.current')}</span>
                    <span>{t('landing.dashboard.insights.optimized')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Card */}
        <div className="max-w-2xl mx-auto">
          <div className="cyber-card p-8 backdrop-blur-lg border-2 border-neon-blue/30 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/10 to-neon-purple/10" />
            
            <div className="relative z-10">
              <div className="bg-cyber-light/50 px-4 py-2 rounded-full inline-block mb-8">
                <span className="text-neon-blue font-semibold">{t('landing.pricing.special')}</span>
              </div>

              <h2 className="text-4xl font-bold text-white mb-6">
                {t('landing.pricing.title')}
              </h2>

              <div className="flex justify-center items-baseline mb-8 gap-2">
                <span className="text-6xl font-bold text-white">{t('landing.pricing.price')}</span>
                <span className="text-gray-400 text-xl ml-2">{t('landing.pricing.oneTime')}</span>
                <span className="text-gray-400 text-xl line-through ml-2">{t('landing.pricing.originalPrice')}</span>
              </div>

              <div className="space-y-6 mb-8">
                <div className="flex items-center gap-3 text-gray-200">
                  <Shield className="w-5 h-5 text-neon-blue" />
                  <span>{t('landing.pricing.features.ai')}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-200">
                  <Zap className="w-5 h-5 text-neon-blue" />
                  <span>{t('landing.pricing.features.realTime')}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-200">
                  <Infinity className="w-5 h-5 text-neon-blue" />
                  <span>{t('landing.pricing.features.unlimited')}</span>
                </div>
              </div>

              <button
                onClick={() => setShowPayment(true)}
                className="cyber-button w-full py-4 text-lg font-semibold inline-flex items-center justify-center gap-2 group hover:scale-105 transition-transform"
              >
                {t('landing.pricing.cta')}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <p className="text-gray-400 text-sm mt-4 text-center">
                {t('landing.pricing.guarantee')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {showPayment && (
        <PaymentModal
          onClose={() => setShowPayment(false)}
          onSuccess={onGetAccess}
        />
      )}
    </div>
  );
}