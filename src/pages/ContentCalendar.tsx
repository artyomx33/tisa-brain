import { motion } from 'framer-motion';
import { Calendar, Construction } from 'lucide-react';

export default function ContentCalendar() {
  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <Calendar className="w-8 h-8 text-tisa-gold" />
          <h1 className="font-display text-3xl font-bold text-tisa-white">
            Content Calendar
          </h1>
        </div>
        <p className="text-tisa-cream/60">
          Plan and schedule your content across all channels.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass rounded-2xl p-12 text-center"
      >
        <Construction className="w-16 h-16 text-tisa-gold/30 mx-auto mb-4" />
        <h2 className="font-heading text-xl font-semibold text-tisa-white mb-2">
          Coming Soon
        </h2>
        <p className="text-tisa-cream/60 max-w-md mx-auto">
          The content calendar will include:
        </p>
        <ul className="mt-4 space-y-2 text-left max-w-md mx-auto">
          <li className="text-sm text-tisa-cream/70">• 12-month strategic arc visualization</li>
          <li className="text-sm text-tisa-cream/70">• Weekly/monthly content planning</li>
          <li className="text-sm text-tisa-cream/70">• Pillar distribution tracking</li>
          <li className="text-sm text-tisa-cream/70">• Channel sync across platforms</li>
          <li className="text-sm text-tisa-cream/70">• Content library integration</li>
        </ul>
      </motion.div>
    </div>
  );
}
