
import React from 'react';
import { Camera, Mic, TrendingUp, FileText, Leaf, DollarSign, Phone, Users } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface DashboardProps {
  onNavigate: (view: string) => void;
}

const Dashboard = ({ onNavigate }: DashboardProps) => {
  const features = [
    {
      id: 'crop-diagnosis',
      title: 'Crop Doctor',
      subtitle: 'Identify plant diseases instantly',
      icon: Camera,
      gradient: 'from-forest-500 to-forest-600',
      description: 'Take a photo of your crop and get expert diagnosis',
    },
    {
      id: 'voice-query',
      title: 'Voice Assistant',
      subtitle: 'Ask questions in your language',
      icon: Mic,
      gradient: 'from-earth-500 to-earth-600',
      description: 'Speak naturally about your farming concerns',
    },
    {
      id: 'market-prices',
      title: 'Market Prices',
      subtitle: 'Real-time crop pricing',
      icon: TrendingUp,
      gradient: 'from-harvest-500 to-harvest-600',
      description: 'Get current mandi prices for better selling decisions',
    },
    {
      id: 'government-schemes',
      title: 'Gov Schemes',
      subtitle: 'Find subsidies & support',
      icon: FileText,
      gradient: 'from-forest-600 to-earth-600',
      description: 'Navigate government agricultural programs',
    },
  ];

  const stats = [
    { label: 'Farmers Helped', value: '10K+', icon: Users },
    { label: 'Crops Diagnosed', value: '50K+', icon: Leaf },
    { label: 'Savings Generated', value: '₹2Cr+', icon: DollarSign },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-orange-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-forest-600 to-forest-700 text-white py-6 px-4">
        <div className="max-w-md mx-auto text-center">
          <div className="flex items-center justify-center mb-2">
            <Leaf className="h-8 w-8 mr-2" />
            <h1 className="text-2xl font-bold">Project Kisan</h1>
          </div>
          <p className="text-forest-100">Your Personal Agricultural Assistant</p>
        </div>
      </div>

      {/* Welcome Section */}
      <div className="max-w-md mx-auto px-4 py-6">
        <Card className="farmer-card p-6 mb-6">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-forest-800 mb-2">
              Welcome, Farmer! 🌾
            </h2>
            <p className="text-forest-600 text-sm leading-relaxed">
              Get instant help with crop diseases, market prices, and government schemes. 
              Your digital agricultural expert is here to help you succeed.
            </p>
          </div>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {stats.map((stat) => (
            <Card key={stat.label} className="p-3 text-center bg-white border-forest-200">
              <stat.icon className="h-5 w-5 mx-auto mb-1 text-forest-600" />
              <div className="text-lg font-bold text-forest-800">{stat.value}</div>
              <div className="text-xs text-forest-600">{stat.label}</div>
            </Card>
          ))}
        </div>

        {/* Main Features */}
        <div className="space-y-4">
          {features.map((feature) => (
            <Card key={feature.id} className="farmer-card overflow-hidden">
              <div className="p-4">
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${feature.gradient} shadow-lg`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-forest-800 mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-forest-600 text-sm mb-2">
                      {feature.subtitle}
                    </p>
                    <p className="text-xs text-forest-500 mb-3">
                      {feature.description}
                    </p>
                    <Button 
                      className="action-button w-full text-sm py-2 h-auto"
                      onClick={() => onNavigate(feature.id)}
                    >
                      Get Started
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Emergency Contact */}
        <Card className="mt-6 p-4 bg-gradient-to-r from-red-50 to-red-100 border-red-200">
          <div className="flex items-center space-x-3">
            <Phone className="h-5 w-5 text-red-600" />
            <div>
              <h4 className="font-semibold text-red-800">Emergency Agricultural Helpline</h4>
              <p className="text-sm text-red-600">Kisan Call Centre: 1800-180-1551</p>
            </div>
          </div>
        </Card>

        {/* Language Selector */}
        <div className="mt-6 text-center">
          <p className="text-sm text-forest-600 mb-2">Select Language / ಭಾಷೆ ಆಯ್ಕೆಮಾಡಿ</p>
          <div className="flex space-x-2 justify-center">
            <Button variant="outline" size="sm" className="border-forest-200 text-forest-700">
              English
            </Button>
            <Button variant="outline" size="sm" className="border-forest-200 text-forest-700">
              ಕನ್ನಡ
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
