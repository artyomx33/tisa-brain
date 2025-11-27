import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Brain,
  BookOpen,
  Users,
  Sparkles,
  MessageSquare,
  ArrowRight,
  Zap,
  Target,
  TrendingUp
} from 'lucide-react';
import { pillars, parentProfiles, redButtonMessages } from '../data/knowledge';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function Dashboard() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-7xl mx-auto"
    >
      {/* Hero Section */}
      <motion.div variants={item} className="mb-12">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-tisa-gold to-tisa-gold-dark flex items-center justify-center shadow-lg shadow-tisa-gold/20">
            <Brain className="w-8 h-8 text-tisa-black" />
          </div>
          <div>
            <h1 className="font-display text-4xl font-bold text-tisa-white">
              TISA Brain
            </h1>
            <p className="text-tisa-cream/60 font-heading">
              Your intelligent command center
            </p>
          </div>
        </div>
        <p className="text-lg text-tisa-cream/80 max-w-2xl">
          Generate content, simulate scenarios, and access the complete TISA knowledge base. 
          Everything you need to communicate the TISA vision with precision and power.
        </p>
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Link to="/generator" className="group">
          <div className="card h-full">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-tisa-gold/10 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-tisa-gold" />
              </div>
              <ArrowRight className="w-5 h-5 text-tisa-gold opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <h3 className="font-heading text-xl font-semibold text-tisa-white mb-2">
              Content Generator
            </h3>
            <p className="text-tisa-cream/60 text-sm">
              Create Instagram posts, tour scripts, emails, and more — all perfectly aligned with TISA voice.
            </p>
          </div>
        </Link>

        <Link to="/simulator" className="group">
          <div className="card h-full">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-purple-400" />
              </div>
              <ArrowRight className="w-5 h-5 text-tisa-gold opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <h3 className="font-heading text-xl font-semibold text-tisa-white mb-2">
              Scenario Simulator
            </h3>
            <p className="text-tisa-cream/60 text-sm">
              Practice difficult conversations, handle objections, and roleplay parent interactions.
            </p>
          </div>
        </Link>

        <Link to="/knowledge" className="group">
          <div className="card h-full">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-blue-400" />
              </div>
              <ArrowRight className="w-5 h-5 text-tisa-gold opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <h3 className="font-heading text-xl font-semibold text-tisa-white mb-2">
              Knowledge Base
            </h3>
            <p className="text-tisa-cream/60 text-sm">
              The complete TISA Bible — pillars, psychology, messaging, and brand guidelines.
            </p>
          </div>
        </Link>
      </motion.div>

      {/* Stats Row */}
      <motion.div variants={item} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <div className="glass rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-4 h-4 text-tisa-gold" />
            <span className="text-xs text-tisa-cream/50 font-heading uppercase tracking-wider">Pillars</span>
          </div>
          <p className="text-3xl font-display font-bold text-tisa-white">{pillars.length}</p>
        </div>
        <div className="glass rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-tisa-gold" />
            <span className="text-xs text-tisa-cream/50 font-heading uppercase tracking-wider">Profiles</span>
          </div>
          <p className="text-3xl font-display font-bold text-tisa-white">{parentProfiles.length}</p>
        </div>
        <div className="glass rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-tisa-gold" />
            <span className="text-xs text-tisa-cream/50 font-heading uppercase tracking-wider">Red Buttons</span>
          </div>
          <p className="text-3xl font-display font-bold text-tisa-white">{redButtonMessages.length}</p>
        </div>
        <div className="glass rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-tisa-gold" />
            <span className="text-xs text-tisa-cream/50 font-heading uppercase tracking-wider">Channels</span>
          </div>
          <p className="text-3xl font-display font-bold text-tisa-white">6</p>
        </div>
      </motion.div>

      {/* Red Button Messages */}
      <motion.div variants={item} className="mb-12">
        <h2 className="font-heading text-xl font-semibold text-tisa-white mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-tisa-gold" />
          Red Button Messages
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {redButtonMessages.map((msg, index) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="glass-gold rounded-xl p-5"
            >
              <p className="font-display text-lg font-semibold text-tisa-gold mb-2">
                "{msg.message}"
              </p>
              <p className="text-sm text-tisa-cream/70">
                {msg.explanation}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Top Priority Pillars */}
      <motion.div variants={item}>
        <h2 className="font-heading text-xl font-semibold text-tisa-white mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-tisa-gold" />
          Top Priority Pillars
        </h2>
        <div className="space-y-3">
          {pillars.filter(p => p.priority === 'top').map((pillar, index) => (
            <motion.div
              key={pillar.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="glass rounded-xl p-4 flex items-center gap-4"
            >
              <div className="w-10 h-10 rounded-lg bg-tisa-gold/10 flex items-center justify-center text-tisa-gold font-display font-bold">
                {index + 1}
              </div>
              <div className="flex-1">
                <h3 className="font-heading font-semibold text-tisa-white">
                  {pillar.name}
                </h3>
                <p className="text-sm text-tisa-cream/60 line-clamp-1">
                  {pillar.keyMessages[0]}
                </p>
              </div>
              <div className="flex gap-2">
                <span className="badge-status">Status {pillar.psychologyFit.status}/3</span>
                <span className="badge-belonging">Belonging {pillar.psychologyFit.belonging}/3</span>
                <span className="badge-transformation">Transform {pillar.psychologyFit.transformation}/3</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
