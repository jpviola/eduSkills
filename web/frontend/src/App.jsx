import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { 
  BookOpen, 
  MessageSquare, 
  Settings, 
  Brain, 
  Search, 
  Send, 
  ChevronRight,
  Sparkles,
  Command,
  GraduationCap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const API_BASE = 'http://localhost:3001/api';

function App() {
  const [skills, setSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [config, setConfig] = useState({
    provider: 'OpenAI',
    apiKey: '',
    model: 'gpt-4o'
  });

  const chatEndRef = useRef(null);

  useEffect(() => {
    fetchSkills();
    const savedConfig = localStorage.getItem('musa-config');
    if (savedConfig) setConfig(JSON.parse(savedConfig));
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const fetchSkills = async () => {
    try {
      const res = await axios.get(`${API_BASE}/skills`);
      setSkills(res.data);
    } catch (err) {
      console.error('Error fetching skills:', err);
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || !selectedSkill || loading) return;

    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await axios.post(`${API_BASE}/chat`, {
        skillId: selectedSkill.id,
        messages: newMessages,
        config
      });
      setMessages([...newMessages, { role: 'assistant', content: res.data.response }]);
    } catch (err) {
      console.error('Chat error:', err);
      setMessages([...newMessages, { role: 'assistant', content: '❌ Error: No se pudo conectar con la Musa.' }]);
    } finally {
      setLoading(false);
    }
  };

  const saveConfig = (newConfig) => {
    setConfig(newConfig);
    localStorage.setItem('musa-config', JSON.stringify(newConfig));
    setShowConfig(false);
  };

  return (
    <div className="flex h-full bg-hermes-bg font-sans text-hermes-text">
      {/* Sidebar */}
      <div className="w-72 flex-shrink-0 bg-white border-r border-neutral-200 flex flex-col">
        <div className="p-6 border-b border-neutral-100 flex items-center gap-3">
          <div className="bg-musa-500 p-2 rounded-xl text-white">
            <Sparkles size={24} />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-musa-600">Musa</h1>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-8">
          {['core', 'learn', 'critical-thinking', 'memory', 'lbd', 'research', 'educator'].map(cat => (
            <div key={cat}>
              <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-widest px-2 mb-3">
                {cat.replace('-', ' ')}
              </h3>
              <div className="space-y-1">
                {skills.filter(s => s.category === cat).map(skill => (
                  <button
                    key={skill.id}
                    onClick={() => {
                      setSelectedSkill(skill);
                      setMessages([]);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between group transition-all ${
                      selectedSkill?.id === skill.id 
                        ? 'bg-musa-50 text-musa-600 font-medium' 
                        : 'text-neutral-600 hover:bg-neutral-50'
                    }`}
                  >
                    <span className="truncate">/{skill.name}</span>
                    <ChevronRight size={14} className={`opacity-0 group-hover:opacity-100 ${selectedSkill?.id === skill.id ? 'opacity-100' : ''}`} />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-neutral-100">
          <button 
            onClick={() => setShowConfig(true)}
            className="w-full flex items-center gap-3 px-3 py-2 text-neutral-600 hover:bg-neutral-50 rounded-lg transition-colors"
          >
            <Settings size={18} />
            <span>Configuración</span>
          </button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {!selectedSkill ? (
          <div className="flex-1 flex flex-col items-center justify-center p-12 text-center max-w-2xl mx-auto">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-neutral-100 mb-8">
              <Brain size={64} className="text-musa-500" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Bienvenido a Musa</h2>
            <p className="text-neutral-500 leading-relaxed mb-8">
              Selecciona una habilidad cognitiva en el menú lateral para comenzar tu proceso de aprendizaje guiado. 
              Musa no es solo una IA, es tu tutora socrática.
            </p>
            <div className="grid grid-cols-2 gap-4 w-full">
              <div className="p-4 bg-white rounded-2xl border border-neutral-100 text-left">
                <Command size={20} className="text-musa-500 mb-2" />
                <h4 className="font-semibold mb-1">Aprendizaje Profundo</h4>
                <p className="text-sm text-neutral-400">Enfoque en procesos, no solo resultados.</p>
              </div>
              <div className="p-4 bg-white rounded-2xl border border-neutral-100 text-left">
                <GraduationCap size={20} className="text-musa-500 mb-2" />
                <h4 className="font-semibold mb-1">Guardrails Éticos</h4>
                <p className="text-sm text-neutral-400">Protección contra el atajo cognitivo.</p>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Chat Header */}
            <div className="h-16 border-b border-neutral-200 bg-white/80 backdrop-blur-sm px-8 flex items-center justify-between sticky top-0 z-10">
              <div className="flex items-center gap-3">
                <span className="text-musa-500 font-bold">/{selectedSkill.name}</span>
                <span className="text-neutral-300">|</span>
                <span className="text-neutral-400 text-sm italic">Categoría: {selectedSkill.category}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-neutral-400 font-medium uppercase tracking-tighter">Sesión Activa</span>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-8 space-y-8">
              {messages.length === 0 && (
                <div className="text-center py-12">
                  <div className="inline-block p-3 bg-musa-50 rounded-full text-musa-500 mb-4">
                    <Sparkles size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Comienza la invocación</h3>
                  <p className="text-neutral-400">Di algo para activar el proceso pedagógico de /{selectedSkill.name}.</p>
                </div>
              )}
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-5 rounded-3xl ${
                    m.role === 'user' 
                      ? 'bg-hermes-text text-white rounded-tr-none' 
                      : 'bg-white border border-neutral-200 text-neutral-800 shadow-sm rounded-tl-none leading-relaxed'
                  }`}>
                    {m.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-neutral-200 p-5 rounded-3xl rounded-tl-none shadow-sm flex gap-2">
                    <div className="w-2 h-2 bg-musa-300 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-musa-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-2 h-2 bg-musa-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-8">
              <form onSubmit={handleSend} className="max-w-4xl mx-auto relative">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={`Escribe a la Musa (${selectedSkill.name})...`}
                  className="w-full bg-white border border-neutral-200 rounded-2xl py-4 pl-6 pr-16 shadow-lg focus:outline-none focus:ring-2 focus:ring-musa-500/20 transition-all text-lg"
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="absolute right-3 top-3 bg-musa-500 text-white p-3 rounded-xl hover:bg-musa-600 disabled:bg-neutral-200 transition-colors"
                >
                  <Send size={20} />
                </button>
              </form>
              <p className="text-center text-[10px] text-neutral-400 mt-4 uppercase tracking-widest">
                Musa está diseñada para el desarrollo intelectual. No fomenta el plagio.
              </p>
            </div>
          </>
        )}
      </div>

      {/* Config Modal */}
      <AnimatePresence>
        {showConfig && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowConfig(false)}
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 overflow-hidden"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-musa-500 p-2 rounded-xl text-white">
                  <Settings size={20} />
                </div>
                <h3 className="text-2xl font-bold">Configuración</h3>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-neutral-500 mb-2 uppercase tracking-tighter">Proveedor</label>
                  <select 
                    value={config.provider}
                    onChange={(e) => setConfig({...config, provider: e.target.value})}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-musa-500/20"
                  >
                    <option>OpenAI</option>
                    <option>Anthropic</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-neutral-500 mb-2 uppercase tracking-tighter">API Key</label>
                  <input 
                    type="password"
                    value={config.apiKey}
                    onChange={(e) => setConfig({...config, apiKey: e.target.value})}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-musa-500/20"
                    placeholder="sk-..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-neutral-500 mb-2 uppercase tracking-tighter">Modelo</label>
                  <input 
                    value={config.model}
                    onChange={(e) => setConfig({...config, model: e.target.value})}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-musa-500/20"
                    placeholder="gpt-4o / claude-3-5-sonnet-20240620"
                  />
                </div>
                <div className="pt-4 flex gap-3">
                  <button 
                    onClick={() => saveConfig(config)}
                    className="flex-1 bg-musa-500 text-white font-bold py-3 rounded-xl hover:bg-musa-600 transition-colors shadow-lg shadow-musa-500/20"
                  >
                    Guardar
                  </button>
                  <button 
                    onClick={() => setShowConfig(false)}
                    className="px-6 py-3 border border-neutral-200 rounded-xl font-bold hover:bg-neutral-50 transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
