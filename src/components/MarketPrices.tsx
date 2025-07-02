
import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, ArrowLeft, MapPin, Calendar, Refresh } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface MarketPrice {
  crop: string;
  variety: string;
  minPrice: number;
  maxPrice: number;
  modalPrice: number;
  trend: 'up' | 'down' | 'stable';
  change: number;
  unit: string;
}

const MarketPrices = ({ onBack }: { onBack: () => void }) => {
  const [selectedMandi, setSelectedMandi] = useState('Bangalore APMC');
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);

  const marketData: MarketPrice[] = [
    {
      crop: 'Tomato',
      variety: 'Hybrid',
      minPrice: 20,
      maxPrice: 35,
      modalPrice: 28,
      trend: 'up',
      change: 15,
      unit: 'per kg'
    },
    {
      crop: 'Onion',
      variety: 'Red',
      minPrice: 18,
      maxPrice: 25,
      modalPrice: 22,
      trend: 'stable',
      change: 0,
      unit: 'per kg'
    },
    {
      crop: 'Potato',
      variety: 'Red',
      minPrice: 12,
      maxPrice: 18,
      modalPrice: 15,
      trend: 'down',
      change: -8,
      unit: 'per kg'
    },
    {
      crop: 'Carrot',
      variety: 'Orange',
      minPrice: 25,
      maxPrice: 35,
      modalPrice: 30,
      trend: 'up',
      change: 12,
      unit: 'per kg'
    },
    {
      crop: 'Cabbage',
      variety: 'Green',
      minPrice: 8,
      maxPrice: 15,
      modalPrice: 12,
      trend: 'stable',
      change: 2,
      unit: 'per kg'
    },
    {
      crop: 'Green Chili',
      variety: 'Long',
      minPrice: 40,
      maxPrice: 60,
      modalPrice: 50,
      trend: 'up',
      change: 25,
      unit: 'per kg'
    }
  ];

  const mandis = [
    'Bangalore APMC',
    'Mysore APMC',
    'Hubli APMC',
    'Bellary APMC',
    'Tumkur APMC'
  ];

  const refreshData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setLastUpdated(new Date());
      setIsLoading(false);
    }, 2000);
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return <div className="w-4 h-4 bg-gray-400 rounded-full"></div>;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-orange-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-harvest-600 to-harvest-700 text-white py-4 px-4">
        <div className="max-w-md mx-auto flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="mr-3 text-white hover:bg-harvest-700"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-xl font-bold">Market Prices</h1>
            <p className="text-harvest-100 text-sm">Real-time crop pricing</p>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6">
        {/* Mandi Selection */}
        <Card className="market-card p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <MapPin className="h-5 w-5 text-harvest-600 mr-2" />
              <span className="font-semibold text-harvest-800">Selected Mandi</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={refreshData}
              disabled={isLoading}
              className="text-harvest-600"
            >
              <Refresh className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
          
          <select
            value={selectedMandi}
            onChange={(e) => setSelectedMandi(e.target.value)}
            className="w-full p-2 border border-harvest-200 rounded-lg bg-white text-harvest-800"
          >
            {mandis.map((mandi) => (
              <option key={mandi} value={mandi}>{mandi}</option>
            ))}
          </select>
          
          <div className="flex items-center mt-2 text-sm text-harvest-600">
            <Calendar className="h-4 w-4 mr-1" />
            <span>Updated: {lastUpdated.toLocaleString()}</span>
          </div>
        </Card>

        {/* Price Cards */}
        <div className="space-y-3">
          {marketData.map((item, index) => (
            <Card key={index} className="market-card p-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-harvest-800 text-lg">
                    {item.crop}
                  </h3>
                  <p className="text-harvest-600 text-sm">{item.variety} variety</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center">
                    {getTrendIcon(item.trend)}
                    <span className={`ml-1 text-sm font-medium ${getTrendColor(item.trend)}`}>
                      {item.change > 0 ? '+' : ''}{item.change}%
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-3 border border-harvest-200">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Min Price</p>
                    <p className="font-semibold text-harvest-800">₹{item.minPrice}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Modal Price</p>
                    <p className="font-bold text-harvest-900 text-lg">₹{item.modalPrice}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Max Price</p>
                    <p className="font-semibold text-harvest-800">₹{item.maxPrice}</p>
                  </div>
                </div>
                <p className="text-center text-xs text-gray-500 mt-2">{item.unit}</p>
              </div>
              
              {/* Quick Analysis */}
              <div className="mt-3 p-2 bg-harvest-50 rounded">
                <p className="text-xs text-harvest-700">
                  {item.trend === 'up' && `Prices increased by ${item.change}%. Good time to sell.`}
                  {item.trend === 'down' && `Prices dropped by ${Math.abs(item.change)}%. Consider holding if possible.`}
                  {item.trend === 'stable' && 'Prices are stable. Normal trading conditions.'}
                </p>
              </div>
            </Card>
          ))}
        </div>

        {/* Market Insights */}
        <Card className="mt-6 p-4 bg-blue-50 border-blue-200">
          <h3 className="font-semibold text-blue-800 mb-3">Market Insights</h3>
          <div className="space-y-2 text-sm text-blue-700">
            <p>• Vegetable prices generally higher due to monsoon delays</p>
            <p>• Tomato and chili showing strong upward trend</p>
            <p>• Transportation costs affecting overall pricing</p>
            <p>• Demand high for quality produce in urban markets</p>
          </div>
        </Card>

        {/* Best Selling Times */}
        <Card className="mt-4 p-4 bg-green-50 border-green-200">
          <h3 className="font-semibold text-green-800 mb-3">Best Selling Times</h3>
          <div className="space-y-2 text-sm text-green-700">
            <p><strong>Early Morning (5-8 AM):</strong> Fresh produce, better prices</p>
            <p><strong>Weekends:</strong> Higher demand, premium pricing</p>
            <p><strong>Festival Seasons:</strong> Peak demand periods</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MarketPrices;
