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

          {/* Video Placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card rounded-2xl p-8 mb-16 text-center"
          >
            <div className="aspect-video max-w-2xl mx-auto bg-muted rounded-xl flex items-center justify-center mb-4">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center cursor-pointer"
              >
                <PlayCircle size={40} className="text-primary-foreground" />
              </motion.div>
            </div>
            <p className="text-muted-foreground">
              Watch a quick intro video (coming soon!)
            </p>
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
