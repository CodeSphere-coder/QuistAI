import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, Loader2, X, Lightbulb, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Challenge } from '@/data/challenges';

interface AIChatProps {
  challenge: Challenge;
  userCode: string;
  onClose: () => void;
  mode: 'hint' | 'explain';
}

const AIChat = ({ challenge, userCode, onClose, mode }: AIChatProps) => {
  const [response, setResponse] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasRequested, setHasRequested] = useState(false);

  const getAIResponse = async () => {
    setIsLoading(true);
    setHasRequested(true);

    // Simulated AI response for demo (since we don't have backend yet)
    // In production, this would call the edge function
    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (mode === 'hint') {
      const hints = [
        `💡 Think about the CSS property that sets the size of an element. What properties control width and height?`,
        `🎨 For colors, you can use hex codes like #3b82f6 for blue or #ef4444 for red.`,
        `📐 The 'display: flex' property is super useful for centering things! Try combining it with 'justify-content' and 'align-items'.`,
        `🔄 Remember, 'border-radius: 50%' turns a square into a circle!`,
        `📏 The 'gap' property in flexbox adds space between items without using margins.`,
      ];
      setResponse(hints[Math.floor(Math.random() * hints.length)]);
    } else {
      setResponse(`
## Here's how the solution works! 🎯

**Step 1: Setting up the container**
The body uses \`display: flex\` with \`justify-content: center\` and \`align-items: center\` to center everything.

**Step 2: Styling the element**
${challenge.targetExplanation}

**Key CSS concepts used:**
- **Flexbox** for centering
- **Background colors** using hex or gradient
- **Border-radius** for rounded corners

Keep practicing! You're doing great! 🚀
      `);
    }

    setIsLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="glass-card rounded-2xl p-6 max-w-lg w-full"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            {mode === 'hint' ? (
              <Lightbulb className="text-primary-foreground" size={20} />
            ) : (
              <BookOpen className="text-primary-foreground" size={20} />
            )}
          </div>
          <div>
            <h3 className="font-bold">AI Mentor</h3>
            <p className="text-sm text-muted-foreground">
              {mode === 'hint' ? 'Need a hint?' : 'Solution explained'}
            </p>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X size={20} />
        </Button>
      </div>

      <div className="min-h-[200px] bg-muted/50 rounded-xl p-4 mb-4">
        <AnimatePresence mode="wait">
          {!hasRequested ? (
            <motion.div
              key="prompt"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-8"
            >
              <Sparkles className="mx-auto mb-3 text-primary" size={32} />
              <p className="text-muted-foreground mb-4">
                {mode === 'hint'
                  ? "I'll give you a helpful hint without spoiling the answer!"
                  : "I'll explain the solution step by step so you understand it!"}
              </p>
              <Button
                onClick={getAIResponse}
                className="gap-2 game-button-primary"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin" size={18} />
                    Thinking...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    {mode === 'hint' ? 'Get a Hint' : 'Explain Solution'}
                  </>
                )}
              </Button>
            </motion.div>
          ) : isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center py-8"
            >
              <div className="text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                >
                  <Sparkles className="mx-auto mb-3 text-primary" size={32} />
                </motion.div>
                <p className="text-muted-foreground">Thinking...</p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="response"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="prose prose-invert prose-sm max-w-none"
            >
              <div className="whitespace-pre-wrap">{response}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {hasRequested && !isLoading && (
        <Button
          variant="outline"
          onClick={() => {
            setHasRequested(false);
            setResponse('');
          }}
          className="w-full"
        >
          Ask Again
        </Button>
      )}
    </motion.div>
  );
};

export default AIChat;
