import { useState } from 'react';
import { motion } from 'framer-motion';
import { LogIn, ShieldCheck, UserRound } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { saveUser } from '@/lib/user';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [age, setAge] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const parsedAge = Number(age);
    if (!username.trim() || !age) {
      toast({
        title: 'Missing info',
        description: 'Please add both your username and age to continue.',
        variant: 'destructive',
      });
      return;
    }

    if (!Number.isFinite(parsedAge) || parsedAge <= 0) {
      toast({
        title: 'Invalid age',
        description: 'Age should be a positive number.',
        variant: 'destructive',
      });
      return;
    }

    saveUser({ username: username.trim(), age: parsedAge });

    toast({
      title: 'Signed in',
      description: `Welcome, ${username.trim()}! Let's start learning.`,
    });

    navigate('/levels');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="absolute inset-0">
          <div className="absolute top-1/5 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/5 right-1/4 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold">
                <ShieldCheck size={16} />
                Safe sign-in for young coders
              </div>
              <h1 className="text-4xl md:text-5xl font-black leading-tight">
                Join <span className="gradient-text">Prabodha</span>{' '}
                <span className="gradient-text-secondary">Sanchaya</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Create a profile so we can track your XP, levels, and leaderboard stats.
                No email needed—just a fun username and your age.
              </p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <UserRound size={18} className="text-primary" />
                  <span>Keep progress in sync</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <LogIn size={18} className="text-primary" />
                  <span>Access challenges faster</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="glass-card border-border/70 shadow-2xl">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Sign In</CardTitle>
                      <CardDescription>Jump back into your coding journey.</CardDescription>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center">
                      <LogIn className="text-primary" size={20} />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        placeholder="PixelPro"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="age">Age</Label>
                      <Input
                        id="age"
                        type="number"
                        min="1"
                        placeholder="12"
                        value={age}
                        onChange={(event) => setAge(event.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full game-button-primary gap-2">
                      <LogIn size={18} />
                      Sign In
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignIn;

