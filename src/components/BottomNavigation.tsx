
import React from 'react';
import { Camera, Mic, TrendingUp, FileText, MessageCircle } from 'lucide-react';

interface BottomNavigationProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

const BottomNavigation = ({ currentView, onNavigate }: BottomNavigationProps) => {
  const navItems = [
    {
      id: 'chat',
      title: 'Chat',
      icon: MessageCircle,
      color: 'text-blue-600'
    },
    {
      id: 'crop-diagnosis',
      title: 'Crop Doctor',
      icon: Camera,
      color: 'text-forest-600'
    },
    {
      id: 'voice-assistant',
      title: 'Voice',
      icon: Mic,
      color: 'text-earth-600'
    },
    {
      id: 'market-prices',
      title: 'Markets',
      icon: TrendingUp,
      color: 'text-harvest-600'
    },
    {
      id: 'government-schemes',
      title: 'Schemes',
      icon: FileText,
      color: 'text-forest-700'
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-1 shadow-lg">
      <div className="max-w-md mx-auto">
        <div className="flex justify-around">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200 ${
                currentView === item.id
                  ? `${item.color} bg-gray-100`
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <item.icon className="h-5 w-5 mb-1" />
              <span className="text-xs font-medium">{item.title}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BottomNavigation;
