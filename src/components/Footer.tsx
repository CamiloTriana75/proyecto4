import React from 'react';
import { Shield, MessageCircle, Mail, ExternalLink } from 'lucide-react';
import { APP_CONFIG } from '../data/config';

export const Footer: React.FC = () => {
  return (
    <footer className="glass-effect border-t border-white/10 py-16 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg glow-orange">
                <span className="text-white font-bold text-lg">SB</span>
              </div>
              <span className="text-white font-bold text-2xl bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">{APP_CONFIG.business_name}</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              La plataforma líder en servicios para redes sociales. <span className="text-orange-400 font-semibold">Verificaciones oficiales</span>, seguidores reales y protección avanzada.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-bold mb-6 text-lg">🎯 Servicios</h3>
            <ul className="space-y-3 text-sm">
              <li className="text-gray-300 hover:text-orange-400 transition-all duration-300 cursor-pointer font-medium">
                Verificaciones Instagram
              </li>
              <li className="text-gray-300 hover:text-orange-400 transition-all duration-300 cursor-pointer font-medium">
                Seguidores
              </li>
              <li className="text-gray-300 hover:text-orange-400 transition-all duration-300 cursor-pointer font-medium">
                Recuperación de cuentas
              </li>
              <li className="text-gray-300 hover:text-orange-400 transition-all duration-300 cursor-pointer font-medium">
                Protección Metashield
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-bold mb-6 text-lg">🛟 Soporte</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-2 text-gray-300 font-medium">
                <MessageCircle className="w-4 h-4" />
                <a href={`https://wa.me/${APP_CONFIG.merchant_phone}`} target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 underline">WhatsApp: +54 9 11 3065 2655</a>
              </li>
              <li className="flex items-center space-x-2 text-gray-300 font-medium">
                <Mail className="w-4 h-4" />
                <a href={`mailto:${APP_CONFIG.support_email || APP_CONFIG.ar_contact_email}`} className="hover:text-orange-400 underline">{APP_CONFIG.support_email || APP_CONFIG.ar_contact_email}</a>
              </li>
              <li className="flex items-center space-x-2 text-gray-300 font-medium">
                <Shield className="w-4 h-4" />
                <span>Garantía de servicio</span>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-bold mb-6 text-lg">⚖️ Legal</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="/terminos.html" className="text-gray-300 hover:text-orange-400 transition-all duration-300 font-medium">Términos de Servicio</a>
              </li>
              <li>
                <a href="/privacidad.html" className="text-gray-300 hover:text-orange-400 transition-all duration-300 font-medium">Política de Privacidad</a>
              </li>
              <li>
                <a href="/reembolsos.html" className="text-gray-300 hover:text-orange-400 transition-all duration-300 font-medium">Política de Reembolsos</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between">
          <p className="text-gray-300 text-sm font-medium">
            &copy; 2025 {APP_CONFIG.business_name}. Todos los derechos reservados.
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <a
              href={`https://wa.me/${APP_CONFIG.merchant_phone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-300 hover:text-orange-400 transition-all duration-300 hover:bg-white/10 px-4 py-2 rounded-xl font-medium"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="text-sm">Contacto</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};