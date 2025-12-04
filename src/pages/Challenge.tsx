import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Lightbulb, 
  Eye, 
  BookOpen, 
  ArrowLeft, 
  RefreshCw,
  CheckCircle,
  Target
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import CodeEditor from '@/components/CodeEditor';
import LivePreview from '@/components/LivePreview';
import SuccessModal from '@/components/SuccessModal';
import AIChat from '@/components/AIChat';
import { getRandomChallenge, Challenge, levels } from '@/data/challenges';
import { markChallengeComplete, isChallengeCompleted, loadProgress } from '@/lib/progress';
import { toast } from '@/hooks/use-toast';
import { getChallengeImage } from '@/lib/gemini';

const ChallengePage = () => {
  const { level } = useParams<{ level: string }>();
  const navigate = useNavigate();
  const levelNum = parseInt(level || '1');
  
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [code, setCode] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showAI, setShowAI] = useState<'hint' | 'explain' | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [targetImage, setTargetImage] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isLoadingTargetImage, setIsLoadingTargetImage] = useState(false);
  const [isLoadingResultImage, setIsLoadingResultImage] = useState(false);

  const levelInfo = levels.find(l => l.level === levelNum);

  const loadTargetImage = useCallback(() => {
    if (!challenge) return;
    
    setIsLoadingTargetImage(true);
    try {
      // Generate image synchronously (no async needed)
      const imageUrl = getChallengeImage(
        `target-${challenge.id}`,
        {
          prompt: challenge.description,
          challengeTitle: challenge.title,
          targetExplanation: challenge.targetExplanation,
        }
      );
      setTargetImage(imageUrl);
    } catch (error) {
      console.error('Failed to load target image:', error);
    } finally {
      setIsLoadingTargetImage(false);
    }
  }, [challenge]);

  const loadResultImage = useCallback(() => {
    if (!challenge) return;
    
    setIsLoadingResultImage(true);
    try {
      // Generate image based on current code (synchronously)
      const imageUrl = getChallengeImage(
        `result-${challenge.id}-${code.substring(0, 50)}`, // Use code hash for caching
        {
          prompt: `User's current code result: ${challenge.description}`,
          challengeTitle: `${challenge.title} - Your Result`,
          targetExplanation: `This is the visual result of the user's current CSS code implementation.`,
        }
      );
      setResultImage(imageUrl);
    } catch (error) {
      console.error('Failed to load result image:', error);
    } finally {
      setIsLoadingResultImage(false);
    }
  }, [challenge, code]);

  const loadNewChallenge = useCallback(() => {
    const newChallenge = getRandomChallenge(levelNum);
    if (newChallenge) {
      setChallenge(newChallenge);
      setCode(newChallenge.starterCode);
      setAttempts(0);
      setShowSolution(false);
      setIsCompleted(isChallengeCompleted(newChallenge.id));
      setTargetImage(null);
      setResultImage(null);
    }
  }, [levelNum]);

  useEffect(() => {
    loadNewChallenge();
  }, [loadNewChallenge]);

  // Load target image when challenge changes
  useEffect(() => {
    if (challenge) {
      loadTargetImage();
    }
  }, [challenge?.id, loadTargetImage]);

  // Load result image when code changes (with debounce)
  useEffect(() => {
    if (code && challenge) {
      const timer = setTimeout(() => {
        loadResultImage();
      }, 500); // Debounce for 0.5 second (faster since it's synchronous now)

      return () => clearTimeout(timer);
    }
  }, [code, challenge?.id, loadResultImage]);

  const handleRunCode = () => {
    setAttempts(prev => prev + 1);
    
    // Simple validation - in production this would compare with target
    toast({
      title: "Code Updated! 🎨",
      description: "Check the preview panel to see your result.",
    });
  };

  const handleShowSolution = () => {
    if (attempts < 1 && !isCompleted) {
      toast({
        title: "Keep trying! 💪",
        description: "Make at least one attempt before seeing the solution.",
        variant: "destructive",
      });
      return;
    }
    setShowSolution(true);
    setCode(challenge?.solutionCode || '');
  };

  const handleMarkComplete = () => {
    if (challenge && !isCompleted) {
      markChallengeComplete(challenge.id, challenge.xpReward);
      setIsCompleted(true);
      setShowSuccess(true);
    }
  };

  const handleNextChallenge = () => {
    setShowSuccess(false);
    loadNewChallenge();
  };

  if (!challenge || !levelInfo) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🎮</div>
          <p className="text-muted-foreground">Loading challenge...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      {/* Challenge Header */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="pt-20 pb-4 px-4 border-b border-border bg-card/50"
      >
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/levels')}
            >
              <ArrowLeft size={20} />
            </Button>
            <div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <span className="text-lg">{levelInfo.icon}</span>
                <span>Level {levelNum}: {levelInfo.name}</span>
              </div>
              <h1 className="text-xl font-bold flex items-center gap-2">
                {challenge.title}
                {isCompleted && (
                  <CheckCircle className="text-success" size={20} />
                )}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              challenge.difficulty === 'Easy' 
                ? 'bg-success/20 text-success'
                : challenge.difficulty === 'Medium'
                ? 'bg-warning/20 text-warning'
                : 'bg-destructive/20 text-destructive'
            }`}>
              {challenge.difficulty}
            </span>
            <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium">
              +{challenge.xpReward} XP
            </span>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="flex-1 flex overflow-hidden">
        {/* Left Panel - Challenge Info */}
        <motion.aside
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="w-80 border-r border-border p-6 overflow-y-auto flex-shrink-0 hidden lg:block"
        >
          <div className="space-y-6">
            {/* Target Preview */}
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Target size={18} className="text-primary" />
                Target
              </h3>
              <div className="aspect-square bg-card rounded-xl overflow-hidden border border-border relative">
                {/* Show visual representation */}
                {targetImage && (
                  <div className="absolute inset-0 z-10">
                    <img 
                      src={targetImage} 
                      alt="Target visual" 
                      className="w-full h-full object-contain bg-card"
                    />
                  </div>
                )}
                {/* Always show iframe behind the image */}
                <div className="w-full h-full">
                  <LivePreview code={challenge.solutionCode} isTarget />
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold mb-2">Challenge</h3>
              <p className="text-muted-foreground text-sm">
                {challenge.description}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start gap-2"
                onClick={() => setShowAI('hint')}
              >
                <Lightbulb size={18} className="text-warning" />
                I'm Stuck (Get Hint)
              </Button>

              <Button
                variant="outline"
                className="w-full justify-start gap-2"
                onClick={handleShowSolution}
                disabled={attempts < 1 && !isCompleted}
              >
                <Eye size={18} className="text-accent" />
                Show Solution
              </Button>

              {showSolution && (
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                  onClick={() => setShowAI('explain')}
                >
                  <BookOpen size={18} className="text-primary" />
                  Explain Solution
                </Button>
              )}

              <Button
                variant="outline"
                className="w-full justify-start gap-2"
                onClick={loadNewChallenge}
              >
                <RefreshCw size={18} />
                Try Different Challenge
              </Button>
            </div>
          </div>
        </motion.aside>

        {/* Center - Code Editor */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex-1 flex flex-col min-w-0"
        >
          {/* Mobile Challenge Info */}
          <div className="lg:hidden p-4 border-b border-border">
            <p className="text-sm text-muted-foreground mb-2">{challenge.description}</p>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => setShowAI('hint')}>
                <Lightbulb size={16} className="mr-1" /> Hint
              </Button>
              <Button size="sm" variant="outline" onClick={handleShowSolution}>
                <Eye size={16} className="mr-1" /> Solution
              </Button>
            </div>
          </div>

          {/* Editor Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
            <span className="font-mono text-sm text-muted-foreground">index.html</span>
            <div className="flex gap-2">
              <Button onClick={handleRunCode} className="gap-2">
                <Play size={16} />
                Run Code
              </Button>
              {!isCompleted && (
                <Button
                  onClick={handleMarkComplete}
                  className="gap-2 game-button-primary"
                >
                  <CheckCircle size={16} />
                  Mark Complete
                </Button>
              )}
            </div>
          </div>

          {/* Editor */}
          <div className="flex-1 min-h-0">
            <CodeEditor code={code} onChange={setCode} />
          </div>
        </motion.div>

        {/* Right Panel - Live Preview */}
        <motion.aside
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="w-96 border-l border-border p-6 flex-shrink-0 hidden md:block"
        >
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Play size={18} className="text-success" />
            Your Result
          </h3>
          <div className="aspect-square bg-card rounded-xl overflow-hidden border border-border relative">
            {/* Show visual representation */}
            {resultImage && (
              <div className="absolute inset-0 z-10">
                <img 
                  src={resultImage} 
                  alt="Your result visual" 
                  className="w-full h-full object-contain bg-card"
                />
              </div>
            )}
            {/* Always show iframe behind the image */}
            <div className="w-full h-full">
              <LivePreview code={code} />
            </div>
          </div>

          {/* Comparison hint */}
          <p className="text-xs text-muted-foreground text-center mt-4">
            Try to match your result with the target on the left!
          </p>
        </motion.aside>
      </main>

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        xpEarned={challenge.xpReward}
        challengeTitle={challenge.title}
        onNextChallenge={handleNextChallenge}
        onRetry={loadNewChallenge}
      />

      {/* AI Chat Modal */}
      <AnimatePresence>
        {showAI && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
            <AIChat
              challenge={challenge}
              userCode={code}
              mode={showAI}
              onClose={() => setShowAI(null)}
            />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChallengePage;
