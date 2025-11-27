import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface GeneratedItem {
  id: string;
  createdAt: string;
  type: 'instagram' | 'tour' | 'objection' | 'document' | 'email' | 'ab-test' | 'scenario';
  content: string;
  pillar?: string;
  profile?: string;
  psychology?: 'status' | 'belonging' | 'transformation';
  input?: string; // Original input/topic
  starred: boolean;
  likes: number;
  tags?: string[];
}

interface HistoryState {
  items: GeneratedItem[];
  addItem: (item: Omit<GeneratedItem, 'id' | 'createdAt' | 'starred' | 'likes'>) => void;
  toggleStar: (id: string) => void;
  addLike: (id: string) => void;
  removeLike: (id: string) => void;
  deleteItem: (id: string) => void;
  getStarred: () => GeneratedItem[];
  getByType: (type: GeneratedItem['type']) => GeneratedItem[];
  getByPillar: (pillar: string) => GeneratedItem[];
  getByProfile: (profile: string) => GeneratedItem[];
  getStats: () => {
    total: number;
    byType: Record<string, number>;
    byPillar: Record<string, number>;
    byProfile: Record<string, number>;
    byPsychology: Record<string, number>;
    starredCount: number;
    totalLikes: number;
  };
}

export const useHistoryStore = create<HistoryState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        const newItem: GeneratedItem = {
          ...item,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
          starred: false,
          likes: 0,
        };
        set((state) => ({
          items: [newItem, ...state.items],
        }));
      },

      toggleStar: (id) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, starred: !item.starred } : item
          ),
        }));
      },

      addLike: (id) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, likes: item.likes + 1 } : item
          ),
        }));
      },

      removeLike: (id) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, likes: Math.max(0, item.likes - 1) } : item
          ),
        }));
      },

      deleteItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },

      getStarred: () => {
        return get().items.filter((item) => item.starred);
      },

      getByType: (type) => {
        return get().items.filter((item) => item.type === type);
      },

      getByPillar: (pillar) => {
        return get().items.filter((item) => item.pillar === pillar);
      },

      getByProfile: (profile) => {
        return get().items.filter((item) => item.profile === profile);
      },

      getStats: () => {
        const items = get().items;
        const byType: Record<string, number> = {};
        const byPillar: Record<string, number> = {};
        const byProfile: Record<string, number> = {};
        const byPsychology: Record<string, number> = {};

        items.forEach((item) => {
          // Count by type
          byType[item.type] = (byType[item.type] || 0) + 1;

          // Count by pillar
          if (item.pillar) {
            byPillar[item.pillar] = (byPillar[item.pillar] || 0) + 1;
          }

          // Count by profile
          if (item.profile) {
            byProfile[item.profile] = (byProfile[item.profile] || 0) + 1;
          }

          // Count by psychology
          if (item.psychology) {
            byPsychology[item.psychology] = (byPsychology[item.psychology] || 0) + 1;
          }
        });

        return {
          total: items.length,
          byType,
          byPillar,
          byProfile,
          byPsychology,
          starredCount: items.filter((i) => i.starred).length,
          totalLikes: items.reduce((sum, i) => sum + i.likes, 0),
        };
      },
    }),
    {
      name: 'tisa-brain-history',
    }
  )
);
