
import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, MicOff, Camera, Loader2, Sparkles } from 'lucide-react';
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
  const [isTyping, setIsTyping] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
    setIsTyping(true);

    // Simulate AI response with typing effect
    setTimeout(() => {
      setIsTyping(false);
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
    '🍅 What is today\'s tomato price?',
    '🍃 How to treat leaf curl disease?',
    '📋 Tell me about PM-KISAN scheme',
    '🥔 Best fertilizer for potato crop?'
  ];

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-forest-50 via-white to-earth-50">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-forest-600 via-forest-700 to-forest-800 text-white py-6 px-4 shadow-lg">
        <div className="max-w-md mx-auto text-center">
          <div className="flex items-center justify-center mb-2">
            <Sparkles className="h-6 w-6 mr-2 text-earth-300 animate-pulse" />
            <h1 className="text-2xl font-bold tracking-wide">Kisan AI Assistant</h1>
          </div>
          <p className="text-forest-100 text-sm opacity-90">Your intelligent farming companion</p>
          <div className="mt-3 h-1 bg-gradient-to-r from-transparent via-earth-400 to-transparent rounded-full opacity-60"></div>
        </div>
      </div>

      {/* Enhanced Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 max-w-md mx-auto w-full space-y-4">
        {messages.map((message, index) => (
          <div 
            key={message.id} 
            className={`animate-fade-in ${message.type === 'user' ? 'text-right' : 'text-left'}`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <Card className={`inline-block max-w-[85%] p-4 shadow-md transition-all duration-300 hover:shadow-lg ${
              message.type === 'user' 
                ? 'bg-gradient-to-r from-forest-600 to-forest-700 text-white ml-auto border-0' 
                : 'bg-white border-forest-200 hover:border-forest-300'
            }`}>
              {message.imageUrl && (
                <img 
                  src={message.imageUrl} 
                  alt="Uploaded crop" 
                  className="w-full h-40 object-cover rounded-lg mb-3 shadow-sm" 
                />
              )}
              <p className={`text-sm leading-relaxed ${message.type === 'user' ? 'text-white' : 'text-gray-800'}`}>
                {message.content}
              </p>
              <p className={`text-xs mt-2 ${
                message.type === 'user' ? 'text-forest-100' : 'text-gray-500'
              }`}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </Card>
          </div>
        ))}
        
        {/* Enhanced Loading State */}
        {isLoading && (
          <div className="text-left animate-fade-in">
            <Card className="inline-block p-4 bg-white border-forest-200 shadow-md">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Loader2 className="h-5 w-5 animate-spin text-forest-600" />
                  <div className="absolute inset-0 h-5 w-5 border-2 border-forest-200 rounded-full animate-pulse"></div>
                </div>
                <div className="space-y-1">
                  <span className="text-sm text-forest-700 font-medium">
                    {isTyping ? 'Analyzing your question...' : 'Thinking...'}
                  </span>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-forest-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-forest-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-forest-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Enhanced Quick Questions */}
      {messages.length === 1 && (
        <div className="px-4 pb-4 max-w-md mx-auto w-full">
          <div className="space-y-3">
            <div className="text-center">
              <p className="text-sm text-forest-700 font-semibold mb-1">Quick Start</p>
              <p className="text-xs text-gray-600">Try asking about these topics:</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {quickQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="text-left justify-start border-forest-200 text-forest-700 hover:bg-gradient-to-r hover:from-forest-50 hover:to-earth-50 hover:border-forest-300 transition-all duration-200 p-3 h-auto text-xs leading-tight"
                  onClick={() => sendMessage(question.replace(/^[🍅🍃📋🥔]\s/, ''))}
                >
                  <span className="truncate">{question}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Input Area */}
      <div className="bg-white border-t border-gray-200 p-4 shadow-lg">
        <div className="max-w-md mx-auto">
          <div className="flex items-end space-x-3">
            {/* Enhanced Text Input */}
            <div className="flex-1 relative">
              <div className="flex items-center bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl border border-gray-200 focus-within:border-forest-400 focus-within:ring-2 focus-within:ring-forest-100 transition-all duration-200 shadow-sm">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Ask me anything about farming..."
                  className="flex-1 bg-transparent outline-none text-sm px-4 py-3 placeholder-gray-500"
                  onKeyPress={(e) => e.key === 'Enter' && handleSendText()}
                />
                <Button
                  size="sm"
                  className="mr-2 bg-gradient-to-r from-forest-600 to-forest-700 hover:from-forest-700 hover:to-forest-800 text-white rounded-xl w-9 h-9 p-0 shadow-md transition-all duration-200 hover:shadow-lg transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  onClick={handleSendText}
                  disabled={!inputText.trim() || isLoading}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* Enhanced Action Buttons */}
            <div className="flex space-x-2">
              <Button
                size="sm"
                className={`rounded-2xl w-12 h-12 p-0 shadow-md transition-all duration-300 transform hover:scale-105 ${
                  isRecording 
                    ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 animate-pulse' 
                    : 'bg-gradient-to-r from-earth-600 to-earth-700 hover:from-earth-700 hover:to-earth-800'
                } text-white disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
                onClick={handleVoiceRecord}
                disabled={isRecording || isLoading}
              >
                {isRecording ? (
                  <MicOff className="h-5 w-5" />
                ) : (
                  <Mic className="h-5 w-5" />
                )}
              </Button>
              
              <Button
                size="sm"
                className="bg-gradient-to-r from-forest-600 to-forest-700 hover:from-forest-700 hover:to-forest-800 text-white rounded-2xl w-12 h-12 p-0 shadow-md transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                onClick={() => fileInputRef.current?.click()}
                disabled={isLoading}
              >
                <Camera className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          {/* Input Helper Text */}
          <p className="text-xs text-gray-500 mt-2 text-center">
            Type, speak, or upload an image for crop analysis
          </p>
        </div>
        
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
  );
};

export default ChatInterface;
