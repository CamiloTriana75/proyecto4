import React, { useState } from 'react';
import { X, User, Mail, Phone, Eye, EyeOff } from 'lucide-react';
import { storageUtils } from '../utils/storage';
import { COUNTRIES } from '../data/countries';

interface UserAuthProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCountry: string;
  onSuccess: () => void;
}

export const UserAuth: React.FC<UserAuthProps> = ({
  isOpen,
  onClose,
  selectedCountry,
  onSuccess
}) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const selectedCountryData = COUNTRIES.find(c => c.code === selectedCountry);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) newErrors.email = 'Email es obligatorio';
    if (!formData.password.trim()) newErrors.password = 'Contraseña es obligatoria';

    if (!isLogin) {
      if (!formData.firstName.trim()) newErrors.firstName = 'Nombre es obligatorio';
      if (!formData.lastName.trim()) newErrors.lastName = 'Apellido es obligatorio';
      if (!formData.phone.trim()) newErrors.phone = 'Teléfono es obligatorio';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (isLogin) {
      // Login
      const user = storageUtils.findUserByEmail(formData.email);
      if (user) {
        storageUtils.setCurrentUser(user.id);
        onSuccess();
        onClose();
      } else {
        setErrors({ email: 'Usuario no encontrado' });
      }
    } else {
      // Register
      const existingUser = storageUtils.findUserByEmail(formData.email);
      if (existingUser) {
        setErrors({ email: 'Este email ya está registrado' });
        return;
      }

      const newUser = {
        id: storageUtils.generateId(),
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        country: selectedCountry,
        createdAt: new Date().toISOString(),
      };

      storageUtils.saveUser(newUser);
      storageUtils.setCurrentUser(newUser.id);
      onSuccess();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="card-gradient rounded-2xl max-w-md w-full animate-in zoom-in duration-300 border border-white/10 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-gradient-to-r from-orange-500/10 to-transparent">
          <h2 className="text-2xl font-bold text-white">
            {isLogin ? '🔐 Iniciar Sesión' : '✨ Crear Cuenta'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-all duration-300 hover:bg-white/10 p-2 rounded-xl"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {!isLogin && (
            <>
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

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-gray-200 mb-3">
                  <Phone className="w-4 h-4 inline mr-1" />
                  Teléfono *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={`w-full px-4 py-4 glass-effect border rounded-xl text-white focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 font-medium transition-all duration-300 ${
                    errors.phone ? 'border-red-500 ring-2 ring-red-500/20' : 'border-white/20'
                  }`}
                  placeholder={`${selectedCountryData?.phonePrefix} 11 2345 6789`}
                />
                {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
              </div>
            </>
          )}

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-200 mb-3">
              <Mail className="w-4 h-4 inline mr-1" />
              Email *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`w-full px-4 py-4 glass-effect border rounded-xl text-white focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 font-medium transition-all duration-300 ${
                errors.email ? 'border-red-500 ring-2 ring-red-500/20' : 'border-white/20'
              }`}
              placeholder="tu@email.com"
            />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-200 mb-3">
              Contraseña *
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className={`w-full px-4 py-4 glass-effect border rounded-xl text-white focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 pr-12 font-medium transition-all duration-300 ${
                  errors.password ? 'border-red-500 ring-2 ring-red-500/20' : 'border-white/20'
                }`}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-4 text-gray-400 hover:text-white transition-all duration-300 hover:bg-white/10 p-1 rounded-lg"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-8 py-5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-xl glow-orange text-lg"
          >
            {isLogin ? '🚀 Iniciar Sesión' : '✨ Crear Mi Cuenta'}
          </button>

          {/* Toggle Mode */}
          <div className="text-center">
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setErrors({});
              }}
              className="text-orange-400 hover:text-orange-300 transition-all duration-300 text-sm font-medium hover:underline"
            >
              {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};