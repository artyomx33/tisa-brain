import { motion } from 'framer-motion';
import { Settings as SettingsIcon, Key, Database, Palette } from 'lucide-react';

export default function Settings() {
  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <SettingsIcon className="w-8 h-8 text-tisa-gold" />
          <h1 className="font-display text-3xl font-bold text-tisa-white">
            Settings
          </h1>
        </div>
        <p className="text-tisa-cream/60">
          Configure TISA Brain to your preferences.
        </p>
      </motion.div>

      <div className="space-y-6">
        {/* API Configuration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <Key className="w-5 h-5 text-tisa-gold" />
            <h2 className="font-heading text-lg font-semibold text-tisa-white">
              API Configuration
            </h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-heading text-tisa-cream/70 mb-2">
                Claude API Key
              </label>
              <input
                type="password"
                value="••••••••••••••••••••••••"
                readOnly
                className="input"
              />
              <p className="text-xs text-tisa-cream/50 mt-1">
                API key is configured via environment variables
              </p>
            </div>
            <div>
              <label className="block text-sm font-heading text-tisa-cream/70 mb-2">
                Supabase URL
              </label>
              <input
                type="text"
                value={import.meta.env.VITE_SUPABASE_URL || 'Not configured'}
                readOnly
                className="input"
              />
            </div>
          </div>
        </motion.div>

        {/* Database */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-2xl p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <Database className="w-5 h-5 text-tisa-gold" />
            <h2 className="font-heading text-lg font-semibold text-tisa-white">
              Database
            </h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-tisa-white font-medium">Supabase Connection</p>
                <p className="text-sm text-tisa-cream/50">Store generated content and scenarios</p>
              </div>
              <span className="badge bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                Connected
              </span>
            </div>
            <button className="btn-secondary">
              Initialize Database Tables
            </button>
          </div>
        </motion.div>

        {/* Appearance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-2xl p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <Palette className="w-5 h-5 text-tisa-gold" />
            <h2 className="font-heading text-lg font-semibold text-tisa-white">
              Appearance
            </h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-tisa-white font-medium">Particle Background</p>
                <p className="text-sm text-tisa-cream/50">3D neural network animation</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-tisa-dark rounded-full peer peer-checked:bg-tisa-gold/30 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-tisa-gold after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
              </label>
            </div>
          </div>
        </motion.div>

        {/* About */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass rounded-2xl p-6"
        >
          <h2 className="font-heading text-lg font-semibold text-tisa-white mb-4">
            About TISA Brain
          </h2>
          <div className="space-y-2 text-sm text-tisa-cream/70">
            <p><strong className="text-tisa-gold">Version:</strong> 1.0.0</p>
            <p><strong className="text-tisa-gold">Built with:</strong> React, TypeScript, Three.js, Claude AI</p>
            <p><strong className="text-tisa-gold">Knowledge Base:</strong> Luna Framework + TISA Strategy Docs</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
