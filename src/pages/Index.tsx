
import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import AuthPage from '@/components/AuthPage';
import ChatInterface from '@/components/ChatInterface';
import CropDiagnosis from '@/components/CropDiagnosis';
import VoiceAssistant from '@/components/VoiceAssistant';
import MarketPrices from '@/components/MarketPrices';
import GovernmentSchemes from '@/components/GovernmentSchemes';
import BottomNavigation from '@/components/BottomNavigation';
import { Button } from '@/components/ui/button';
import { LogOut, User } from 'lucide-react';

type CurrentView = 'chat' | 'crop-diagnosis' | 'voice-assistant' | 'market-prices' | 'government-schemes';

const Index = () => {
  const { user, loading, signOut } = useAuth();
  const [currentView, setCurrentView] = useState<CurrentView>('chat');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthPage />;
  }

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
      {/* Header with user info and logout */}
      <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 px-4 py-2 z-50">
        <div className="max-w-md mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <User className="h-5 w-5 text-green-600" />
            <span className="text-sm font-medium text-gray-700">
              {user.user_metadata?.name || user.email}
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={signOut}
            className="text-gray-600 hover:text-gray-800"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Main content with top padding for header */}
      <div className="pt-12">
        {renderCurrentView()}
      </div>

      <BottomNavigation 
        currentView={currentView} 
        onNavigate={(view: string) => setCurrentView(view as CurrentView)} 
      />
    </div>
  );
};

export default Index;
