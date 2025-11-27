import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  Target,
  Users,
  Megaphone,
  Zap,
  Brain,
  ChevronDown,
  ChevronRight,
  Star
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import {
  pillars,
  parentProfiles,
  channels,
  redButtonMessages,
  psychologyDrivers,
} from '../data/knowledge';
import type {
  Pillar,
  ParentProfile,
  Channel,
  RedButtonMessage
} from '../data/knowledge';

type Tab = 'pillars' | 'psychology' | 'profiles' | 'channels' | 'messages';

const tabs: { id: Tab; label: string; icon: LucideIcon }[] = [
  { id: 'pillars', label: 'The 9 Pillars', icon: Target },
  { id: 'psychology', label: 'Psychology Drivers', icon: Brain },
  { id: 'profiles', label: 'Parent Profiles', icon: Users },
  { id: 'channels', label: 'Channels', icon: Megaphone },
  { id: 'messages', label: 'Red Button Messages', icon: Zap },
];

function PillarCard({ pillar, isExpanded, onToggle }: { pillar: Pillar; isExpanded: boolean; onToggle: () => void }) {
  const priorityColors = {
    top: 'border-tisa-gold',
    second: 'border-blue-500/50',
    third: 'border-purple-500/50',
    supporting: 'border-tisa-light/30'
  };

  return (
    <motion.div
      layout
      className={`glass rounded-xl border-l-4 ${priorityColors[pillar.priority]} overflow-hidden`}
    >
      <button
        onClick={onToggle}
        className="w-full p-5 text-left flex items-start gap-4"
      >
        <div className="w-10 h-10 rounded-lg bg-tisa-gold/10 flex items-center justify-center flex-shrink-0">
          {pillar.priority === 'top' && <Star className="w-5 h-5 text-tisa-gold" />}
          {pillar.priority !== 'top' && <Target className="w-5 h-5 text-tisa-gold/60" />}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-xs font-heading uppercase tracking-wider ${
              pillar.priority === 'top' ? 'text-tisa-gold' : 'text-tisa-cream/50'
            }`}>
              {pillar.priority} priority
            </span>
          </div>
          <h3 className="font-heading text-lg font-semibold text-tisa-white mb-1">
            {pillar.name}
          </h3>
          <p className="text-sm text-tisa-cream/60 line-clamp-2">
            {pillar.description}
          </p>
        </div>
        <div className="flex-shrink-0">
          {isExpanded ? (
            <ChevronDown className="w-5 h-5 text-tisa-gold" />
          ) : (
            <ChevronRight className="w-5 h-5 text-tisa-cream/50" />
          )}
        </div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-tisa-light/10"
          >
            <div className="p-5 space-y-4">
              {/* Key Messages */}
              <div>
                <h4 className="text-sm font-heading font-semibold text-tisa-gold mb-2">
                  Key Messages
                </h4>
                <ul className="space-y-2">
                  {pillar.keyMessages.map((msg, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-tisa-cream/80">
                      <span className="text-tisa-gold mt-1">→</span>
                      <span>"{msg}"</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Content Ideas */}
              <div>
                <h4 className="text-sm font-heading font-semibold text-tisa-gold mb-2">
                  Content Ideas
                </h4>
                <div className="flex flex-wrap gap-2">
                  {pillar.contentIdeas.map((idea, i) => (
                    <span key={i} className="badge">
                      {idea}
                    </span>
                  ))}
                </div>
              </div>

              {/* Psychology Fit */}
              <div>
                <h4 className="text-sm font-heading font-semibold text-tisa-gold mb-2">
                  Psychology Fit
                </h4>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-tisa-cream/50">Status</span>
                    <div className="flex gap-1">
                      {[1, 2, 3].map(n => (
                        <div
                          key={n}
                          className={`w-2 h-2 rounded-full ${
                            n <= pillar.psychologyFit.status ? 'bg-emerald-400' : 'bg-tisa-light/30'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-tisa-cream/50">Belonging</span>
                    <div className="flex gap-1">
                      {[1, 2, 3].map(n => (
                        <div
                          key={n}
                          className={`w-2 h-2 rounded-full ${
                            n <= pillar.psychologyFit.belonging ? 'bg-blue-400' : 'bg-tisa-light/30'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-tisa-cream/50">Transform</span>
                    <div className="flex gap-1">
                      {[1, 2, 3].map(n => (
                        <div
                          key={n}
                          className={`w-2 h-2 rounded-full ${
                            n <= pillar.psychologyFit.transformation ? 'bg-purple-400' : 'bg-tisa-light/30'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function ProfileCard({ profile }: { profile: ParentProfile }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const driveColors = {
    status: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    belonging: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    transformation: 'bg-purple-500/10 text-purple-400 border-purple-500/20'
  };

  return (
    <motion.div layout className="glass rounded-xl overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-5 text-left"
      >
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-heading text-lg font-semibold text-tisa-white">
            {profile.name}
          </h3>
          <span className={`badge ${driveColors[profile.primaryDrive]}`}>
            {profile.primaryDrive}
          </span>
        </div>
        <p className="text-sm text-tisa-cream/60 mb-3">
          {profile.description}
        </p>
        <p className="text-sm text-tisa-gold italic">
          "{profile.coreSentence}"
        </p>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-tisa-light/10 p-5 space-y-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-heading font-semibold text-red-400 mb-2">Fears</h4>
                <ul className="space-y-1">
                  {profile.fears.map((fear, i) => (
                    <li key={i} className="text-sm text-tisa-cream/70">• {fear}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-heading font-semibold text-emerald-400 mb-2">Aspirations</h4>
                <ul className="space-y-1">
                  {profile.aspirations.map((asp, i) => (
                    <li key={i} className="text-sm text-tisa-cream/70">• {asp}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-heading font-semibold text-tisa-gold mb-2">Best Channels</h4>
              <div className="flex flex-wrap gap-2">
                {profile.bestChannels.map((ch, i) => (
                  <span key={i} className="badge">{ch}</span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-heading font-semibold text-tisa-gold mb-2">Key Messages</h4>
              <ul className="space-y-1">
                {profile.keyMessages.map((msg, i) => (
                  <li key={i} className="text-sm text-tisa-cream/80">→ {msg}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function ChannelCard({ channel }: { channel: Channel }) {
  return (
    <div className="glass rounded-xl p-5">
      <h3 className="font-heading text-lg font-semibold text-tisa-white mb-2">
        {channel.name}
      </h3>
      <p className="text-sm text-tisa-cream/60 mb-3">{channel.purpose}</p>
      
      <div className="space-y-3">
        <div>
          <span className="text-xs font-heading text-tisa-gold uppercase tracking-wider">Psych Role</span>
          <p className="text-sm text-tisa-cream/80 mt-1">{channel.psychRole}</p>
        </div>
        <div>
          <span className="text-xs font-heading text-tisa-gold uppercase tracking-wider">Tone</span>
          <p className="text-sm text-tisa-cream/80 mt-1">{channel.tone}</p>
        </div>
        <div>
          <span className="text-xs font-heading text-tisa-gold uppercase tracking-wider">Frequency</span>
          <p className="text-sm text-tisa-cream/80 mt-1">{channel.frequency}</p>
        </div>
        <div>
          <span className="text-xs font-heading text-tisa-gold uppercase tracking-wider">Content Types</span>
          <div className="flex flex-wrap gap-1 mt-1">
            {channel.contentTypes.map((type, i) => (
              <span key={i} className="badge text-xs">{type}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function KnowledgeBase() {
  const [activeTab, setActiveTab] = useState<Tab>('pillars');
  const [expandedPillar, setExpandedPillar] = useState<string | null>(null);

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <BookOpen className="w-8 h-8 text-tisa-gold" />
          <h1 className="font-display text-3xl font-bold text-tisa-white">
            Knowledge Base
          </h1>
        </div>
        <p className="text-tisa-cream/60">
          The complete TISA Brain — all strategic frameworks, psychology, and messaging in one place.
        </p>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {tabs.map((tab) => {
          const TabIcon = tab.icon;
          return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-heading font-medium whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? 'bg-tisa-gold text-tisa-black'
                : 'bg-tisa-dark/50 text-tisa-cream/70 hover:text-tisa-gold hover:bg-tisa-dark'
            }`}
          >
            <TabIcon className="w-4 h-4" />
            {tab.label}
          </button>
        );
        })}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'pillars' && (
          <motion.div
            key="pillars"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            {pillars.map((pillar) => (
              <PillarCard
                key={pillar.id}
                pillar={pillar}
                isExpanded={expandedPillar === pillar.id}
                onToggle={() => setExpandedPillar(expandedPillar === pillar.id ? null : pillar.id)}
              />
            ))}
          </motion.div>
        )}

        {activeTab === 'psychology' && (
          <motion.div
            key="psychology"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {(Object.entries(psychologyDrivers) as [string, typeof psychologyDrivers.status][]).map(([key, driver]) => (
              <div key={key} className="glass rounded-xl p-6">
                <div className={`w-12 h-12 rounded-xl mb-4 flex items-center justify-center ${
                  key === 'status' ? 'bg-emerald-500/10' :
                  key === 'belonging' ? 'bg-blue-500/10' : 'bg-purple-500/10'
                }`}>
                  <Brain className={`w-6 h-6 ${
                    key === 'status' ? 'text-emerald-400' :
                    key === 'belonging' ? 'text-blue-400' : 'text-purple-400'
                  }`} />
                </div>
                <h3 className="font-heading text-xl font-semibold text-tisa-white mb-2">
                  {driver.name}
                </h3>
                <p className="text-sm text-tisa-cream/60 mb-4">{driver.description}</p>
                
                <div className="mb-4">
                  <span className="text-xs font-heading text-tisa-gold uppercase tracking-wider">Core Trigger</span>
                  <p className="text-sm text-tisa-gold italic mt-1">"{driver.coreTrigger}"</p>
                </div>

                <div className="mb-4">
                  <span className="text-xs font-heading text-tisa-gold uppercase tracking-wider">Content Angles</span>
                  <ul className="mt-2 space-y-1">
                    {driver.contentAngles.map((angle: string, i: number) => (
                      <li key={i} className="text-sm text-tisa-cream/70">• {angle}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <span className="text-xs font-heading text-tisa-gold uppercase tracking-wider">Example Phrases</span>
                  <div className="mt-2 space-y-1">
                    {driver.examplePhrases.map((phrase: string, i: number) => (
                      <p key={i} className="text-sm text-tisa-cream/80 italic">"{phrase}"</p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {activeTab === 'profiles' && (
          <motion.div
            key="profiles"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {parentProfiles.map((profile: ParentProfile) => (
              <ProfileCard key={profile.id} profile={profile} />
            ))}
          </motion.div>
        )}

        {activeTab === 'channels' && (
          <motion.div
            key="channels"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {channels.map((channel: Channel) => (
              <ChannelCard key={channel.id} channel={channel} />
            ))}
          </motion.div>
        )}

        {activeTab === 'messages' && (
          <motion.div
            key="messages"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {redButtonMessages.map((msg: RedButtonMessage) => (
              <div key={msg.id} className="glass-gold rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <Zap className="w-8 h-8 text-tisa-gold flex-shrink-0" />
                  <div>
                    <h3 className="font-display text-2xl font-bold text-tisa-gold mb-2">
                      "{msg.message}"
                    </h3>
                    <p className="text-tisa-cream/80 mb-4">{msg.explanation}</p>
                    <div className="bg-tisa-dark/50 rounded-lg p-4">
                      <span className="text-xs font-heading text-tisa-gold uppercase tracking-wider">When to use</span>
                      <p className="text-sm text-tisa-cream/70 mt-1">{msg.useCase}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
