import React, { useState } from 'react';
import { X, User, Phone, Mail, MessageSquare, CreditCard } from 'lucide-react';
import { Service, OrderData } from '../types';
import { COUNTRIES } from '../data/countries';

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: Service | null;
  quantity?: number;
  selectedCountry: string;
  onCountryChange: (country: string) => void;
  onProceedToPayment: (orderData: OrderData) => void;
}

export const PurchaseModal: React.FC<PurchaseModalProps> = ({
  isOpen,
  onClose,
  service,
  quantity,
  selectedCountry,
  onCountryChange,
  onProceedToPayment
}) => {
  const [formData, setFormData] = useState<OrderData>({
    firstName: '',
    lastName: '',
    dni: '',
    phone: '',
    email: '',
    userId: '',
    comments: '',
    country: selectedCountry,
    quantity: quantity,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [quantityError, setQuantityError] = useState('');

  if (!isOpen || !service) return null;

  const selectedCountryData = COUNTRIES.find(c => c.code === selectedCountry);
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

  const validateQuantity = (value: number) => {
    if (service.minQuantity && value < service.minQuantity) {
      setQuantityError(`Mínimo ${service.minQuantity} unidades`);
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
    setFormData({ ...formData, quantity: value });
    if (service.type === 'cantidad') {
      validateQuantity(value);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'Nombre es obligatorio';
    if (!formData.lastName.trim()) newErrors.lastName = 'Apellido es obligatorio';
    if (!formData.dni.trim()) newErrors.dni = 'DNI es obligatorio';
    if (!formData.phone.trim()) newErrors.phone = 'Teléfono es obligatorio';
    
    if (service.type === 'cantidad' && quantityError) {
      newErrors.quantity = quantityError;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0 && !quantityError;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onProceedToPayment({ ...formData, country: selectedCountry });
    }
  };

  const handlePhoneChange = (value: string) => {
    // Add country prefix if not present
    if (selectedCountryData && !value.startsWith(selectedCountryData.phonePrefix)) {
      if (value.replace(/\D/g, '').length > 0) {
        value = selectedCountryData.phonePrefix + value.replace(/\D/g, '');
      }
    }
    setFormData({ ...formData, phone: value });
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="card-gradient rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto animate-in zoom-in duration-300 border border-white/10 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-gradient-to-r from-orange-500/10 to-transparent">
          <h2 className="text-2xl font-bold text-white">🛒 Completar Compra</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-all duration-300 hover:bg-white/10 p-2 rounded-xl"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Service Summary */}
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
              <CreditCard className="w-6 h-6 text-orange-500" />
            </div>
            <h3 className="text-white font-bold text-lg">{service.name}</h3>
          </div>
          
          {/* Quantity selector for cantidad services */}
          {service.type === 'cantidad' && (
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-200 mb-3">
                🔢 Cantidad *
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="number"
                  value={formData.quantity || quantity || service.minQuantity || 1}
                  onChange={(e) => handleQuantityChange(Math.max(1, parseInt(e.target.value) || 1))}
                  className={`flex-1 px-4 py-4 glass-effect border rounded-xl text-white text-center focus:outline-none focus:ring-2 font-semibold transition-all duration-300 ${
                    quantityError 
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                      : 'border-white/20 focus:border-orange-500 focus:ring-orange-500/20'
                  }`}
                  min={service.minQuantity || 1}
                  max={service.maxQuantity}
                  step={isGameService ? 10 : 100}
                />
                <div className="text-gray-300 text-sm">
                  {service.minQuantity && service.maxQuantity && (
                    <span>Rango: {service.minQuantity.toLocaleString()} - {service.maxQuantity.toLocaleString()}</span>
                  )}
                </div>
              </div>
              {quantityError && (
                <p className="text-red-400 text-sm mt-2 font-medium">{quantityError}</p>
              )}
            </div>
          )}
          
          <div className="flex justify-between items-center p-4 glass-effect rounded-xl">
            <span className="text-gray-200 font-medium">
              {formData.quantity || quantity ? `${(formData.quantity || quantity).toLocaleString()} unidades` : 'Servicio completo'}
            </span>
            <span className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              {formatPrice(calculateTotal())}
            </span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Country Selector */}
          <div>
            <label className="block text-sm font-semibold text-gray-200 mb-3">
              🌍 País *
            </label>
            <select
              value={selectedCountry}
              onChange={(e) => {
                onCountryChange(e.target.value);
                setFormData({ ...formData, country: e.target.value });
              }}
              className="w-full px-4 py-4 glass-effect border border-white/20 rounded-xl text-white focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 font-medium transition-all duration-300"
            >
              {COUNTRIES.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.flag} {country.name}
                </option>
              ))}
            </select>
          </div>

          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-3">
                <User className="w-4 h-4 inline mr-1" />
                Nombre *
              </label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className={`w-full px-4 py-4 glass-effect border rounded-xl text-white focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 font-medium transition-all duration-300 ${
                  errors.firstName ? 'border-red-500 ring-2 ring-red-500/20' : 'border-white/20'
                }`}
                placeholder="Tu nombre"
              />
              {errors.firstName && <p className="text-red-400 text-sm mt-1">{errors.firstName}</p>}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-3">
                Apellido *
              </label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className={`w-full px-4 py-4 glass-effect border rounded-xl text-white focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 font-medium transition-all duration-300 ${
                  errors.lastName ? 'border-red-500 ring-2 ring-red-500/20' : 'border-white/20'
                }`}
                placeholder="Tu apellido"
              />
              {errors.lastName && <p className="text-red-400 text-sm mt-1">{errors.lastName}</p>}
            </div>
          </div>

          {/* DNI */}
          <div>
            <label className="block text-sm font-semibold text-gray-200 mb-3">
              🆔 DNI / ID *
            </label>
            <input
              type="text"
              value={formData.dni}
              onChange={(e) => setFormData({ ...formData, dni: e.target.value })}
              className={`w-full px-4 py-4 glass-effect border rounded-xl text-white focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 font-medium transition-all duration-300 ${
                errors.dni ? 'border-red-500 ring-2 ring-red-500/20' : 'border-white/20'
              }`}
              placeholder="Número de documento"
            />
            {errors.dni && <p className="text-red-400 text-sm mt-1">{errors.dni}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-semibold text-gray-200 mb-3">
              <Phone className="w-4 h-4 inline mr-1" />
              Teléfono *
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handlePhoneChange(e.target.value)}
              className={`w-full px-4 py-4 glass-effect border rounded-xl text-white focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 font-medium transition-all duration-300 ${
                errors.phone ? 'border-red-500 ring-2 ring-red-500/20' : 'border-white/20'
              }`}
              placeholder={`${selectedCountryData?.phonePrefix} 11 2345 6789`}
            />
            {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-200 mb-3">
              <Mail className="w-4 h-4 inline mr-1" />
              Email (opcional)
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-4 glass-effect border border-white/20 rounded-xl text-white focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 font-medium transition-all duration-300"
              placeholder="tu@email.com"
            />
          </div>

          {/* User ID */}
          <div>
            <label className="block text-sm font-semibold text-gray-200 mb-3">
              👤 ID/Usuario (opcional)
            </label>
            <input
              type="text"
              value={formData.userId}
              onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
              className="w-full px-4 py-4 glass-effect border border-white/20 rounded-xl text-white focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 font-medium transition-all duration-300"
              placeholder="@tuusuario o link de perfil"
            />
          </div>

          {/* Comments */}
          <div>
            <label className="block text-sm font-semibold text-gray-200 mb-3">
              <MessageSquare className="w-4 h-4 inline mr-1" />
              Comentarios (opcional)
            </label>
            <textarea
              value={formData.comments}
              onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
              className="w-full px-4 py-4 glass-effect border border-white/20 rounded-xl text-white focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 resize-none font-medium transition-all duration-300"
              rows={3}
              placeholder="Información adicional..."
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!!quantityError}
            className={`w-full px-8 py-5 font-bold rounded-xl transition-all duration-300 transform shadow-xl text-lg ${
              quantityError
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : isGameService
                  ? 'bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white hover:scale-105 glow-purple'
                  : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white hover:scale-105 glow-orange'
            }`}
          >
            {isGameService ? '🎮' : '💳'} Proceder al Pago - {formatPrice(calculateTotal())}
          </button>
        </form>
      </div>
    </div>
  );
};