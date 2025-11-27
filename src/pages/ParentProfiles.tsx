import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Target, Heart, TrendingUp, ArrowRight } from 'lucide-react';
import { parentProfiles, psychologyDrivers } from '../data/knowledge';
import type { ParentProfile } from '../data/knowledge';

export default function ParentProfiles() {
  const [selectedProfile, setSelectedProfile] = useState<ParentProfile | null>(null);

  const driveColors = {
    status: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/30' },
    belonging: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/30' },
    transformation: { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/30' }
  };

  const driveIcons = {
    status: Target,
    belonging: Heart,
    transformation: TrendingUp
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
          <Users className="w-8 h-8 text-tisa-gold" />
          <h1 className="font-display text-3xl font-bold text-tisa-white">
            Parent Profiles
          </h1>
        </div>
        <p className="text-tisa-cream/60">
          Understand who you're talking to. Each profile has different motivations, fears, and triggers.
        </p>
      </motion.div>

      {/* Profile Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {parentProfiles.map((profile: ParentProfile, index: number) => {
          const colors = driveColors[profile.primaryDrive];
          const Icon = driveIcons[profile.primaryDrive];

          return (
            <motion.div
              key={profile.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedProfile(profile)}
              className="card cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${colors.text}`} />
                </div>
                <span className={`badge ${colors.bg} ${colors.text} ${colors.border}`}>
                  {profile.primaryDrive}
                </span>
              </div>

              <h3 className="font-heading text-lg font-semibold text-tisa-white mb-2">
                {profile.name}
              </h3>
              <p className="text-sm text-tisa-cream/60 mb-4 line-clamp-2">
                {profile.description}
              </p>

              <p className="text-sm text-tisa-gold italic line-clamp-2">
                "{profile.coreSentence}"
              </p>

              <div className="mt-4 pt-4 border-t border-tisa-light/10 flex items-center justify-between">
                <span className="text-xs text-tisa-cream/40">Click for details</span>
                <ArrowRight className="w-4 h-4 text-tisa-gold opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Profile Detail Modal */}
      <AnimatePresence>
        {selectedProfile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-tisa-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProfile(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              {(() => {
                const colors = driveColors[selectedProfile.primaryDrive];
                const Icon = driveIcons[selectedProfile.primaryDrive];
                const driver = psychologyDrivers[selectedProfile.primaryDrive];

                return (
                  <>
                    {/* Header */}
                    <div className="p-6 border-b border-tisa-light/10">
                      <div className="flex items-start gap-4">
                        <div className={`w-14 h-14 rounded-xl ${colors.bg} flex items-center justify-center flex-shrink-0`}>
                          <Icon className={`w-7 h-7 ${colors.text}`} />
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <h2 className="font-display text-2xl font-bold text-tisa-white">
                              {selectedProfile.name}
                            </h2>
                            <span className={`badge ${colors.bg} ${colors.text} ${colors.border}`}>
                              {selectedProfile.primaryDrive}
                            </span>
                          </div>
                          <p className="text-tisa-cream/60">{selectedProfile.description}</p>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-6">
                      {/* Core Sentence */}
                      <div className={`${colors.bg} border ${colors.border} rounded-xl p-4`}>
                        <p className={`text-lg font-display ${colors.text} italic`}>
                          "{selectedProfile.coreSentence}"
                        </p>
                      </div>

                      {/* Psychology Driver Info */}
                      <div className="bg-tisa-darker rounded-xl p-4">
                        <h3 className="font-heading font-semibold text-tisa-gold mb-2">
                          Primary Driver: {driver.name}
                        </h3>
                        <p className="text-sm text-tisa-cream/70 mb-3">{driver.description}</p>
                        <p className="text-sm text-tisa-gold">
                          Core Trigger: <span className="italic">"{driver.coreTrigger}"</span>
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h3 className="font-heading font-semibold text-red-400 mb-3 flex items-center gap-2">
                            <span className="w-2 h-2 bg-red-400 rounded-full" />
                            Fears
                          </h3>
                          <ul className="space-y-2">
                            {selectedProfile.fears.map((fear: string, i: number) => (
                              <li key={i} className="text-sm text-tisa-cream/70 flex items-start gap-2">
                                <span className="text-red-400/50">•</span>
                                {fear}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h3 className="font-heading font-semibold text-emerald-400 mb-3 flex items-center gap-2">
                            <span className="w-2 h-2 bg-emerald-400 rounded-full" />
                            Aspirations
                          </h3>
                          <ul className="space-y-2">
                            {selectedProfile.aspirations.map((asp: string, i: number) => (
                              <li key={i} className="text-sm text-tisa-cream/70 flex items-start gap-2">
                                <span className="text-emerald-400/50">•</span>
                                {asp}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Best Channels */}
                      <div>
                        <h3 className="font-heading font-semibold text-tisa-white mb-3">
                          Best Channels
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedProfile.bestChannels.map((ch: string, i: number) => (
                            <span key={i} className="badge">{ch}</span>
                          ))}
                        </div>
                      </div>

                      {/* Key Messages */}
                      <div>
                        <h3 className="font-heading font-semibold text-tisa-white mb-3">
                          Key Messages for This Profile
                        </h3>
                        <div className="space-y-2">
                          {selectedProfile.keyMessages.map((msg: string, i: number) => (
                            <div key={i} className="flex items-start gap-2">
                              <span className="text-tisa-gold">→</span>
                              <p className="text-sm text-tisa-cream/80">{msg}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="p-6 border-t border-tisa-light/10 flex justify-end gap-3">
                      <button
                        onClick={() => setSelectedProfile(null)}
                        className="btn-ghost"
                      >
                        Close
                      </button>
                      <button className="btn-primary">
                        Generate Content for This Profile
                      </button>
                    </div>
                  </>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
