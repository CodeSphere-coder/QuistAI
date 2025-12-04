import { motion } from 'framer-motion';
import { Trophy, Medal, Crown, User, Zap } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { loadProgress, getCurrentRank } from '@/lib/progress';

const Leaderboard = () => {
  const progress = loadProgress();
  const userRank = getCurrentRank(progress.xp);

  // Sample leaderboard data
  const leaderboardData = [
    { rank: 1, name: 'CodeMaster_99', xp: 450, avatar: '👑', isUser: false },
    { rank: 2, name: 'CSSNinja', xp: 380, avatar: '🥷', isUser: false },
    { rank: 3, name: 'PixelPro', xp: 320, avatar: '🎨', isUser: false },
    { rank: 4, name: 'FlexboxFan', xp: 275, avatar: '📦', isUser: false },
    { rank: 5, name: 'You', xp: progress.xp, avatar: userRank.icon, isUser: true },
    { rank: 6, name: 'GridGuru', xp: 180, avatar: '📐', isUser: false },
    { rank: 7, name: 'StyleStar', xp: 150, avatar: '⭐', isUser: false },
    { rank: 8, name: 'HTMLHero', xp: 120, avatar: '🦸', isUser: false },
    { rank: 9, name: 'WebWizard', xp: 95, avatar: '🧙', isUser: false },
    { rank: 10, name: 'CodeCub', xp: 60, avatar: '🐻', isUser: false },
  ].sort((a, b) => b.xp - a.xp).map((player, index) => ({ ...player, rank: index + 1 }));

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="text-warning" size={24} />;
      case 2:
        return <Medal className="text-muted-foreground" size={24} />;
      case 3:
        return <Medal className="text-neon-orange" size={24} />;
      default:
        return <span className="w-6 text-center font-bold text-muted-foreground">{rank}</span>;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
      },
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-2xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <motion.div
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.5, repeat: 3, delay: 0.5 }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-warning to-secondary mb-6"
            >
              <Trophy size={40} className="text-warning-foreground" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">Leaderboard</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Top coders this week
            </p>
          </motion.div>

          {/* Leaderboard List */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-3"
          >
            {leaderboardData.map((player) => (
              <motion.div
                key={player.name}
                variants={itemVariants}
                whileHover={{ scale: 1.02, x: 5 }}
                className={`glass-card rounded-xl p-4 flex items-center gap-4 ${
                  player.isUser
                    ? 'border-2 border-primary ring-2 ring-primary/20'
                    : ''
                } ${player.rank <= 3 ? 'bg-gradient-to-r from-card to-muted/50' : ''}`}
              >
                {/* Rank */}
                <div className="w-10 flex justify-center">
                  {getRankIcon(player.rank)}
                </div>

                {/* Avatar */}
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
                    player.rank === 1
                      ? 'bg-gradient-to-br from-warning to-secondary'
                      : player.rank === 2
                      ? 'bg-gradient-to-br from-muted-foreground to-muted'
                      : player.rank === 3
                      ? 'bg-gradient-to-br from-neon-orange to-secondary'
                      : 'bg-muted'
                  }`}
                >
                  {player.avatar}
                </div>

                {/* Name */}
                <div className="flex-1">
                  <span
                    className={`font-semibold ${
                      player.isUser ? 'text-primary' : ''
                    }`}
                  >
                    {player.name}
                    {player.isUser && (
                      <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary">
                        You
                      </span>
                    )}
                  </span>
                </div>

                {/* XP */}
                <div className="flex items-center gap-2">
                  <Zap
                    size={18}
                    className={player.rank <= 3 ? 'text-warning' : 'text-primary'}
                  />
                  <span className="font-bold">{player.xp}</span>
                  <span className="text-muted-foreground text-sm">XP</span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Your Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 glass-card rounded-2xl p-6"
          >
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <User size={20} className="text-primary" />
              Your Stats
            </h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-3xl font-bold gradient-text">
                  {leaderboardData.find(p => p.isUser)?.rank || '-'}
                </div>
                <div className="text-sm text-muted-foreground">Rank</div>
              </div>
              <div>
                <div className="text-3xl font-bold gradient-text">
                  {progress.xp}
                </div>
                <div className="text-sm text-muted-foreground">Total XP</div>
              </div>
              <div>
                <div className="text-3xl font-bold gradient-text">
                  {progress.completedChallenges.length}
                </div>
                <div className="text-sm text-muted-foreground">Challenges</div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Leaderboard;
