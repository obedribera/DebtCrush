import { Language } from '../i18n/translations';

export interface PromoCode {
  code: string;
  influencer: string;
}

// Storage key for used promo code
const USED_PROMO_KEY = 'debtCrush_usedPromoCode';

// Get the used promo code from localStorage
function getUsedPromoCode(): string | null {
  return localStorage.getItem(USED_PROMO_KEY);
}

// Mark a code as used
function markCodeAsUsed(code: string): void {
  localStorage.setItem(USED_PROMO_KEY, code.toLowerCase());
}

// Check if any promo code has been used on this computer
function hasUsedAnyCode(): boolean {
  return getUsedPromoCode() !== null;
}

// List of valid promo codes
export const promoCodes: PromoCode[] = [
  // Financial Influencers
  { code: 'DEBTFREE2024', influencer: 'Financial Freedom' },
  { code: 'MONEYWISE', influencer: 'Money Mentor' },
  { code: 'SAVESMART', influencer: 'Smart Saver' },
  { code: 'WEALTHPRO', influencer: 'Wealth Builder' },
  { code: 'FINANCEACE', influencer: 'Finance Ace' },
  
  // Personal Finance Bloggers
  { code: 'BUDGETPRO', influencer: 'Budget Master' },
  { code: 'DEBTSLAYER', influencer: 'Debt Destroyer' },
  { code: 'MONEYHACK', influencer: 'Money Hacker' },
  { code: 'SAVEMORE', influencer: 'Savings Expert' },
  { code: 'RICHLIFE', influencer: 'Rich Living' },
  
  // Financial Advisors
  { code: 'WEALTHTIP', influencer: 'Wealth Tips' },
  { code: 'MONEYGOAL', influencer: 'Money Goals' },
  { code: 'SMARTCASH', influencer: 'Smart Cash' },
  { code: 'DEBTFREE', influencer: 'Debt Freedom' },
  { code: 'SAVVYPRO', influencer: 'Savvy Pro' },
  
  // Spanish Language Influencers
  { code: 'LIBERTAD', influencer: 'Libertad Financiera' },
  { code: 'DINERO24', influencer: 'Dinero Inteligente' },
  { code: 'AHORRO', influencer: 'Ahorro Total' },
  { code: 'FINANZAS', influencer: 'Finanzas Pro' },
  { code: 'EXITO24', influencer: 'Éxito Financiero' },
  
  // Financial Education
  { code: 'LEARN2024', influencer: 'Financial Learning' },
  { code: 'EDUFINANCE', influencer: 'Finance Education' },
  { code: 'WISEMONEY', influencer: 'Money Wisdom' },
  { code: 'DEBTWISE', influencer: 'Debt Wisdom' },
  { code: 'SMARTPLAN', influencer: 'Smart Planning' },
  
  // Financial Coaches
  { code: 'COACH2024', influencer: 'Money Coach' },
  { code: 'GUIDANCE', influencer: 'Financial Guide' },
  { code: 'MENTOR24', influencer: 'Money Mentor' },
  { code: 'EXPERTPRO', influencer: 'Finance Expert' },
  { code: 'ADVISOR24', influencer: 'Wealth Advisor' },
  
  // Debt Freedom Community
  { code: 'COMMUNITY', influencer: 'Debt Community' },
  { code: 'TOGETHER', influencer: 'Better Together' },
  { code: 'SUPPORT24', influencer: 'Debt Support' },
  { code: 'JOURNEY24', influencer: 'Debt Journey' },
  { code: 'FREEDOM24', influencer: 'Financial Freedom' },
  
  // Early Access
  { code: 'EARLY2024', influencer: 'Early Access' },
  { code: 'PREVIEW24', influencer: 'Preview Access' },
  { code: 'BETA2024', influencer: 'Beta Access' },
  { code: 'SPECIAL24', influencer: 'Special Access' },
  { code: 'VIP2024', influencer: 'VIP Access' },
  
  // Social Media
  { code: 'INSTA24', influencer: 'Instagram Pro' },
  { code: 'TIKTOK24', influencer: 'TikTok Finance' },
  { code: 'YOUTUBE24', influencer: 'YouTube Expert' },
  { code: 'TWITTER24', influencer: 'Twitter Finance' },
  { code: 'SOCIAL24', influencer: 'Social Finance' },
  
  // Limited Time Offers
  { code: 'LAUNCH24', influencer: 'Launch Special' },
  { code: 'SPRING24', influencer: 'Spring Special' },
  { code: 'SUMMER24', influencer: 'Summer Deal' },
  { code: 'FALL2024', influencer: 'Fall Offer' },
  { code: 'WINTER24', influencer: 'Winter Special' }
];

export function validatePromoCode(code: string): boolean {
  // Check if any code has been used on this computer
  if (hasUsedAnyCode()) {
    return false;
  }

  // Check if the code exists
  return promoCodes.some(
    (promo) => promo.code.toLowerCase() === code.toLowerCase()
  );
}

export function usePromoCode(code: string): boolean {
  if (!validatePromoCode(code)) {
    return false;
  }

  markCodeAsUsed(code);
  return true;
}

export function getUsedPromoCodeInfo(): { code: string; influencer: string } | null {
  const usedCode = getUsedPromoCode();
  if (!usedCode) return null;

  const promoCode = promoCodes.find(
    (promo) => promo.code.toLowerCase() === usedCode.toLowerCase()
  );

  return promoCode || null;
}