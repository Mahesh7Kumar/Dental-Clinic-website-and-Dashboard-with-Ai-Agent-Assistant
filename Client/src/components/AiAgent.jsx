import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';

// N8nChat Component
const N8nChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  // Generate a unique session ID once per user/session
  const [sessionId] = useState(() =>
    `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  );

  const messagesEndRef = useRef(null);

  // ⚠️ REPLACE WITH YOUR ACTUAL WEBHOOK URL
  const WEBHOOK_URL = "https://ai-agent-builder-0ekl.onrender.com/webhook/doctor-chat";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Welcome message
  useEffect(() => {
    setMessages([{
      role: 'assistant',
      content: '👋 Hello! I\'m your doctor appointment booking assistant. How can I help you today?',
      timestamp: new Date().toISOString()
    }]);
  }, []);

  const sendMessage = async (e) => {
    e?.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = {
      role: 'user',
      content: input,
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, userMessage]);

    const currentInput = input;
    setInput('');
    setLoading(true);

    try {
      // Send message to n8n webhook
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chatInput: currentInput,
          sessionId: sessionId,
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Response from n8n:', data);

      const aiMessage = {
        role: 'assistant',
        content: data.output || 'No response received',
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, aiMessage]);

    } catch (error) {
      console.error('Error:', error);

      const errorMessage = {
        role: 'assistant',
        content: '❌ Sorry, I\'m having trouble connecting. Please try again.',
        timestamp: new Date().toISOString(),
        error: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(e);
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 sm:px-6 py-4 sm:py-5 flex-shrink-0">
        <h1 className="text-lg sm:text-2xl font-bold flex items-center gap-2">
          🏥 Doctor Appointment Booking
        </h1>
        <p className="text-indigo-100 text-xs sm:text-sm mt-1">
          AI-powered appointment assistant
        </p>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-6 space-y-3 sm:space-y-4 bg-gray-50">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-3 sm:px-4 py-2 sm:py-3 ${msg.role === 'user'
                  ? 'bg-indigo-600 text-white rounded-br-sm'
                  : msg.error
                    ? 'bg-red-100 text-red-800 border border-red-300 rounded-bl-sm'
                    : 'bg-white text-gray-800 border border-gray-200 shadow-sm rounded-bl-sm'
                }`}
            >
              <p className="text-sm sm:text-[15px] leading-relaxed whitespace-pre-wrap break-words">
                {msg.content}
              </p>
              <p className={`text-xs mt-1 sm:mt-2 ${msg.role === 'user' ? 'text-indigo-200' : 'text-gray-500'
                }`}>
                {new Date(msg.timestamp).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-sm px-3 sm:px-4 py-2 sm:py-3 shadow-sm">
              <div className="flex gap-1.5">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-75"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-150"></span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 bg-white p-3 sm:p-4 flex-shrink-0">
        <form onSubmit={sendMessage} className="flex gap-2 sm:gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            disabled={loading}
            className="flex-1 px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed text-sm sm:text-[15px]"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="px-4 sm:px-6 py-2 sm:py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 text-base sm:text-lg"
          >
            {loading ? '⏳' : '📤'}
          </button>
        </form>

        {/* Quick Actions */}
        <div className="mt-2 sm:mt-3 flex gap-2 flex-wrap">
          <button
            onClick={() => setInput('I need to book an appointment')}
            className="px-2 sm:px-3 py-1 sm:py-1.5 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
            disabled={loading}
          >
            📅 Book appointment
          </button>
          <button
            onClick={() => setInput('Check my appointment status')}
            className="px-2 sm:px-3 py-1 sm:py-1.5 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
            disabled={loading}
          >
            🔍 Check status
          </button>
          <button
            onClick={() => setInput('What are your available times?')}
            className="px-2 sm:px-3 py-1 sm:py-1.5 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
            disabled={loading}
          >
            ⏰ Available times
          </button>
        </div>
      </div>
    </div>
  );
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
      {/* Floating Chat Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="group relative bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-full p-3 sm:p-4 shadow-2xl transition-all duration-300 transform hover:scale-110 hover:shadow-indigo-500/50"
          aria-label="Open chat"
        >
          <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7" />

          {/* Pulse effect */}
          <span className="absolute inset-0 rounded-full bg-indigo-400 animate-ping opacity-75"></span>

          {/* Tooltip */}
          <span className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Chat with us!
          </span>
        </button>
      )}

      {/* Chat Window */}
      {open && (
        <div className="fixed inset-0 sm:inset-auto sm:bottom-4 sm:right-4 sm:w-[400px] md:w-[450px] lg:w-[500px] sm:h-[600px] md:h-[650px] lg:h-[700px] bg-white sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50 animate-slide-up">
          {/* Close Button */}
          <button
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-600 hover:text-gray-900 rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110"
            aria-label="Close chat"
          >
            <X className="w-5 h-5" />
          </button>

          {/* N8nChat Component */}
          <N8nChat />
        </div>
      )}

      {/* Overlay for mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm sm:hidden z-40"
          onClick={() => setOpen(false)}
        />
      )}
    </div>
  );
}