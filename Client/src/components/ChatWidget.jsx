import { useState, useRef, useEffect } from 'react';

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
  const WEBHOOK_URL = 'http://localhost:5678/webhook/doctor-chat';

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
          chatInput: currentInput,     // The user's message
          sessionId: sessionId,         // Session ID for memory
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Response from n8n:', data); // For debugging

      // Add AI response
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
    <div className="flex flex-col h-screen max-h-[700px] max-w-4xl mx-auto my-8 border border-gray-200 rounded-2xl overflow-hidden shadow-2xl bg-white">

      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-5">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          🏥 Doctor Appointment Booking
        </h1>
        <p className="text-indigo-100 text-sm mt-1">
          AI-powered appointment assistant
        </p>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50 chat-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[75%] rounded-2xl px-4 py-3 ${msg.role === 'user'
                ? 'bg-indigo-600 text-white rounded-br-sm'
                : msg.error
                  ? 'bg-red-100 text-red-800 border border-red-300 rounded-bl-sm'
                  : 'bg-white text-gray-800 border border-gray-200 shadow-sm rounded-bl-sm'
                }`}
            >
              <p className="text-[15px] leading-relaxed whitespace-pre-wrap">
                {msg.content}
              </p>
              <p className={`text-xs mt-2 ${msg.role === 'user' ? 'text-indigo-200' : 'text-gray-500'
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
            <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
              <div className="flex gap-1.5">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-blink"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-blink-delay-1"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-blink-delay-2"></span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 bg-white p-4">
        <form onSubmit={sendMessage} className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message... (e.g., 'I need to book an appointment')"
            disabled={loading}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed text-[15px]"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 text-lg"
          >
            {loading ? '⏳' : '📤'}
          </button>
        </form>

        {/* Quick Actions */}
        <div className="mt-3 flex gap-2 flex-wrap">
          <button
            onClick={() => setInput('I need to book an appointment')}
            className="px-3 py-1.5 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
            disabled={loading}
          >
            📅 Book appointment
          </button>
          <button
            onClick={() => setInput('Check my appointment status')}
            className="px-3 py-1.5 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
            disabled={loading}
          >
            🔍 Check status
          </button>
          <button
            onClick={() => setInput('What are your available times?')}
            className="px-3 py-1.5 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
            disabled={loading}
          >
            ⏰ Available times
          </button>
        </div>
      </div>
    </div>
  );
}

export default N8nChat;