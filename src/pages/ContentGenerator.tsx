import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Instagram,
  MessageSquare,
  FileText,
  Mail,
  Loader2,
  Copy,
  Check,
  RefreshCw
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { pillars, parentProfiles, psychologyDrivers } from '../data/knowledge';
import {
  generateInstagramPost,
  generateTourScript,
  handleObjection,
  upgradeDocument,
  generateEmail
} from '../lib/claude';

type GeneratorType = 'instagram' | 'tour' | 'objection' | 'document' | 'email';

const generators: { id: GeneratorType; label: string; icon: LucideIcon; description: string }[] = [
  { id: 'instagram', label: 'Instagram Post', icon: Instagram, description: 'Create scroll-stopping Instagram content' },
  { id: 'tour', label: 'Tour Script', icon: MessageSquare, description: 'Generate tailored tour talking points' },
  { id: 'objection', label: 'Objection Handler', icon: MessageSquare, description: 'Get the perfect response to parent concerns' },
  { id: 'document', label: 'Document Upgrader', icon: FileText, description: 'Rewrite any text in TISA voice' },
  { id: 'email', label: 'Email Composer', icon: Mail, description: 'Professional emails with TISA tone' },
];

export default function ContentGenerator() {
  const [selectedType, setSelectedType] = useState<GeneratorType>('instagram');
  const [isGenerating, setIsGenerating] = useState(false);
  const [output, setOutput] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string>('');

  // Form states
  const [topic, setTopic] = useState('');
  const [pillar, setPillar] = useState(pillars[0].id);
  const [profile, setProfile] = useState(parentProfiles[0].id);
  const [psychology, setPsychology] = useState<'status' | 'belonging' | 'transformation'>('status');
  const [concerns, setConcerns] = useState('');
  const [objection, setObjection] = useState('');
  const [context, setContext] = useState('');
  const [originalText, setOriginalText] = useState('');
  const [docType, setDocType] = useState('');
  const [recipient, setRecipient] = useState('');
  const [purpose, setPurpose] = useState('');

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError('');
    setOutput('');

    try {
      let result = '';

      switch (selectedType) {
        case 'instagram':
          const selectedPillar = pillars.find(p => p.id === pillar);
          const selectedProfile = parentProfiles.find(p => p.id === profile);
          result = await generateInstagramPost(
            topic,
            selectedPillar?.name || pillar,
            selectedProfile?.name || profile,
            psychology
          );
          break;

        case 'tour':
          const tourProfile = parentProfiles.find(p => p.id === profile);
          result = await generateTourScript(
            tourProfile?.name || profile,
            concerns
          );
          break;

        case 'objection':
          result = await handleObjection(objection, context);
          break;

        case 'document':
          result = await upgradeDocument(originalText, docType);
          break;

        case 'email':
          result = await generateEmail(context, recipient, purpose);
          break;
      }

      setOutput(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderForm = () => {
    switch (selectedType) {
      case 'instagram':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-heading text-tisa-cream/70 mb-2">
                Topic / What to post about
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., Mental math demonstration, New robotics project, Theatre performance..."
                className="input"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-heading text-tisa-cream/70 mb-2">
                  Pillar
                </label>
                <select
                  value={pillar}
                  onChange={(e) => setPillar(e.target.value)}
                  className="input"
                >
                  {pillars.map((p) => (
                    <option key={p.id} value={p.id}>{p.shortName}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-heading text-tisa-cream/70 mb-2">
                  Target Profile
                </label>
                <select
                  value={profile}
                  onChange={(e) => setProfile(e.target.value)}
                  className="input"
                >
                  {parentProfiles.map((p) => (
                    <option key={p.id} value={p.id}>{p.shortName}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-heading text-tisa-cream/70 mb-2">
                Psychology Driver
              </label>
              <div className="flex gap-2">
                {(['status', 'belonging', 'transformation'] as const).map((driver) => (
                  <button
                    key={driver}
                    onClick={() => setPsychology(driver)}
                    className={`flex-1 py-2 px-4 rounded-xl font-heading text-sm transition-all ${
                      psychology === driver
                        ? driver === 'status' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                          driver === 'belonging' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                          'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                        : 'bg-tisa-dark/50 text-tisa-cream/50 border border-transparent hover:border-tisa-light/30'
                    }`}
                  >
                    {psychologyDrivers[driver].name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 'tour':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-heading text-tisa-cream/70 mb-2">
                Parent Profile
              </label>
              <select
                value={profile}
                onChange={(e) => setProfile(e.target.value)}
                className="input"
              >
                {parentProfiles.map((p) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-heading text-tisa-cream/70 mb-2">
                Specific Concerns or Questions They Have
              </label>
              <textarea
                value={concerns}
                onChange={(e) => setConcerns(e.target.value)}
                placeholder="e.g., Worried about Dutch integration, asking about class sizes, concerned about academic rigor..."
                className="textarea"
              />
            </div>
          </div>
        );

      case 'objection':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-heading text-tisa-cream/70 mb-2">
                The Objection / Concern
              </label>
              <textarea
                value={objection}
                onChange={(e) => setObjection(e.target.value)}
                placeholder="e.g., 'The tuition is too expensive' or 'My child needs more individual attention' or 'What about Dutch language skills?'"
                className="textarea"
              />
            </div>

            <div>
              <label className="block text-sm font-heading text-tisa-cream/70 mb-2">
                Context (when/where this came up)
              </label>
              <input
                type="text"
                value={context}
                onChange={(e) => setContext(e.target.value)}
                placeholder="e.g., During a tour, on a phone call, in an email..."
                className="input"
              />
            </div>
          </div>
        );

      case 'document':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-heading text-tisa-cream/70 mb-2">
                Original Text
              </label>
              <textarea
                value={originalText}
                onChange={(e) => setOriginalText(e.target.value)}
                placeholder="Paste the text you want to upgrade..."
                className="textarea min-h-[200px]"
              />
            </div>

            <div>
              <label className="block text-sm font-heading text-tisa-cream/70 mb-2">
                Document Type
              </label>
              <input
                type="text"
                value={docType}
                onChange={(e) => setDocType(e.target.value)}
                placeholder="e.g., Newsletter, Parent letter, Website copy, Brochure..."
                className="input"
              />
            </div>
          </div>
        );

      case 'email':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-heading text-tisa-cream/70 mb-2">
                  Recipient
                </label>
                <input
                  type="text"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder="e.g., Prospective parent, Current parent, Partner..."
                  className="input"
                />
              </div>

              <div>
                <label className="block text-sm font-heading text-tisa-cream/70 mb-2">
                  Purpose
                </label>
                <input
                  type="text"
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  placeholder="e.g., Follow-up after tour, Enrollment confirmation..."
                  className="input"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-heading text-tisa-cream/70 mb-2">
                Context / Details
              </label>
              <textarea
                value={context}
                onChange={(e) => setContext(e.target.value)}
                placeholder="Any additional context or specific points to include..."
                className="textarea"
              />
            </div>
          </div>
        );
    }
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
          <Sparkles className="w-8 h-8 text-tisa-gold" />
          <h1 className="font-display text-3xl font-bold text-tisa-white">
            Content Generator
          </h1>
        </div>
        <p className="text-tisa-cream/60">
          Generate perfectly aligned TISA content in seconds.
        </p>
      </motion.div>

      {/* Generator Type Selection */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
        {generators.map((gen) => {
          const IconComponent = gen.icon;
          return (
          <button
            key={gen.id}
            onClick={() => {
              setSelectedType(gen.id);
              setOutput('');
              setError('');
            }}
            className={`p-4 rounded-xl text-left transition-all ${
              selectedType === gen.id
                ? 'bg-tisa-gold/10 border border-tisa-gold/30'
                : 'glass hover:border-tisa-gold/20'
            }`}
          >
            <IconComponent className={`w-6 h-6 mb-2 ${
              selectedType === gen.id ? 'text-tisa-gold' : 'text-tisa-cream/50'
            }`} />
            <h3 className={`font-heading font-medium text-sm ${
              selectedType === gen.id ? 'text-tisa-gold' : 'text-tisa-white'
            }`}>
              {gen.label}
            </h3>
          </button>
        );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <motion.div
          key={selectedType}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass rounded-2xl p-6"
        >
          <h2 className="font-heading text-lg font-semibold text-tisa-white mb-4">
            {generators.find(g => g.id === selectedType)?.description}
          </h2>

          {renderForm()}

          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="btn-primary w-full mt-6 flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Generate
              </>
            )}
          </button>
        </motion.div>

        {/* Output */}
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading text-lg font-semibold text-tisa-white">
              Output
            </h2>
            {output && (
              <div className="flex gap-2">
                <button
                  onClick={copyToClipboard}
                  className="btn-ghost py-2 px-3 flex items-center gap-2"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="btn-ghost py-2 px-3 flex items-center gap-2"
                >
                  <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
                  Regenerate
                </button>
              </div>
            )}
          </div>

          <AnimatePresence mode="wait">
            {error ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-red-500/10 border border-red-500/20 rounded-xl p-4"
              >
                <p className="text-red-400 text-sm">{error}</p>
              </motion.div>
            ) : output ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-tisa-darker rounded-xl p-4 max-h-[600px] overflow-y-auto"
              >
                <pre className="text-tisa-cream/90 text-sm whitespace-pre-wrap font-body">
                  {output}
                </pre>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <Sparkles className="w-12 h-12 text-tisa-gold/30 mx-auto mb-4" />
                <p className="text-tisa-cream/40">
                  Fill in the form and click Generate to create content
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
