import React, { useState } from 'react';
import { ServiceCard } from './ServiceCard';
import { SERVICES } from '../data/services';
import { Service } from '../types';
import { Gamepad2, Users, Filter, Coins, CreditCard, Trophy, Zap, GraduationCap, Shield } from 'lucide-react';

interface ServiceGridProps {
  onServiceSelect: (service: Service, quantity?: number) => void;
}

export const ServiceGrid: React.FC<ServiceGridProps> = ({ onServiceSelect }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'games' | 'social'>('all');
  const [activeSubcategory, setActiveSubcategory] = useState<string>('all');

  const gameServices = SERVICES.filter(s => s.category === 'games');
  const socialServices = SERVICES.filter(s => s.category === 'social');

  const getFilteredServices = () => {
    let services = SERVICES;
    
    if (activeCategory !== 'all') {
      services = services.filter(s => s.category === activeCategory);
    }
    
    if (activeSubcategory !== 'all') {
      services = services.filter(s => s.subcategory === activeSubcategory);
    }
    
    return services;
  };

  const filteredServices = getFilteredServices();

  const getSubcategoryIcon = (subcategory: string) => {
    switch (subcategory) {
      case 'currency': return <Coins className="w-4 h-4" />;
      case 'giftcard': return <CreditCard className="w-4 h-4" />;
      case 'subscription': return <Shield className="w-4 h-4" />;
      case 'boosting': return <Trophy className="w-4 h-4" />;
      case 'accounts': return <Users className="w-4 h-4" />;
      case 'battlepass': return <Zap className="w-4 h-4" />;
      case 'streaming': return <Gamepad2 className="w-4 h-4" />;
      case 'coaching': return <GraduationCap className="w-4 h-4" />;
      default: return <Filter className="w-4 h-4" />;
    }
  };

  const getSubcategoryName = (subcategory: string) => {
    switch (subcategory) {
      case 'currency': return 'Monedas Virtuales';
      case 'giftcard': return 'Gift Cards';
      case 'subscription': return 'Suscripciones';
      case 'boosting': return 'Boosting';
      case 'accounts': return 'Cuentas';
      case 'battlepass': return 'Pases de Batalla';
      case 'streaming': return 'Streaming';
      case 'coaching': return 'Coaching';
      case 'followers': return 'Seguidores';
      case 'verification': return 'Verificaciones';
      case 'recovery': return 'Recuperación';
      case 'protection': return 'Protección';
      default: return subcategory;
    }
  };

  const getUniqueSubcategories = (category: 'games' | 'social' | 'all') => {
    let services = SERVICES;
    if (category !== 'all') {
      services = services.filter(s => s.category === category);
    }
    return [...new Set(services.map(s => s.subcategory))];
  };

  return (
    <section id="services" className="py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/50 to-transparent"></div>
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
      
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 relative z-10">
          <div className="inline-block px-8 py-4 bg-gradient-to-r from-orange-500/20 to-purple-500/20 border border-orange-500/30 rounded-full mb-8 backdrop-blur-md">
            <span className="text-orange-400 text-sm font-bold tracking-wide">🎯 SERVICIOS PREMIUM</span>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight">
            Nuestros
            <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-purple-500 bg-clip-text text-transparent animate-gradient-x"> Servicios</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Desde <span className="text-purple-400 font-bold">monedas de juegos</span> hasta <span className="text-orange-400 font-bold">verificaciones oficiales</span>. 
            Todo lo que necesitas para potenciar tu experiencia digital.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center mb-8 relative z-10">
          <div className="glass-effect rounded-2xl p-2 border border-white/10 backdrop-blur-md">
            <div className="flex space-x-2">
              <button
                onClick={() => {
                  setActiveCategory('all');
                  setActiveSubcategory('all');
                }}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                  activeCategory === 'all'
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg glow-orange'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Filter className="w-4 h-4" />
                <span>Todos</span>
                <span className="bg-white/20 px-2 py-1 rounded-full text-xs font-bold">{SERVICES.length}</span>
              </button>
              <button
                onClick={() => {
                  setActiveCategory('games');
                  setActiveSubcategory('all');
                }}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                  activeCategory === 'games'
                    ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg glow-purple'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Gamepad2 className="w-4 h-4" />
                <span>🎮 Juegos</span>
                <span className="bg-white/20 px-2 py-1 rounded-full text-xs font-bold">{gameServices.length}</span>
              </button>
              <button
                onClick={() => {
                  setActiveCategory('social');
                  setActiveSubcategory('all');
                }}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                  activeCategory === 'social'
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg glow-blue'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>📱 Social</span>
                <span className="bg-white/20 px-2 py-1 rounded-full text-xs font-bold">{socialServices.length}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Subcategory Filter */}
        {activeCategory !== 'all' && (
          <div className="flex justify-center mb-12 relative z-10">
            <div className="glass-effect rounded-xl p-2 border border-white/10 backdrop-blur-md max-w-4xl overflow-x-auto">
              <div className="flex space-x-2 min-w-max px-2">
                <button
                  onClick={() => setActiveSubcategory('all')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 whitespace-nowrap ${
                    activeSubcategory === 'all'
                      ? activeCategory === 'games' 
                        ? 'bg-gradient-to-r from-purple-500/50 to-purple-600/50 text-white'
                        : 'bg-gradient-to-r from-blue-500/50 to-blue-600/50 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Filter className="w-3 h-3" />
                  <span>Todos</span>
                </button>
                {getUniqueSubcategories(activeCategory).map((subcategory) => {
                  const count = SERVICES.filter(s => 
                    s.category === activeCategory && s.subcategory === subcategory
                  ).length;
                  
                  return (
                    <button
                      key={subcategory}
                      onClick={() => setActiveSubcategory(subcategory)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 whitespace-nowrap ${
                        activeSubcategory === subcategory
                          ? activeCategory === 'games'
                            ? 'bg-gradient-to-r from-purple-500/50 to-purple-600/50 text-white'
                            : 'bg-gradient-to-r from-blue-500/50 to-blue-600/50 text-white'
                          : 'text-gray-300 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {getSubcategoryIcon(subcategory)}
                      <span>{getSubcategoryName(subcategory)}</span>
                      <span className="bg-white/20 px-2 py-1 rounded-full text-xs font-bold">{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 relative z-10">
          {filteredServices.map((service, index) => (
            <div
              key={service.id}
              className="animate-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <ServiceCard
                service={service}
                onSelect={onServiceSelect}
              />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredServices.length === 0 && (
          <div className="text-center py-16 relative z-10">
            <div className="glass-effect rounded-2xl p-12 border border-white/10 max-w-md mx-auto">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-white text-xl font-bold mb-2">No hay servicios</h3>
              <p className="text-gray-300">No se encontraron servicios en esta categoría</p>
            </div>
          </div>
        )}

        {/* Category Descriptions */}
        {activeCategory !== 'all' && (
          <div className="mt-16 text-center relative z-10">
            <div className="glass-effect rounded-2xl p-8 border border-white/10 max-w-3xl mx-auto backdrop-blur-md">
              {activeCategory === 'games' ? (
                <div>
                  <h3 className="text-3xl font-bold text-white mb-6 flex items-center justify-center space-x-3">
                    <Gamepad2 className="w-8 h-8 text-purple-500" />
                    <span>🎮 Servicios Gaming Premium</span>
                  </h3>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    Recarga todos tus juegos favoritos de forma <span className="text-purple-400 font-bold">segura y rápida</span>. 
                    Monedas virtuales, gift cards, suscripciones, boosting profesional y coaching personalizado. 
                    <span className="text-orange-400 font-bold"> ¡Todo lo que necesitas para dominar!</span>
                  </p>
                </div>
              ) : (
                <div>
                  <h3 className="text-3xl font-bold text-white mb-6 flex items-center justify-center space-x-3">
                    <Users className="w-8 h-8 text-blue-500" />
                    <span>📱 Servicios Sociales Premium</span>
                  </h3>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    Potencia tu presencia en redes sociales con <span className="text-blue-400 font-bold">verificaciones oficiales</span>, 
                    seguidores reales, recuperación profesional de cuentas y protección avanzada.
                    <span className="text-orange-400 font-bold"> ¡Haz crecer tu marca personal!</span>
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};