import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare,
  Play,
  RotateCcw,
  Send,
  User,
  Bot,
  Loader2,
  Lightbulb
} from 'lucide-react';
import { runScenario } from '../lib/claude';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const scenarioTemplates = [
  {
    id: 'price-objection',
    title: 'Price Objection',
    description: 'Parent thinks tuition is too expensive',
    setup: 'You are a parent visiting TISA for a tour. You like what you see but think the tuition is too high. Push back on the price and express concerns about value for money. Be skeptical but not hostile.',
  },
  {
    id: 'dutch-concern',
    title: 'Dutch Language Concern',
    description: 'Parent worried about Dutch integration',
    setup: 'You are a parent considering TISA for your 6-year-old. You are worried that an English-focused school will prevent your child from integrating into Dutch society. Ask pointed questions about Dutch language learning.',
  },
  {
    id: 'academic-rigor',
    title: 'Academic Rigor Question',
    description: 'Parent doubts entrepreneurial approach',
    setup: 'You are an academic professional who values traditional education. You are skeptical about the "MBA for kids" concept and worry it is gimmicky. Challenge whether TISA actually teaches solid academics.',
  },
  {
    id: 'comparison-iss',
    title: 'ISS Comparison',
    description: 'Parent comparing to ISS/ISH',
    setup: 'You are a parent who has also visited ISS or another established international school. You are comparing TISA and want to understand why you should choose a smaller, newer school over established ones.',
  },
  {
    id: 'difficult-parent',
    title: 'Demanding Parent',
    description: 'Very demanding parent with high expectations',
    setup: 'You are a high-powered executive who expects excellence. You are demanding, ask rapid-fire questions, and challenge everything. You have very specific requirements and a low tolerance for vague answers.',
  },
  {
    id: 'teacher-explanation',
    title: 'Explaining to Teacher',
    description: 'New teacher asking about TISA philosophy',
    setup: 'You are a new teacher at TISA who came from a traditional school. You are curious about the TISA approach and want to understand how to explain it to parents. Ask practical questions about implementation.',
  },
];

