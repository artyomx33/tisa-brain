import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Sparkles,
  BookOpen,
  FileText,
  Copy,
  Check,
  Loader2,
  Send,
  ChevronDown,
  ChevronUp,
  Search,
  CheckCircle,
  XCircle
} from 'lucide-react';
import {
  emailTemplates,
  communicationPrinciples,
  categoryLabels,
} from '../data/emailKnowledge';
import { generateWithClaude } from '../lib/claude';
import { useHistoryStore } from '../stores/historyStore';

type TabType = 'compose' | 'templates' | 'guide';

const tabs: { id: TabType; label: string; icon: typeof Mail }[] = [
  { id: 'compose', label: 'Compose Reply', icon: Send },
  { id: 'templates', label: 'Templates', icon: FileText },
  { id: 'guide', label: 'Style Guide', icon: BookOpen },
];

// Real Claude API generation for personalized email replies
const generateEmailReply = async (emailThread: string, context?: string): Promise<{ subject: string; body: string }> => {
  const prompt = `You are a Teddy Kids email assistant. Generate a personalized, warm reply to the parent's email.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PARENT'S EMAIL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${emailThread}

${context ? `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CONTEXT (use to personalize response)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${context}
` : ''}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TEDDYKIDS PRINCIPLES - ALWAYS FOLLOW THESE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. **Warmth** - "I see you" and your situation
2. **Reassurance** - "I've got you" and "we're here for you"
3. **Guidance** - "Here's what happens next" (clear next steps)
4. **Use names** - Always use parent/child names when available in context
5. **Human touch** - At least one soft, genuine human sentence
6. **Specific, never generic** - Reference actual details from their email or context
7. **Professional yet warm** - Not cold, not policy-dumping, not corporate
8. **Proactive** - Anticipate what they need
9. **Clear closing** - Always end with warm regards and signature
10. **Personal voice** - Sounds like a real person, not a template

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
YOUR TASK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Generate a personalized email reply that:
- Opens with warmth and understanding of their specific situation
- Uses their name (if provided in context)
- References specific details from their email (amounts, dates, names, concerns)
- Addresses their actual question/concern with concrete information
- Includes at least one soft, human sentence that shows empathy
- Provides clear next steps if applicable
- Closes warmly and professionally
- Sounds natural and personal, not templated

FORMAT YOUR RESPONSE EXACTLY AS:
Subject: [Your subject line here]

[Your email body here - use proper paragraph breaks]

CRITICAL: Your response must feel personal, warm, and specific to THIS parent's situation. Never generic. Always human.`;

  try {
    const response = await generateWithClaude(prompt, [], undefined, { temperature: 0.75 });

    // Parse response to extract subject and body
    const subjectMatch = response.match(/Subject:\s*(.+?)(?:\n|$)/);
    const subject = subjectMatch ? subjectMatch[1].trim() : 'Thank You for Your Message';

    // Get body (everything after the subject line)
    const bodyStart = response.indexOf('\n') + 1;
    const body = response.substring(bodyStart).trim();

    return {
      subject,
      body
    };
  } catch (error) {
    console.error('Email generation failed:', error);
    throw error;
  }
};

