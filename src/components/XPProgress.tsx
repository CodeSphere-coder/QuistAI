import { motion } from 'framer-motion';
import { Zap, TrendingUp } from 'lucide-react';
import { getCurrentRank, getNextRank, getXPProgress } from '@/lib/progress';

interface XPProgressProps {
  xp: number;
  showDetails?: boolean;
}

const XPProgress = ({ xp, showDetails = true }: XPProgressProps) => {
  const currentRank = getCurrentRank(xp);
  const nextRank = getNextRank(xp);
  const progress = getXPProgress(xp);

  return (
    <div className="space-y-3">
      {showDetails && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{currentRank.icon}</span>
            <span className={`font-bold ${currentRank.color}`}>{currentRank.title}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Zap size={16} className="text-primary" />
            <span className="font-semibold">{xp} XP</span>
          </div>
        </div>
      )}

      <div className="xp-bar">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress.percentage}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="xp-bar-fill"
        />
      </div>

      {showDetails && nextRank && (
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <TrendingUp size={14} />
            <span>{progress.current} / {progress.max} XP to next rank</span>
          </div>
          <div className="flex items-center gap-1">
            <span>{nextRank.icon}</span>
            <span>{nextRank.title}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default XPProgress;
