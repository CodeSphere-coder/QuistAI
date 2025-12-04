import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Star, Lock, CheckCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { levels, getLevelChallenges } from '@/data/challenges';
import { loadProgress, isChallengeCompleted } from '@/lib/progress';

const Levels = () => {
  const progress = loadProgress();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const getLevelProgress = (level: number) => {
    const challenges = getLevelChallenges(level);
    const completed = challenges.filter((c) => isChallengeCompleted(c.id)).length;
    return { completed, total: challenges.length };
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Choose Your <span className="gradient-text">Level</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Start from basics and level up your CSS skills!
            </p>
          </motion.div>

          {/* Level Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {levels.map((level, index) => {
              const levelProgress = getLevelProgress(level.level);
              const isCompleted = levelProgress.completed === levelProgress.total && levelProgress.total > 0;
              const isLocked = false; // All levels unlocked for demo

              return (
                <motion.div key={level.level} variants={cardVariants}>
                  <Link to={isLocked ? '#' : `/challenge/${level.level}`}>
                    <motion.div
                      whileHover={isLocked ? {} : { scale: 1.02, x: 10 }}
                      whileTap={isLocked ? {} : { scale: 0.98 }}
                      className={`level-card flex items-center gap-6 ${
                        isLocked ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      {/* Level Icon */}
                      <motion.div
                        whileHover={isLocked ? {} : { rotate: [0, -10, 10, 0] }}
                        className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${level.color} flex items-center justify-center flex-shrink-0`}
                        style={{
                          boxShadow: isCompleted
                            ? 'var(--glow-cyan)'
                            : undefined,
                        }}
                      >
                        {isLocked ? (
                          <Lock size={36} className="text-primary-foreground/70" />
                        ) : (
                          <span className="text-4xl">{level.icon}</span>
                        )}
                      </motion.div>

                      {/* Level Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-xl font-bold">Level {level.level}</h3>
                          {isCompleted && (
                            <CheckCircle className="text-success" size={20} />
                          )}
                        </div>
                        <h4 className="text-lg font-semibold gradient-text mb-2">
                          {level.name}
                        </h4>
                        <p className="text-muted-foreground text-sm mb-3">
                          {level.description}
                        </p>

                        {/* Progress Bar */}
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{
                                width: `${(levelProgress.completed / levelProgress.total) * 100}%`,
                              }}
                              transition={{ duration: 0.8, delay: index * 0.2 }}
                              className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                            />
                          </div>
                          <span className="text-sm text-muted-foreground whitespace-nowrap">
                            {levelProgress.completed}/{levelProgress.total}
                          </span>
                        </div>
                      </div>

                      {/* Arrow */}
                      {!isLocked && (
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <ChevronRight
                            size={32}
                            className="text-muted-foreground"
                          />
                        </motion.div>
                      )}
                    </motion.div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-12 grid grid-cols-3 gap-4"
          >
            {[
              { label: 'Total XP', value: progress.xp, icon: '⚡' },
              { label: 'Completed', value: progress.completedChallenges.length, icon: '✓' },
              { label: 'Streak', value: `${progress.currentStreak} days`, icon: '🔥' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="glass-card rounded-xl p-4 text-center"
              >
                <div className="text-2xl mb-1">{stat.icon}</div>
                <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Levels;
