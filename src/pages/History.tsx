import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  History,
  Star,
  Heart,
  Trash2,
  Filter,
  Search,
  Instagram,
  MessageSquare,
  FileText,
  Mail,
  FlaskConical,
  Theater,
  Copy,
  Check,
  ChevronDown,
  X
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useHistoryStore } from '../stores/historyStore';
import type { GeneratedItem } from '../stores/historyStore';
import { pillars, parentProfiles } from '../data/knowledge';

const typeIcons: Record<GeneratedItem['type'], LucideIcon> = {
  instagram: Instagram,
  tour: MessageSquare,
  objection: MessageSquare,
  document: FileText,
  email: Mail,
  'ab-test': FlaskConical,
  scenario: Theater,
};

const typeLabels: Record<GeneratedItem['type'], string> = {
  instagram: 'Instagram Post',
  tour: 'Tour Script',
  objection: 'Objection Handler',
  document: 'Document',
  email: 'Email',
  'ab-test': 'A/B Test',
  scenario: 'Scenario',
};

const psychologyColors = {
  status: 'text-purple-400 bg-purple-400/10 border-purple-400/30',
  belonging: 'text-blue-400 bg-blue-400/10 border-blue-400/30',
  transformation: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30',
};

export default function HistoryPage() {
  const { items, toggleStar, addLike, deleteItem } = useHistoryStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<GeneratedItem['type'] | 'all'>('all');
  const [filterStarred, setFilterStarred] = useState(false);
  const [filterPillar, setFilterPillar] = useState<string | 'all'>('all');
  const [filterPsychology, setFilterPsychology] = useState<string | 'all'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  // Filter items
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesContent = item.content.toLowerCase().includes(query);
        const matchesInput = item.input?.toLowerCase().includes(query);
        if (!matchesContent && !matchesInput) return false;
      }

      // Type filter
      if (filterType !== 'all' && item.type !== filterType) return false;

      // Starred filter
      if (filterStarred && !item.starred) return false;

      // Pillar filter
      if (filterPillar !== 'all' && item.pillar !== filterPillar) return false;

      // Psychology filter
      if (filterPsychology !== 'all' && item.psychology !== filterPsychology) return false;

      return true;
    });
  }, [items, searchQuery, filterType, filterStarred, filterPillar, filterPsychology]);

  const handleCopy = async (id: string, content: string) => {
    await navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getPillarName = (pillarId: string) => {
    const pillar = pillars.find((p) => p.id === pillarId);
    return pillar?.shortName || pillarId;
  };

  const getProfileName = (profileId: string) => {
    const profile = parentProfiles.find((p) => p.id === profileId);
    return profile?.shortName || profileId;
  };

  const activeFiltersCount = [
    filterType !== 'all',
    filterStarred,
    filterPillar !== 'all',
    filterPsychology !== 'all',
  ].filter(Boolean).length;

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <History className="w-8 h-8 text-tisa-gold" />
          <h1 className="font-display text-3xl font-bold text-tisa-white">
            Generation History
          </h1>
        </div>
        <p className="text-tisa-cream/60">
          All your generated content in one place. Star the best, find what worked.
        </p>
      </motion.div>

      {/* Search & Filters Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass rounded-2xl p-4 mb-6"
      >
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-tisa-cream/40" />
            <input
              type="text"
              placeholder="Search generated content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input w-full pl-10"
            />
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`btn-secondary flex items-center gap-2 ${activeFiltersCount > 0 ? 'border-tisa-gold text-tisa-gold' : ''}`}
          >
            <Filter className="w-4 h-4" />
            Filters
            {activeFiltersCount > 0 && (
              <span className="bg-tisa-gold text-tisa-black text-xs px-1.5 py-0.5 rounded-full">
                {activeFiltersCount}
              </span>
            )}
            <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>

          {/* Starred Only Toggle */}
          <button
            onClick={() => setFilterStarred(!filterStarred)}
            className={`btn-secondary flex items-center gap-2 ${filterStarred ? 'bg-tisa-gold/20 border-tisa-gold text-tisa-gold' : ''}`}
          >
            <Star className={`w-4 h-4 ${filterStarred ? 'fill-tisa-gold' : ''}`} />
            Starred Only
          </button>
        </div>

        {/* Expanded Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 mt-4 border-t border-tisa-gold/10">
                {/* Type Filter */}
                <div>
                  <label className="text-xs font-heading text-tisa-cream/60 uppercase tracking-wider mb-2 block">
                    Content Type
                  </label>
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value as GeneratedItem['type'] | 'all')}
                    className="input w-full"
                  >
                    <option value="all">All Types</option>
                    <option value="instagram">Instagram Post</option>
                    <option value="tour">Tour Script</option>
                    <option value="objection">Objection Handler</option>
                    <option value="document">Document</option>
                    <option value="email">Email</option>
                    <option value="ab-test">A/B Test</option>
                    <option value="scenario">Scenario</option>
                  </select>
                </div>

                {/* Pillar Filter */}
                <div>
                  <label className="text-xs font-heading text-tisa-cream/60 uppercase tracking-wider mb-2 block">
                    Pillar
                  </label>
                  <select
                    value={filterPillar}
                    onChange={(e) => setFilterPillar(e.target.value)}
                    className="input w-full"
                  >
                    <option value="all">All Pillars</option>
                    {pillars.map((p) => (
                      <option key={p.id} value={p.id}>{p.shortName}</option>
                    ))}
                  </select>
                </div>

                {/* Psychology Filter */}
                <div>
                  <label className="text-xs font-heading text-tisa-cream/60 uppercase tracking-wider mb-2 block">
                    Psychology
                  </label>
                  <select
                    value={filterPsychology}
                    onChange={(e) => setFilterPsychology(e.target.value)}
                    className="input w-full"
                  >
                    <option value="all">All Psychology</option>
                    <option value="status">Status</option>
                    <option value="belonging">Belonging</option>
                    <option value="transformation">Transformation</option>
                  </select>
                </div>
              </div>

              {/* Clear Filters */}
              {activeFiltersCount > 0 && (
                <button
                  onClick={() => {
                    setFilterType('all');
                    setFilterStarred(false);
                    setFilterPillar('all');
                    setFilterPsychology('all');
                  }}
                  className="mt-4 text-sm text-tisa-gold hover:text-tisa-gold-light flex items-center gap-1"
                >
                  <X className="w-4 h-4" />
                  Clear all filters
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Results Count */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-tisa-cream/60">
          {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'}
          {filterStarred && ' starred'}
        </p>
      </div>

      {/* History Items */}
      {filteredItems.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass rounded-2xl p-12 text-center"
        >
          <History className="w-16 h-16 text-tisa-cream/20 mx-auto mb-4" />
          <h3 className="font-heading text-xl font-semibold text-tisa-white mb-2">
            {items.length === 0 ? 'No history yet' : 'No matching items'}
          </h3>
          <p className="text-tisa-cream/60">
            {items.length === 0
              ? 'Start generating content and it will appear here automatically.'
              : 'Try adjusting your filters or search query.'}
          </p>
        </motion.div>
      ) : (
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => {
              const TypeIcon = typeIcons[item.type];
              const isExpanded = expandedId === item.id;

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.02 }}
                  className="glass rounded-xl overflow-hidden"
                >
                  {/* Item Header */}
                  <div
                    className="p-4 cursor-pointer hover:bg-tisa-gold/5 transition-colors"
                    onClick={() => setExpandedId(isExpanded ? null : item.id)}
                  >
                    <div className="flex items-start gap-4">
                      {/* Type Icon */}
                      <div className="w-10 h-10 rounded-lg bg-tisa-gold/10 flex items-center justify-center flex-shrink-0">
                        <TypeIcon className="w-5 h-5 text-tisa-gold" />
                      </div>

                      {/* Content Preview */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-heading text-tisa-gold uppercase tracking-wider">
                            {typeLabels[item.type]}
                          </span>
                          <span className="text-xs text-tisa-cream/40">•</span>
                          <span className="text-xs text-tisa-cream/40">
                            {formatDate(item.createdAt)}
                          </span>
                        </div>

                        <p className={`text-tisa-cream/80 ${isExpanded ? '' : 'line-clamp-2'}`}>
                          {item.content}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mt-2">
                          {item.pillar && (
                            <span className="badge text-xs">
                              {getPillarName(item.pillar)}
                            </span>
                          )}
                          {item.profile && (
                            <span className="badge text-xs">
                              {getProfileName(item.profile)}
                            </span>
                          )}
                          {item.psychology && (
                            <span className={`text-xs px-2 py-0.5 rounded-full border ${psychologyColors[item.psychology]}`}>
                              {item.psychology}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleStar(item.id);
                          }}
                          className={`p-2 rounded-lg transition-colors ${
                            item.starred
                              ? 'text-yellow-400 bg-yellow-400/10'
                              : 'text-tisa-cream/40 hover:text-yellow-400 hover:bg-yellow-400/10'
                          }`}
                        >
                          <Star className={`w-5 h-5 ${item.starred ? 'fill-yellow-400' : ''}`} />
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            addLike(item.id);
                          }}
                          className="p-2 rounded-lg text-tisa-cream/40 hover:text-red-400 hover:bg-red-400/10 transition-colors flex items-center gap-1"
                        >
                          <Heart className={`w-5 h-5 ${item.likes > 0 ? 'fill-red-400 text-red-400' : ''}`} />
                          {item.likes > 0 && (
                            <span className="text-xs text-red-400">{item.likes}</span>
                          )}
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopy(item.id, item.content);
                          }}
                          className="p-2 rounded-lg text-tisa-cream/40 hover:text-tisa-gold hover:bg-tisa-gold/10 transition-colors"
                        >
                          {copiedId === item.id ? (
                            <Check className="w-5 h-5 text-emerald-400" />
                          ) : (
                            <Copy className="w-5 h-5" />
                          )}
                        </button>

                        <ChevronDown
                          className={`w-5 h-5 text-tisa-cream/40 transition-transform ${
                            isExpanded ? 'rotate-180' : ''
                          }`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Expanded Content */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t border-tisa-gold/10"
                      >
                        <div className="p-4 bg-tisa-darker/50">
                          {item.input && (
                            <div className="mb-4">
                              <span className="text-xs font-heading text-tisa-cream/60 uppercase tracking-wider">
                                Original Input
                              </span>
                              <p className="text-sm text-tisa-cream/70 mt-1">{item.input}</p>
                            </div>
                          )}

                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => {
                                if (confirm('Delete this item?')) {
                                  deleteItem(item.id);
                                }
                              }}
                              className="btn-ghost text-red-400 hover:bg-red-400/10"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
