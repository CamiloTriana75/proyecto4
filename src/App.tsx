import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServiceGrid } from './components/ServiceGrid';
import { PurchaseModal } from './components/PurchaseModal';
import { PaymentCard } from './components/PaymentCard';
import { UserAuth } from './components/UserAuth';
import { OrdersList } from './components/OrdersList';
import { Footer } from './components/Footer';
import { WhatsAppFloat } from './components/WhatsAppFloat';
import { Service, OrderData, User } from './types';
import { storageUtils } from './utils/storage';

type AppView = 'home' | 'dashboard';

function App() {
  const [selectedCountry, setSelectedCountry] = useState('AR');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<AppView>('home');
  
  // Modal states
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [isPaymentCardOpen, setIsPaymentCardOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  
  // Purchase flow state
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedQuantity, setSelectedQuantity] = useState<number | undefined>(undefined);
  const [orderData, setOrderData] = useState<OrderData | null>(null);

  useEffect(() => {
    // Initialize demo data
    storageUtils.initializeDemo();
    
    // Check for current user
    const user = storageUtils.getCurrentUser();
    setCurrentUser(user);
  }, []);

  const handleServiceSelect = (service: Service, quantity?: number) => {
    setSelectedService(service);
    setSelectedQuantity(quantity);
    setIsPurchaseModalOpen(true);
  };

  const handleProceedToPayment = (data: OrderData) => {
    setOrderData(data);
    setIsPurchaseModalOpen(false);
    setIsPaymentCardOpen(true);
  };

  const handlePaymentComplete = () => {
    setIsPaymentCardOpen(false);
    setSelectedService(null);
    setSelectedQuantity(undefined);
    setOrderData(null);
    // Refresh user to show updated orders
    const user = storageUtils.getCurrentUser();
    setCurrentUser(user);
  };

  const handleAuthSuccess = () => {
    const user = storageUtils.getCurrentUser();
    setCurrentUser(user);
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setIsPaymentCardOpen(false);
    setIsPurchaseModalOpen(false);
  };

  return (
    <div className="min-h-screen gradient-bg text-white">
      <Header
        selectedCountry={selectedCountry}
        onCountryChange={setSelectedCountry}
        currentUser={currentUser}
        onAuthClick={() => setIsAuthModalOpen(true)}
        onDashboardClick={() => setCurrentView('dashboard')}
      />

      {currentView === 'home' ? (
        <>
          <Hero />
          <ServiceGrid onServiceSelect={handleServiceSelect} />
        </>
      ) : (
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold text-white">Mi Dashboard</h1>
              <button
                onClick={handleBackToHome}
                className="px-4 py-2 text-orange-600 hover:text-orange-700 transition-colors"
              >
                ← Volver al inicio
              </button>
            </div>
            <OrdersList />
          </div>
        </div>
      )}

      <Footer />
      <WhatsAppFloat />

      {/* Modals */}
      <PurchaseModal
        isOpen={isPurchaseModalOpen}
        onClose={() => setIsPurchaseModalOpen(false)}
        service={selectedService}
        quantity={selectedQuantity}
        selectedCountry={selectedCountry}
        onCountryChange={setSelectedCountry}
        onProceedToPayment={handleProceedToPayment}
      />

      {orderData && selectedService && (
        <PaymentCard
          service={selectedService}
          orderData={orderData}
          quantity={selectedQuantity}
          onBack={() => {
            setIsPaymentCardOpen(false);
            setIsPurchaseModalOpen(true);
          }}
          onPaymentComplete={handlePaymentComplete}
        />
      )}

      <UserAuth
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        selectedCountry={selectedCountry}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
}

export default App;