import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FlaskConical,
  Sparkles,
  Star,
  Heart,
  Copy,
  Check,
  Loader2,
  RefreshCw,
  Trophy
} from 'lucide-react';
import { useHistoryStore } from '../stores/historyStore';

interface Variation {
  id: string;
  psychology: 'status' | 'belonging' | 'transformation';
  content: string;
  stars: number;
  likes: number;
}

interface ABTest {
  id: string;
  originalMessage: string;
  variations: Variation[];
  createdAt: string;
}

const psychologyLabels = {
  status: { label: 'Status', color: 'text-purple-400', bg: 'bg-purple-500' },
  belonging: { label: 'Belonging', color: 'text-blue-400', bg: 'bg-blue-500' },
  transformation: { label: 'Transformation', color: 'text-emerald-400', bg: 'bg-emerald-500' },
};

// Mock AI generation - replace with actual Claude API call
const generateVariations = async (message: string): Promise<Variation[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  return [
    {
      id: crypto.randomUUID(),
      psychology: 'status',
      content: `🏆 ${message}\n\nAt TISA, excellence isn't optional—it's expected. Join the families who demand more for their children's future.\n\n#TISAschool #ExcellenceInEducation #LeadershipStartsHere`,
      stars: 0,
      likes: 0,
    },
    {
      id: crypto.randomUUID(),
      psychology: 'belonging',
      content: `💫 ${message}\n\nBecome part of something extraordinary. At TISA, you're not just enrolling—you're joining a community of visionary families who believe education should be different.\n\n#TISAFamily #TogetherWeRise #CommunityOfExcellence`,
      stars: 0,
      likes: 0,
    },
    {
      id: crypto.randomUUID(),
      psychology: 'transformation',
      content: `🚀 ${message}\n\nWatch your child transform from curious to confident. At TISA, we don't just teach—we unlock potential you didn't know existed.\n\n#TransformativeLearning #FutureLeaders #TISAjourney`,
      stars: 0,
      likes: 0,
    },
  ];
};

