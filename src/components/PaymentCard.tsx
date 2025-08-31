import React from 'react';
import { ArrowLeft, Copy, ExternalLink, MessageCircle, CreditCard } from 'lucide-react';
import { Service, OrderData } from '../types';
import { APP_CONFIG } from '../data/config';
import { COUNTRIES } from '../data/countries';
import { generateWhatsAppMessage, generateInternationalMessage, openWhatsApp } from '../utils/whatsapp';
import { storageUtils } from '../utils/storage';

interface PaymentCardProps {
  service: Service;
  orderData: OrderData;
  quantity?: number;
  onBack: () => void;
  onPaymentComplete: () => void;
}

export const PaymentCard: React.FC<PaymentCardProps> = ({
  service,
  orderData,
  quantity,
  onBack,
  onPaymentComplete
}) => {
  const isArgentina = orderData.country === 'AR';
  const isGameService = service.category === 'games';

  const calculateTotal = () => {
    if (service.type === 'cantidad' && quantity) {
      return service.unit_price * quantity;
    }
    return service.unit_price;
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // TODO: Add toast notification
  };

  const handleWhatsAppPayment = () => {
    if (isArgentina) {
      // Generate message for receipt submission
      const message = generateWhatsAppMessage(orderData, service, calculateTotal(), quantity);
      openWhatsApp(message);
    } else {
      // Generate message for international payment methods
      const countryName = COUNTRIES.find(c => c.code === orderData.country)?.name || 'Internacional';
      const message = generateInternationalMessage(countryName, service);
      openWhatsApp(message);
    }

    // Save order to localStorage
    const order = {
      id: storageUtils.generateId(),
      userId: storageUtils.getCurrentUser()?.id || 'guest',
      serviceId: service.id,
      serviceName: service.name,
      amount: calculateTotal(),
      quantity,
      orderData,
      status: 'pendiente' as const,
      createdAt: new Date().toISOString(),
    };

    storageUtils.saveOrder(order);
    onPaymentComplete();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="card-gradient rounded-2xl max-w-lg w-full animate-in zoom-in duration-300 border border-white/10 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-gradient-to-r from-green-500/10 to-transparent">
          <div className="flex items-center space-x-3">
            <button
              onClick={onBack}
              className="text-gray-400 hover:text-white transition-all duration-300 hover:bg-white/10 p-2 rounded-xl"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h2 className="text-2xl font-bold text-white">
              {isGameService ? '🎮' : '💰'} Finalizar Pago
            </h2>
          </div>
        </div>
        
        {/* Service Image and Info */}
        <div className="p-6 bg-gradient-to-r from-orange-500/5 to-transparent border-b border-white/10">
          {service.image && (
            <div className="relative mb-6 overflow-hidden rounded-xl">
              <img 
                src={service.image} 
                alt={service.name}
                className="w-full h-32 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute top-3 left-3 text-2xl">
                {isGameService ? '🎮' : '📱'}
              </div>
            </div>
          )}
          
          <div className="flex items-center space-x-3 mb-4">
            <div className={`p-2 rounded-xl ${
              isGameService ? 'bg-purple-500/20' : 'bg-orange-500/20'
            }`}>
              <CreditCard className={`w-6 h-6 ${
                isGameService ? 'text-purple-500' : 'text-orange-500'
              }`} />
            </div>
            <h3 className="text-white font-bold text-lg">{service.name}</h3>
          </div>
          <h3 className="text-white font-semibold mb-2">{service.name}</h3>
          <div className="flex justify-between items-center p-4 glass-effect rounded-xl">
            <span className="text-gray-200 font-medium">
              {quantity ? `${quantity.toLocaleString()} unidades` : 'Servicio completo'}
            </span>
            <span className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              {formatPrice(calculateTotal())}
            </span>
          </div>
        </div>

        {/* Payment Method */}
        <div className="p-6">
          {isArgentina ? (
            // Argentina: Show CBU/Alias
            <div className="space-y-6">
              <div className="text-center p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20">
                <h3 className="text-white font-bold text-xl mb-3">🏦 Datos para Transferencia</h3>
                <p className="text-gray-300 text-sm">Realiza la transferencia por el monto exacto y luego envía tu comprobante</p>
              </div>

              <div className="glass-effect rounded-xl p-6 space-y-5 border border-white/10">
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                  <span className="text-gray-200 font-semibold">CBU:</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-white font-mono text-lg bg-gray-800/50 px-3 py-1 rounded-lg">{APP_CONFIG.cbu_number}</span>
                    <button
                      onClick={() => copyToClipboard(APP_CONFIG.cbu_number)}
                      className="text-orange-500 hover:text-orange-400 transition-all duration-300 hover:bg-orange-500/10 p-2 rounded-lg"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                  <span className="text-gray-200 font-semibold">Alias:</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-white font-mono text-lg bg-gray-800/50 px-3 py-1 rounded-lg">{APP_CONFIG.cbu_alias}</span>
                    <button
                      onClick={() => copyToClipboard(APP_CONFIG.cbu_alias)}
                      className="text-orange-500 hover:text-orange-400 transition-all duration-300 hover:bg-orange-500/10 p-2 rounded-lg"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-500/10 to-orange-600/10 rounded-xl border border-orange-500/20">
                  <span className="text-gray-200 font-semibold">Monto Total:</span>
                  <span className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">{formatPrice(calculateTotal())}</span>
                </div>
              </div>

              <button
                onClick={handleWhatsAppPayment}
                className="w-full flex items-center justify-center space-x-3 px-8 py-5 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-xl glow-green text-lg animate-pulse"
              >
                <MessageCircle className="w-6 h-6" />
                <span>📎 ¡Ya Transferí! Enviar Comprobante</span>
              </button>
              
              <div className="p-5 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/30 rounded-xl">
                <p className="text-blue-300 text-sm text-center leading-relaxed">
                  💡 <strong>¡Último paso!</strong> Después de transferir, haz clic en el botón verde para enviar tu comprobante por WhatsApp. Te confirmaremos tu {isGameService ? 'recarga' : 'servicio'} en minutos.
                </p>
              </div>
            </div>
          ) : (
            // International: WhatsApp for payment methods
            <div className="space-y-6">
              <div className="text-center p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/20">
                <h3 className="text-white font-bold text-xl mb-3">🌍 Pago Internacional</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Te ayudamos a completar tu compra desde cualquier país. Contáctanos para conocer los métodos de pago disponibles en tu región.
                </p>
              </div>

              <div className="glass-effect rounded-xl p-6 border border-white/10">
                <div className="flex justify-between items-center mb-4 p-4 bg-gradient-to-r from-orange-500/10 to-orange-600/10 rounded-xl border border-orange-500/20">
                  <span className="text-gray-200 font-semibold">Total a pagar:</span>
                  <span className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                    {formatPrice(calculateTotal())}
                  </span>
                </div>
                <p className="text-gray-300 text-sm font-medium">
                  🌍 País: <span className="text-white">{COUNTRIES.find(c => c.code === orderData.country)?.name}</span>
                </p>
              </div>

              <button
                onClick={handleWhatsAppPayment}
                className="w-full flex items-center justify-center space-x-3 px-8 py-5 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-xl glow-green text-lg animate-pulse"
              >
                <MessageCircle className="w-6 h-6" />
                <span>💬 Consultar Métodos de Pago</span>
                <ExternalLink className="w-4 h-4" />
              </button>
              
              <div className="p-5 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl">
                <p className="text-green-300 text-sm text-center leading-relaxed">
                  🌍 <strong>Atención personalizada:</strong> Te contactaremos por WhatsApp para informarte sobre los métodos de pago disponibles en tu país y completar tu {isGameService ? 'recarga' : 'servicio'}.
                </p>
              </div>
            </div>
          )}

          {/* Customer Info Summary */}
          <div className="mt-6 pt-6 border-t border-white/10">
            <h4 className="text-white font-bold mb-4 text-lg">
              📋 Resumen del {isGameService ? 'Pedido de Recarga' : 'Pedido'}
            </h4>
            <div className="space-y-3 text-sm glass-effect p-4 rounded-xl">
              <p className="text-gray-200 flex justify-between">
                <span className="text-gray-400 font-medium">👤 Nombre:</span> 
                <span className="font-semibold">{orderData.firstName} {orderData.lastName}</span>
              </p>
              <p className="text-gray-200 flex justify-between">
                <span className="text-gray-400 font-medium">🆔 DNI:</span> 
                <span className="font-semibold">{orderData.dni}</span>
              </p>
              <p className="text-gray-200 flex justify-between">
                <span className="text-gray-400 font-medium">📱 Teléfono:</span> 
                <span className="font-semibold">{orderData.phone}</span>
              </p>
              {orderData.email && (
                <p className="text-gray-200 flex justify-between">
                  <span className="text-gray-400 font-medium">📧 Email:</span> 
                  <span className="font-semibold">{orderData.email}</span>
                </p>
              )}
              {orderData.userId && (
                <p className="text-gray-200 flex justify-between">
                  <span className="text-gray-400 font-medium">{isGameService ? '🎯' : '👤'} Usuario:</span> 
                  <span className="font-semibold">{orderData.userId}</span>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};