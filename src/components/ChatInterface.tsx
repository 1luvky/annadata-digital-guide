
import React, { useState, useRef } from 'react';
import { Send, Mic, MicOff, Camera, Upload, Loader2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  messageType?: 'text' | 'image' | 'voice';
  imageUrl?: string;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'Namaste! I am your personal agricultural assistant. Ask me about crop diseases, market prices, government schemes, or any farming questions. You can type, speak, or send images.',
      timestamp: new Date(),
      messageType: 'text'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const sendMessage = (content: string, messageType: 'text' | 'image' | 'voice' = 'text', imageUrl?: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date(),
      messageType,
      imageUrl
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      let response = '';
      
      if (messageType === 'image') {
        response = 'I can see your crop image. This appears to be tomato leaf curl disease. Apply neem oil spray and remove affected leaves immediately. Cost: ₹50-100 per acre.';
      } else if (content.toLowerCase().includes('price') || content.toLowerCase().includes('market')) {
        response = 'Current tomato prices in Bangalore APMC are ₹25-30 per kg. Prices increased 15% from yesterday. Best time to sell is today or tomorrow morning.';
      } else if (content.toLowerCase().includes('scheme') || content.toLowerCase().includes('subsidy')) {
        response = 'PM-KISAN scheme provides ₹6000 annually. You need Aadhaar and land records. Apply at pmkisan.gov.in. Drip irrigation subsidy available up to 50% cost.';
      } else {
        response = 'I understand your question about farming. Let me help you with detailed information. Could you be more specific about what you need help with?';
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: response,
        timestamp: new Date(),
        messageType: 'text'
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 2000);
  };

  const handleSendText = () => {
    if (inputText.trim()) {
      sendMessage(inputText);
      setInputText('');
    }
  };

  const handleVoiceRecord = () => {
    setIsRecording(true);
    // Simulate voice recording
    setTimeout(() => {
      setIsRecording(false);
      sendMessage('What is the price of onions today in Mysore mandi?', 'voice');
    }, 3000);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        sendMessage('Please analyze this crop image for diseases', 'image', imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const quickQuestions = [
    'What is today\'s tomato price?',
    'How to treat leaf curl disease?',
    'Tell me about PM-KISAN scheme',
    'Best fertilizer for potato crop?'
  ];

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-green-50 via-white to-orange-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-forest-600 to-forest-700 text-white py-4 px-4 flex-shrink-0">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-xl font-bold">Project Kisan Assistant</h1>
          <p className="text-forest-100 text-sm">Your AI farming expert</p>
        </div>
      </div>

      {/* Messages - Fixed height with scroll */}
      <div className="flex-1 overflow-y-auto px-4 py-4 max-w-md mx-auto w-full min-h-0">
        {messages.map((message) => (
          <div key={message.id} className={`mb-4 ${message.type === 'user' ? 'text-right' : 'text-left'}`}>
            <Card className={`inline-block max-w-[80%] p-3 ${
              message.type === 'user' 
                ? 'bg-forest-600 text-white ml-auto' 
                : 'bg-white border-forest-200'
            }`}>
              {message.imageUrl && (
                <img src={message.imageUrl} alt="Uploaded crop" className="w-full h-32 object-cover rounded mb-2" />
              )}
              <p className="text-sm">{message.content}</p>
              <p className={`text-xs mt-1 ${message.type === 'user' ? 'text-forest-100' : 'text-gray-500'}`}>
                {message.timestamp.toLocaleTimeString()}
              </p>
            </Card>
          </div>
        ))}
        
        {isLoading && (
          <div className="text-left mb-4">
            <Card className="inline-block p-3 bg-white border-forest-200">
              <div className="flex items-center space-x-2">
                <Loader2 className="h-4 w-4 animate-spin text-forest-600" />
                <span className="text-sm text-forest-600">Analyzing...</span>
              </div>
            </Card>
          </div>
        )}

        {/* Quick Questions - Only show when there's just the welcome message */}
        {messages.length === 1 && (
          <div className="mt-4">
            <div className="space-y-2">
              <p className="text-sm text-forest-700 font-medium">Quick questions:</p>
              {quickQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full text-left justify-start border-forest-200 text-forest-700 hover:bg-forest-50"
                  onClick={() => sendMessage(question)}
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Input Area - Fixed at bottom */}
      <div className="bg-white border-t border-gray-200 p-4 flex-shrink-0">
        <div className="max-w-md mx-auto flex items-center space-x-2">
          <div className="flex-1 flex items-center bg-gray-100 rounded-full px-3 py-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your farming question..."
              className="flex-1 bg-transparent outline-none text-sm"
              onKeyPress={(e) => e.key === 'Enter' && handleSendText()}
            />
            <Button
              size="sm"
              className="ml-2 bg-forest-600 hover:bg-forest-700 text-white rounded-full w-8 h-8 p-0"
              onClick={handleSendText}
              disabled={!inputText.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          
          <Button
            size="sm"
            className={`rounded-full w-10 h-10 p-0 ${
              isRecording 
                ? 'bg-red-500 hover:bg-red-600' 
                : 'bg-earth-600 hover:bg-earth-700'
            } text-white`}
            onClick={handleVoiceRecord}
            disabled={isRecording}
          >
            {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </Button>
          
          <Button
            size="sm"
            className="bg-forest-600 hover:bg-forest-700 text-white rounded-full w-10 h-10 p-0"
            onClick={() => fileInputRef.current?.click()}
          >
            <Camera className="h-4 w-4" />
          </Button>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
