import { motion, AnimatePresence } from 'framer-motion';
import { Star, Zap, ArrowRight, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  xpEarned: number;
  challengeTitle: string;
  onNextChallenge: () => void;
  onRetry: () => void;
}

const SuccessModal = ({
  isOpen,
  onClose,
  xpEarned,
  challengeTitle,
  onNextChallenge,
  onRetry,
}: SuccessModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: 1, 
              opacity: 1,
              transition: {
                type: 'spring',
                stiffness: 300,
                damping: 20
              }
            }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="glass-card rounded-3xl p-8 max-w-md w-full text-center relative overflow-hidden">
              {/* Confetti effect background */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ 
                      y: -20, 
                      x: Math.random() * 400 - 200,
                      opacity: 1,
                      rotate: 0
                    }}
                    animate={{ 
                      y: 500,
                      rotate: Math.random() * 360,
                      opacity: 0
                    }}
                    transition={{
                      duration: 2 + Math.random() * 2,
                      delay: Math.random() * 0.5,
                      repeat: Infinity,
                      repeatDelay: Math.random() * 2
                    }}
                    className={`absolute w-3 h-3 rounded-sm ${
                      ['bg-primary', 'bg-secondary', 'bg-accent', 'bg-success', 'bg-warning'][i % 5]
                    }`}
                    style={{ left: `${Math.random() * 100}%` }}
                  />
                ))}
              </div>

              {/* Trophy icon */}
              <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="mb-6"
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, -5, 5, 0]
                  }}
                  transition={{ 
                    duration: 0.5,
                    delay: 0.5,
                    repeat: 2
                  }}
                  className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-warning to-secondary flex items-center justify-center"
                >
                  <span className="text-5xl">🏆</span>
                </motion.div>
              </motion.div>

              {/* Title */}
              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-3xl font-bold gradient-text mb-2"
              >
                Challenge Complete!
              </motion.h2>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-muted-foreground mb-6"
              >
                You solved "{challengeTitle}"
              </motion.p>

              {/* XP Earned */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 mb-8"
              >
                <Zap className="text-primary" size={24} />
                <span className="text-2xl font-bold">+{xpEarned} XP</span>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                >
                  <Star className="text-warning" size={20} />
                </motion.div>
              </motion.div>

              {/* Action buttons */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex gap-3"
              >
                <Button
                  variant="outline"
                  onClick={onRetry}
                  className="flex-1 gap-2"
                >
                  <RotateCcw size={18} />
                  Try Another
                </Button>
                <Button
                  onClick={onNextChallenge}
                  className="flex-1 gap-2 game-button-primary"
                >
                  Next Challenge
                  <ArrowRight size={18} />
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SuccessModal;
