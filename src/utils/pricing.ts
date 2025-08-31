import { Service } from '../types';

export const calculateDynamicPrice = (service: Service, quantity: number): number => {
  if (service.type === 'cantidad' && service.quantityBreaks) {
    // Find the best price tier for the quantity
    const applicableTier = service.quantityBreaks
      .filter(tier => quantity >= tier.quantity)
      .sort((a, b) => b.quantity - a.quantity)[0];
    
    if (applicableTier) {
      return Math.round(applicableTier.pricePerUnit * quantity);
    }
  }
  
  if (service.type === 'tiers' || service.type === 'subscription') {
    // For tiers and subscriptions, return the selected tier price
    return service.unit_price;
  }
  
  // Default calculation
  if (service.type === 'cantidad') {
    return Math.round(service.unit_price * quantity);
  }
  
  return service.unit_price;
};

export const getCurrentPricePerUnit = (service: Service, quantity: number): number => {
  if (service.type === 'cantidad' && service.quantityBreaks) {
    const applicableTier = service.quantityBreaks
      .filter(tier => quantity >= tier.quantity)
      .sort((a, b) => b.quantity - a.quantity)[0];
    
    if (applicableTier) {
      return applicableTier.pricePerUnit;
    }
  }
  
  return service.unit_price;
};

export const getDiscountPercentage = (service: Service, quantity: number): number => {
  if (service.type === 'cantidad' && service.quantityBreaks) {
    const applicableTier = service.quantityBreaks
      .filter(tier => quantity >= tier.quantity)
      .sort((a, b) => b.quantity - a.quantity)[0];
    
    if (applicableTier && applicableTier.discount) {
      return applicableTier.discount;
    }
  }
  
  return 0;
};

export const getNextDiscountTier = (service: Service, currentQuantity: number): { quantity: number; discount: number; pricePerUnit: number } | null => {
  if (service.type === 'cantidad' && service.quantityBreaks) {
    const nextTier = service.quantityBreaks
      .filter(tier => tier.quantity > currentQuantity)
      .sort((a, b) => a.quantity - b.quantity)[0];
    
    if (nextTier) {
      return {
        quantity: nextTier.quantity,
        discount: nextTier.discount || 0,
        pricePerUnit: nextTier.pricePerUnit
      };
    }
  }
  
  return null;
};
