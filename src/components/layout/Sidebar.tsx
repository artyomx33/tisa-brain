import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Brain,
  BookOpen,
  Users,
  Sparkles,
  MessageSquare,
  Calendar,
  Megaphone,
  FileText,
  Settings,
  Home,
  History
} from 'lucide-react';

const navItems = [
  { to: '/', icon: Home, label: 'Dashboard' },
  { to: '/knowledge', icon: BookOpen, label: 'Knowledge Base' },
  { to: '/profiles', icon: Users, label: 'Parent Profiles' },
  { to: '/generator', icon: Sparkles, label: 'Content Generator' },
  { to: '/simulator', icon: MessageSquare, label: 'Scenario Simulator' },
  { to: '/history', icon: History, label: 'History' },
  { to: '/calendar', icon: Calendar, label: 'Content Calendar' },
  { to: '/channels', icon: Megaphone, label: 'Channel Playbooks' },
  { to: '/documents', icon: FileText, label: 'Documents' },
];

export default function Sidebar() {
  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed left-0 top-0 h-screen w-64 bg-tisa-darker/80 backdrop-blur-xl border-r border-tisa-gold/10 z-40 flex flex-col"
    >
      {/* Logo */}
      <div className="p-6 border-b border-tisa-gold/10">
        <NavLink to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-tisa-gold to-tisa-gold-dark flex items-center justify-center shadow-lg group-hover:shadow-tisa-gold/30 transition-shadow">
            <Brain className="w-6 h-6 text-tisa-black" />
          </div>
          <div>
            <h1 className="font-display text-xl font-bold text-tisa-white">TISA</h1>
            <p className="text-xs text-tisa-gold font-heading tracking-wider">BRAIN</p>
          </div>
        </NavLink>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `nav-link ${isActive ? 'active' : ''}`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon className={`w-5 h-5 ${isActive ? 'text-tisa-gold' : ''}`} />
                <span>{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute left-0 w-1 h-8 bg-tisa-gold rounded-r"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-tisa-gold/10">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `nav-link ${isActive ? 'active' : ''}`
          }
        >
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </NavLink>
        <div className="mt-4 p-3 rounded-xl bg-tisa-gold/5 border border-tisa-gold/10">
          <p className="text-xs text-tisa-cream/50 font-mono">
            v1.0.0 • Powered by Claude
          </p>
        </div>
      </div>
    </motion.aside>
  );
}
