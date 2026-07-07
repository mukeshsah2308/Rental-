import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Search, Send, Phone, Video, Info, Paperclip, Smile, MoreVertical,
  Bell, MessageSquare, ShieldAlert, CheckCircle2, User, ChevronLeft, CornerDownLeft
} from 'lucide-react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

export default function MessagePage() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Mock chat list data
  const [chats, setChats] = useState([
    {
      id: 1,
      name: 'Sophia Reed',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop',
      property: 'The Azure Penthouse',
      lastMessage: "I've sent over the lease agreement for your review.",
      time: '10:42 AM',
      unread: 2,
      online: true
    },
    {
      id: 2,
      name: 'Marcus Vance',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop',
      property: 'Cedar Street Suites',
      lastMessage: 'Sounds good, see you there tomorrow at 2 PM!',
      time: 'Yesterday',
      unread: 0,
      online: false
    },
    {
      id: 3,
      name: 'Elena Rostova',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop',
      property: 'Skyline Heights',
      lastMessage: 'Is the security deposit refundable upon checkout?',
      time: '3 days ago',
      unread: 0,
      online: true
    },
    {
      id: 4,
      name: 'David Chen',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop',
      property: 'The Azure Lofts',
      lastMessage: 'Could we schedule a virtual walkthrough next Monday?',
      time: '1 week ago',
      unread: 0,
      online: false
    }
  ]);

  const [activeChatId, setActiveChatId] = useState(1);
  const activeChat = chats.find(c => c.id === activeChatId) || chats[0];

  // Message history state
  const [messageHistories, setMessageHistories] = useState({
    1: [
      { id: 1, sender: 'them', text: 'Hello Julian! Thanks for inquiring about The Azure Penthouse.', time: '10:30 AM' },
      { id: 2, sender: 'me', text: 'Hi Sophia! The space looks absolutely stunning. I wanted to verify if utilities are included in the monthly rent.', time: '10:35 AM' },
      { id: 3, sender: 'them', text: 'Yes, high-speed fiber internet and water are included. Electricity is billed separately based on usage.', time: '10:38 AM' },
      { id: 4, sender: 'me', text: 'That sounds perfect. When would the lease start?', time: '10:40 AM' },
      { id: 5, sender: 'them', text: "I've sent over the lease agreement for your review. It starts next Tuesday.", time: '10:42 AM' }
    ],
    2: [
      { id: 1, sender: 'me', text: 'Hi Marcus, does the studio have laundry in unit?', time: 'Yesterday' },
      { id: 2, sender: 'them', text: 'Yes! It has a brand new washer/dryer unit installed in the hallway closet.', time: 'Yesterday' },
      { id: 3, sender: 'me', text: 'Excellent, I would love to drop by and view it.', time: 'Yesterday' },
      { id: 4, sender: 'them', text: 'Sounds good, see you there tomorrow at 2 PM!', time: 'Yesterday' }
    ],
    3: [
      { id: 1, sender: 'them', text: 'Hello, are you still interested in scheduling a viewing for Skyline Heights?', time: '3 days ago' },
      { id: 2, sender: 'me', text: 'Yes I am! Quick question: Is the security deposit refundable upon checkout?', time: '3 days ago' }
    ],
    4: [
      { id: 1, sender: 'them', text: 'Hi Julian, thanks for checking out The Azure Lofts. Do you have any questions?', time: '1 week ago' },
      { id: 2, sender: 'me', text: 'Could we schedule a virtual walkthrough next Monday?', time: '1 week ago' }
    ]
  });

  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  const activeMessages = messageHistories[activeChatId] || [];

  // Scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeChatId, messageHistories]);

  // Handle sending message
  const handleSend = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Add to message history
    setMessageHistories(prev => ({
      ...prev,
      [activeChatId]: [
        ...(prev[activeChatId] || []),
        {
          id: Date.now(),
          sender: 'me',
          text: newMessage.trim(),
          time: timeString
        }
      ]
    }));

    // Update last message in chat list
    setChats(prev => prev.map(chat => {
      if (chat.id === activeChatId) {
        return {
          ...chat,
          lastMessage: newMessage.trim(),
          time: timeString,
          unread: 0
        };
      }
      return chat;
    }));

    setNewMessage('');

    // Trigger mock automatic host response for responsiveness after 1.5 seconds
    setTimeout(() => {
      const autoResponse = "Understood. Let me double-check that and get back to you shortly!";
      setMessageHistories(prev => ({
        ...prev,
        [activeChatId]: [
          ...(prev[activeChatId] || []),
          {
            id: Date.now() + 1,
            sender: 'them',
            text: autoResponse,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]
      }));

      setChats(prev => prev.map(chat => {
        if (chat.id === activeChatId) {
          return {
            ...chat,
            lastMessage: autoResponse,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
        }
        return chat;
      }));
    }, 1500);
  };

  // Mark chat as read
  const handleChatSelect = (id) => {
    setActiveChatId(id);
    setChats(prev => prev.map(chat => {
      if (chat.id === id) {
        return { ...chat, unread: 0 };
      }
      return chat;
    }));
  };

  return (
    <div className="flex h-screen bg-[#f9fafc] font-sans overflow-hidden">
      
      {/* Sidebar fixed to the left */}
      <Sidebar 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
        onMenuClick={() => setIsMobileMenuOpen(true)} 
      />

      <div className="flex-1 flex flex-col lg:ml-64 overflow-hidden relative">
        {/* Navbar Header */}
        <Header onMenuClick={() => setIsMobileMenuOpen(true)} />

        {/* Messaging Container Grid */}
        <main className="flex-1 flex overflow-hidden bg-white">
          
          {/* Inbox Chat List Sidebar (350px) */}
          <div className="w-full md:w-[350px] border-r border-gray-100 flex flex-col shrink-0 overflow-y-auto">
            <div className="p-5 border-b border-gray-100 space-y-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Inbox</h1>
                <p className="text-xs text-gray-400 font-bold uppercase mt-0.5">Chat with hosts &amp; inquiries</p>
              </div>

              {/* Search Inbox */}
              <div className="relative flex items-center bg-[#f8f9fb] rounded-xl px-4 py-2.5 border border-gray-100">
                <Search size={18} className="text-gray-400 mr-2.5" />
                <input
                  type="text"
                  placeholder="Search messages..."
                  className="bg-transparent text-sm w-full focus:outline-none placeholder:text-gray-400 font-medium"
                />
              </div>
            </div>

            {/* Chat item list */}
            <div className="flex-1 divide-y divide-gray-50 overflow-y-auto">
              {chats.map((chat) => {
                const isActive = chat.id === activeChatId;
                return (
                  <div
                    key={chat.id}
                    onClick={() => handleChatSelect(chat.id)}
                    className={`p-4 flex gap-3.5 cursor-pointer transition-all ${
                      isActive 
                        ? 'bg-blue-50/40 border-l-[3px] border-[#0b57d0]' 
                        : 'hover:bg-gray-50 border-l-[3px] border-transparent'
                    }`}
                  >
                    {/* User Avatar with status */}
                    <div className="relative shrink-0">
                      <img 
                        src={chat.avatar} 
                        alt={chat.name} 
                        className="h-11 w-11 rounded-2xl object-cover border border-gray-100 shadow-sm"
                      />
                      {chat.online && (
                        <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-emerald-500 border-2 border-white rounded-full"></div>
                      )}
                    </div>

                    {/* Chat Text Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline mb-0.5">
                        <h3 className={`text-sm leading-none truncate ${chat.unread > 0 ? 'font-bold text-gray-900' : 'font-semibold text-gray-800'}`}>
                          {chat.name}
                        </h3>
                        <span className="text-[10px] text-gray-400 font-semibold whitespace-nowrap">{chat.time}</span>
                      </div>
                      <p className="text-[10px] text-[#0b57d0] font-bold uppercase tracking-wider mb-1 truncate">
                        {chat.property}
                      </p>
                      <p className={`text-xs truncate ${chat.unread > 0 ? 'text-gray-950 font-bold' : 'text-gray-500'}`}>
                        {chat.lastMessage}
                      </p>
                    </div>

                    {/* Unread Badge */}
                    {chat.unread > 0 && (
                      <div className="self-center bg-[#0b57d0] text-white text-[10px] font-bold h-5 min-w-[20px] px-1 rounded-full flex items-center justify-center">
                        {chat.unread}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Active Conversation Detail Pane */}
          <div className="flex-1 flex flex-col bg-[#fcfdff] overflow-hidden">
            {/* Header info */}
            <div className="h-20 border-b border-gray-100 bg-white px-6 flex items-center justify-between shrink-0 shadow-sm/5">
              <div className="flex items-center gap-3">
                <img 
                  src={activeChat.avatar} 
                  alt={activeChat.name} 
                  className="h-10 w-10 rounded-2xl object-cover shadow-sm"
                />
                <div>
                  <h2 className="font-bold text-gray-900 text-sm leading-tight">{activeChat.name}</h2>
                  <p className="text-[10px] font-semibold text-gray-400">
                    Host &bull; <span className="text-[#0b57d0] font-bold">{activeChat.property}</span>
                  </p>
                </div>
              </div>

              {/* Top Icons */}
              <div className="flex items-center gap-3 text-gray-400">
                <button className="p-2 rounded-xl hover:bg-gray-50 hover:text-gray-800 transition-colors">
                  <Phone size={18} />
                </button>
                <button className="p-2 rounded-xl hover:bg-gray-50 hover:text-gray-800 transition-colors">
                  <Video size={18} />
                </button>
                <button className="p-2 rounded-xl hover:bg-gray-50 hover:text-gray-800 transition-colors">
                  <Info size={18} />
                </button>
              </div>
            </div>

            {/* Scrollable messages space */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {activeMessages.map((msg, idx) => {
                const isMe = msg.sender === 'me';
                return (
                  <div 
                    key={msg.id || idx} 
                    className={`flex ${isMe ? 'justify-end' : 'justify-start'} animate-fade-in`}
                  >
                    <div className={`max-w-[70%] space-y-1`}>
                      <div className={`px-4 py-3 rounded-3xl text-sm leading-relaxed ${
                        isMe 
                          ? 'bg-[#0b57d0] text-white rounded-tr-sm shadow-md shadow-blue-500/10' 
                          : 'bg-white text-gray-800 border border-gray-100 rounded-tl-sm shadow-sm/5'
                      }`}>
                        {msg.text}
                      </div>
                      <div className={`text-[9px] text-gray-400 font-semibold px-2 ${isMe ? 'text-right' : 'text-left'}`}>
                        {msg.time}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Input message form footer */}
            <div className="p-4 border-t border-gray-100 bg-white">
              <form onSubmit={handleSend} className="relative flex items-center bg-[#f8f9fb] border border-gray-250/40 rounded-2xl px-4 py-3">
                <button type="button" className="text-gray-400 hover:text-gray-600 transition-colors mr-2">
                  <Paperclip size={18} />
                </button>
                
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder={`Type a message to ${activeChat.name}...`}
                  className="bg-transparent text-sm w-full focus:outline-none placeholder:text-gray-400 font-medium text-gray-800 pr-10"
                />

                <div className="absolute right-4 flex items-center gap-3">
                  <button type="button" className="text-gray-400 hover:text-gray-600 transition-colors hidden sm:block">
                    <Smile size={18} />
                  </button>
                  <button 
                    type="submit" 
                    disabled={!newMessage.trim()}
                    className={`h-8 w-8 rounded-xl flex items-center justify-center transition-all ${
                      newMessage.trim() 
                        ? 'bg-[#0b57d0] text-white shadow-md shadow-blue-500/20 active:scale-[0.95]' 
                        : 'bg-gray-100 text-gray-300'
                    }`}
                  >
                    <Send size={14} />
                  </button>
                </div>
              </form>
            </div>

          </div>

        </main>
      </div>
    </div>
  );
}