export default function ScenarioSimulator() {
  const [selectedScenario, setSelectedScenario] = useState<typeof scenarioTemplates[0] | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const startScenario = async (scenario: typeof scenarioTemplates[0]) => {
    setSelectedScenario(scenario);
    setIsActive(true);
    setMessages([]);
    setIsLoading(true);

    try {
      const openingPrompt = `${scenario.setup}

Start the conversation naturally. You are the parent/person described above. Begin with a realistic opening line or question as this person would.`;

      const response = await runScenario(openingPrompt, []);
      setMessages([{ role: 'assistant', content: response }]);
    } catch (error) {
      console.error('Error starting scenario:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const prompt = `Continue the conversation. The TISA staff member just said: "${userMessage}"

Stay in character as described. Respond naturally and realistically. If their response was good, acknowledge it subtly. If it was weak, push back or show skepticism. After your in-character response, add coaching notes in [COACHING: ...] format.`;

      const response = await runScenario(prompt, messages);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetScenario = () => {
    setIsActive(false);
    setMessages([]);
    setSelectedScenario(null);
  };

  const parseMessage = (content: string) => {
    const coachingMatch = content.match(/\[COACHING:([^\]]+)\]/);
    const mainContent = content.replace(/\[COACHING:[^\]]+\]/g, '').trim();
    return {
      main: mainContent,
      coaching: coachingMatch ? coachingMatch[1].trim() : null
    };
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <MessageSquare className="w-8 h-8 text-tisa-gold" />
          <h1 className="font-display text-3xl font-bold text-tisa-white">
            Scenario Simulator
          </h1>
        </div>
        <p className="text-tisa-cream/60">
          Practice difficult conversations with AI-powered roleplay. Get real-time coaching.
        </p>
      </motion.div>

      <AnimatePresence mode="wait">
        {!isActive ? (
          /* Scenario Selection */
          <motion.div
            key="selection"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <h2 className="font-heading text-lg font-semibold text-tisa-white mb-4">
              Choose a Scenario
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {scenarioTemplates.map((scenario) => (
                <motion.button
                  key={scenario.id}
                  onClick={() => startScenario(scenario)}
                  className="card text-left group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-purple-400" />
                    </div>
                    <Play className="w-5 h-5 text-tisa-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h3 className="font-heading font-semibold text-tisa-white mb-1">
                    {scenario.title}
                  </h3>
                  <p className="text-sm text-tisa-cream/60">
                    {scenario.description}
                  </p>
                </motion.button>
              ))}
            </div>

            {/* Custom Scenario */}
            <div className="mt-8">
              <h2 className="font-heading text-lg font-semibold text-tisa-white mb-4">
                Or Create Custom Scenario
              </h2>
              <div className="glass rounded-2xl p-6">
                <p className="text-tisa-cream/60 text-sm mb-4">
                  Coming soon: Create your own custom scenarios with specific situations, parent types, and challenges.
                </p>
                <button disabled className="btn-secondary opacity-50 cursor-not-allowed">
                  Create Custom Scenario
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          /* Active Scenario */
          <motion.div
            key="active"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col h-[calc(100vh-200px)]"
          >
            {/* Scenario Header */}
            <div className="glass rounded-t-2xl p-4 flex items-center justify-between">
              <div>
                <h2 className="font-heading font-semibold text-tisa-white">
                  {selectedScenario?.title}
                </h2>
                <p className="text-sm text-tisa-cream/60">
                  {selectedScenario?.description}
                </p>
              </div>
              <button
                onClick={resetScenario}
                className="btn-ghost py-2 px-3 flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                End Session
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 bg-tisa-darker/50 overflow-y-auto p-4 space-y-4">
              <AnimatePresence>
                {messages.map((message, index) => {
                  const { main, coaching } = parseMessage(message.content);
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[80%] ${message.role === 'user' ? 'order-2' : ''}`}>
                        <div className="flex items-center gap-2 mb-1">
                          {message.role === 'assistant' ? (
                            <>
                              <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center">
                                <User className="w-4 h-4 text-purple-400" />
                              </div>
                              <span className="text-xs text-purple-400 font-heading">Simulated Parent</span>
                            </>
                          ) : (
                            <>
                              <span className="text-xs text-tisa-gold font-heading">You (TISA Staff)</span>
                              <div className="w-6 h-6 rounded-full bg-tisa-gold/20 flex items-center justify-center">
                                <Bot className="w-4 h-4 text-tisa-gold" />
                              </div>
                            </>
                          )}
                        </div>
                        <div className={`rounded-2xl p-4 ${
                          message.role === 'user'
                            ? 'bg-tisa-gold/10 border border-tisa-gold/20'
                            : 'bg-purple-500/10 border border-purple-500/20'
                        }`}>
                          <p className="text-sm text-tisa-cream/90 whitespace-pre-wrap">
                            {main}
                          </p>
                        </div>
                        
                        {/* Coaching Notes */}
                        {coaching && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="mt-2 bg-tisa-gold/5 border border-tisa-gold/10 rounded-xl p-3"
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <Lightbulb className="w-4 h-4 text-tisa-gold" />
                              <span className="text-xs text-tisa-gold font-heading uppercase tracking-wider">
                                Coaching Note
                              </span>
                            </div>
                            <p className="text-sm text-tisa-cream/70">
                              {coaching}
                            </p>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-purple-500/10 rounded-2xl p-4">
                    <Loader2 className="w-5 h-5 text-purple-400 animate-spin" />
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="glass rounded-b-2xl p-4">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage();
                }}
                className="flex gap-3"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your response as TISA staff..."
                  className="input flex-1"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="btn-primary px-4"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
              <p className="text-xs text-tisa-cream/40 mt-2 text-center">
                Respond as you would in a real conversation. The AI will play the parent and provide coaching.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
