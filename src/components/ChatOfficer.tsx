import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, EnvironmentalState, SymptomState } from '../types';
import { Send, User, Bot, AlertTriangle, HelpCircle, ShieldCheck } from 'lucide-react';

interface ChatOfficerProps {
  sensors: EnvironmentalState;
  symptoms: SymptomState;
  onEmergencyTrigger: () => void;
}

export default function ChatOfficer({
  sensors,
  symptoms,
  onEmergencyTrigger,
}: ChatOfficerProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init',
      role: 'model',
      text: 'Namaste Bhai! Main aapka AI Suraksha Officer (Safety Assistant) hoon. \n\nMujhse aap chemical burns, Factories Act 1948 ke niyam, gas leaks ya apni kisi tabiyat kharabi ke baare mein pooch sakte hain. Main Hindi aur English mix (Hinglish) mein aapko suraksha guide dunga. Tumhari safety hamari sabse badi priority hai!',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    { label: 'Factories Act 1948 Sec 36 kya hai?', prompt: 'Mujhe Factories Act 1948 ke Section 36 (Dangerous fumes and gas precautions) ke baare mein batayein.' },
    { label: 'Methane gas ke lakshan aur primary upchar', prompt: 'Methane gas leak hone par sharir mein kya asar padta hai aur turant pratham upchar (first-aid) kya hai?' },
    { label: 'Chemical burn ka first-aid upchar', prompt: 'Agar kisi worker par chemical splash gir jaye toh pratham upchar (first-aid) ke rules kya hain under Section 45?' },
    { label: 'Kanoon ke mutabik Wet Bulb temperature limit', prompt: 'High workload factory mein kanoon (Factories Act Sec 13) ke hisab se temperature limit kya hai?' },
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      // Fetch response from server-side Gemini route
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMsg],
          sensorContext: sensors,
          symptomContext: symptoms,
        }),
      });

      if (!response.ok) {
        throw new Error('Server connection issue');
      }

      const data = await response.json();
      
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: data.text || 'Maaf karna bhai, mujhe samajhne mein thodi takleef hui. Kripya dobara poochiye.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error(error);
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: 'Arey, lagta hai internet connection thoda kamzor hai! Chinta mat karo, agar emergency hai toh direct upar diye gaye Lal Emergency Button ko dabao. Main offline safety rules recommend karta hoon ki pehle safe ventilated area mein jayein.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(input);
  };

  // Helper function to format **bold** and newlines in Hinglish bot output
  const formatText = (text: string) => {
    return text.split('\n').map((line, lineIdx) => {
      // Handle empty lines
      if (!line.trim()) return <div key={lineIdx} className="h-2" />;

      // Match markdown bold regex **text**
      const parts = line.split(/(\*\*[^*]+\*\*)/g);
      const renderedLine = parts.map((part, partIdx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={partIdx} className="font-bold text-natural-dark bg-natural-beige/30 px-1.5 py-0.5 rounded border-b border-natural-beige-dark/30">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return part;
      });

      // Simple list styling if line starts with bullet point or number
      if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
        return (
          <li key={lineIdx} className="ml-4 list-disc text-natural-text my-1 leading-relaxed font-medium">
            {renderedLine}
          </li>
        );
      }
      if (/^\d+\.\s/.test(line.trim())) {
        return (
          <div key={lineIdx} className="ml-4 text-natural-text my-1 leading-relaxed pl-2 border-l-2 border-natural-olive/30 font-medium">
            {renderedLine}
          </div>
        );
      }

      return (
        <p key={lineIdx} className="text-natural-text leading-relaxed my-1 font-medium">
          {renderedLine}
        </p>
      );
    });
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-natural-border flex flex-col h-[550px] overflow-hidden" id="chat-officer-root">
      {/* Bot Header */}
      <div className="bg-natural-dark text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-natural-olive flex items-center justify-center border-2 border-natural-beige/30">
            <Bot className="w-5 h-5 text-white animate-pulse" />
          </div>
          <div>
            <h3 className="text-sm font-bold tracking-tight text-white uppercase">AI Suraksha Officer</h3>
            <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              Shift Active & Monitoring Laws
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-300 font-medium">Factories Act 1948 Compliant</span>
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-natural-bg/20" id="chat-messages-container">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex gap-3 max-w-[85%] ${m.role === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
              m.role === 'user' ? 'bg-natural-olive text-white' : 'bg-natural-dark text-white'
            }`}>
              {m.role === 'user' ? <User className="w-4.5 h-4.5" /> : <Bot className="w-4.5 h-4.5" />}
            </div>
            
            <div className={`rounded-2xl px-4 py-3 shadow-xs text-xs font-medium ${
              m.role === 'user'
                ? 'bg-natural-olive text-white rounded-tr-none'
                : 'bg-white border border-natural-border text-natural-text rounded-tl-none'
            }`}>
              <div className="space-y-1">{m.role === 'user' ? m.text : formatText(m.text)}</div>
              <div className={`text-[9px] mt-2 text-right ${m.role === 'user' ? 'text-natural-beige' : 'text-[#8A8471]'}`}>
                {m.timestamp}
              </div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex gap-3 max-w-[85%] mr-auto">
            <div className="w-8 h-8 rounded-full bg-natural-dark text-white flex items-center justify-center shrink-0">
              <Bot className="w-4.5 h-4.5" />
            </div>
            <div className="bg-white border border-natural-border rounded-2xl rounded-tl-none px-4 py-3 shadow-xs text-xs text-[#8A8471] flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-[#8A8471] rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-[#8A8471] rounded-full animate-bounce delay-150"></span>
              <span className="w-1.5 h-1.5 bg-[#8A8471] rounded-full animate-bounce delay-300"></span>
              <span className="text-[10px] text-[#8A8471] ml-1 font-bold">Officer is thinking...</span>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Quick Prompts */}
      <div className="px-6 py-2 bg-natural-bg/50 border-t border-natural-border overflow-x-auto whitespace-nowrap flex gap-2 scrollbar-none">
        {quickPrompts.map((qp, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(qp.prompt)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white hover:bg-natural-beige/30 text-natural-olive hover:text-natural-dark border border-natural-border hover:border-natural-olive/40 text-[10px] font-bold transition-all shadow-xs cursor-pointer"
            id={`quick-prompt-${idx}`}
          >
            <HelpCircle className="w-3 h-3 text-natural-olive shrink-0" />
            {qp.label}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <form onSubmit={handleFormSubmit} className="p-4 bg-white border-t border-natural-border flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Apne sawal yahan likhein (e.g. skin rash burn treatment, Section 36 rights)..."
          className="flex-1 bg-natural-bg/30 border border-natural-border rounded-xl px-4 py-2.5 text-xs focus:outline-hidden focus:ring-2 focus:ring-natural-olive focus:bg-white text-natural-dark transition-all font-medium"
          disabled={loading}
          id="chat-input-field"
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="bg-natural-olive hover:bg-natural-olive/90 disabled:bg-natural-beige disabled:text-[#8A8471] text-white p-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center shrink-0"
          id="chat-send-btn"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
