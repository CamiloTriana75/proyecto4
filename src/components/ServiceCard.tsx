import React, { useState } from 'react';
import { ShoppingCart, TrendingUp, Shield, Users, Gamepad2, Coins, Zap, Crown } from 'lucide-react';
import { Service } from '../types';

interface ServiceCardProps {
  service: Service;
  onSelect: (service: Service, quantity?: number) => void;
}

const getServiceIcon = (serviceId: string) => {
  switch (serviceId) {
    case 'G001': // Robux
      return <Gamepad2 className="w-6 h-6" />;
    case 'G002': // Dream League Soccer
      return <Zap className="w-6 h-6" />;
    case 'G003': // Clash Royale
      return <Crown className="w-6 h-6" />;
    case 'G004': // Free Fire
      return <Zap className="w-6 h-6" />;
    case 'G005': // PUBG Mobile
      return <Gamepad2 className="w-6 h-6" />;
    case 'G006': // Mobile Legends
      return <Coins className="w-6 h-6" />;
    case 'G007': // Clash of Clans
      return <Coins className="w-6 h-6" />;
    case 'G008': // Genshin Impact
      return <Crown className="w-6 h-6" />;
    case 'G009': // Call of Duty Mobile
      return <Gamepad2 className="w-6 h-6" />;
    case 'G010': // Dream League Soccer
      return <Zap className="w-6 h-6" />;
    case 'G011': // Valorant
      return <Crown className="w-6 h-6" />;
    case 'G012': // League of Legends
      return <Coins className="w-6 h-6" />;
    case 'G013': // Steam
    case 'G014': // Google Play
    case 'G015': // PlayStation Plus
      return <Gamepad2 className="w-6 h-6" />;
    case 'S001': // Seguidores
      return <Users className="w-6 h-6" />;
    case 'S002':
    case 'S003':
    case 'S004':
      return <Shield className="w-6 h-6" />;
    default:
      return <TrendingUp className="w-6 h-6" />;
  }
};

const getServiceEmoji = (serviceId: string) => {
  switch (serviceId) {
    case 'G001': return '🎮';
    case 'G002': return '⚽';
    case 'G003': return '👑';
    case 'G004': return '💎';
    case 'G005': return '🔫';
    case 'G006': return '⚔️';
    case 'G007': return '💰';
    case 'G008': return '🌟';
    case 'G009': return '🎯';
    case 'G010': return '⚽';
    case 'G011': return '🎯';
    case 'G012': return '🏆';
    case 'G013': return '🎮';
    case 'G014': return '📱';
    case 'G015': return '🎮';
    case 'S001': return '👥';
    case 'S002':
    case 'S003': 
    case 'S004': return '✅';
    case 'S005': return '🔒';
    case 'S006': return '📱';
    case 'S007': return '🛡️';
    default: return '⭐';
  }
};

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onSelect }) => {
  const [quantity, setQuantity] = useState(service.minQuantity || 1000);
  const [quantityError, setQuantityError] = useState('');

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const calculateTotal = () => {
    if (service.type === 'cantidad') {
      return service.unit_price * quantity;
    }
    return service.unit_price;
  };

  const validateQuantity = (value: number) => {
    if (service.minQuantity && value < service.minQuantity) {
      setQuantityError(`Mínimo ${service.minQuantity} unidades`);
      return false;
    }
    if (service.maxQuantity && value > service.maxQuantity) {
      setQuantityError(`Máximo ${service.maxQuantity} unidades`);
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
    } else {
      onSelect(service);
    }
  };

  const isGameService = service.category === 'games';

  return (
    <div className="group relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-black rounded-3xl"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-purple-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
      
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-orange-500/20 to-purple-500/20 blur-xl opacity-0 group-hover:opacity-30 transition-all duration-500 -z-10"></div>
      
      <div className="relative card-gradient rounded-3xl p-8 border border-white/10 hover:border-orange-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-600/20 transform hover:-translate-y-3 hover:scale-[1.02]">
        
        {/* Service Image */}
        {service.image && (
          <div className="relative mb-6 overflow-hidden rounded-2xl">
            <img 
              src={service.image} 
              alt={service.name}
              className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            <div className="absolute top-4 left-4">
              <div className={`p-3 rounded-xl backdrop-blur-md border ${
                isGameService 
                  ? 'bg-purple-500/20 border-purple-500/30 text-purple-300' 
                  : 'bg-orange-500/20 border-orange-500/30 text-orange-300'
              }`}>
                {getServiceIcon(service.id)}
              </div>
            </div>
            <div className="absolute top-4 right-4 text-3xl">
              {getServiceEmoji(service.id)}
            </div>
          </div>
        )}

        <div className="space-y-6">
          {/* Service Info */}
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <span className="text-2xl">{getServiceEmoji(service.id)}</span>
              <h3 className="text-white font-bold text-xl group-hover:text-orange-100 transition-colors duration-300">
                {service.name}
              </h3>
            </div>
            {service.note && (
              <p className="text-gray-400 text-sm font-medium bg-white/5 px-3 py-2 rounded-lg">
                {service.note}
              </p>
            )}
          </div>

          {/* Pricing Section */}
          <div className="space-y-4">
            {service.type === 'cantidad' ? (
              <div className="space-y-4">
                <div className="glass-effect rounded-xl p-4 border border-white/10">
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
                        className={`w-32 px-4 py-2 glass-effect border rounded-xl text-white text-center focus:outline-none focus:ring-2 font-semibold transition-all duration-300 ${
                          quantityError 
                            ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                            : 'border-white/20 focus:border-orange-500 focus:ring-orange-500/20'
                        }`}
                        min={service.minQuantity || 1}
                        max={service.maxQuantity}
                        step={isGameService ? 10 : 100}
                      />
                    </div>
                  </div>
                  {quantityError && (
                    <p className="text-red-400 text-xs mt-2 font-medium">{quantityError}</p>
                  )}
                  {service.minQuantity && service.maxQuantity && (
                    <p className="text-gray-400 text-xs mt-2">
                      Rango: {service.minQuantity.toLocaleString()} - {service.maxQuantity.toLocaleString()}
                    </p>
                  )}
                </div>
                
                <div className="text-center p-6 bg-gradient-to-r from-orange-500/10 to-orange-600/10 rounded-2xl border border-orange-500/20 backdrop-blur-sm">
                  <div className="space-y-2">
                    <span className="text-4xl font-black bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                      {formatPrice(calculateTotal())}
                    </span>
                    <p className="text-gray-300 text-sm font-medium">
                      {formatPrice(service.unit_price)} por unidad
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center p-8 bg-gradient-to-r from-orange-500/10 to-orange-600/10 rounded-2xl border border-orange-500/20 backdrop-blur-sm">
                <span className="text-4xl font-black bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                  {service.type === 'rango' ? `Desde ${formatPrice(service.unit_price)}` : formatPrice(service.unit_price)}
                </span>
                {service.type === 'fijo' && (
                  <p className="text-gray-300 text-sm mt-3 font-medium flex items-center justify-center space-x-1">
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
            className={`w-full flex items-center justify-center space-x-3 px-8 py-5 font-bold rounded-2xl transition-all duration-300 transform shadow-xl text-lg ${
              quantityError
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : isGameService
                  ? 'bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white hover:scale-110 glow-purple'
                  : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white hover:scale-110 glow-orange'
            }`}
          >
            <ShoppingCart className="w-5 h-5" />
            <span>🛒 Comprar Ahora</span>
          </button>
        </div>
      </div>
    </div>
  );
};