import React, { useState } from 'react';
import { ServiceCard } from './ServiceCard';
import { SERVICES } from '../data/services';
import { Service } from '../types';
import { Gamepad2, Users, Filter } from 'lucide-react';

interface ServiceGridProps {
  onServiceSelect: (service: Service, quantity?: number) => void;
}

export const ServiceGrid: React.FC<ServiceGridProps> = ({ onServiceSelect }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'games' | 'social'>('all');

  const gameServices = SERVICES.filter(s => s.category === 'games');
  const socialServices = SERVICES.filter(s => s.category === 'social');

  const getFilteredServices = () => {
    switch (activeCategory) {
      case 'games':
        return gameServices;
      case 'social':
        return socialServices;
      default:
        return SERVICES;
    }
  };

  const filteredServices = getFilteredServices();

  return (
    <section id="services" className="py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/50 to-transparent"></div>
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 relative z-10">
          <div className="inline-block px-6 py-3 bg-gradient-to-r from-orange-500/20 to-purple-500/20 border border-orange-500/30 rounded-full mb-8">
            <span className="text-orange-400 text-sm font-bold">🎯 SERVICIOS PREMIUM</span>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight">
            Nuestros
            <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-purple-500 bg-clip-text text-transparent"> Servicios</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Desde <span className="text-purple-400 font-bold">monedas de juegos</span> hasta <span className="text-orange-400 font-bold">verificaciones oficiales</span>. 
            Todo lo que necesitas para potenciar tu presencia digital.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center mb-12 relative z-10">
          <div className="glass-effect rounded-2xl p-2 border border-white/10">
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveCategory('all')}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeCategory === 'all'
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Filter className="w-4 h-4" />
                <span>Todos</span>
                <span className="bg-white/20 px-2 py-1 rounded-full text-xs">{SERVICES.length}</span>
              </button>
              <button
                onClick={() => setActiveCategory('games')}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeCategory === 'games'
                    ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Gamepad2 className="w-4 h-4" />
                <span>🎮 Juegos</span>
                <span className="bg-white/20 px-2 py-1 rounded-full text-xs">{gameServices.length}</span>
              </button>
              <button
                onClick={() => setActiveCategory('social')}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeCategory === 'social'
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>📱 Social</span>
                <span className="bg-white/20 px-2 py-1 rounded-full text-xs">{socialServices.length}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {filteredServices.map((service, index) => (
            <div
              key={service.id}
              className="animate-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ServiceCard
                service={service}
                onSelect={onServiceSelect}
              />
            </div>
          ))}
        </div>

        {/* Category Descriptions */}
        {activeCategory !== 'all' && (
          <div className="mt-16 text-center relative z-10">
            <div className="glass-effect rounded-2xl p-8 border border-white/10 max-w-2xl mx-auto">
              {activeCategory === 'games' ? (
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4 flex items-center justify-center space-x-2">
                    <Gamepad2 className="w-6 h-6 text-purple-500" />
                    <span>🎮 Servicios de Juegos</span>
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    Recarga todos tus juegos favoritos de forma <span className="text-purple-400 font-semibold">segura y rápida</span>. 
                    Robux, diamantes, V-Bucks, UC, gemas, primogemas y más monedas virtuales. Desde juegos móviles hasta PC y consolas.
                  </p>
                </div>
              ) : (
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4 flex items-center justify-center space-x-2">
                    <Users className="w-6 h-6 text-blue-500" />
                    <span>📱 Servicios Sociales</span>
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    Potencia tu presencia en redes sociales con <span className="text-blue-400 font-semibold">verificaciones oficiales</span>, 
                    seguidores reales y servicios de protección avanzada.
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