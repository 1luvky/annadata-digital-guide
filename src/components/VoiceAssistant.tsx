
import React, { useState, useRef } from 'react';
import { Mic, MicOff, ArrowLeft, Volume2, Play, Pause } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const VoiceAssistant = ({ onBack }: { onBack: () => void }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [conversation, setConversation] = useState<Array<{
    type: 'user' | 'assistant';
    text: string;
    timestamp: Date;
  }>>([]);
  const [currentQuery, setCurrentQuery] = useState('');

  const startRecording = () => {
    setIsRecording(true);
    // Simulate recording
    setTimeout(() => {
      setIsRecording(false);
      const userQuery = "What is the price of tomatoes today in Bangalore mandi?";
      setCurrentQuery(userQuery);
      
      // Add user message
      setConversation(prev => [...prev, {
        type: 'user',
        text: userQuery,
        timestamp: new Date()
      }]);
      
      // Simulate AI response
      setTimeout(() => {
        const response = "Today's tomato prices in Bangalore APMC mandi are ₹25-30 per kg for Grade A tomatoes. Prices have increased by 15% from yesterday due to reduced supply from Hosur region. Current trend suggests prices may remain high for 2-3 days. Best selling time would be today or tomorrow morning.";
        
        setConversation(prev => [...prev, {
          type: 'assistant',
          text: response,
          timestamp: new Date()
        }]);
        
        // Simulate text-to-speech
        speakResponse(response);
      }, 2000);
    }, 3000);
  };

  const speakResponse = (text: string) => {
    setIsPlaying(true);
    // Simulate speech duration
    setTimeout(() => {
      setIsPlaying(false);
    }, 5000);
  };

  const quickQueries = [
    "What is today's market price for onions?",
    "How to treat leaf curl in tomato plants?",
    "Tell me about PM-KISAN scheme eligibility",
    "What fertilizer should I use for potato crop?",
    "When is the best time to sow wheat?",
    "How to get subsidy for drip irrigation?"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-orange-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-earth-600 to-earth-700 text-white py-4 px-4">
        <div className="max-w-md mx-auto flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="mr-3 text-white hover:bg-earth-700"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-xl font-bold">Voice Assistant</h1>
            <p className="text-earth-100 text-sm">Speak in English or Kannada</p>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6">
        {/* Voice Recording Interface */}
        <Card className="farmer-card p-6 text-center mb-6">
          <div className="mb-4">
            <Button
              className={`w-24 h-24 rounded-full ${
                isRecording 
                  ? 'bg-red-500 hover:bg-red-600 voice-recording' 
                  : 'bg-gradient-to-r from-earth-500 to-earth-600 hover:from-earth-600 hover:to-earth-700'
              } text-white shadow-lg`}
              onClick={startRecording}
              disabled={isRecording}
            >
              {isRecording ? (
                <MicOff className="h-8 w-8" />
              ) : (
                <Mic className="h-8 w-8" />
              )}
            </Button>
          </div>
          
          <h2 className="text-lg font-semibold text-earth-800 mb-2">
            {isRecording ? 'Listening...' : 'Tap to Ask'}
          </h2>
          <p className="text-earth-600 text-sm">
            {isRecording 
              ? 'Speak clearly about your farming question'
              : 'Ask about crops, prices, diseases, or government schemes'
            }
          </p>
        </Card>

        {/* Conversation History */}
        {conversation.length > 0 && (
          <div className="space-y-4 mb-6">
            <h3 className="font-semibold text-forest-800">Conversation</h3>
            {conversation.map((message, index) => (
              <Card key={index} className={`p-4 ${
                message.type === 'user' 
                  ? 'bg-blue-50 border-blue-200 ml-4' 
                  : 'bg-green-50 border-green-200 mr-4'
              }`}>
                <div className="flex items-start space-x-2">
                  {message.type === 'assistant' && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => speakResponse(message.text)}
                      className="mt-1 p-1"
                    >
                      {isPlaying ? (
                        <Pause className="h-4 w-4 text-green-600" />
                      ) : (
                        <Volume2 className="h-4 w-4 text-green-600" />
                      )}
                    </Button>
                  )}
                  <div className="flex-1">
                    <p className="text-sm text-gray-800">{message.text}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Quick Query Suggestions */}
        <Card className="p-4">
          <h3 className="font-semibold text-forest-800 mb-3">Quick Questions</h3>
          <div className="space-y-2">
            {quickQueries.map((query, index) => (
              <Button
                key={index}
                variant="outline"
                className="w-full text-left justify-start h-auto py-3 px-4 border-forest-200 text-forest-700 hover:bg-forest-50"
                onClick={() => {
                  setConversation(prev => [...prev, {
                    type: 'user',
                    text: query,
                    timestamp: new Date()
                  }]);
                  
                  // Simulate response
                  setTimeout(() => {
                    let response = "";
                    if (query.includes("market price")) {
                      response = "Current onion prices are ₹20-25 per kg in major mandis. Prices are stable compared to last week.";
                    } else if (query.includes("leaf curl")) {
                      response = "Tomato leaf curl is usually caused by virus. Use resistant varieties, control whiteflies, and remove affected plants immediately.";
                    } else if (query.includes("PM-KISAN")) {
                      response = "PM-KISAN provides ₹6000 per year to eligible farmers. You need Aadhaar, bank account, and land records. Apply online at pmkisan.gov.in";
                    } else {
                      response = "That's a great question! Let me help you with detailed information about this topic.";
                    }
                    
                    setConversation(prev => [...prev, {
                      type: 'assistant',
                      text: response,
                      timestamp: new Date()
                    }]);
                  }, 1500);
                }}
              >
                <span className="text-sm">{query}</span>
              </Button>
            ))}
          </div>
        </Card>

        {/* Language Support */}
        <Card className="mt-4 p-4 bg-yellow-50 border-yellow-200">
          <h4 className="font-semibold text-yellow-800 mb-2">
            Language Support / ಭಾಷಾ ಬೆಂಬಲ
          </h4>
          <p className="text-sm text-yellow-700">
            You can speak in English or Kannada. The assistant will respond in the same language.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default VoiceAssistant;
