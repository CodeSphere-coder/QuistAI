import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Trophy, HelpCircle, Home, Gamepad2, LogIn, LogOut, UserRound } from 'lucide-react';
import { loadProgress, getCurrentRank, getXPProgress, type Progress } from '@/lib/progress';
import ThemeToggle from './ThemeToggle';
import { clearUser, loadUser, type UserProfile } from '@/lib/user';
import { Button } from './ui/button';
import { useToast } from './ui/use-toast';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<UserProfile | null>(loadUser());
  const [progress, setProgress] = useState<Progress>(loadProgress());
  const rank = getCurrentRank(progress.xp);
  const xpProgress = getXPProgress(progress.xp);

  useEffect(() => {
    setUser(loadUser());
    setProgress(loadProgress());
  }, []);

  useEffect(() => {
    setProgress(loadProgress());
  }, [user]);

  type NavItem = { path: string; label: string; icon: typeof Home };

  const navItems: NavItem[] = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/levels', label: 'Play', icon: Gamepad2 },
    { path: '/leaderboard', label: 'Leaderboard', icon: Trophy },
    !user ? { path: '/signin', label: 'Sign In', icon: LogIn } : null,
    { path: '/help', label: 'Help', icon: HelpCircle },
  ].filter((item): item is NavItem => Boolean(item));

  const handleSignOut = () => {
    clearUser();
    setUser(null);
    setProgress(loadProgress());
    toast({
      title: 'Signed out',
      description: 'See you soon! Come back to keep your streak alive.',
    });
    navigate('/signin');
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
      className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <motion.div
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.5 }}
            className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center"
          >
            <span className="text-xl">🎮</span>
          </motion.div>
          <span className="font-bold text-lg gradient-text hidden sm:block">
            Prabodha Sanchaya
          </span>
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-1 sm:gap-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-3 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                    isActive
                      ? 'bg-primary/20 text-primary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <item.icon size={18} />
                  <span className="hidden md:block text-sm font-medium">{item.label}</span>
                </motion.div>
              </Link>
            );
          })}
        </div>

        {/* XP Display & Theme Toggle */}
        <div className="flex items-center gap-3">
          {user && (
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted">
              <UserRound size={16} className="text-primary" />
              <span className="text-sm font-semibold">{user.username}</span>
              <span className="text-xs text-muted-foreground">Age {user.age}</span>
            </div>
          )}

          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted">
            <span className="text-lg">{rank.icon}</span>
            <span className={`text-sm font-semibold ${rank.color}`}>{rank.title}</span>
          </div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30"
          >
            <Zap size={16} className="text-primary" />
            <span className="font-bold text-sm">{progress.xp} XP</span>
          </motion.div>

          {user ? (
            <Button
              variant="outline"
              size="sm"
              onClick={handleSignOut}
              className="gap-2 hidden md:inline-flex"
            >
              <LogOut size={16} />
              Sign Out
            </Button>
          ) : (
            <Link to="/signin" className="hidden md:inline-flex">
              <Button variant="outline" size="sm" className="gap-2">
                <LogIn size={16} />
                Sign In
              </Button>
            </Link>
          )}

          <ThemeToggle />
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
