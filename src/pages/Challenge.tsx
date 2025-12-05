import { useState, useEffect, useCallback, useRef } from 'react';
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
import { getRandomChallenge, Challenge, levels, resetChallengeTracking } from '@/data/challenges';
import { markChallengeComplete, isChallengeCompleted, loadProgress } from '@/lib/progress';
import { toast } from '@/hooks/use-toast';
import { getChallengeImage } from '@/lib/gemini';

const ChallengePage = () => {
  const { level } = useParams<{ level: string }>();
  const navigate = useNavigate();
  const levelNum = parseInt(level || '1');
  
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [code, setCode] = useState('');
  const [validCode, setValidCode] = useState(''); // Only valid code that runs without errors
  const [codeError, setCodeError] = useState<string | null>(null);
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
    if (!challenge || !validCode) return;
    
    setIsLoadingResultImage(true);
    try {
      // Generate image based on valid code (synchronously)
      const imageUrl = getChallengeImage(
        `result-${challenge.id}-${validCode.substring(0, 50)}`, // Use code hash for caching
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
  }, [challenge, validCode]);

  // Validate code and check for errors
  const validateCode = useCallback((codeToValidate: string): { isValid: boolean; error: string | null } => {
    if (!codeToValidate || codeToValidate.trim() === '') {
      return { isValid: false, error: 'Code is empty' };
    }

    try {
      // Basic HTML structure validation
      const hasHtmlTags = /<[^>]+>/g.test(codeToValidate);
      if (!hasHtmlTags) {
        return { isValid: false, error: 'Missing HTML tags' };
      }

      // Check for unclosed CSS braces (most common error)
      const styleContent = codeToValidate.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
      if (styleContent) {
        const cssContent = styleContent[1];
        // Check for unclosed braces
        const openBraces = (cssContent.match(/{/g) || []).length;
        const closeBraces = (cssContent.match(/}/g) || []).length;
        if (openBraces !== closeBraces) {
          return { isValid: false, error: `Unclosed CSS braces (${openBraces} open, ${closeBraces} close)` };
        }
        
        // Check for unclosed quotes in CSS values
        const singleQuotes = (cssContent.match(/'/g) || []).length;
        const doubleQuotes = (cssContent.match(/"/g) || []).length;
        if (singleQuotes % 2 !== 0) {
          return { isValid: false, error: 'Unclosed single quotes in CSS' };
        }
        if (doubleQuotes % 2 !== 0) {
          return { isValid: false, error: 'Unclosed double quotes in CSS' };
        }
      }

      // Try to create a test document to see if it parses
      const parser = new DOMParser();
      const doc = parser.parseFromString(codeToValidate, 'text/html');
      const parseErrors = doc.querySelectorAll('parsererror');
      if (parseErrors.length > 0) {
        const errorText = parseErrors[0]?.textContent || 'HTML parsing error';
        return { isValid: false, error: `HTML parsing error: ${errorText.substring(0, 50)}` };
      }

      // Check for common syntax errors
      // Check for unclosed style tag
      const styleOpenCount = (codeToValidate.match(/<style[^>]*>/gi) || []).length;
      const styleCloseCount = (codeToValidate.match(/<\/style>/gi) || []).length;
      if (styleOpenCount !== styleCloseCount) {
        return { isValid: false, error: 'Unclosed <style> tag' };
      }

      return { isValid: true, error: null };
    } catch (error) {
      return { isValid: false, error: `Code validation error: ${error instanceof Error ? error.message : 'Unknown error'}` };
    }
  }, []);

  // Track if code has been run (to know when to allow real-time updates)
  const hasRunCodeRef = useRef<boolean>(false);
  
  // Update result in real-time after code has been run (if code is still valid)
  useEffect(() => {
    // Only update if user has run code before and code is different
    if (hasRunCodeRef.current && code !== validCode) {
      // Validate the new code
      const validation = validateCode(code);
      if (validation.isValid) {
        // Code is valid - update result in real-time
        setValidCode(code);
        setCodeError(null);
      } else {
        // Code has errors - clear result and show error
        setValidCode('');
        setCodeError(validation.error);
      }
    }
  }, [code, validCode, validateCode]);

  const loadNewChallenge = useCallback((excludeId?: string) => {
    // Get a new challenge, excluding the current one if provided
    const newChallenge = getRandomChallenge(levelNum, excludeId);
    if (newChallenge) {
      setChallenge(newChallenge);
      const starterCode = newChallenge.starterCode;
      setCode(starterCode);
      // Don't show result until user clicks Run Code
      setValidCode('');
      setCodeError(null);
      hasRunCodeRef.current = false; // Reset flag for new challenge
      setAttempts(0);
      setShowSolution(false);
      setIsCompleted(isChallengeCompleted(newChallenge.id));
      setTargetImage(null);
      setResultImage(null);
    }
  }, [levelNum]);

  useEffect(() => {
    // Reset tracking when level changes
    resetChallengeTracking(levelNum);
    loadNewChallenge();
  }, [levelNum, loadNewChallenge]);
  
  // Load new challenge when explicitly requested (excludes current challenge)
  const handleLoadNewChallenge = useCallback(() => {
    loadNewChallenge(challenge?.id);
  }, [loadNewChallenge, challenge?.id]);

  // Load target image when challenge changes
  useEffect(() => {
    if (challenge) {
      loadTargetImage();
    }
  }, [challenge?.id, loadTargetImage]);

  // Load result image only when valid code changes
  useEffect(() => {
    if (validCode && challenge) {
      loadResultImage();
    } else {
      setResultImage(null);
    }
  }, [validCode, challenge?.id, loadResultImage]);

  const handleRunCode = () => {
    setAttempts(prev => prev + 1);
    hasRunCodeRef.current = true; // Mark that code has been run
    
    // Validate code before showing result
    const validation = validateCode(code);
    if (validation.isValid) {
      // Code is valid - set it as valid code to show result
      setValidCode(code);
      setCodeError(null);
      toast({
        title: "Code Updated! 🎨",
        description: "Your code ran successfully! Check the preview panel.",
      });
    } else {
      // Code has errors - clear valid code and show error
      setValidCode('');
      setCodeError(validation.error);
      toast({
        title: "Try Again! ⚠️",
        description: validation.error || "There's an error in your code. Please fix it and try again.",
        variant: "destructive",
      });
    }
  };

  const handleShowSolution = () => {
    setShowSolution(true);
    const solutionCode = challenge?.solutionCode || '';
    setCode(solutionCode);
    // Don't show result until user clicks Run Code (even for solution)
    setValidCode('');
    setCodeError(null);
    hasRunCodeRef.current = false; // Reset so user needs to click Run Code
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
    handleLoadNewChallenge();
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
                onClick={handleLoadNewChallenge}
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
            {/* Show iframe only with valid code (after Run Code is clicked), otherwise show message */}
            <div className="w-full h-full">
              {validCode ? (
                <LivePreview code={validCode} />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-muted/30 p-6">
                  <div className="text-center">
                    {codeError ? (
                      <>
                        <div className="text-4xl mb-3">⚠️</div>
                        <p className="text-sm font-semibold text-destructive mb-1">Code Error</p>
                        <p className="text-xs text-muted-foreground mb-3">{codeError}</p>
                        <p className="text-xs text-muted-foreground">Fix the error and click "Run Code"</p>
                      </>
                    ) : (
                      <>
                        <Play className="mx-auto mb-2 text-muted-foreground" size={32} />
                        <p className="text-sm text-muted-foreground mb-1">Click "Run Code" to see your result</p>
                        <p className="text-xs text-muted-foreground">Your code will be validated when you run it</p>
                      </>
                    )}
                  </div>
                </div>
              )}
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
        onRetry={handleLoadNewChallenge}
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
