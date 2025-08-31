import React from 'react';
import { Shield, MessageCircle, CreditCard } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900 py-16 sm:py-24 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-900/20 via-transparent to-transparent"></div>
      <div className="absolute top-0 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center max-w-5xl mx-auto relative z-10">
          {/* Company Logo */}
          <img
            src="/logo.png"
            alt="Viral Recargas"
            className="w-20 h-20 sm:w-24 sm:h-24 object-contain mx-auto mb-6 rounded-2xl shadow-2xl bg-white/5"
          />
          <div className="inline-block px-3 sm:px-4 py-2 bg-orange-500/20 border border-orange-500/30 rounded-full mb-6">
            <span className="text-orange-400 text-xs sm:text-sm font-semibold">✨ Plataforma #1 en Servicios Digitales</span>
          </div>
          
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-extrabold text-white mb-6 sm:mb-8 leading-tight px-2">
            Potencia tu
            <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent"> Presencia Digital</span>
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 sm:mb-12 leading-relaxed max-w-3xl mx-auto px-4">
            <span className="text-purple-400 font-bold">Recargas gaming</span>, <span className="text-blue-400 font-bold">gift cards</span>, <span className="text-green-400 font-bold">suscripciones</span> y <span className="text-orange-400 font-bold">servicios sociales</span> de forma segura y profesional. 
            ¡Todo lo que necesitas para potenciar tu experiencia digital!
            <br className="hidden sm:block" />
            <span className="text-gray-400 text-base sm:text-lg block mt-3">Precios en pesos argentinos. Para cotizar en dólares, contáctanos por WhatsApp <a href={`https://wa.me/${encodeURIComponent('5491130652655')}`} className="underline hover:text-orange-400">+54 9 11 3065 2655</a> o al correo <a href="mailto:viralinternationalus@gmail.com" className="underline hover:text-orange-400">viralinternationalus@gmail.com</a>.</span>
          </p>
          
          {/* Trust Badges */}
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-6 mb-8 sm:mb-12 px-4">
            <div className="flex items-center space-x-3 glass-effect px-4 sm:px-6 py-3 rounded-full hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
              <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
              <span className="text-gray-200 text-sm font-medium">Transferencia Segura</span>
            </div>
            <div className="flex items-center space-x-3 glass-effect px-4 sm:px-6 py-3 rounded-full hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
              <span className="text-gray-200 text-sm font-medium">Soporte 24/7</span>
            </div>
            <div className="flex items-center space-x-3 glass-effect px-4 sm:px-6 py-3 rounded-full hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
              <span className="text-gray-200 text-sm font-medium">Garantía Total</span>
            </div>
          </div>

          <a
            href="#services"
            className="inline-block px-8 sm:px-10 py-3 sm:py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-110 shadow-2xl glow-orange text-base sm:text-lg"
          >
            🚀 Explorar Servicios
          </a>
        </div>
      </div>
    </section>
  );
};