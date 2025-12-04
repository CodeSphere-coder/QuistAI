import { motion } from 'framer-motion';
import { 
  HelpCircle, 
  Target, 
  Code2, 
  Eye, 
  Lightbulb, 
  Trophy,
  ChevronRight,
  PlayCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';

// Video configuration - Update this with your video URL
// For YouTube: Extract the video ID from the URL (e.g., from https://www.youtube.com/watch?v=VIDEO_ID)
// For other platforms: Use the embed URL directly
const VIDEO_ID = 'G8r00ZNopTE'; // Replace with your video ID
const VIDEO_PLATFORM = 'youtube'; // 'youtube' or 'custom'

const Help = () => {
  const steps = [
    {
      icon: Target,
      title: 'See the Target',
      description: 'Each challenge shows you a target design. Your goal is to recreate it using HTML and CSS code.',
      color: 'from-neon-cyan to-neon-purple',
    },
    {
      icon: Code2,
      title: 'Write Your Code',
      description: 'Use the code editor to write HTML and CSS. Start with the provided starter code and add your own styles.',
      color: 'from-neon-orange to-neon-pink',
    },
    {
      icon: Eye,
      title: 'Check Your Result',
      description: 'Click "Run Code" to see your result in the live preview. Compare it with the target design.',
      color: 'from-neon-green to-neon-cyan',
    },
    {
      icon: Lightbulb,
      title: 'Get Help from AI',
      description: 'Stuck? Click "I\'m Stuck" to get a hint from your AI mentor. It won\'t give away the answer!',
      color: 'from-warning to-secondary',
    },
    {
      icon: Trophy,
      title: 'Earn XP & Level Up',
      description: 'Complete challenges to earn XP points. Climb the ranks from Novice Coder to Layout Master!',
      color: 'from-accent to-primary',
    },
  ];

  const faqs = [
    {
      question: 'What is HTML?',
      answer: 'HTML (HyperText Markup Language) is the code that structures a web page. It uses tags like <div>, <h1>, and <p> to create elements.',
    },
    {
      question: 'What is CSS?',
      answer: 'CSS (Cascading Style Sheets) makes your HTML look good! It controls colors, sizes, spacing, and layout of elements.',
    },
    {
      question: 'What does "display: flex" do?',
      answer: 'Flexbox is a CSS layout system. It helps you arrange items in a row or column and center them easily.',
    },
    {
      question: 'How do I center something?',
      answer: 'Use display: flex; justify-content: center; align-items: center; on the parent container to center items both horizontally and vertically.',
    },
    {
      question: 'What is border-radius?',
      answer: 'Border-radius rounds the corners of an element. Use border-radius: 50% to turn a square into a circle!',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
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
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent mb-6"
            >
              <HelpCircle size={40} className="text-primary-foreground" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              How to <span className="gradient-text">Play</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Learn to code by solving visual challenges. It's like a game!
            </p>
          </motion.div>

          {/* Video Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card rounded-2xl p-8 mb-16"
          >
            <div className="text-center max-w-2xl mx-auto mb-6">
              <h3 className="text-xl font-bold mb-2">Quick Start Guide Video</h3>
              <p className="text-muted-foreground text-sm">
                Watch this video to learn how to get started with CSS challenges
              </p>
            </div>
            
            {/* Video Embed */}
            <div className="aspect-video max-w-4xl mx-auto bg-black rounded-xl overflow-hidden shadow-2xl mb-6">
              <iframe
                width="100%"
                height="100%"
                src={
                  VIDEO_PLATFORM === 'youtube'
                    ? `https://www.youtube.com/embed/${VIDEO_ID}?rel=0&modestbranding=1&autoplay=0`
                    : VIDEO_ID
                }
                title="CSS Challenge Tutorial"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
              />
            </div>

            <div className="bg-muted/50 rounded-lg p-4 text-left space-y-2 max-w-2xl mx-auto">
              <p className="text-sm font-semibold text-foreground mb-2">This video covers:</p>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <ChevronRight size={16} className="text-primary mt-0.5 flex-shrink-0" />
                  <span>How to navigate the challenge interface</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight size={16} className="text-primary mt-0.5 flex-shrink-0" />
                  <span>Understanding the target design and your result preview</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight size={16} className="text-primary mt-0.5 flex-shrink-0" />
                  <span>Using the code editor and live preview features</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight size={16} className="text-primary mt-0.5 flex-shrink-0" />
                  <span>Getting hints from the AI mentor when you're stuck</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight size={16} className="text-primary mt-0.5 flex-shrink-0" />
                  <span>Earning XP and progressing through levels</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Steps */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mb-16"
          >
            <h2 className="text-2xl font-bold mb-8 text-center">
              5 Simple Steps
            </h2>
            <div className="space-y-6">
              {steps.map((step, index) => (
                <motion.div
                  key={step.title}
                  variants={itemVariants}
                  whileHover={{ x: 10 }}
                  className="glass-card rounded-xl p-6 flex items-start gap-6"
                >
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center flex-shrink-0`}
                  >
                    <step.icon size={28} className="text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm font-bold text-primary">
                        Step {index + 1}
                      </span>
                      <h3 className="text-lg font-bold">{step.title}</h3>
                    </div>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* FAQs */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold mb-8 text-center">
              CSS Quick Tips 💡
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={faq.question}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="glass-card rounded-xl p-6"
                >
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <ChevronRight size={18} className="text-primary" />
                    {faq.question}
                  </h3>
                  <p className="text-muted-foreground text-sm pl-6">
                    {faq.answer}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="text-center"
          >
            <h2 className="text-2xl font-bold mb-4">Ready to Start?</h2>
            <Link to="/levels">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="game-button-primary text-lg px-8 py-6">
                  Start Playing Now! 🎮
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Help;
