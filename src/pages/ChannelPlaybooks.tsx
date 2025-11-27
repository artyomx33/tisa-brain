import { motion } from 'framer-motion';
import { Megaphone, Instagram, Youtube, Linkedin, Globe, School, MessageCircle } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { channels } from '../data/knowledge';
import type { Channel } from '../data/knowledge';

const channelIcons: Record<string, LucideIcon> = {
  instagram: Instagram,
  tiktok: MessageCircle,
  youtube: Youtube,
  linkedin: Linkedin,
  website: Globe,
  'in-school': School,
};

export default function ChannelPlaybooks() {
  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <Megaphone className="w-8 h-8 text-tisa-gold" />
          <h1 className="font-display text-3xl font-bold text-tisa-white">
            Channel Playbooks
          </h1>
        </div>
        <p className="text-tisa-cream/60">
          Each channel has a specific role. Know what to post, when, and how.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {channels.map((channel: Channel, index: number) => {
          const Icon = channelIcons[channel.id] || Megaphone;
          
          return (
            <motion.div
              key={channel.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass rounded-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="bg-tisa-gold/5 p-5 border-b border-tisa-gold/10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-tisa-gold/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-tisa-gold" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-semibold text-tisa-white">
                      {channel.name}
                    </h3>
                    <p className="text-sm text-tisa-cream/60">{channel.frequency}</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 space-y-4">
                <div>
                  <h4 className="text-xs font-heading text-tisa-gold uppercase tracking-wider mb-2">
                    Purpose
                  </h4>
                  <p className="text-sm text-tisa-cream/80">{channel.purpose}</p>
                </div>

                <div>
                  <h4 className="text-xs font-heading text-tisa-gold uppercase tracking-wider mb-2">
                    Psychological Role
                  </h4>
                  <p className="text-sm text-tisa-cream/80">{channel.psychRole}</p>
                </div>

                <div>
                  <h4 className="text-xs font-heading text-tisa-gold uppercase tracking-wider mb-2">
                    Tone
                  </h4>
                  <p className="text-sm text-tisa-cream/80">{channel.tone}</p>
                </div>

                <div>
                  <h4 className="text-xs font-heading text-tisa-gold uppercase tracking-wider mb-2">
                    Content Types
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {channel.contentTypes.map((type, i) => (
                      <span key={i} className="badge text-xs">{type}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
