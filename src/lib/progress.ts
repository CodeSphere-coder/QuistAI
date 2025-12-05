import { loadUser } from './user';

const STORAGE_KEY = 'prabodha_progress';

const getStorageKey = (): string => {
  const user = loadUser();
  if (user?.username) {
    return `${STORAGE_KEY}_${user.username.toLowerCase()}`;
  }
  return STORAGE_KEY;
};

export interface Progress {
  xp: number;
  completedChallenges: string[];
  currentStreak: number;
  lastPlayedDate: string | null;
}

export interface Rank {
  title: string;
  minXP: number;
  maxXP: number;
  icon: string;
  color: string;
}

export const ranks: Rank[] = [
  { title: 'Novice Coder', minXP: 0, maxXP: 50, icon: '🌱', color: 'text-neon-green' },
  { title: 'Curious Builder', minXP: 51, maxXP: 100, icon: '🔧', color: 'text-neon-cyan' },
  { title: 'Code Explorer', minXP: 101, maxXP: 200, icon: '🚀', color: 'text-neon-purple' },
  { title: 'CSS Warrior', minXP: 201, maxXP: 350, icon: '⚔️', color: 'text-neon-orange' },
  { title: 'Layout Master', minXP: 351, maxXP: 500, icon: '👑', color: 'text-warning' },
];

export const getDefaultProgress = (): Progress => ({
  xp: 0,
  completedChallenges: [],
  currentStreak: 0,
  lastPlayedDate: null,
});

export const loadProgress = (): Progress => {
  const storageKey = getStorageKey();
  try {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Failed to load progress:', error);
  }
  return getDefaultProgress();
};

export const saveProgress = (progress: Progress): void => {
  const storageKey = getStorageKey();
  try {
    localStorage.setItem(storageKey, JSON.stringify(progress));
  } catch (error) {
    console.error('Failed to save progress:', error);
  }
};

export const addXP = (amount: number): Progress => {
  const progress = loadProgress();
  progress.xp += amount;

  // Update streak
  const today = new Date().toDateString();
  if (progress.lastPlayedDate !== today) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    if (progress.lastPlayedDate === yesterday.toDateString()) {
      progress.currentStreak += 1;
    } else if (progress.lastPlayedDate !== today) {
      progress.currentStreak = 1;
    }
    progress.lastPlayedDate = today;
  }

  saveProgress(progress);
  return progress;
};

export const markChallengeComplete = (challengeId: string, xpReward: number): Progress => {
  const progress = loadProgress();

  if (!progress.completedChallenges.includes(challengeId)) {
    progress.completedChallenges.push(challengeId);
    progress.xp += xpReward;

    // Update streak
    const today = new Date().toDateString();
    if (progress.lastPlayedDate !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      if (progress.lastPlayedDate === yesterday.toDateString()) {
        progress.currentStreak += 1;
      } else {
        progress.currentStreak = 1;
      }
      progress.lastPlayedDate = today;
    }

    saveProgress(progress);
  }

  return progress;
};

export const getCurrentRank = (xp: number): Rank => {
  for (let i = ranks.length - 1; i >= 0; i--) {
    if (xp >= ranks[i].minXP) {
      return ranks[i];
    }
  }
  return ranks[0];
};

export const getNextRank = (xp: number): Rank | null => {
  const currentRank = getCurrentRank(xp);
  const currentIndex = ranks.findIndex(r => r.title === currentRank.title);
  if (currentIndex < ranks.length - 1) {
    return ranks[currentIndex + 1];
  }
  return null;
};

export const getXPProgress = (xp: number): { current: number; max: number; percentage: number } => {
  const currentRank = getCurrentRank(xp);
  const nextRank = getNextRank(xp);

  if (!nextRank) {
    return { current: xp, max: xp, percentage: 100 };
  }

  const rangeStart = currentRank.minXP;
  const rangeEnd = nextRank.minXP;
  const current = xp - rangeStart;
  const max = rangeEnd - rangeStart;
  const percentage = Math.min((current / max) * 100, 100);

  return { current, max, percentage };
};

export const isChallengeCompleted = (challengeId: string): boolean => {
  const progress = loadProgress();
  return progress.completedChallenges.includes(challengeId);
};
