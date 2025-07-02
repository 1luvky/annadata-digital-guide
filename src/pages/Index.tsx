
import React, { useState } from 'react';
import Dashboard from '@/components/Dashboard';
import CropDiagnosis from '@/components/CropDiagnosis';
import VoiceAssistant from '@/components/VoiceAssistant';
import MarketPrices from '@/components/MarketPrices';
import GovernmentSchemes from '@/components/GovernmentSchemes';

type CurrentView = 'dashboard' | 'crop-diagnosis' | 'voice-assistant' | 'market-prices' | 'government-schemes';

const Index = () => {
  const [currentView, setCurrentView] = useState<CurrentView>('dashboard');

  const renderCurrentView = () => {
    switch (currentView) {
      case 'crop-diagnosis':
        return <CropDiagnosis onBack={() => setCurrentView('dashboard')} />;
      case 'voice-assistant':
        return <VoiceAssistant onBack={() => setCurrentView('dashboard')} />;
      case 'market-prices':
        return <MarketPrices onBack={() => setCurrentView('dashboard')} />;
      case 'government-schemes':
        return <GovernmentSchemes onBack={() => setCurrentView('dashboard')} />;
      default:
        return (
          <Dashboard 
            onNavigate={(view: string) => {
              switch (view) {
                case 'crop-diagnosis':
                  setCurrentView('crop-diagnosis');
                  break;
                case 'voice-query':
                  setCurrentView('voice-assistant');
                  break;
                case 'market-prices':
                  setCurrentView('market-prices');
                  break;
                case 'government-schemes':
                  setCurrentView('government-schemes');
                  break;
                default:
                  console.log(`Navigation to ${view} not implemented yet`);
              }
            }}
          />
        );
    }
  };

  return renderCurrentView();
};

export default Index;
