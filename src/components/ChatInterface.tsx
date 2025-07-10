
import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, MicOff, Camera, Loader2, Sparkles, MessageCircle } from 'lucide-react';
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
      content: 'Welcome to Kisan AI! I\'m here to help you with farming insights, crop diseases, market prices, and government schemes. How can I assist you today?',
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

    // Simulate AI response
    setTimeout(() => {
      setIsTyping(false);
      let response = '';
      
      if (messageType === 'image') {
        response = 'I can analyze your crop image. This appears to show signs of nutrient deficiency. Consider applying balanced fertilizer and ensure proper watering. Estimated cost: ₹75-120 per acre.';
      } else if (content.toLowerCase().includes('price') || content.toLowerCase().includes('market')) {
        response = 'Current market rates: Tomato ₹28-32/kg, Onion ₹20-25/kg, Potato ₹18-22/kg in major mandis. Prices show 10% increase from last week. Best selling window is early morning.';
      } else if (content.toLowerCase().includes('scheme') || content.toLowerCase().includes('subsidy')) {
        response = 'Available schemes: PM-KISAN (₹6000/year), Soil Health Card (free), Crop Insurance (up to 80% coverage). Visit your nearest Krishi Vigyan Kendra for registration assistance.';
      } else {
        response = 'I\'m here to help with all your farming needs. You can ask me about crop diseases, market prices, weather updates, government schemes, or general agricultural practices. What specific information would you like?';
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
      sendMessage('What are the current weather conditions for farming in Karnataka?', 'voice');
    }, 3000);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        sendMessage('Please analyze this crop image for any diseases or issues', 'image', imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const quickSuggestions = [
    { icon: '🌾', text: 'Check crop prices', query: 'What are today\'s crop prices?' },
    { icon: '🍃', text: 'Disease diagnosis', query: 'Help me identify crop diseases' },
    { icon: '💰', text: 'Government schemes', query: 'Show me available subsidies' },
    { icon: '🌤️', text: 'Weather forecast', query: 'What\'s the weather like for farming?' }
  ];

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-50 via-white to-green-50">
      {/* Modern Header */}
      <div className="relative bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-blue-500/5 to-green-500/5"></div>
        <div className="relative max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Kisan AI</h1>
                <p className="text-sm text-gray-500">Your intelligent farming assistant</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-500 font-medium">Online</span>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">
          {messages.map((message, index) => (
            <div 
              key={message.id} 
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                {/* Avatar */}
                <div className={`flex items-end space-x-3 ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.type === 'user' 
                      ? 'bg-gradient-to-br from-blue-500 to-purple-600' 
                      : 'bg-gradient-to-br from-green-500 to-emerald-600'
                  }`}>
                    {message.type === 'user' ? (
                      <span className="text-white text-xs font-semibold">You</span>
                    ) : (
                      <MessageCircle className="h-4 w-4 text-white" />
                    )}
                  </div>
                  
                  {/* Message Bubble */}
                  <div className={`relative px-4 py-3 rounded-2xl shadow-sm ${
                    message.type === 'user'
                      ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-br-md'
                      : 'bg-white border border-gray-100 text-gray-800 rounded-bl-md shadow-md'
                  }`}>
                    {message.imageUrl && (
                      <img 
                        src={message.imageUrl} 
                        alt="Uploaded crop" 
                        className="w-full max-w-sm h-48 object-cover rounded-xl mb-3 shadow-sm" 
                      />
                    )}
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    <p className={`text-xs mt-2 opacity-70 ${
                      message.type === 'user' ? 'text-white/80' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {/* Typing Indicator */}
          {isLoading && (
            <div className="flex justify-start animate-fade-in">
              <div className="flex items-end space-x-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                  <MessageCircle className="h-4 w-4 text-white" />
                </div>
                <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-md px-4 py-3 shadow-md">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="text-xs text-gray-500">Kisan AI is thinking...</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Quick Suggestions */}
      {messages.length === 1 && (
        <div className="max-w-4xl mx-auto px-6 pb-6">
          <div className="text-center mb-4">
            <p className="text-sm text-gray-600 font-medium mb-2">Popular topics</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {quickSuggestions.map((suggestion, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-auto p-4 border-gray-200 hover:border-green-300 hover:bg-green-50 transition-all duration-200 rounded-xl"
                onClick={() => sendMessage(suggestion.query)}
              >
                <div className="flex items-center space-x-3 text-left">
                  <span className="text-lg">{suggestion.icon}</span>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{suggestion.text}</p>
                    <p className="text-xs text-gray-500 truncate">{suggestion.query}</p>
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Modern Input Area */}
      <div className="bg-white/80 backdrop-blur-xl border-t border-gray-200/50">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-end space-x-4">
            {/* Text Input */}
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Ask me anything about farming..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  onKeyPress={(e) => e.key === 'Enter' && handleSendText()}
                />
                <Button
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 p-0 bg-green-500 hover:bg-green-600 rounded-xl shadow-sm"
                  onClick={handleSendText}
                  disabled={!inputText.trim() || isLoading}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex space-x-2">
              <Button
                size="sm"
                variant="outline"
                className={`w-12 h-12 p-0 rounded-xl border-gray-200 transition-all duration-200 ${
                  isRecording 
                    ? 'bg-red-50 border-red-200 text-red-600 animate-pulse' 
                    : 'hover:bg-gray-50'
                }`}
                onClick={handleVoiceRecord}
                disabled={isRecording || isLoading}
              >
                {isRecording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
              </Button>
              
              <Button
                size="sm"
                variant="outline"
                className="w-12 h-12 p-0 rounded-xl border-gray-200 hover:bg-gray-50 transition-all duration-200"
                onClick={() => fileInputRef.current?.click()}
                disabled={isLoading}
              >
                <Camera className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          <p className="text-xs text-gray-500 mt-3 text-center">
            Type your question, record voice message, or upload crop images for analysis
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
