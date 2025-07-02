
import React, { useState } from 'react';
import ChatInterface from '@/components/ChatInterface';
import CropDiagnosis from '@/components/CropDiagnosis';
import VoiceAssistant from '@/components/VoiceAssistant';
import MarketPrices from '@/components/MarketPrices';
import GovernmentSchemes from '@/components/GovernmentSchemes';
import BottomNavigation from '@/components/BottomNavigation';

type CurrentView = 'chat' | 'crop-diagnosis' | 'voice-assistant' | 'market-prices' | 'government-schemes';

const Index = () => {
  const [currentView, setCurrentView] = useState<CurrentView>('chat');

  const renderCurrentView = () => {
    switch (currentView) {
      case 'crop-diagnosis':
        return <CropDiagnosis onBack={() => setCurrentView('chat')} />;
      case 'voice-assistant':
        return <VoiceAssistant onBack={() => setCurrentView('chat')} />;
      case 'market-prices':
        return <MarketPrices onBack={() => setCurrentView('chat')} />;
      case 'government-schemes':
        return <GovernmentSchemes onBack={() => setCurrentView('chat')} />;
      default:
        return <ChatInterface />;
    }
  };

  return (
    <div className="relative">
      {renderCurrentView()}
      <BottomNavigation 
        currentView={currentView} 
        onNavigate={(view: string) => setCurrentView(view as CurrentView)} 
      />
    </div>
  );
};

export default Index;
