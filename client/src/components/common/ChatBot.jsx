import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Sparkles, User, Bot, RefreshCw, ChevronDown } from 'lucide-react';
import { api } from '../../services/api';
import { Link } from 'react-router-dom';

const initialQuickPrompts = [
  "🌸 Bridal Package Pricing",
  "✨ Book an Appointment",
  "💇‍♀️ Keratin vs Smoothening",
  "📍 Salon Location & Hours"
];

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(() => {
    try {
      const saved = sessionStorage.getItem('glamour_chat_history');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
      {
        id: 'msg-1',
        sender: 'bot',
        text: '✨ Namaste & welcome to Glow Like Angel! I am your personal AI Beauty & Spa Consultant powered by GPT-4. How may I assist your beauty transformation today?',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ];
  });
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    try {
      sessionStorage.setItem('glamour_chat_history', JSON.stringify(messages));
    } catch {}
    scrollToBottom();
  }, [messages, isTyping]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async (textToSend) => {
    const query = typeof textToSend === 'string' ? textToSend : input;
    if (!query.trim() || isTyping) return;

    const userMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: query.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const res = await api.sendChatMessage(query.trim(), messages);
      const botReply = res.reply || 'I am delighted to help! Please check our services menu or book an appointment online.';
      
      setMessages(prev => [
        ...prev,
        {
          id: `msg-${Date.now() + 1}`,
          sender: 'bot',
          text: botReply,
          engine: res.engine,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          id: `msg-${Date.now() + 1}`,
          sender: 'bot',
          text: '🌸 Our master specialists are always ready to pamper you. Feel free to call us at +91 98765 43210 or visit our booking section directly!',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const resetChat = () => {
    const welcome = [
      {
        id: `msg-${Date.now()}`,
        sender: 'bot',
        text: '✨ Chat refreshed! How can I help you choose the perfect hair, skin, or bridal treatment today?',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ];
    setMessages(welcome);
    sessionStorage.setItem('glamour_chat_history', JSON.stringify(welcome));
  };

  // Helper to render links cleanly if bot output has [Text](/path)
  const renderMessageContent = (text) => {
    const linkRegex = /\[(.*?)\]\((.*?)\)/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = linkRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }
      parts.push(
        <Link
          key={match.index}
          to={match[2]}
          onClick={() => setIsOpen(false)}
          className="underline font-bold text-amber-500 hover:text-amber-600 dark:text-pink-400"
        >
          {match[1]}
        </Link>
      );
      lastIndex = match.index + match[0].length;
    }
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }
    return parts.length > 0 ? parts : text;
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="relative group p-4 rounded-full bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500 text-white shadow-2xl hover:shadow-pink-500/50 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center btn-3d-pink"
          aria-label="Open AI Beauty Consultant"
        >
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-400 text-[9px] font-bold text-slate-900 items-center justify-center">1</span>
          </span>
          <Sparkles className="w-6 h-6 animate-spin-slow" />
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out font-medium text-xs ml-0 group-hover:ml-2">
            Ask AI Beauty Expert
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-[360px] sm:w-[420px] max-w-[calc(100vw-32px)] h-[560px] max-h-[calc(100vh-100px)] flex flex-col rounded-3xl overflow-hidden shadow-2xl border border-amber-300/40 dark:border-pink-500/30 bg-white/95 dark:bg-[#151528]/95 backdrop-blur-xl animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-pink-600 via-rose-600 to-amber-600 text-white flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-inner">
                <Sparkles className="w-5 h-5 text-amber-200" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-base flex items-center gap-1.5">
                  Glow Like Angel Concierge
                  <span className="text-[10px] bg-amber-300 text-slate-900 font-extrabold px-1.5 py-0.5 rounded-full uppercase">GPT-4</span>
                </h3>
                <p className="text-xs text-pink-100 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Online • Beauty & Booking Assistant
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={resetChat}
                title="Reset Conversation"
                className="p-1.5 rounded-full hover:bg-white/20 text-white/80 hover:text-white transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close Chat"
                className="p-1.5 rounded-full hover:bg-white/20 text-white/80 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Suggestions */}
          <div className="px-3 py-2 bg-pink-50/70 dark:bg-slate-900/60 border-b border-pink-100 dark:border-slate-800 flex gap-2 overflow-x-auto no-scrollbar text-xs">
            {initialQuickPrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(p)}
                className="whitespace-nowrap px-2.5 py-1 rounded-full bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-pink-400 hover:text-pink-600 dark:hover:text-pink-400 transition-colors shadow-xs"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/40 dark:bg-slate-950/40">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-pink-500 to-amber-400 text-white flex-shrink-0 flex items-center justify-center shadow-xs text-xs mt-1">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                <div
                  className={`max-w-[82%] rounded-2xl px-4 py-2.5 text-sm shadow-sm ${
                    m.sender === 'user'
                      ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white rounded-br-none'
                      : 'bg-white dark:bg-[#1e1e38] text-slate-800 dark:text-slate-100 border border-slate-200/80 dark:border-slate-800 rounded-bl-none'
                  }`}
                >
                  <div className="whitespace-pre-line leading-relaxed">
                    {renderMessageContent(m.text)}
                  </div>
                  <div
                    className={`text-[10px] mt-1.5 text-right ${
                      m.sender === 'user' ? 'text-pink-200' : 'text-slate-400 dark:text-slate-500'
                    }`}
                  >
                    {m.time}
                  </div>
                </div>
                {m.sender === 'user' && (
                  <div className="w-7 h-7 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 flex-shrink-0 flex items-center justify-center shadow-xs text-xs mt-1">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex gap-2.5 items-center">
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-pink-500 to-amber-400 text-white flex-shrink-0 flex items-center justify-center shadow-xs text-xs">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-white dark:bg-[#1e1e38] border border-slate-200 dark:border-slate-800 rounded-2xl rounded-bl-none px-4 py-3 shadow-xs flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-pink-500 animate-bounce"></span>
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-2 h-2 rounded-full bg-pink-500 animate-bounce [animation-delay:0.4s]"></span>
                  <span className="text-xs text-slate-400 ml-1">Consultant is crafting reply...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white dark:bg-[#151528] border-t border-slate-200 dark:border-slate-800 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about treatments, pricing, booking..."
              className="flex-1 px-4 py-2.5 text-sm rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-600 to-amber-500 text-white flex items-center justify-center shadow-md hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100 transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
