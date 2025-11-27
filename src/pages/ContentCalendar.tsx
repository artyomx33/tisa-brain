import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Plus,
  Trash2,
  Target,
  Users,
  Brain,
  X,
  Check,
  GraduationCap,
  Sun,
  Leaf,
  Snowflake
} from 'lucide-react';
import { pillars } from '../data/knowledge';

// Calendar types
interface CalendarEvent {
  id: string;
  date: string; // YYYY-MM-DD
  title: string;
  pillar: string;
  profile?: string;
  psychology: 'status' | 'belonging' | 'transformation';
  channel: string;
  notes?: string;
  status: 'planned' | 'drafted' | 'published';
}

// Seasonal themes
const seasonalThemes = {
  winter: {
    name: 'Winter',
    icon: Snowflake,
    months: [12, 1, 2],
    color: 'text-blue-400',
    focus: 'New Year Ambitions, Early Planning',
    psychology: 'status' as const,
  },
  spring: {
    name: 'Spring',
    icon: Leaf,
    months: [3, 4, 5],
    color: 'text-emerald-400',
    focus: 'Open Days, New Beginnings',
    psychology: 'transformation' as const,
  },
  summer: {
    name: 'Summer',
    icon: Sun,
    months: [6, 7, 8],
    color: 'text-yellow-400',
    focus: 'Graduation, Results, Success Stories',
    psychology: 'status' as const,
  },
  fall: {
    name: 'Fall',
    icon: GraduationCap,
    months: [9, 10, 11],
    color: 'text-orange-400',
    focus: 'Back to School, Community Building',
    psychology: 'belonging' as const,
  },
};

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const channels = ['Instagram', 'TikTok', 'YouTube', 'LinkedIn', 'Website', 'In-School'];

const psychologyColors = {
  status: 'bg-purple-500',
  belonging: 'bg-blue-500',
  transformation: 'bg-emerald-500',
};

const statusColors = {
  planned: 'bg-gray-500',
  drafted: 'bg-yellow-500',
  published: 'bg-emerald-500',
};

// Sample pre-populated events
const sampleEvents: CalendarEvent[] = [
  {
    id: '1',
    date: '2025-01-15',
    title: 'New Year Ambitions Post',
    pillar: 'category-creation',
    psychology: 'status',
    channel: 'Instagram',
    status: 'planned',
    notes: 'Why TISA is different - category creation angle'
  },
  {
    id: '2',
    date: '2025-01-20',
    title: 'TISA MBA Student Spotlight',
    pillar: 'kinder-mba',
    profile: 'bio-science',
    psychology: 'transformation',
    channel: 'LinkedIn',
    status: 'planned',
  },
  {
    id: '3',
    date: '2025-03-08',
    title: 'Open Day Announcement',
    pillar: 'selective-admissions',
    psychology: 'status',
    channel: 'Instagram',
    status: 'planned',
    notes: 'Emphasize limited spots, selectivity'
  },
  {
    id: '4',
    date: '2025-09-01',
    title: 'Welcome Back Community',
    pillar: 'teddy-kids-pathway',
    psychology: 'belonging',
    channel: 'Instagram',
    status: 'planned',
    notes: 'Community feeling, belonging'
  },
];

