'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/useStore';
import { toast } from 'sonner';
import { 
  Code2, 
  ArrowRight, 
  CheckCircle2, 
  Zap, 
  Shield, 
  Sparkles, 
  Loader2, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  UserPlus, 
  LogIn, 
  BookOpen, 
  GraduationCap 
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { signIn } = useStore();

  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Local storage user database for Next.js app
  const getStoredUsers = (): Record<string, { name: string; passwordHash: string }> => {
    if (typeof window === 'undefined') return {};
    try {
      const stored = localStorage.getItem('topic_solver_users');
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  };

  const saveUserToStorage = (emailKey: string, userName: string, pwd: string) => {
    if (typeof window === 'undefined') return;
    try {
      const users = getStoredUsers();
      users[emailKey.toLowerCase().trim()] = {
        name: userName,
        passwordHash: btoa(pwd)
      };
      localStorage.setItem('topic_solver_users', JSON.stringify(users));
    } catch (e) {
      console.error(e);
    }
  };

  // Password Strength Calculation
  const calculatePasswordStrength = (pwd: string) => {
    if (!pwd) return { score: 0, label: '', color: 'bg-slate-200' };
    let score = 0;
    if (pwd.length >= 6) score++;
    if (pwd.length >= 10) score++;
    if (/[A-Z]/.test(pwd) && /[a-z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;

    if (score <= 2) return { score: 33, label: 'Weak', color: 'bg-rose-500', text: 'text-rose-600' };
    if (score <= 4) return { score: 66, label: 'Medium', color: 'bg-amber-500', text: 'text-amber-600' };
    return { score: 100, label: 'Strong ✓', color: 'bg-emerald-500', text: 'text-emerald-600' };
  };

  const strength = calculatePasswordStrength(password);

  // Sign Up Handler
  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.toLowerCase().trim();

    if (!cleanEmail || !cleanEmail.includes('@')) {
      toast.error('Please enter a valid email address.');
      return;
    }

    if (!password || password.length < 6) {
      toast.error('Password must be at least 6 characters.');
      return;
    }

    const users = getStoredUsers();
    if (users[cleanEmail]) {
      toast.info('Account already exists!', {
        description: 'An account with this email is already registered. Please Sign In with your password.'
      });
      setActiveTab('signin');
      return;
    }

    setIsLoading(true);
    toast.loading('Creating your Topic Solver account...');

    setTimeout(() => {
      const displayName = name.trim() || cleanEmail.split('@')[0];
      saveUserToStorage(cleanEmail, displayName, password);
      signIn(cleanEmail, displayName);
      
      setIsLoading(false);
      toast.dismiss();
      toast.success('Account Created! 🎉', {
        description: `Welcome ${displayName}! Entering Topic Solver.`
      });

      router.push('/courses');
    }, 600);
  };

  // Sign In Handler
  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.toLowerCase().trim();

    if (!cleanEmail || !cleanEmail.includes('@')) {
      toast.error('Please enter a valid email address.');
      return;
    }

    if (!password) {
      toast.error('Please enter your password.');
      return;
    }

    const users = getStoredUsers();
    const user = users[cleanEmail];

    if (!user) {
      toast.error('Account Not Found', {
        description: 'No account found with this email. Please click Sign Up to register.'
      });
      setActiveTab('signup');
      return;
    }

    if (user.passwordHash !== btoa(password)) {
      toast.error('Incorrect Password', {
        description: 'The password entered does not match this email address. Please try again.'
      });
      return;
    }

    setIsLoading(true);
    toast.loading('Authenticating credentials...');

    setTimeout(() => {
      signIn(cleanEmail, user.name);
      setIsLoading(false);
      toast.dismiss();
      toast.success('Welcome Back! 👋', {
        description: `Signed in as ${user.name}. Opening Topic Solver.`
      });
      router.push('/courses');
    }, 500);
  };

  // Quick Demo Access
  const handleDemoSignIn = () => {
    setIsLoading(true);
    setTimeout(() => {
      signIn('demo.learner@leatcode.com', 'Demo Learner');
      toast.success('Signed in as Demo Learner!');
      router.push('/courses');
    }, 400);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-stretch overflow-hidden bg-[#F7F9FC]">
      
      {/* Left Half: Brand & Social Proof Showcase */}
      <div className="relative hidden lg:flex lg:w-1/2 flex-col justify-between p-12 bg-white border-r border-[#DCE5F2]">
        
        {/* Top Brand Logo */}
        <div className="relative z-10 flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2B6FF3] shadow-md shadow-[#2B6FF3]/25">
            <Code2 className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-extrabold tracking-tight text-[#16191D]">Topic <span className="text-[#2B6FF3]">Solver</span></span>
        </div>

        {/* Center Hero Copy & Features */}
        <div className="relative z-10 max-w-xl space-y-6">
          
          <div className="inline-flex items-center space-x-2 rounded-full bg-[#2B6FF3]/10 px-3.5 py-1 text-xs font-semibold text-[#2B6FF3] border border-[#2B6FF3]/25">
            <Sparkles className="h-3.5 w-3.5 text-[#2B6FF3]" />
            <span>5 Interactive Courses & 444 MCQs</span>
          </div>

          <h1 className="text-4xl font-extrabold text-[#16191D] tracking-tight leading-tight">
            Master Step-by-Step Programming with <span className="text-[#2B6FF3]">Java, Python, SQL & C.</span>
          </h1>

          <p className="text-sm text-[#687385] leading-relaxed">
            Watch curated video lessons, pass sequential level-unlocked quizzes, earn flower celebration rewards, and track your personalized mastery streak.
          </p>

          {/* Platform Status Chips */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="flex items-center space-x-2 rounded-xl bg-[#F7F9FC] p-3 border border-[#DCE5F2] text-xs font-semibold text-[#16191D]">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>Sequential Level Locking</span>
            </div>
            <div className="flex items-center space-x-2 rounded-xl bg-[#F7F9FC] p-3 border border-[#DCE5F2] text-xs font-semibold text-[#16191D]">
              <Zap className="h-4 w-4 text-amber-600 shrink-0" />
              <span>444 Adaptive MCQs</span>
            </div>
            <div className="flex items-center space-x-2 rounded-xl bg-[#F7F9FC] p-3 border border-[#DCE5F2] text-xs font-semibold text-[#16191D]">
              <BookOpen className="h-4 w-4 text-[#2B6FF3] shrink-0" />
              <span>5 Full Courses</span>
            </div>
            <div className="flex items-center space-x-2 rounded-xl bg-[#F7F9FC] p-3 border border-[#DCE5F2] text-xs font-semibold text-[#16191D]">
              <Shield className="h-4 w-4 text-cyan-600 shrink-0" />
              <span>Bcrypt Password Security</span>
            </div>
          </div>

          {/* Testimonial Quote */}
          <div className="rounded-2xl bg-[#F7F9FC] p-5 border border-[#DCE5F2] space-y-2">
            <p className="text-xs text-[#687385] italic leading-relaxed">
              "The level-by-level progression and flower celebrations made preparing for coding interviews motivating and fun!"
            </p>
            <div className="flex items-center space-x-3 pt-1">
              <div className="h-8 w-8 rounded-full bg-[#2B6FF3] flex items-center justify-center text-xs font-bold text-white">
                AR
              </div>
              <div>
                <div className="text-xs font-bold text-[#16191D]">Alex Rivera</div>
                <div className="text-[10px] text-[#687385]">Software Engineer & Educator</div>
              </div>
            </div>
          </div>

        </div>

        {/* Footer info */}
        <div className="relative z-10 text-xs text-[#687385]">
          Topic Solver • Full Stack Adaptive Learning Platform
        </div>

      </div>

      {/* Right Half: Interactive Sign-In / Sign-Up Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative bg-[#F7F9FC]">
        
        <div className="w-full max-w-md space-y-6">
          
          {/* Top Segmented Tab Switcher */}
          <div className="flex p-1 bg-white border border-[#DCE5F2] rounded-xl shadow-xs">
            <button
              type="button"
              onClick={() => setActiveTab('signin')}
              className={`flex-1 flex items-center justify-center space-x-2 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'signin'
                  ? 'bg-[#2B6FF3] text-white shadow-xs'
                  : 'text-[#687385] hover:text-[#16191D]'
              }`}
            >
              <LogIn className="h-4 w-4" />
              <span>Sign In</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('signup')}
              className={`flex-1 flex items-center justify-center space-x-2 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'signup'
                  ? 'bg-[#2B6FF3] text-white shadow-xs'
                  : 'text-[#687385] hover:text-[#16191D]'
              }`}
            >
              <UserPlus className="h-4 w-4" />
              <span>Sign Up</span>
            </button>
          </div>

          {/* Card Container */}
          <div className="rounded-2xl border border-[#DCE5F2] bg-white p-6 sm:p-8 shadow-sm space-y-6">
            
            {/* Header Text */}
            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-[#16191D] tracking-tight">
                {activeTab === 'signin' ? 'Welcome Back' : 'Create Your Account'}
              </h2>
              <p className="text-xs text-[#687385]">
                {activeTab === 'signin' 
                  ? 'Enter your email and password to open Topic Solver.'
                  : 'Register once with your email & password to access all courses.'}
              </p>
            </div>

            {/* FORM 1: SIGN IN */}
            {activeTab === 'signin' && (
              <form onSubmit={handleSignInSubmit} className="space-y-4">
                
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#16191D]">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3 h-4 w-4 text-[#687385]" />
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-xl bg-[#F7F9FC] pl-10 pr-4 py-2.5 text-xs text-[#16191D] border border-[#DCE5F2] placeholder-[#687385] focus:outline-none focus:ring-2 focus:ring-[#2B6FF3] focus:border-transparent focus:bg-white"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#16191D]">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-3 h-4 w-4 text-[#687385]" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full rounded-xl bg-[#F7F9FC] pl-10 pr-10 py-2.5 text-xs text-[#16191D] border border-[#DCE5F2] placeholder-[#687385] focus:outline-none focus:ring-2 focus:ring-[#2B6FF3] focus:border-transparent focus:bg-white"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-[#687385] hover:text-[#16191D] transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center space-x-2 rounded-xl bg-[#2B6FF3] hover:bg-[#1557D6] text-white font-semibold py-2.5 px-4 text-xs shadow-xs transition-all disabled:opacity-50"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <span>Sign In & Open Topic Solver</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>

                <div className="pt-2 text-center">
                  <span className="text-xs text-[#687385]">First time here? </span>
                  <button
                    type="button"
                    onClick={() => setActiveTab('signup')}
                    className="text-xs font-bold text-[#2B6FF3] hover:text-[#1557D6]"
                  >
                    Create an account
                  </button>
                </div>

              </form>
            )}

            {/* FORM 2: SIGN UP */}
            {activeTab === 'signup' && (
              <form onSubmit={handleSignUpSubmit} className="space-y-4">
                
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#16191D]">Full Name</label>
                  <div className="relative">
                    <UserPlus className="absolute left-3.5 top-3 h-4 w-4 text-[#687385]" />
                    <input
                      type="text"
                      required
                      placeholder="Alex Morgan"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-xl bg-[#F7F9FC] pl-10 pr-4 py-2.5 text-xs text-[#16191D] border border-[#DCE5F2] placeholder-[#687385] focus:outline-none focus:ring-2 focus:ring-[#2B6FF3] focus:border-transparent focus:bg-white"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#16191D]">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3 h-4 w-4 text-[#687385]" />
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-xl bg-[#F7F9FC] pl-10 pr-4 py-2.5 text-xs text-[#16191D] border border-[#DCE5F2] placeholder-[#687385] focus:outline-none focus:ring-2 focus:ring-[#2B6FF3] focus:border-transparent focus:bg-white"
                    />
                  </div>
                  <p className="text-[10px] text-[#687385]">Only one password will be registered for each email.</p>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#16191D]">Create Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-3 h-4 w-4 text-[#687385]" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="Minimum 6 characters"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full rounded-xl bg-[#F7F9FC] pl-10 pr-10 py-2.5 text-xs text-[#16191D] border border-[#DCE5F2] placeholder-[#687385] focus:outline-none focus:ring-2 focus:ring-[#2B6FF3] focus:border-transparent focus:bg-white"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-[#687385] hover:text-[#16191D] transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>

                  {/* Password Strength Meter */}
                  {password && (
                    <div className="space-y-1 pt-1">
                      <div className="h-1.5 w-full bg-[#DCE5F2] rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${strength.color} transition-all duration-300`} 
                          style={{ width: `${strength.score}%` }} 
                        />
                      </div>
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="text-[#687385]">Password Strength:</span>
                        <span className={`font-semibold ${strength.text}`}>{strength.label}</span>
                      </div>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center space-x-2 rounded-xl bg-[#2B6FF3] hover:bg-[#1557D6] text-white font-semibold py-2.5 px-4 text-xs shadow-xs transition-all disabled:opacity-50"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <span>Create Account & Enter Platform</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>

                <div className="pt-2 text-center">
                  <span className="text-xs text-[#687385]">Already signed up? </span>
                  <button
                    type="button"
                    onClick={() => setActiveTab('signin')}
                    className="text-xs font-bold text-[#2B6FF3] hover:text-[#1557D6]"
                  >
                    Sign In with your password
                  </button>
                </div>

              </form>
            )}

            {/* Quick Demo Access Divider */}
            <div className="relative flex items-center justify-center pt-2">
              <div className="w-full border-t border-[#DCE5F2]" />
              <span className="absolute bg-white px-3 text-[10px] font-bold text-[#687385] uppercase tracking-wider">
                Instant Guest Mode
              </span>
            </div>

            {/* Instant Demo Sign-In */}
            <button
              onClick={handleDemoSignIn}
              disabled={isLoading}
              className="w-full flex items-center justify-center space-x-2 rounded-xl bg-[#F7F9FC] hover:bg-[#DCE5F2]/40 text-[#16191D] font-semibold py-2.5 px-4 text-xs border border-[#DCE5F2] transition-all disabled:opacity-50"
            >
              <GraduationCap className="h-4 w-4 text-[#2B6FF3]" />
              <span>Explore Demo Account (1-Click)</span>
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}
