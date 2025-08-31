import React, { useState } from 'react';
import { ShoppingCart, Crown, Coins, Clock, Gift, Percent, CreditCard, Shield, Trophy, Users, Zap, Gamepad2, GraduationCap, TrendingUp } from 'lucide-react';
import { Service, PricingTier } from '../types';
import { calculateDynamicPrice, getCurrentPricePerUnit, getDiscountPercentage, getNextDiscountTier } from '../utils/pricing';

interface ServiceCardProps {
  service: Service;
  onSelect: (service: Service, quantity?: number) => void;
}

const getServiceIcon = (subcategory: string) => {
  switch (subcategory) {
    case 'currency':
      return <Coins className="w-6 h-6" />;
    case 'giftcard':
      return <CreditCard className="w-6 h-6" />;
    case 'subscription':
      return <Shield className="w-6 h-6" />;
    case 'boosting':
      return <Trophy className="w-6 h-6" />;
    case 'accounts':
      return <Users className="w-6 h-6" />;
    case 'battlepass':
      return <Zap className="w-6 h-6" />;
    case 'streaming':
      return <Gamepad2 className="w-6 h-6" />;
    case 'coaching':
      return <GraduationCap className="w-6 h-6" />;
    case 'followers':
      return <Users className="w-6 h-6" />;
    case 'verification':
      return <Shield className="w-6 h-6" />;
    case 'recovery':
      return <Shield className="w-6 h-6" />;
    case 'protection':
      return <Shield className="w-6 h-6" />;
    default:
      return <TrendingUp className="w-6 h-6" />;
  }
};

const getSubcategoryColor = (subcategory: string, isGameService: boolean) => {
  if (isGameService) {
    switch (subcategory) {
      case 'currency': return 'from-purple-500 to-purple-600';
      case 'giftcard': return 'from-indigo-500 to-indigo-600';
      case 'subscription': return 'from-violet-500 to-violet-600';
      case 'boosting': return 'from-pink-500 to-pink-600';
      case 'accounts': return 'from-purple-600 to-purple-700';
      case 'battlepass': return 'from-indigo-600 to-indigo-700';
      case 'streaming': return 'from-violet-600 to-violet-700';
      case 'coaching': return 'from-pink-600 to-pink-700';
      default: return 'from-purple-500 to-purple-600';
    }
  } else {
    switch (subcategory) {
      case 'followers': return 'from-blue-500 to-blue-600';
      case 'verification': return 'from-green-500 to-green-600';
      case 'recovery': return 'from-orange-500 to-orange-600';
      case 'protection': return 'from-red-500 to-red-600';
      default: return 'from-orange-500 to-orange-600';
    }
  }
};

