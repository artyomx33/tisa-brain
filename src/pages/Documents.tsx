import { motion } from 'framer-motion';
import { FileText, Construction, Upload, FolderOpen } from 'lucide-react';

export default function Documents() {
  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <FileText className="w-8 h-8 text-tisa-gold" />
          <h1 className="font-display text-3xl font-bold text-tisa-white">
            Documents
          </h1>
        </div>
        <p className="text-tisa-cream/60">
          Store and manage all TISA documents, templates, and assets.
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
          The document manager will include:
        </p>
        <ul className="mt-4 space-y-2 text-left max-w-md mx-auto">
          <li className="text-sm text-tisa-cream/70">• Upload and organize documents</li>
          <li className="text-sm text-tisa-cream/70">• Template library (emails, scripts, etc.)</li>
          <li className="text-sm text-tisa-cream/70">• Generated content archive</li>
          <li className="text-sm text-tisa-cream/70">• Search across all documents</li>
          <li className="text-sm text-tisa-cream/70">• Version history</li>
        </ul>

        <div className="mt-8 flex justify-center gap-4">
          <button disabled className="btn-secondary opacity-50 cursor-not-allowed flex items-center gap-2">
            <Upload className="w-4 h-4" />
            Upload Document
          </button>
          <button disabled className="btn-ghost opacity-50 cursor-not-allowed flex items-center gap-2">
            <FolderOpen className="w-4 h-4" />
            Browse Templates
          </button>
        </div>
      </motion.div>
    </div>
  );
}
