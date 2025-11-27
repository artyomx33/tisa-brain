import { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3,
  TrendingUp,
  Target,
  Brain,
  Users,
  Star,
  Heart,
  Sparkles,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { useHistoryStore } from '../stores/historyStore';
import { pillars, parentProfiles } from '../data/knowledge';

const typeLabels: Record<string, string> = {
  instagram: 'Instagram',
  tour: 'Tour Script',
  objection: 'Objection',
  document: 'Document',
  email: 'Email',
  'ab-test': 'A/B Test',
  scenario: 'Scenario',
};

const psychologyColors = {
  status: { color: 'text-purple-400', bg: 'bg-purple-500', label: 'Status' },
  belonging: { color: 'text-blue-400', bg: 'bg-blue-500', label: 'Belonging' },
  transformation: { color: 'text-emerald-400', bg: 'bg-emerald-500', label: 'Transformation' },
};

export default function Analytics() {
  const { items, getStats } = useHistoryStore();
  const stats = getStats();

  // Calculate pillar balance
  const pillarBalance = useMemo(() => {
    const total = Object.values(stats.byPillar).reduce((a, b) => a + b, 0) || 1;
    return pillars.map(pillar => ({
      ...pillar,
      count: stats.byPillar[pillar.id] || 0,
      percent: Math.round(((stats.byPillar[pillar.id] || 0) / total) * 100),
    }));
  }, [stats.byPillar]);

  // Check for imbalances
  const pillarWarnings = useMemo(() => {
    const warnings: string[] = [];
    const topPillars = pillars.filter(p => p.priority === 'top');
    const usedTopPillars = topPillars.filter(p => (stats.byPillar[p.id] || 0) > 0);
    
    if (usedTopPillars.length < topPillars.length && stats.total > 5) {
      const missing = topPillars.filter(p => !stats.byPillar[p.id]).map(p => p.shortName);
      warnings.push(`Missing top-priority pillars: ${missing.join(', ')}`);
    }

    // Check for over-reliance on single pillar
    const maxPillar = pillarBalance.reduce((max, p) => p.percent > max.percent ? p : max, { percent: 0, shortName: '' });
    if (maxPillar.percent > 50 && stats.total > 5) {
      warnings.push(`Over-reliance on "${maxPillar.shortName}" (${maxPillar.percent}%)`);
    }

    return warnings;
  }, [pillarBalance, stats]);

  // Psychology balance
  const psychologyBalance = useMemo(() => {
    const total = Object.values(stats.byPsychology).reduce((a, b) => a + b, 0) || 1;
    return {
      status: {
        count: stats.byPsychology['status'] || 0,
        percent: Math.round(((stats.byPsychology['status'] || 0) / total) * 100),
      },
      belonging: {
        count: stats.byPsychology['belonging'] || 0,
        percent: Math.round(((stats.byPsychology['belonging'] || 0) / total) * 100),
      },
      transformation: {
        count: stats.byPsychology['transformation'] || 0,
        percent: Math.round(((stats.byPsychology['transformation'] || 0) / total) * 100),
      },
    };
  }, [stats.byPsychology]);

  // Psychology warnings
  const psychologyWarnings = useMemo(() => {
    const warnings: string[] = [];
    const values = Object.values(psychologyBalance);
    const max = Math.max(...values.map(v => v.percent));
    const min = Math.min(...values.map(v => v.percent));

    if (max - min > 40 && stats.total > 5) {
      const dominant = Object.entries(psychologyBalance).find(([_, v]) => v.percent === max)?.[0];
      const neglected = Object.entries(psychologyBalance).find(([_, v]) => v.percent === min)?.[0];
      warnings.push(`Psychology imbalance: ${dominant} (${max}%) vs ${neglected} (${min}%)`);
    }

    return warnings;
  }, [psychologyBalance, stats.total]);

  // Recent activity (last 7 days)
  const recentActivity = useMemo(() => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    return items.filter(item => new Date(item.createdAt) >= sevenDaysAgo);
  }, [items]);

  // Content type distribution
  const typeDistribution = useMemo(() => {
    return Object.entries(stats.byType)
      .map(([type, count]) => ({
        type,
        label: typeLabels[type] || type,
        count,
        percent: Math.round((count / (stats.total || 1)) * 100),
      }))
      .sort((a, b) => b.count - a.count);
  }, [stats.byType, stats.total]);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <BarChart3 className="w-8 h-8 text-tisa-gold" />
          <h1 className="font-display text-3xl font-bold text-tisa-white">
            Analytics Dashboard
          </h1>
        </div>
        <p className="text-tisa-cream/60">
          Track your content generation patterns and identify gaps.
        </p>
      </motion.div>

      {/* Key Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
      >
        <div className="glass rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-tisa-gold" />
            <span className="text-sm text-tisa-cream/60">Total Generated</span>
          </div>
          <p className="text-3xl font-display font-bold text-tisa-white">{stats.total}</p>
        </div>

        <div className="glass rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            <span className="text-sm text-tisa-cream/60">This Week</span>
          </div>
          <p className="text-3xl font-display font-bold text-tisa-white">{recentActivity.length}</p>
        </div>

        <div className="glass rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-5 h-5 text-yellow-400" />
            <span className="text-sm text-tisa-cream/60">Starred</span>
          </div>
          <p className="text-3xl font-display font-bold text-tisa-white">{stats.starredCount}</p>
        </div>

        <div className="glass rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Heart className="w-5 h-5 text-red-400" />
            <span className="text-sm text-tisa-cream/60">Total Likes</span>
          </div>
          <p className="text-3xl font-display font-bold text-tisa-white">{stats.totalLikes}</p>
        </div>
      </motion.div>

      {/* Warnings */}
      {(pillarWarnings.length > 0 || psychologyWarnings.length > 0) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="glass rounded-xl p-4 mb-8 border border-yellow-500/30 bg-yellow-500/5"
        >
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-yellow-400" />
            <h3 className="font-heading font-semibold text-yellow-400">Balance Warnings</h3>
          </div>
          <ul className="space-y-2">
            {[...pillarWarnings, ...psychologyWarnings].map((warning, i) => (
              <li key={i} className="text-sm text-tisa-cream/70 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                {warning}
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Pillar Balance Wheel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-2xl p-6"
        >
          <div className="flex items-center gap-2 mb-6">
            <Target className="w-5 h-5 text-tisa-gold" />
            <h3 className="font-heading font-semibold text-tisa-white">Pillar Balance</h3>
          </div>

          {stats.total === 0 ? (
            <p className="text-sm text-tisa-cream/50 text-center py-8">
              Generate content to see pillar distribution
            </p>
          ) : (
            <div className="space-y-3">
              {pillarBalance.map(pillar => {
                const priorityColor = 
                  pillar.priority === 'top' ? 'text-tisa-gold' :
                  pillar.priority === 'second' ? 'text-tisa-cream/80' :
                  'text-tisa-cream/50';
                
                return (
                  <div key={pillar.id}>
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-sm font-heading ${priorityColor}`}>
                        {pillar.shortName}
                      </span>
                      <span className="text-sm text-tisa-cream/60">
                        {pillar.count} ({pillar.percent}%)
                      </span>
                    </div>
                    <div className="h-2 bg-tisa-dark rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pillar.percent}%` }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className={`h-full rounded-full ${
                          pillar.priority === 'top' ? 'bg-tisa-gold' :
                          pillar.priority === 'second' ? 'bg-tisa-gold/60' :
                          'bg-tisa-gold/30'
                        }`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </motion.div>

        {/* Psychology Mix */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass rounded-2xl p-6"
        >
          <div className="flex items-center gap-2 mb-6">
            <Brain className="w-5 h-5 text-tisa-gold" />
            <h3 className="font-heading font-semibold text-tisa-white">Psychology Mix</h3>
          </div>

          {stats.total === 0 ? (
            <p className="text-sm text-tisa-cream/50 text-center py-8">
              Generate content to see psychology distribution
            </p>
          ) : (
            <div className="space-y-6">
              {(['status', 'belonging', 'transformation'] as const).map(psych => {
                const data = psychologyBalance[psych];
                const colors = psychologyColors[psych];
                
                return (
                  <div key={psych}>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-sm font-heading ${colors.color}`}>
                        {colors.label}
                      </span>
                      <span className="text-sm text-tisa-cream/60">
                        {data.count} ({data.percent}%)
                      </span>
                    </div>
                    <div className="h-3 bg-tisa-dark rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${data.percent}%` }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className={`h-full rounded-full ${colors.bg}`}
                      />
                    </div>
                  </div>
                );
              })}

              {/* Ideal Balance Indicator */}
              <div className="pt-4 border-t border-tisa-gold/10">
                <p className="text-xs text-tisa-cream/50 mb-2">Ideal Balance</p>
                <div className="flex gap-1">
                  <div className="flex-1 h-2 bg-purple-500 rounded-l" />
                  <div className="flex-1 h-2 bg-blue-500" />
                  <div className="flex-1 h-2 bg-emerald-500 rounded-r" />
                </div>
                <p className="text-xs text-tisa-cream/40 mt-1 text-center">
                  ~33% each for balanced messaging
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Content Type Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass rounded-2xl p-6"
        >
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-5 h-5 text-tisa-gold" />
            <h3 className="font-heading font-semibold text-tisa-white">Content Types</h3>
          </div>

          {typeDistribution.length === 0 ? (
            <p className="text-sm text-tisa-cream/50 text-center py-8">
              No content generated yet
            </p>
          ) : (
            <div className="space-y-3">
              {typeDistribution.map(({ type, label, count, percent }) => (
                <div key={type} className="flex items-center gap-3">
                  <div className="w-24 text-sm text-tisa-cream/70">{label}</div>
                  <div className="flex-1 h-2 bg-tisa-dark rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percent}%` }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      className="h-full bg-tisa-gold rounded-full"
                    />
                  </div>
                  <div className="w-16 text-right text-sm text-tisa-cream/60">
                    {count}
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Profile Coverage */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass rounded-2xl p-6"
        >
          <div className="flex items-center gap-2 mb-6">
            <Users className="w-5 h-5 text-tisa-gold" />
            <h3 className="font-heading font-semibold text-tisa-white">Profile Coverage</h3>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {parentProfiles.map(profile => {
              const count = stats.byProfile[profile.id] || 0;
              const isUsed = count > 0;
              
              return (
                <div
                  key={profile.id}
                  className={`p-3 rounded-lg border ${
                    isUsed
                      ? 'bg-tisa-gold/5 border-tisa-gold/30'
                      : 'bg-tisa-dark/30 border-tisa-dark'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    {isUsed ? (
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-tisa-cream/30" />
                    )}
                    <span className={`text-sm font-heading ${isUsed ? 'text-tisa-white' : 'text-tisa-cream/50'}`}>
                      {profile.shortName}
                    </span>
                  </div>
                  <p className="text-xs text-tisa-cream/40 ml-6">
                    {count} content pieces
                  </p>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
