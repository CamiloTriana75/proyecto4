import React from 'react';
import { MessageCircle } from 'lucide-react';
import { APP_CONFIG } from '../data/config';

export const WhatsAppFloat: React.FC = () => {
  const handleClick = () => {
    const message = `👋 ¡Hola! Espero que estén muy bien

Me interesa conocer más sobre sus servicios de redes sociales 📱

¿Podrían brindarme información sobre:
✨ Servicios disponibles
💰 Precios y métodos de pago
⏰ Tiempos de entrega
🛡️ Garantías

¡Muchas gracias por su tiempo! 😊`;
    
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${APP_CONFIG.merchant_phone}?text=${encodedMessage}`;
    window.open(url, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 w-18 h-18 bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-full shadow-2xl glow-green transition-all duration-300 transform hover:scale-110 z-40 group"
      title="Contactar por WhatsApp"
    >
      <div className="relative">
        <MessageCircle className="w-10 h-10 mx-auto group-hover:scale-110 transition-transform duration-300" />
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-ping"></div>
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full"></div>
      </div>
    </button>
  );
};