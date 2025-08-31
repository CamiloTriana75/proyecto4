import React from 'react';
import { Shield, MessageCircle, CreditCard } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900 py-24 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-900/20 via-transparent to-transparent"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center max-w-5xl mx-auto relative z-10">
          <div className="inline-block px-4 py-2 bg-orange-500/20 border border-orange-500/30 rounded-full mb-6">
            <span className="text-orange-400 text-sm font-semibold">✨ Plataforma #1 en Servicios Digitales</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-8 leading-tight">
            Potencia tu
            <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent"> Presencia Digital</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
            Servicios profesionales para hacer crecer tus redes sociales de forma <span className="text-orange-400 font-semibold">segura y efectiva</span>. 
            Verificaciones oficiales, seguidores reales, recuperación de cuentas y protección avanzada.
          </p>
          
          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <div className="flex items-center space-x-3 glass-effect px-6 py-3 rounded-full hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
              <CreditCard className="w-5 h-5 text-orange-600" />
              <span className="text-gray-200 text-sm font-medium">Transferencia Segura</span>
            </div>
            <div className="flex items-center space-x-3 glass-effect px-6 py-3 rounded-full hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
              <MessageCircle className="w-5 h-5 text-orange-600" />
              <span className="text-gray-200 text-sm font-medium">Soporte 24/7</span>
            </div>
            <div className="flex items-center space-x-3 glass-effect px-6 py-3 rounded-full hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
              <Shield className="w-5 h-5 text-orange-600" />
              <span className="text-gray-200 text-sm font-medium">Garantía Total</span>
            </div>
          </div>

          <a
            href="#services"
            className="inline-block px-10 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-110 shadow-2xl glow-orange text-lg"
          >
            🚀 Explorar Servicios
          </a>
        </div>
      </div>
    </section>
  );
};