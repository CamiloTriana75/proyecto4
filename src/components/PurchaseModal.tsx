import React, { useState, useEffect } from 'react';
import { X, User, Phone, Mail, MessageSquare, CreditCard, Check, Loader2, Shield, Star } from 'lucide-react';
import { Service, OrderData, PricingTier } from '../types';
import { COUNTRIES } from '../data/countries';
import { calculateDynamicPrice } from '../utils/pricing';

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: Service | null;
  quantity?: number;
  selectedTier?: PricingTier;
  selectedCountry: string;
  onCountryChange: (country: string) => void;
  onProceedToPayment: (orderData: OrderData) => void;
}

export const PurchaseModal: React.FC<PurchaseModalProps> = ({
  isOpen,
  onClose,
  service,
  quantity,
  selectedTier,
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

  // Update formData when quantity prop changes
  useEffect(() => {
    if (quantity !== undefined) {
      setFormData(prev => ({ ...prev, quantity }));
    }
  }, [quantity]);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [quantityError, setQuantityError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState<'form' | 'payment'>('form');
  const [validatedFields, setValidatedFields] = useState<Set<string>>(new Set());
  const [focusedField, setFocusedField] = useState<string>('');
  const [quantityInput, setQuantityInput] = useState<string>('');

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setStep('form');
      setIsSubmitting(false);
      setValidatedFields(new Set());
      setFocusedField('');
      // Preserve quantity from props
      setFormData(prev => ({
        ...prev,
        quantity: quantity,
        country: selectedCountry
      }));
      const q = (quantity ?? service?.minQuantity ?? 1);
      setQuantityInput(String(q));
    }
  }, [isOpen, quantity, selectedCountry]);

  if (!isOpen || !service) return null;

  const selectedCountryData = COUNTRIES.find(c => c.code === selectedCountry);
  const isGameService = service.category === 'games';

  const calculateTotal = () => {
    if (service.type === 'tiers' || service.type === 'subscription') {
      return selectedTier ? selectedTier.price : service.unit_price;
    }
    if (service.type === 'cantidad' && (formData.quantity || quantity)) {
      return calculateDynamicPrice(service, formData.quantity || quantity || 1);
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

  const validateField = (fieldName: string, value: string) => {
    let isValid = true;
    const newErrors = { ...errors };

    switch (fieldName) {
      case 'firstName':
        if (!value.trim()) {
          newErrors.firstName = 'Nombre es obligatorio';
          isValid = false;
        } else {
          delete newErrors.firstName;
        }
        break;
      case 'lastName':
        if (!value.trim()) {
          newErrors.lastName = 'Apellido es obligatorio';
          isValid = false;
        } else {
          delete newErrors.lastName;
        }
        break;
      case 'dni':
        if (!value.trim()) {
          newErrors.dni = 'DNI es obligatorio';
          isValid = false;
        } else {
          delete newErrors.dni;
        }
        break;
      case 'phone':
        if (!value.trim()) {
          newErrors.phone = 'Teléfono es obligatorio';
          isValid = false;
        } else {
          delete newErrors.phone;
        }
        break;
    }

    setErrors(newErrors);
    
    if (isValid) {
      setValidatedFields(prev => new Set(prev).add(fieldName));
    } else {
      setValidatedFields(prev => {
        const newSet = new Set(prev);
        newSet.delete(fieldName);
        return newSet;
      });
    }
    
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      setStep('payment');
      
      // Simulate payment processing
      setTimeout(() => {
        onProceedToPayment({ ...formData, country: selectedCountry });
        setIsSubmitting(false);
      }, 2000);
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

  // Payment processing component
  const PaymentProcessing = () => (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="flex-1 p-8 text-center space-y-6 overflow-y-auto">
        <div className="relative">
          <div className="w-20 h-20 mx-auto bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center animate-pulse">
            <Loader2 className="w-10 h-10 text-white animate-spin" />
          </div>
          <div className="absolute inset-0 w-20 h-20 mx-auto bg-orange-500/20 rounded-full animate-ping"></div>
        </div>
        
        <div className="space-y-3">
          <h3 className="text-2xl font-bold text-white">Procesando Pago</h3>
          <p className="text-gray-300">Estamos procesando tu pago de forma segura...</p>
          
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-400">
            <Shield className="w-4 h-4" />
            <span>Conexión segura SSL</span>
          </div>
        </div>

        {/* Service Details */}
        <div className="bg-gradient-to-r from-orange-500/10 to-purple-500/10 p-6 rounded-xl border border-white/20 space-y-4">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className={`p-2 rounded-xl ${
              isGameService ? 'bg-purple-500/20' : 'bg-orange-500/20'
            }`}>
              <CreditCard className={`w-5 h-5 ${isGameService ? 'text-purple-400' : 'text-orange-400'}`} />
            </div>
            <h4 className="text-white font-semibold">{service.name}</h4>
          </div>
          
          {/* Show quantity for cantidad services */}
          {service.type === 'cantidad' && (formData.quantity || quantity) && (
            <div className="flex justify-between items-center py-2 border-b border-white/10">
              <span className="text-gray-300">Cantidad:</span>
              <span className="text-white font-semibold">
                {(formData.quantity || quantity)!.toLocaleString()} unidades
              </span>
            </div>
          )}
          
          {/* Show tier for tier services */}
          {(service.type === 'tiers' || service.type === 'subscription') && selectedTier && (
            <div className="flex justify-between items-center py-2 border-b border-white/10">
              <span className="text-gray-300">Plan:</span>
              <span className="text-white font-semibold">{selectedTier.label}</span>
            </div>
          )}
          
          <div className="flex justify-between items-center py-2">
            <span className="text-gray-300">País:</span>
            <span className="text-white font-semibold">
              {selectedCountryData?.flag} {selectedCountryData?.name}
            </span>
          </div>
          
          <div className="flex justify-between items-center pt-4 border-t border-white/20">
            <span className="text-lg font-semibold text-white">Total a pagar:</span>
            <span className="text-2xl font-bold text-orange-400">{formatPrice(calculateTotal())}</span>
          </div>
        </div>

        {/* Customer Info */}
        <div className="bg-gradient-to-r from-blue-500/10 to-transparent p-4 rounded-xl border border-blue-500/20">
          <h5 className="text-white font-semibold mb-3 flex items-center">
            <User className="w-4 h-4 mr-2" />
            Información del Cliente
          </h5>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-300">Nombre:</span>
              <span className="text-white">{formData.firstName} {formData.lastName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">DNI:</span>
              <span className="text-white">{formData.dni}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Teléfono:</span>
              <span className="text-white">{formData.phone}</span>
            </div>
            {/* Email intentionally hidden per requirements */}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-50 p-2 sm:p-4 animate-in fade-in duration-500 overflow-hidden">
      <div className="card-gradient rounded-3xl max-w-lg w-full h-[95vh] sm:h-[90vh] flex flex-col animate-in zoom-in slide-in-from-bottom-4 duration-500 border border-white/20 shadow-2xl overflow-hidden">
        {step === 'payment' ? (
          <PaymentProcessing />
        ) : (
          <>
            {/* Header - Fixed */}
            <div className="relative overflow-hidden flex-shrink-0">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 via-purple-500/10 to-orange-500/20 animate-gradient-x"></div>
              <div className="relative flex items-center justify-between p-4 sm:p-6 border-b border-white/20">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl">
                    <CreditCard className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                    Completar Compra
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-white transition-all duration-300 hover:bg-white/10 p-2 rounded-xl hover:rotate-90"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto min-h-0" style={{ scrollBehavior: 'smooth' }}>
              {/* Service Summary */}
              <div className="relative p-4 sm:p-6 border-b border-white/10">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-purple-500/5"></div>
                <div className="relative">
                  {service.image && (
                    <div className="relative mb-6 overflow-hidden rounded-xl group">
                      <img 
                        src={service.image} 
                        alt={service.name}
                        className="w-full h-32 object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                      <div className="absolute top-3 left-3 text-2xl animate-bounce">
                        {isGameService ? '🎮' : '📱'}
                      </div>
                      <div className="absolute bottom-3 right-3 flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-3 mb-6">
                    <div className={`p-3 rounded-xl transition-all duration-300 ${
                      isGameService 
                        ? 'bg-gradient-to-r from-purple-500/20 to-purple-600/20 border border-purple-500/30' 
                        : 'bg-gradient-to-r from-orange-500/20 to-orange-600/20 border border-orange-500/30'
                    }`}>
                      <CreditCard className={`w-6 h-6 ${isGameService ? 'text-purple-400' : 'text-orange-400'}`} />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-xl">{service.name}</h3>
                      <p className="text-gray-400 text-sm">Servicio premium verificado</p>
                    </div>
                  </div>
                  
                  {/* Quantity selector for cantidad services */}
                  {service.type === 'cantidad' && (
                    <div className="mb-6">
                      <label className="block text-sm font-semibold text-gray-200 mb-3">
                        🔢 Cantidad *
                      </label>
                      <div className="flex items-center space-x-4">
                        <input
                          type="text"
                          inputMode="numeric"
                          value={quantityInput}
                          onChange={(e) => {
                            const v = e.target.value;
                            if (v === '' || /^\d+$/.test(v)) {
                              setQuantityInput(v);
                            }
                          }}
                          onBlur={() => {
                            const v = quantityInput.trim();
                            const parsed = v === '' ? NaN : parseInt(v, 10);
                            const minQ = service.minQuantity || 1;
                            const maxQ = service.maxQuantity;
                            let next = isNaN(parsed) ? minQ : parsed;
                            if (next < minQ) next = minQ;
                            if (maxQ && next > maxQ) next = maxQ;
                            handleQuantityChange(next);
                            setQuantityInput(String(next));
                          }}
                          className={`flex-1 px-4 py-4 glass-effect border rounded-xl text-white text-center focus:outline-none focus:ring-2 font-semibold transition-all duration-300 ${
                            quantityError 
                              ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                              : 'border-white/20 focus:border-orange-500 focus:ring-orange-500/20'
                          }`}
                          placeholder={String(service.minQuantity || 1)}
                        />
                        <div className="text-gray-300 text-sm">
                          {service.minQuantity && service.maxQuantity && (
                            <span>Rango: {service.minQuantity.toLocaleString()} - {service.maxQuantity.toLocaleString()}</span>
                          )}
                        </div>
                      </div>
                      {quantityError && (
                        <p className="text-red-400 text-sm mt-2 font-medium animate-in slide-in-from-left duration-300">{quantityError}</p>
                      )}
                    </div>
                  )}
                  
                  <div className="relative p-6 glass-effect rounded-xl border border-white/20 bg-gradient-to-r from-orange-500/10 to-purple-500/10">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-purple-500/5 rounded-xl animate-pulse"></div>
                    <div className="relative flex justify-between items-center">
                      <div>
                        <span className="text-gray-200 font-medium block">
                          {service.type === 'cantidad' && (formData.quantity || quantity) 
                            ? `${(formData.quantity || quantity)!.toLocaleString()} unidades`
                            : service.type === 'tiers' || service.type === 'subscription'
                              ? selectedTier ? selectedTier.label : 'Selección'
                              : 'Servicio completo'
                          }
                        </span>
                        <span className="text-gray-400 text-sm">Total a pagar</span>
                      </div>
                      <div className="text-right">
                        <span className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                          {formatPrice(calculateTotal())}
                        </span>
                        <div className="flex items-center justify-end space-x-1 mt-1">
                          <Shield className="w-3 h-3 text-green-400" />
                          <span className="text-xs text-green-400">Pago seguro</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form - Scrollable */}
              <div className="p-4 sm:p-6 pb-8">
                <form onSubmit={handleSubmit} className="space-y-4">
                {/* Country Selector */}
                <div>
                  <label className="block text-sm font-semibold text-gray-200 mb-3">
                    🌍 País *
                  </label>
                  <div className="relative">
                    <select
                      value={selectedCountry}
                      onChange={(e) => {
                        onCountryChange(e.target.value);
                        setFormData({ ...formData, country: e.target.value });
                      }}
                      className="w-full px-4 py-4 glass-effect border border-white/20 rounded-xl text-white focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 font-medium transition-all duration-300 hover:border-orange-400"
                    >
                      {COUNTRIES.map((country) => (
                        <option key={country.code} value={country.code} className="bg-gray-800">
                          {country.flag} {country.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Name Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <label className="block text-sm font-semibold text-gray-200 mb-3">
                      <User className="w-4 h-4 inline mr-1" />
                      Nombre *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => {
                          setFormData({ ...formData, firstName: e.target.value });
                          validateField('firstName', e.target.value);
                        }}
                        onFocus={() => setFocusedField('firstName')}
                        onBlur={() => setFocusedField('')}
                        className={`w-full px-4 py-4 glass-effect border rounded-xl text-white focus:outline-none focus:ring-2 font-medium transition-all duration-300 ${
                          errors.firstName 
                            ? 'border-red-500 ring-2 ring-red-500/20' 
                            : validatedFields.has('firstName')
                              ? 'border-green-500 ring-2 ring-green-500/20'
                              : focusedField === 'firstName'
                                ? 'border-orange-500 ring-2 ring-orange-500/20'
                                : 'border-white/20 hover:border-orange-400'
                        }`}
                        placeholder="Tu nombre"
                      />
                      {validatedFields.has('firstName') && !errors.firstName && (
                        <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-400" />
                      )}
                    </div>
                    {errors.firstName && <p className="text-red-400 text-sm mt-1 animate-in slide-in-from-left duration-300">{errors.firstName}</p>}
                  </div>
                  <div className="relative">
                    <label className="block text-sm font-semibold text-gray-200 mb-3">
                      Apellido *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => {
                          setFormData({ ...formData, lastName: e.target.value });
                          validateField('lastName', e.target.value);
                        }}
                        onFocus={() => setFocusedField('lastName')}
                        onBlur={() => setFocusedField('')}
                        className={`w-full px-4 py-4 glass-effect border rounded-xl text-white focus:outline-none focus:ring-2 font-medium transition-all duration-300 ${
                          errors.lastName 
                            ? 'border-red-500 ring-2 ring-red-500/20' 
                            : validatedFields.has('lastName')
                              ? 'border-green-500 ring-2 ring-green-500/20'
                              : focusedField === 'lastName'
                                ? 'border-orange-500 ring-2 ring-orange-500/20'
                                : 'border-white/20 hover:border-orange-400'
                        }`}
                        placeholder="Tu apellido"
                      />
                      {validatedFields.has('lastName') && !errors.lastName && (
                        <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-400" />
                      )}
                    </div>
                    {errors.lastName && <p className="text-red-400 text-sm mt-1 animate-in slide-in-from-left duration-300">{errors.lastName}</p>}
                  </div>
                </div>

                {/* DNI */}
                <div className="relative">
                  <label className="block text-sm font-semibold text-gray-200 mb-3">
                    🆔 DNI / ID *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.dni}
                      onChange={(e) => {
                        setFormData({ ...formData, dni: e.target.value });
                        validateField('dni', e.target.value);
                      }}
                      onFocus={() => setFocusedField('dni')}
                      onBlur={() => setFocusedField('')}
                      className={`w-full px-4 py-4 glass-effect border rounded-xl text-white focus:outline-none focus:ring-2 font-medium transition-all duration-300 ${
                        errors.dni 
                          ? 'border-red-500 ring-2 ring-red-500/20' 
                          : validatedFields.has('dni')
                            ? 'border-green-500 ring-2 ring-green-500/20'
                            : focusedField === 'dni'
                              ? 'border-orange-500 ring-2 ring-orange-500/20'
                              : 'border-white/20 hover:border-orange-400'
                      }`}
                      placeholder="Número de documento"
                    />
                    {validatedFields.has('dni') && !errors.dni && (
                      <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-400" />
                    )}
                  </div>
                  {errors.dni && <p className="text-red-400 text-sm mt-1 animate-in slide-in-from-left duration-300">{errors.dni}</p>}
                </div>

                {/* Phone */}
                <div className="relative">
                  <label className="block text-sm font-semibold text-gray-200 mb-3">
                    <Phone className="w-4 h-4 inline mr-1" />
                    Teléfono *
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => {
                        handlePhoneChange(e.target.value);
                        validateField('phone', e.target.value);
                      }}
                      onFocus={() => setFocusedField('phone')}
                      onBlur={() => setFocusedField('')}
                      className={`w-full px-4 py-4 glass-effect border rounded-xl text-white focus:outline-none focus:ring-2 font-medium transition-all duration-300 ${
                        errors.phone 
                          ? 'border-red-500 ring-2 ring-red-500/20' 
                          : validatedFields.has('phone')
                            ? 'border-green-500 ring-2 ring-green-500/20'
                            : focusedField === 'phone'
                              ? 'border-orange-500 ring-2 ring-orange-500/20'
                              : 'border-white/20 hover:border-orange-400'
                      }`}
                      placeholder={`${selectedCountryData?.phonePrefix} 11 2345 6789`}
                    />
                    {validatedFields.has('phone') && !errors.phone && (
                      <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-400" />
                    )}
                  </div>
                  {errors.phone && <p className="text-red-400 text-sm mt-1 animate-in slide-in-from-left duration-300">{errors.phone}</p>}
                </div>

                {/* Email */}
                <div className="relative">
                  <label className="block text-sm font-semibold text-gray-200 mb-3">
                    <Mail className="w-4 h-4 inline mr-1" />
                    Email (opcional)
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField('')}
                    className={`w-full px-4 py-4 glass-effect border rounded-xl text-white focus:outline-none focus:ring-2 font-medium transition-all duration-300 ${
                      focusedField === 'email'
                        ? 'border-orange-500 ring-2 ring-orange-500/20'
                        : 'border-white/20 hover:border-orange-400'
                    }`}
                    placeholder="tu@email.com"
                  />
                </div>

                {/* User ID */}
                <div className="relative">
                  <label className="block text-sm font-semibold text-gray-200 mb-3">
                    👤 ID/Usuario (opcional)
                  </label>
                  <input
                    type="text"
                    value={formData.userId}
                    onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
                    onFocus={() => setFocusedField('userId')}
                    onBlur={() => setFocusedField('')}
                    className={`w-full px-4 py-4 glass-effect border rounded-xl text-white focus:outline-none focus:ring-2 font-medium transition-all duration-300 ${
                      focusedField === 'userId'
                        ? 'border-orange-500 ring-2 ring-orange-500/20'
                        : 'border-white/20 hover:border-orange-400'
                    }`}
                    placeholder="@tuusuario o link de perfil"
                  />
                </div>

                {/* Comments */}
                <div className="relative">
                  <label className="block text-sm font-semibold text-gray-200 mb-3">
                    <MessageSquare className="w-4 h-4 inline mr-1" />
                    Comentarios (opcional)
                  </label>
                  <textarea
                    value={formData.comments}
                    onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                    onFocus={() => setFocusedField('comments')}
                    onBlur={() => setFocusedField('')}
                    className={`w-full px-4 py-4 glass-effect border rounded-xl text-white focus:outline-none focus:ring-2 resize-none font-medium transition-all duration-300 ${
                      focusedField === 'comments'
                        ? 'border-orange-500 ring-2 ring-orange-500/20'
                        : 'border-white/20 hover:border-orange-400'
                    }`}
                    rows={3}
                    placeholder="Información adicional..."
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-4 pb-2">
                  <button
                    type="submit"
                    disabled={!!quantityError || isSubmitting}
                    className={`relative w-full px-8 py-5 font-bold rounded-xl transition-all duration-500 transform shadow-xl text-lg overflow-hidden group ${
                      quantityError || isSubmitting
                        ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                        : isGameService
                          ? 'bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25'
                          : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/25'
                    }`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                    <span className="relative flex items-center justify-center space-x-2">
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Procesando...</span>
                        </>
                      ) : (
                        <>
                          <span>{isGameService ? '🎮' : '💳'}</span>
                          <span>Proceder al Pago - {formatPrice(calculateTotal())}</span>
                        </>
                      )}
                    </span>
                  </button>
                  </div>
                </form>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};