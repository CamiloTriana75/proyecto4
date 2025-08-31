import React, { useState } from 'react';
import { Menu, X, User, LogOut } from 'lucide-react';
import { COUNTRIES } from '../data/countries';
import { storageUtils } from '../utils/storage';

interface HeaderProps {
  selectedCountry: string;
  onCountryChange: (country: string) => void;
  currentUser: any;
  onAuthClick: () => void;
  onDashboardClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  selectedCountry,
  onCountryChange,
  currentUser,
  onAuthClick,
  onDashboardClick
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCountryOpen, setIsCountryOpen] = useState(false);

  const selectedCountryData = COUNTRIES.find(c => c.code === selectedCountry);

  const handleLogout = () => {
    storageUtils.logout();
    window.location.reload();
  };

  return (
    <header className="glass-effect border-b border-white/10 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img
            src="/logo.png"
            alt="Viral Recargas"
            className="w-10 h-10 rounded-xl object-contain shadow-lg glow-orange bg-white/5"
          />
          <span className="text-white font-bold text-xl bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Viral Recargas</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Country Selector */}
          <div className="relative">
            <button
              onClick={() => setIsCountryOpen(!isCountryOpen)}
              className="flex items-center space-x-2 px-4 py-2 rounded-xl glass-effect hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
            >
              <span className="text-xl">{selectedCountryData?.flag}</span>
              <span className="text-white text-sm font-medium">{selectedCountryData?.name}</span>
            </button>
            
            {isCountryOpen && (
              <div className="absolute top-full mt-2 right-0 glass-effect rounded-xl shadow-2xl border border-white/10 min-w-48 z-50 animate-in">
                {COUNTRIES.map((country) => (
                  <button
                    key={country.code}
                    onClick={() => {
                      onCountryChange(country.code);
                      setIsCountryOpen(false);
                    }}
                    className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-white/10 transition-all duration-200 text-left first:rounded-t-xl last:rounded-b-xl"
                  >
                    <span className="text-xl">{country.flag}</span>
                    <span className="text-white text-sm font-medium">{country.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Auth Section */}
          {currentUser ? (
            <div className="flex items-center space-x-4">
              <button
                onClick={onDashboardClick}
                className="flex items-center space-x-2 px-6 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 shadow-lg glow-orange"
              >
                <User className="w-4 h-4" />
                <span className="text-white text-sm font-semibold">Mi Cuenta</span>
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-3 py-2 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onAuthClick}
              className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl transition-all duration-300 transform hover:scale-105 font-semibold shadow-lg glow-orange"
            >
              Iniciar Sesión
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-white hover:bg-white/10 p-2 rounded-xl transition-all duration-300"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden glass-effect border-t border-white/10 animate-in">
          <div className="px-4 py-4 space-y-4">
            {/* Country Selector Mobile */}
            <div>
              <p className="text-gray-300 text-sm mb-3 font-medium">Selecciona tu país:</p>
              <div className="grid grid-cols-2 gap-2">
                {COUNTRIES.map((country) => (
                  <button
                    key={country.code}
                    onClick={() => {
                      onCountryChange(country.code);
                      setIsMenuOpen(false);
                    }}
                    className={`flex items-center space-x-2 px-3 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                      selectedCountry === country.code
                        ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg glow-orange'
                        : 'glass-effect text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    <span>{country.flag}</span>
                    <span className="text-sm font-medium">{country.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Auth Section Mobile */}
            {currentUser ? (
              <div className="space-y-2">
                <button
                  onClick={() => {
                    onDashboardClick();
                    setIsMenuOpen(false);
                  }}
                  className="w-full flex items-center space-x-2 px-4 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg glow-orange transform hover:scale-105 transition-all duration-300"
                >
                  <User className="w-4 h-4" />
                  <span className="font-semibold">Mi Cuenta</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-2 px-4 py-3 rounded-xl text-gray-300 hover:bg-white/10 transition-all duration-300"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Cerrar Sesión</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  onAuthClick();
                  setIsMenuOpen(false);
                }}
                className="w-full px-4 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold shadow-lg glow-orange transform hover:scale-105 transition-all duration-300"
              >
                Iniciar Sesión / Registrarse
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};