const getGlowColor = (subcategory: string, isGameService: boolean) => {
  if (isGameService) {
    switch (subcategory) {
      case 'currency': return 'glow-purple';
      case 'giftcard': return 'glow-blue';
      case 'subscription': return 'glow-purple';
      case 'boosting': return 'glow-purple';
      case 'accounts': return 'glow-purple';
      case 'battlepass': return 'glow-blue';
      case 'streaming': return 'glow-purple';
      case 'coaching': return 'glow-purple';
      default: return 'glow-purple';
    }
  } else {
    switch (subcategory) {
      case 'followers': return 'glow-blue';
      case 'verification': return 'glow-green';
      case 'recovery': return 'glow-orange';
      case 'protection': return 'glow-orange';
      default: return 'glow-orange';
    }
  }
};

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onSelect }) => {
  const [quantity, setQuantity] = useState(service.minQuantity || 100);
  const [selectedTier, setSelectedTier] = useState<PricingTier | null>(
    service.pricingTiers ? service.pricingTiers[0] : null
  );
  const [quantityError, setQuantityError] = useState('');

  const isGameService = service.category === 'games';
  const gradientColor = getSubcategoryColor(service.subcategory, isGameService);
  const glowClass = getGlowColor(service.subcategory, isGameService);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const calculateTotal = () => {
    if (service.type === 'tiers' || service.type === 'subscription') {
      return selectedTier ? selectedTier.price : service.unit_price;
    }
    if (service.type === 'cantidad' && quantity) {
      return calculateDynamicPrice(service, quantity);
    }
    return service.unit_price;
  };

  const validateQuantity = (value: number) => {
    if (service.minQuantity && value < service.minQuantity) {
      setQuantityError(`Mínimo ${service.minQuantity.toLocaleString()} unidades`);
      return false;
    }
    if (service.maxQuantity && value > service.maxQuantity) {
      setQuantityError(`Máximo ${service.maxQuantity.toLocaleString()} unidades`);
      return false;
    }
    setQuantityError('');
    return true;
  };

  const handleQuantityChange = (value: number) => {
    setQuantity(value);
    validateQuantity(value);
  };

  const handlePurchase = () => {
    if (service.type === 'cantidad') {
      if (!validateQuantity(quantity)) return;
      onSelect(service, quantity);
    } else if (service.type === 'tiers' || service.type === 'subscription') {
      onSelect(service, selectedTier?.value);
    } else {
      onSelect(service);
    }
  };

  const getStepSize = () => {
    if (service.subcategory === 'currency') {
      // Para monedas virtuales, pasos más pequeños
      if (service.id === 'G002') return 10; // Free Fire diamantes
      if (service.id === 'G001') return 50; // Robux
      return 25;
    }
    return 100; // Para otros servicios
  };

  return (
    <div className="group relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-black rounded-3xl"></div>
      <div className={`absolute inset-0 bg-gradient-to-br ${gradientColor.replace('from-', 'from-').replace('to-', 'to-')}/5 via-transparent to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-700`}></div>
      
      {/* Enhanced glow effect */}
      <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${gradientColor}/20 blur-xl opacity-0 group-hover:opacity-40 transition-all duration-500 -z-10`}></div>
      
      <div className="relative card-gradient rounded-3xl p-6 border border-white/10 hover:border-orange-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-600/20 transform hover:-translate-y-2 hover:scale-[1.02] backdrop-blur-md">
        
        {/* Service Image */}
        {service.image && (
          <div className="relative mb-6 overflow-hidden rounded-2xl">
            <img 
              src={service.image} 
              alt={service.name}
              className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div className="absolute top-3 left-3">
              <div className={`p-2 rounded-xl backdrop-blur-md border bg-gradient-to-r ${gradientColor}/20 border-white/20`}>
                {getServiceIcon(service.subcategory)}
              </div>
            </div>
            <div className="absolute top-3 right-3 text-2xl filter drop-shadow-lg">
              {service.emoji}
            </div>
            <div className="absolute bottom-3 left-3 right-3">
              <div className="glass-effect rounded-lg px-3 py-1 border border-white/20">
                <p className="text-white text-xs font-bold truncate">{service.note}</p>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {/* Service Info */}
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-2xl filter drop-shadow-lg">{service.emoji}</span>
              <h3 className="text-white font-bold text-lg group-hover:text-orange-100 transition-colors duration-300 leading-tight">
                {service.name}
              </h3>
            </div>
          </div>

          {/* Pricing Section */}
          <div className="space-y-4">
            {service.type === 'cantidad' ? (
              <div className="space-y-4">
                <div className="glass-effect rounded-xl p-4 border border-white/10 backdrop-blur-md">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-gray-200 font-semibold flex items-center space-x-2">
                      <Coins className="w-4 h-4 text-orange-500" />
                      <span>Cantidad:</span>
                    </span>
                    <div className="text-right">
                      <input
                        type="number"
                        value={quantity}
                        onChange={(e) => handleQuantityChange(Math.max(1, parseInt(e.target.value) || 1))}
                        className={`w-28 px-3 py-2 glass-effect border rounded-lg text-white text-center focus:outline-none focus:ring-2 font-bold transition-all duration-300 text-sm ${
                          quantityError 
                            ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                            : 'border-white/20 focus:border-orange-500 focus:ring-orange-500/20'
                        }`}
                        min={service.minQuantity || 1}
                        max={service.maxQuantity}
                        step={getStepSize()}
                      />
                    </div>
                  </div>
                  {quantityError && (
                    <p className="text-red-400 text-xs mt-2 font-medium">{quantityError}</p>
                  )}
                  {service.minQuantity && service.maxQuantity && (
                    <p className="text-gray-400 text-xs mt-2 text-center">
                      Rango: {service.minQuantity.toLocaleString()} - {service.maxQuantity.toLocaleString()}
                    </p>
                  )}
                </div>
                
                {/* Dynamic pricing info */}
                {getDiscountPercentage(service, quantity) > 0 && (
                  <div className="glass-effect rounded-lg p-3 border border-green-500/20 bg-green-500/5">
                    <div className="flex items-center justify-center space-x-2 text-green-400">
                      <Percent className="w-4 h-4" />
                      <span className="text-sm font-semibold">
                        ¡{getDiscountPercentage(service, quantity)}% de descuento aplicado!
                      </span>
                    </div>
                  </div>
                )}
                
                <div className={`text-center p-6 bg-gradient-to-r ${gradientColor}/10 rounded-2xl border border-white/10 backdrop-blur-sm`}>
                  <div className="space-y-2">
                    <span className={`text-3xl font-black bg-gradient-to-r ${gradientColor.replace('from-', 'from-').replace('to-', 'to-')} bg-clip-text text-transparent`}>
                      {formatPrice(calculateTotal())}
                    </span>
                    <p className="text-gray-300 text-sm font-medium">
                      {formatPrice(getCurrentPricePerUnit(service, quantity))} por unidad
                    </p>
                    {getNextDiscountTier(service, quantity) && (
                      <p className="text-orange-400 text-xs font-medium">
                        Compra {getNextDiscountTier(service, quantity)!.quantity.toLocaleString()} para {getNextDiscountTier(service, quantity)!.discount}% descuento
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ) : service.type === 'tiers' || service.type === 'subscription' ? (
              <div className="space-y-4">
                <div className="glass-effect rounded-xl p-4 border border-white/10 backdrop-blur-md">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-gray-200 font-semibold flex items-center space-x-2">
                      {service.type === 'subscription' ? (
                        <>
                          <Clock className="w-4 h-4 text-orange-500" />
                          <span>Duración:</span>
                        </>
                      ) : (
                        <>
                          <Gift className="w-4 h-4 text-orange-500" />
                          <span>Valor:</span>
                        </>
                      )}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {service.pricingTiers?.map((tier, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedTier(tier)}
                        className={`p-3 rounded-lg border transition-all duration-300 text-sm font-semibold ${
                          selectedTier?.value === tier.value
                            ? `border-orange-500 bg-gradient-to-r ${gradientColor}/20 text-white`
                            : 'border-white/20 glass-effect text-gray-300 hover:border-orange-500/50'
                        }`}
                      >
                        <div className="text-center">
                          <div className="font-bold text-xs sm:text-sm">{tier.label}</div>
                          <div className="text-xs text-gray-400 mt-1">
                            {formatPrice(tier.price)}
                          </div>
                          {tier.discount && (
                            <div className="text-xs text-green-400 mt-1">
                              -{tier.discount}%
                            </div>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className={`text-center p-6 bg-gradient-to-r ${gradientColor}/10 rounded-2xl border border-white/10 backdrop-blur-sm`}>
                  <div className="space-y-2">
                    <span className={`text-3xl font-black bg-gradient-to-r ${gradientColor.replace('from-', 'from-').replace('to-', 'to-')} bg-clip-text text-transparent`}>
                      {formatPrice(calculateTotal())}
                    </span>
                    {selectedTier?.discount && (
                      <p className="text-green-400 text-sm font-medium flex items-center justify-center space-x-1">
                        <Percent className="w-4 h-4" />
                        <span>{selectedTier.discount}% descuento</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className={`text-center p-6 bg-gradient-to-r ${gradientColor}/10 rounded-2xl border border-white/10 backdrop-blur-sm`}>
                <span className={`text-3xl font-black bg-gradient-to-r ${gradientColor.replace('from-', 'from-').replace('to-', 'to-')} bg-clip-text text-transparent`}>
                  {service.type === 'rango' ? `Desde ${formatPrice(service.unit_price)}` : formatPrice(service.unit_price)}
                </span>
                {service.type === 'fijo' && (
                  <p className="text-gray-300 text-sm mt-2 font-medium flex items-center justify-center space-x-1">
                    <Crown className="w-4 h-4 text-orange-500" />
                    <span>Precio fijo</span>
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Purchase Button */}
          <button
            onClick={handlePurchase}
            disabled={!!quantityError}
            className={`w-full flex items-center justify-center space-x-3 px-6 py-4 font-bold rounded-2xl transition-all duration-300 transform shadow-xl text-base ${
              quantityError
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : `bg-gradient-to-r ${gradientColor} hover:scale-110 text-white ${glowClass} hover:shadow-2xl`
            }`}
          >
            <ShoppingCart className="w-5 h-5" />
            <span>{service.emoji} Comprar Ahora</span>
          </button>
        </div>
      </div>
    </div>
  );
};