export default function EmailAssistant() {
  const [activeTab, setActiveTab] = useState<TabType>('compose');
  const [emailInput, setEmailInput] = useState('');
  const [contextInput, setContextInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedReply, setGeneratedReply] = useState<{ subject: string; body: string } | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedTemplate, setExpandedTemplate] = useState<string | null>(null);
  const [expandedPrinciple, setExpandedPrinciple] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  const { addItem } = useHistoryStore();

  const handleGenerate = async () => {
    if (!emailInput.trim()) return;
    
    setIsGenerating(true);
    setGeneratedReply(null);
    
    try {
      const result = await generateEmailReply(emailInput, contextInput);
      setGeneratedReply(result);
      
      // Save to history
      addItem({
        type: 'email',
        content: `**Subject:** ${result.subject}\n\n${result.body}`,
        input: emailInput,
      });
    } catch (error) {
      console.error('Generation failed:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = async (id: string, content: string) => {
    await navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Filter templates
  const filteredTemplates = emailTemplates.filter(template => {
    const matchesSearch = searchQuery === '' || 
      template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.body.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="flex items-center gap-3 mb-2">
          <Mail className="w-8 h-8 text-tisa-gold" />
          <h1 className="font-display text-3xl font-bold text-tisa-white">
            Email Assistant
          </h1>
        </div>
        <p className="text-tisa-cream/60">
          Generate warm, professional parent emails in the Teddy Kids style.
        </p>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex gap-2 mb-6"
      >
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-heading text-sm transition-all ${
                activeTab === tab.id
                  ? 'bg-tisa-gold text-tisa-black'
                  : 'glass text-tisa-cream/70 hover:text-tisa-gold'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </motion.div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'compose' && (
          <motion.div
            key="compose"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Input Section */}
            <div className="glass rounded-2xl p-6">
              <label className="block text-sm font-heading text-tisa-cream/70 mb-2">
                Paste the parent email or thread
              </label>
              <textarea
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="input w-full h-40 resize-none mb-4 font-mono text-sm"
                placeholder="Paste the email content here...

Example:
Hi, we recently moved to the Netherlands and are looking for childcare for our son. He is 2 years old and we need care for 3 days a week. Can you tell us more about availability?"
              />

              <label className="block text-sm font-heading text-tisa-cream/70 mb-2">
                Additional context (optional - helps personalize the reply)
              </label>
              <textarea
                value={contextInput}
                onChange={(e) => setContextInput(e.target.value)}
                className="input w-full h-24 resize-none mb-4 font-mono text-sm"
                placeholder="Add details to personalize the reply:
Parent name: Nithya
Child name: Krishnaved
Invoice amount: €2,963.73
Start date: 16 October
Any other details..."
              />

              <div className="flex items-center justify-between">
                <p className="text-xs text-tisa-cream/50">
                  AI will generate a warm, Teddy Kids-style reply
                </p>
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating || !emailInput.trim()}
                  className="btn-primary flex items-center gap-2"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Generate Reply
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Generated Reply */}
            {generatedReply && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass rounded-2xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-heading font-semibold text-tisa-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-tisa-gold" />
                    Generated Reply
                  </h3>
                  <button
                    onClick={() => handleCopy('generated', `Subject: ${generatedReply.subject}\n\n${generatedReply.body}`)}
                    className="btn-secondary text-sm flex items-center gap-2"
                  >
                    {copiedId === 'generated' ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy All
                      </>
                    )}
                  </button>
                </div>

                <div className="bg-tisa-dark/50 rounded-xl p-4 mb-4">
                  <p className="text-sm text-tisa-cream/60 mb-1">Subject:</p>
                  <p className="text-tisa-white font-heading">{generatedReply.subject}</p>
                </div>

                <div className="bg-tisa-dark/50 rounded-xl p-4">
                  <p className="text-sm text-tisa-cream/60 mb-2">Body:</p>
                  <p className="text-tisa-cream/90 whitespace-pre-line text-sm leading-relaxed">
                    {generatedReply.body}
                  </p>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}

        {activeTab === 'templates' && (
          <motion.div
            key="templates"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Search & Filter */}
            <div className="glass rounded-xl p-4 flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-tisa-cream/40" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input w-full pl-10"
                  placeholder="Search templates..."
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="input"
              >
                <option value="all">All Categories</option>
                <option value="onboarding">👋 First Contact & Onboarding</option>
                <option value="operations">📅 Daily Operations</option>
                <option value="challenges">🤝 Challenges & Delicate Moments</option>
              </select>
            </div>

            {/* Templates List */}
            <div className="space-y-3">
              {filteredTemplates.map(template => {
                const category = categoryLabels[template.category];
                const isExpanded = expandedTemplate === template.id;
                
                return (
                  <motion.div
                    key={template.id}
                    layout
                    className="glass rounded-xl overflow-hidden"
                  >
                    <button
                      onClick={() => setExpandedTemplate(isExpanded ? null : template.id)}
                      className="w-full p-4 flex items-center justify-between text-left"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm">{category.emoji}</span>
                          <span className="text-xs text-tisa-cream/50">{category.label}</span>
                        </div>
                        <h3 className="font-heading font-semibold text-tisa-white">
                          {template.title}
                        </h3>
                        <p className="text-sm text-tisa-cream/60">{template.useCase}</p>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-tisa-cream/40" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-tisa-cream/40" />
                      )}
                    </button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="border-t border-tisa-gold/10"
                        >
                          <div className="p-4">
                            {template.subject && (
                              <div className="mb-3">
                                <p className="text-xs text-tisa-cream/50 mb-1">Subject:</p>
                                <p className="text-sm text-tisa-gold">{template.subject}</p>
                              </div>
                            )}
                            <div className="bg-tisa-dark/50 rounded-lg p-4 mb-3">
                              <p className="text-sm text-tisa-cream/80 whitespace-pre-line">
                                {template.body}
                              </p>
                            </div>
                            <button
                              onClick={() => handleCopy(template.id, template.body)}
                              className="btn-secondary text-sm flex items-center gap-2"
                            >
                              {copiedId === template.id ? (
                                <>
                                  <Check className="w-4 h-4 text-emerald-400" />
                                  Copied!
                                </>
                              ) : (
                                <>
                                  <Copy className="w-4 h-4" />
                                  Copy Template
                                </>
                              )}
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>

            {filteredTemplates.length === 0 && (
              <div className="glass rounded-xl p-8 text-center">
                <p className="text-tisa-cream/50">No templates found matching your search.</p>
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'guide' && (
          <motion.div
            key="guide"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Intro */}
            <div className="glass rounded-2xl p-6">
              <h2 className="font-display text-xl font-bold text-tisa-white mb-2">
                Teddy Kids Communication Behavior Guide
              </h2>
              <p className="text-tisa-cream/70 italic">
                "How We Speak. How We Welcome. How We Win."
              </p>
              <p className="text-sm text-tisa-cream/60 mt-4">
                At Teddy Kids, we don't win families with policies. We win them with warmth, clarity, and care. 
                Each parent who emails us is trusting us with the most important person in their life. 
                Our job is to reply like we understand that.
              </p>
            </div>

            {/* Principles */}
            <div className="space-y-3">
              {communicationPrinciples.map(principle => {
                const isExpanded = expandedPrinciple === principle.id;
                
                return (
                  <motion.div
                    key={principle.id}
                    layout
                    className="glass rounded-xl overflow-hidden"
                  >
                    <button
                      onClick={() => setExpandedPrinciple(isExpanded ? null : principle.id)}
                      className="w-full p-4 flex items-center justify-between text-left"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{principle.emoji}</span>
                        <div>
                          <h3 className="font-heading font-semibold text-tisa-white">
                            {principle.title}
                          </h3>
                          <p className="text-sm text-tisa-cream/60">{principle.description}</p>
                        </div>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-tisa-cream/40 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-tisa-cream/40 flex-shrink-0" />
                      )}
                    </button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="border-t border-tisa-gold/10"
                        >
                          <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-emerald-500/10 rounded-lg p-4">
                              <div className="flex items-center gap-2 mb-3">
                                <CheckCircle className="w-4 h-4 text-emerald-400" />
                                <span className="text-sm font-heading text-emerald-400">Do This</span>
                              </div>
                              <ul className="space-y-2">
                                {principle.doThis.map((item, i) => (
                                  <li key={i} className="text-sm text-tisa-cream/80 flex items-start gap-2">
                                    <span className="text-emerald-400 mt-1">•</span>
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div className="bg-red-500/10 rounded-lg p-4">
                              <div className="flex items-center gap-2 mb-3">
                                <XCircle className="w-4 h-4 text-red-400" />
                                <span className="text-sm font-heading text-red-400">Avoid This</span>
                              </div>
                              <ul className="space-y-2">
                                {principle.avoidThis.map((item, i) => (
                                  <li key={i} className="text-sm text-tisa-cream/80 flex items-start gap-2">
                                    <span className="text-red-400 mt-1">•</span>
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>

            {/* Quick Reference Card */}
            <div className="glass rounded-2xl p-6 border border-tisa-gold/20">
              <h3 className="font-heading font-semibold text-tisa-gold mb-4">
                📝 Quick Formula for Every Email
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-tisa-gold/20 text-tisa-gold flex items-center justify-center text-sm font-bold">A</span>
                    <div>
                      <p className="text-sm font-heading text-tisa-white">Warm Opening</p>
                      <p className="text-xs text-tisa-cream/60">"Thank you for your message — happy to help."</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-tisa-gold/20 text-tisa-gold flex items-center justify-center text-sm font-bold">B</span>
                    <div>
                      <p className="text-sm font-heading text-tisa-white">Acknowledge Situation</p>
                      <p className="text-xs text-tisa-cream/60">"I understand you're new to NL..."</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-tisa-gold/20 text-tisa-gold flex items-center justify-center text-sm font-bold">C</span>
                    <div>
                      <p className="text-sm font-heading text-tisa-white">Clear Next Steps</p>
                      <p className="text-xs text-tisa-cream/60">"Here's what we need / here's what will happen..."</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-tisa-gold/20 text-tisa-gold flex items-center justify-center text-sm font-bold">D</span>
                    <div>
                      <p className="text-sm font-heading text-tisa-white">Soft Closing</p>
                      <p className="text-xs text-tisa-cream/60">"We're excited to welcome you."</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
