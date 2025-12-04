import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, HelpCircle, Zap, Trophy, Target, Sparkles, Code2, Gamepad2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import XPProgress from '@/components/XPProgress';
import { loadProgress } from '@/lib/progress';

const Index = () => {
  const progress = loadProgress();

  const features = [
    {
      icon: Target,
      title: 'Visual Challenges',
      description: 'Match the target design by writing real HTML & CSS code',
      color: 'from-neon-cyan to-neon-purple',
    },
    {
      icon: Sparkles,
      title: 'AI Mentor',
      description: 'Get hints and explanations from your personal AI coding buddy',
      color: 'from-neon-orange to-neon-pink',
    },
    {
      icon: Trophy,
      title: 'Earn XP & Rank Up',
      description: 'Complete challenges to earn XP and climb the leaderboard',
      color: 'from-neon-green to-neon-cyan',
    },
  ];

  const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        </div>

        {/* Floating code elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {['<div>', '</div>', '{css}', '.class', '#id', 'flex'].map((text, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0.1, 0.3, 0.1],
                y: [0, -20, 0]
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                delay: i * 0.5,
              }}
              className="absolute font-mono text-primary/20 text-sm"
              style={{
                left: `${10 + (i * 15)}%`,
                top: `${20 + (i * 10)}%`,
              }}
            >
              {text}
            </motion.span>
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Game controller icon */}
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br from-primary to-accent shadow-lg"
                style={{ boxShadow: 'var(--glow-cyan)' }}
              >
                <Gamepad2 size={48} className="text-primary-foreground" />
              </motion.div>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl md:text-7xl font-black mb-6"
            >
              <span className="gradient-text">Prabodha</span>{' '}
              <span className="gradient-text-secondary">Sanchaya</span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto"
            >
              Battle visual coding challenges with an{' '}
              <span className="text-primary font-semibold">AI mentor</span>.
              Learn HTML & CSS by playing games!
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            >
              <Link to="/levels">
                <motion.div
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button size="lg" className="game-button-primary text-lg px-8 py-6 gap-3">
                    <Play size={24} />
                    Start Learning
                  </Button>
                </motion.div>
              </Link>
              
              <motion.div
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  variant="outline"
                  onClick={scrollToFeatures}
                  className="text-lg px-8 py-6 gap-3 border-2"
                >
                  <HelpCircle size={24} />
                  How It Works
                </Button>
              </motion.div>
            </motion.div>

            {/* Progress card (if user has progress) */}
            {progress.xp > 0 && (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="glass-card rounded-2xl p-6 max-w-md mx-auto"
              >
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Zap className="text-primary" size={20} />
                  Your Progress
                </h3>
                <XPProgress xp={progress.xp} />
              </motion.div>
            )}
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-muted-foreground"
          >
            <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
              <div className="w-1.5 h-3 bg-primary rounded-full" />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              How It <span className="gradient-text">Works</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Learn to code by solving fun visual challenges. No boring tutorials!
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -10 }}
                className="level-card text-center"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center`}
                >
                  <feature.icon size={32} className="text-primary-foreground" />
                </motion.div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Preview */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="glass-card rounded-3xl p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-3xl font-bold mb-4">
                    Ready to <span className="gradient-text">Code</span>?
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Choose a level, write code, and watch your creation come to life.
                    When you're stuck, your AI mentor is here to help!
                  </p>
                  <Link to="/levels">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button className="game-button-secondary gap-2">
                        <Code2 size={20} />
                        Start Coding Now
                      </Button>
                    </motion.div>
                  </Link>
                </div>
                
                <div className="flex-1">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="relative"
                  >
                    <div className="w-48 h-48 mx-auto rounded-2xl bg-gradient-to-br from-card to-muted flex items-center justify-center border border-border">
                      <div className="w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-xl" />
                    </div>
                    <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-success flex items-center justify-center text-xl">
                      ✓
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>Made with 💙 for young coders everywhere</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
