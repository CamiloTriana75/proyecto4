import React from 'react';
import { Package, Clock, CheckCircle, Calendar } from 'lucide-react';
import { storageUtils } from '../utils/storage';

export const OrdersList: React.FC = () => {
  const currentUser = storageUtils.getCurrentUser();
  const orders = currentUser ? storageUtils.getUserOrders(currentUser.id) : [];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-AR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'acreditado':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'pendiente':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      default:
        return <Package className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'acreditado':
        return 'Completado';
      case 'pendiente':
        return 'Pendiente';
      default:
        return 'Desconocido';
    }
  };

  if (orders.length === 0) {
    return (
      <div className="text-center py-16 glass-effect rounded-2xl border border-white/10">
        <div className="p-4 bg-orange-500/20 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
          <Package className="w-12 h-12 text-orange-500" />
        </div>
        <h3 className="text-white text-2xl font-bold mb-3">🛍️ No tienes pedidos aún</h3>
        <p className="text-gray-300 text-lg">Cuando realices tu primera compra, aparecerá aquí tu historial completo</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold text-white mb-8">📦 Mis Pedidos</h2>
      
      <div className="space-y-6">
        {orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((order) => (
          <div key={order.id} className="card-gradient rounded-2xl p-8 border border-white/10 hover:border-orange-500/30 transition-all duration-300 transform hover:scale-102 shadow-xl">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-white font-bold text-xl mb-2">{order.serviceName}</h3>
                <p className="text-gray-400 text-sm font-medium">🆔 Pedido #{order.id}</p>
              </div>
              <div className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
                order.status === 'acreditado' 
                  ? 'bg-green-500/20 border border-green-500/30' 
                  : 'bg-yellow-500/20 border border-yellow-500/30'
              }`}>
                {getStatusIcon(order.status)}
                <span className={`text-sm font-medium ${
                  order.status === 'acreditado' ? 'text-green-300' : 'text-yellow-300'
                }`}>
                  {getStatusText(order.status)}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="glass-effect p-4 rounded-xl">
                <p className="text-gray-400 text-sm font-medium mb-1">💰 Monto</p>
                <p className="text-white font-bold text-lg">{formatPrice(order.amount)}</p>
              </div>
              {order.quantity && (
                <div className="glass-effect p-4 rounded-xl">
                  <p className="text-gray-400 text-sm font-medium mb-1">📊 Cantidad</p>
                  <p className="text-white font-bold text-lg">{order.quantity} unidades</p>
                </div>
              )}
              <div className="glass-effect p-4 rounded-xl">
                <p className="text-gray-400 text-sm font-medium mb-1">📅 Fecha</p>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <p className="text-white text-sm font-medium">{formatDate(order.createdAt)}</p>
                </div>
              </div>
            </div>

            {order.orderData.userId && (
              <div className="pt-4 border-t border-white/10">
                <p className="text-gray-300 text-sm font-medium">👤 ID/Usuario: 
                  <span className="text-white ml-1 font-semibold">{order.orderData.userId}</span>
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};