export default function ContentCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>(sampleEvents);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);
  const [view, setView] = useState<'month' | 'year'>('month');

  // Form state for new/edit event
  const [eventForm, setEventForm] = useState({
    title: '',
    pillar: pillars[0].id,
    profile: '',
    psychology: 'status' as 'status' | 'belonging' | 'transformation',
    channel: 'Instagram',
    notes: '',
    status: 'planned' as 'planned' | 'drafted' | 'published',
  });

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Get current season
  const currentSeason = useMemo(() => {
    const month = currentMonth + 1;
    for (const [key, season] of Object.entries(seasonalThemes)) {
      if (season.months.includes(month)) {
        return { key, ...season };
      }
    }
    return { key: 'spring', ...seasonalThemes.spring };
  }, [currentMonth]);

  // Get days in month
  const daysInMonth = useMemo(() => {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const days: { date: Date; isCurrentMonth: boolean }[] = [];

    // Add days from previous month
    const firstDayOfWeek = firstDay.getDay();
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const date = new Date(currentYear, currentMonth, -i);
      days.push({ date, isCurrentMonth: false });
    }

    // Add days of current month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push({ date: new Date(currentYear, currentMonth, i), isCurrentMonth: true });
    }

    // Add days from next month
    const remainingDays = 42 - days.length; // 6 rows * 7 days
    for (let i = 1; i <= remainingDays; i++) {
      days.push({ date: new Date(currentYear, currentMonth + 1, i), isCurrentMonth: false });
    }

    return days;
  }, [currentMonth, currentYear]);

  // Get events for a specific date
  const getEventsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return events.filter(e => e.date === dateStr);
  };

  // Navigation
  const goToPrevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Event handlers
  const openAddEvent = (date: string) => {
    setSelectedDate(date);
    setEditingEvent(null);
    setEventForm({
      title: '',
      pillar: pillars[0].id,
      profile: '',
      psychology: currentSeason.psychology,
      channel: 'Instagram',
      notes: '',
      status: 'planned',
    });
    setShowEventModal(true);
  };

  const openEditEvent = (event: CalendarEvent) => {
    setSelectedDate(event.date);
    setEditingEvent(event);
    setEventForm({
      title: event.title,
      pillar: event.pillar,
      profile: event.profile || '',
      psychology: event.psychology,
      channel: event.channel,
      notes: event.notes || '',
      status: event.status,
    });
    setShowEventModal(true);
  };

  const saveEvent = () => {
    if (!eventForm.title || !selectedDate) return;

    if (editingEvent) {
      setEvents(events.map(e =>
        e.id === editingEvent.id
          ? { ...e, ...eventForm, date: selectedDate }
          : e
      ));
    } else {
      const newEvent: CalendarEvent = {
        id: crypto.randomUUID(),
        date: selectedDate,
        ...eventForm,
      };
      setEvents([...events, newEvent]);
    }
    setShowEventModal(false);
  };

  const deleteEvent = (id: string) => {
    if (confirm('Delete this event?')) {
      setEvents(events.filter(e => e.id !== id));
    }
  };

  // Stats
  const monthEvents = events.filter(e => {
    const eventDate = new Date(e.date);
    return eventDate.getMonth() === currentMonth && eventDate.getFullYear() === currentYear;
  });

  const pillarStats = useMemo(() => {
    const stats: Record<string, number> = {};
    monthEvents.forEach(e => {
      stats[e.pillar] = (stats[e.pillar] || 0) + 1;
    });
    return stats;
  }, [monthEvents]);

  const SeasonIcon = currentSeason.icon;

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="w-8 h-8 text-tisa-gold" />
              <h1 className="font-display text-3xl font-bold text-tisa-white">
                Content Calendar
              </h1>
            </div>
            <p className="text-tisa-cream/60">
              Plan your content strategy across all pillars and channels.
            </p>
          </div>

          {/* Season Indicator */}
          <div className={`glass rounded-xl p-4 flex items-center gap-3 ${currentSeason.color}`}>
            <SeasonIcon className="w-6 h-6" />
            <div>
              <p className="font-heading font-semibold">{currentSeason.name} Focus</p>
              <p className="text-xs text-tisa-cream/60">{currentSeason.focus}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Navigation & View Toggle */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass rounded-2xl p-4 mb-6"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={goToPrevMonth} className="btn-ghost p-2">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h2 className="font-heading text-xl font-semibold text-tisa-white min-w-[200px] text-center">
              {monthNames[currentMonth]} {currentYear}
            </h2>
            <button onClick={goToNextMonth} className="btn-ghost p-2">
              <ChevronRight className="w-5 h-5" />
            </button>
            <button onClick={goToToday} className="btn-secondary text-sm">
              Today
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setView('month')}
              className={`px-3 py-1.5 rounded-lg text-sm font-heading transition-colors ${
                view === 'month' ? 'bg-tisa-gold text-tisa-black' : 'text-tisa-cream/70 hover:text-tisa-gold'
              }`}
            >
              Month
            </button>
            <button
              onClick={() => setView('year')}
              className={`px-3 py-1.5 rounded-lg text-sm font-heading transition-colors ${
                view === 'year' ? 'bg-tisa-gold text-tisa-black' : 'text-tisa-cream/70 hover:text-tisa-gold'
              }`}
            >
              Year
            </button>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendar Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-3 glass rounded-2xl p-4"
        >
          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {dayNames.map(day => (
              <div key={day} className="text-center text-xs font-heading text-tisa-cream/50 py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1">
            {daysInMonth.map(({ date, isCurrentMonth }, index) => {
              const dateStr = date.toISOString().split('T')[0];
              const dayEvents = getEventsForDate(date);
              const isToday = date.toDateString() === new Date().toDateString();

              return (
                <div
                  key={index}
                  className={`min-h-[100px] p-1 rounded-lg border transition-colors cursor-pointer ${
                    isCurrentMonth
                      ? 'bg-tisa-dark/30 border-tisa-gold/10 hover:border-tisa-gold/30'
                      : 'bg-tisa-darker/30 border-transparent'
                  } ${isToday ? 'ring-2 ring-tisa-gold' : ''}`}
                  onClick={() => openAddEvent(dateStr)}
                >
                  <div className={`text-sm font-heading mb-1 ${
                    isCurrentMonth ? 'text-tisa-cream/80' : 'text-tisa-cream/30'
                  } ${isToday ? 'text-tisa-gold font-bold' : ''}`}>
                    {date.getDate()}
                  </div>

                  <div className="space-y-1">
                    {dayEvents.slice(0, 2).map(event => (
                      <div
                        key={event.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          openEditEvent(event);
                        }}
                        className={`text-xs p-1 rounded truncate ${psychologyColors[event.psychology]} bg-opacity-20 text-white hover:bg-opacity-40 transition-colors`}
                      >
                        {event.title}
                      </div>
                    ))}
                    {dayEvents.length > 2 && (
                      <div className="text-xs text-tisa-cream/50 text-center">
                        +{dayEvents.length - 2} more
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Sidebar Stats */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          {/* Month Stats */}
          <div className="glass rounded-2xl p-4">
            <h3 className="font-heading font-semibold text-tisa-white mb-3 flex items-center gap-2">
              <Target className="w-4 h-4 text-tisa-gold" />
              This Month
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-tisa-cream/60">Total Posts</span>
                <span className="text-tisa-white font-semibold">{monthEvents.length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-tisa-cream/60">Published</span>
                <span className="text-emerald-400 font-semibold">
                  {monthEvents.filter(e => e.status === 'published').length}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-tisa-cream/60">Drafted</span>
                <span className="text-yellow-400 font-semibold">
                  {monthEvents.filter(e => e.status === 'drafted').length}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-tisa-cream/60">Planned</span>
                <span className="text-gray-400 font-semibold">
                  {monthEvents.filter(e => e.status === 'planned').length}
                </span>
              </div>
            </div>
          </div>

          {/* Pillar Coverage */}
          <div className="glass rounded-2xl p-4">
            <h3 className="font-heading font-semibold text-tisa-white mb-3 flex items-center gap-2">
              <Brain className="w-4 h-4 text-tisa-gold" />
              Pillar Coverage
            </h3>
            <div className="space-y-2">
              {pillars.slice(0, 5).map(pillar => {
                const count = pillarStats[pillar.id] || 0;
                return (
                  <div key={pillar.id} className="flex items-center justify-between text-sm">
                    <span className="text-tisa-cream/60 truncate flex-1">{pillar.shortName}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-1.5 bg-tisa-dark rounded-full overflow-hidden">
                        <div
                          className="h-full bg-tisa-gold rounded-full"
                          style={{ width: `${Math.min(100, count * 25)}%` }}
                        />
                      </div>
                      <span className="text-tisa-white font-mono w-4 text-right">{count}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Psychology Mix */}
          <div className="glass rounded-2xl p-4">
            <h3 className="font-heading font-semibold text-tisa-white mb-3 flex items-center gap-2">
              <Users className="w-4 h-4 text-tisa-gold" />
              Psychology Mix
            </h3>
            <div className="flex gap-2">
              {(['status', 'belonging', 'transformation'] as const).map(psych => {
                const count = monthEvents.filter(e => e.psychology === psych).length;
                const total = monthEvents.length || 1;
                const percent = Math.round((count / total) * 100);
                return (
                  <div key={psych} className="flex-1 text-center">
                    <div className={`w-full h-2 rounded-full ${psychologyColors[psych]} bg-opacity-30 mb-1`}>
                      <div
                        className={`h-full rounded-full ${psychologyColors[psych]}`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <p className="text-xs text-tisa-cream/60 capitalize">{psych}</p>
                    <p className="text-sm font-semibold text-tisa-white">{percent}%</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Add */}
          <button
            onClick={() => openAddEvent(new Date().toISOString().split('T')[0])}
            className="btn-primary w-full flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Content
          </button>
        </motion.div>
      </div>

      {/* Event Modal */}
      <AnimatePresence>
        {showEventModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowEventModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass rounded-2xl p-6 w-full max-w-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-heading text-xl font-semibold text-tisa-white">
                  {editingEvent ? 'Edit Content' : 'Add Content'}
                </h3>
                <button onClick={() => setShowEventModal(false)} className="btn-ghost p-2">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Date Display */}
                <div className="text-sm text-tisa-cream/60">
                  Date: <span className="text-tisa-gold">{selectedDate}</span>
                </div>

                {/* Title */}
                <div>
                  <label className="block text-sm font-heading text-tisa-cream/70 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={eventForm.title}
                    onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                    className="input w-full"
                    placeholder="Post title or description"
                  />
                </div>

                {/* Pillar */}
                <div>
                  <label className="block text-sm font-heading text-tisa-cream/70 mb-2">
                    Pillar
                  </label>
                  <select
                    value={eventForm.pillar}
                    onChange={(e) => setEventForm({ ...eventForm, pillar: e.target.value })}
                    className="input w-full"
                  >
                    {pillars.map(p => (
                      <option key={p.id} value={p.id}>{p.shortName}</option>
                    ))}
                  </select>
                </div>

                {/* Channel */}
                <div>
                  <label className="block text-sm font-heading text-tisa-cream/70 mb-2">
                    Channel
                  </label>
                  <select
                    value={eventForm.channel}
                    onChange={(e) => setEventForm({ ...eventForm, channel: e.target.value })}
                    className="input w-full"
                  >
                    {channels.map(ch => (
                      <option key={ch} value={ch}>{ch}</option>
                    ))}
                  </select>
                </div>

                {/* Psychology */}
                <div>
                  <label className="block text-sm font-heading text-tisa-cream/70 mb-2">
                    Psychology Focus
                  </label>
                  <div className="flex gap-2">
                    {(['status', 'belonging', 'transformation'] as const).map(psych => (
                      <button
                        key={psych}
                        onClick={() => setEventForm({ ...eventForm, psychology: psych })}
                        className={`flex-1 py-2 px-3 rounded-lg text-sm font-heading capitalize transition-colors ${
                          eventForm.psychology === psych
                            ? `${psychologyColors[psych]} text-white`
                            : 'bg-tisa-dark text-tisa-cream/70 hover:text-tisa-white'
                        }`}
                      >
                        {psych}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-heading text-tisa-cream/70 mb-2">
                    Status
                  </label>
                  <div className="flex gap-2">
                    {(['planned', 'drafted', 'published'] as const).map(status => (
                      <button
                        key={status}
                        onClick={() => setEventForm({ ...eventForm, status })}
                        className={`flex-1 py-2 px-3 rounded-lg text-sm font-heading capitalize transition-colors ${
                          eventForm.status === status
                            ? `${statusColors[status]} text-white`
                            : 'bg-tisa-dark text-tisa-cream/70 hover:text-tisa-white'
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-heading text-tisa-cream/70 mb-2">
                    Notes
                  </label>
                  <textarea
                    value={eventForm.notes}
                    onChange={(e) => setEventForm({ ...eventForm, notes: e.target.value })}
                    className="input w-full h-20 resize-none"
                    placeholder="Additional notes..."
                  />
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4">
                  {editingEvent && (
                    <button
                      onClick={() => {
                        deleteEvent(editingEvent.id);
                        setShowEventModal(false);
                      }}
                      className="btn-ghost text-red-400 hover:bg-red-400/10"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </button>
                  )}
                  <div className="flex-1" />
                  <button onClick={() => setShowEventModal(false)} className="btn-secondary">
                    Cancel
                  </button>
                  <button onClick={saveEvent} className="btn-primary">
                    <Check className="w-4 h-4 mr-2" />
                    {editingEvent ? 'Save' : 'Add'}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