export default function ABTesting() {
  const [message, setMessage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentTest, setCurrentTest] = useState<ABTest | null>(null);
  const [savedTests, setSavedTests] = useState<ABTest[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { addItem } = useHistoryStore();

  const handleGenerate = async () => {
    if (!message.trim()) return;

    setIsGenerating(true);
    try {
      const variations = await generateVariations(message);
      const newTest: ABTest = {
        id: crypto.randomUUID(),
        originalMessage: message,
        variations,
        createdAt: new Date().toISOString(),
      };
      setCurrentTest(newTest);
      setSavedTests([newTest, ...savedTests]);
      
      // Save to history
      variations.forEach(v => {
        addItem({
          type: 'ab-test',
          content: v.content,
          input: message,
          psychology: v.psychology,
        });
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

  const toggleStar = (testId: string, variationId: string) => {
    setSavedTests(tests =>
      tests.map(test =>
        test.id === testId
          ? {
              ...test,
              variations: test.variations.map(v =>
                v.id === variationId ? { ...v, stars: v.stars > 0 ? 0 : 1 } : v
              ),
            }
          : test
      )
    );
    if (currentTest?.id === testId) {
      setCurrentTest(prev =>
        prev
          ? {
              ...prev,
              variations: prev.variations.map(v =>
                v.id === variationId ? { ...v, stars: v.stars > 0 ? 0 : 1 } : v
              ),
            }
          : null
      );
    }
  };

  const addLike = (testId: string, variationId: string) => {
    setSavedTests(tests =>
      tests.map(test =>
        test.id === testId
          ? {
              ...test,
              variations: test.variations.map(v =>
                v.id === variationId ? { ...v, likes: v.likes + 1 } : v
              ),
            }
          : test
      )
    );
    if (currentTest?.id === testId) {
      setCurrentTest(prev =>
        prev
          ? {
              ...prev,
              variations: prev.variations.map(v =>
                v.id === variationId ? { ...v, likes: v.likes + 1 } : v
              ),
            }
          : null
      );
    }
  };

  // Get all starred variations
  const starredVariations = savedTests.flatMap(test =>
    test.variations
      .filter(v => v.stars > 0)
      .map(v => ({ ...v, testId: test.id, originalMessage: test.originalMessage }))
  );

  // Get top liked variations
  const topVariations = savedTests
    .flatMap(test =>
      test.variations.map(v => ({
        ...v,
        testId: test.id,
        originalMessage: test.originalMessage,
      }))
    )
    .sort((a, b) => b.likes - a.likes)
    .slice(0, 5);

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <FlaskConical className="w-8 h-8 text-tisa-gold" />
          <h1 className="font-display text-3xl font-bold text-tisa-white">
            A/B Testing
          </h1>
        </div>
        <p className="text-tisa-cream/60">
          Test your message across all 3 psychology angles. Star the winners, track what works.
        </p>
      </motion.div>

      {/* Input Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass rounded-2xl p-6 mb-8"
      >
        <label className="block text-sm font-heading text-tisa-cream/70 mb-2">
          Your Message / Core Idea
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="input w-full h-24 resize-none mb-4"
          placeholder="e.g., 'TISA creates future CEOs' or 'Our students think differently'"
        />
        <div className="flex items-center justify-between">
          <p className="text-xs text-tisa-cream/50">
            We'll generate 3 variations: Status, Belonging, and Transformation angles
          </p>
          <button
            onClick={handleGenerate}
            disabled={isGenerating || !message.trim()}
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
                Generate Variations
              </>
            )}
          </button>
        </div>
      </motion.div>

      {/* Current Test Results */}
      <AnimatePresence mode="wait">
        {currentTest && (
          <motion.div
            key={currentTest.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading text-lg font-semibold text-tisa-white">
                Test Results
              </h2>
              <button
                onClick={() => {
                  setMessage(currentTest.originalMessage);
                  handleGenerate();
                }}
                className="btn-ghost text-sm flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Regenerate
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {currentTest.variations.map((variation, index) => {
                const psych = psychologyLabels[variation.psychology];
                return (
                  <motion.div
                    key={variation.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="glass rounded-xl overflow-hidden"
                  >
                    {/* Header */}
                    <div className={`${psych.bg} bg-opacity-20 p-3 border-b border-white/10`}>
                      <span className={`text-sm font-heading font-semibold ${psych.color}`}>
                        {psych.label} Angle
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <p className="text-sm text-tisa-cream/80 whitespace-pre-line mb-4">
                        {variation.content}
                      </p>

                      {/* Actions */}
                      <div className="flex items-center justify-between pt-3 border-t border-tisa-gold/10">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggleStar(currentTest.id, variation.id)}
                            className={`p-2 rounded-lg transition-colors ${
                              variation.stars > 0
                                ? 'text-yellow-400 bg-yellow-400/10'
                                : 'text-tisa-cream/40 hover:text-yellow-400 hover:bg-yellow-400/10'
                            }`}
                          >
                            <Star className={`w-5 h-5 ${variation.stars > 0 ? 'fill-yellow-400' : ''}`} />
                          </button>
                          <button
                            onClick={() => addLike(currentTest.id, variation.id)}
                            className="p-2 rounded-lg text-tisa-cream/40 hover:text-red-400 hover:bg-red-400/10 transition-colors flex items-center gap-1"
                          >
                            <Heart className={`w-5 h-5 ${variation.likes > 0 ? 'fill-red-400 text-red-400' : ''}`} />
                            {variation.likes > 0 && (
                              <span className="text-xs text-red-400">{variation.likes}</span>
                            )}
                          </button>
                        </div>
                        <button
                          onClick={() => handleCopy(variation.id, variation.content)}
                          className="p-2 rounded-lg text-tisa-cream/40 hover:text-tisa-gold hover:bg-tisa-gold/10 transition-colors"
                        >
                          {copiedId === variation.id ? (
                            <Check className="w-5 h-5 text-emerald-400" />
                          ) : (
                            <Copy className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Starred & Top Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Starred Winners */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass rounded-2xl p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            <h3 className="font-heading font-semibold text-tisa-white">
              Starred Winners
            </h3>
            <span className="badge ml-auto">{starredVariations.length}</span>
          </div>

          {starredVariations.length === 0 ? (
            <p className="text-sm text-tisa-cream/50 text-center py-8">
              Star your favorite variations to save them here
            </p>
          ) : (
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {starredVariations.map(v => {
                const psych = psychologyLabels[v.psychology];
                return (
                  <div key={v.id} className="bg-tisa-dark/30 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-xs font-heading ${psych.color}`}>
                        {psych.label}
                      </span>
                      <span className="text-xs text-tisa-cream/40">•</span>
                      <span className="text-xs text-tisa-cream/40 truncate flex-1">
                        {v.originalMessage}
                      </span>
                    </div>
                    <p className="text-sm text-tisa-cream/70 line-clamp-2">
                      {v.content}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </motion.div>

        {/* Top Liked */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass rounded-2xl p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="w-5 h-5 text-tisa-gold" />
            <h3 className="font-heading font-semibold text-tisa-white">
              Top Liked
            </h3>
          </div>

          {topVariations.length === 0 || topVariations.every(v => v.likes === 0) ? (
            <p className="text-sm text-tisa-cream/50 text-center py-8">
              Like variations to see your top performers
            </p>
          ) : (
            <div className="space-y-3">
              {topVariations.filter(v => v.likes > 0).map((v, index) => {
                const psych = psychologyLabels[v.psychology];
                return (
                  <div key={v.id} className="flex items-center gap-3 bg-tisa-dark/30 rounded-lg p-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      index === 0 ? 'bg-yellow-500 text-black' :
                      index === 1 ? 'bg-gray-400 text-black' :
                      index === 2 ? 'bg-orange-600 text-white' :
                      'bg-tisa-dark text-tisa-cream/50'
                    }`}>
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs font-heading ${psych.color}`}>
                          {psych.label}
                        </span>
                      </div>
                      <p className="text-sm text-tisa-cream/70 truncate">
                        {v.content.split('\n')[0]}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-red-400">
                      <Heart className="w-4 h-4 fill-red-400" />
                      <span className="text-sm font-semibold">{v.likes}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </motion.div>
      </div>

      {/* Previous Tests */}
      {savedTests.length > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8"
        >
          <h3 className="font-heading font-semibold text-tisa-white mb-4">
            Previous Tests
          </h3>
          <div className="space-y-2">
            {savedTests.slice(1).map(test => (
              <button
                key={test.id}
                onClick={() => setCurrentTest(test)}
                className="w-full glass rounded-lg p-4 text-left hover:border-tisa-gold/30 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm text-tisa-cream/80 truncate flex-1">
                    {test.originalMessage}
                  </span>
                  <div className="flex items-center gap-2 ml-4">
                    {test.variations.some(v => v.stars > 0) && (
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    )}
                    <span className="text-xs text-tisa-cream/40">
                      {new Date(test.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
