'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { useAuthStore } from '@/lib/useAuthStore';
import confetti from 'canvas-confetti';
import { toast } from 'sonner';
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  User, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle,
  Terminal,
  Code2,
  Database,
  Cpu,
  Zap,
  Flame,
  LogIn,
  UserPlus,
  Bot,
  Layers,
  Compass,
  KeyRound,
  Check
} from 'lucide-react';

export const AuthView: React.FC = () => {
  const { signIn, signUp } = useAuthStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');
  
  // Sign In Form States
  const [signInEmail, setSignInEmail] = useState<string>('');
  const [signInPassword, setSignInPassword] = useState<string>('');
  const [showSignInPwd, setShowSignInPwd] = useState<boolean>(false);
  const [isSigningIn, setIsSigningIn] = useState<boolean>(false);

  // Sign Up Form States
  const [signUpName, setSignUpName] = useState<string>('');
  const [signUpEmail, setSignUpEmail] = useState<string>('');
  const [signUpPassword, setSignUpPassword] = useState<string>('');
  const [showSignUpPwd, setShowSignUpPwd] = useState<boolean>(false);
  const [isSigningUp, setIsSigningUp] = useState<boolean>(false);

  // 3D Gyroscopic Mouse Tracking
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 16, y: -y * 16 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  // Password Strength Calculation
  const pwdStrength = React.useMemo(() => {
    const len = signUpPassword.length;
    if (len === 0) return { score: 0, label: '', color: 'bg-slate-300' };
    if (len < 6) return { score: 1, label: 'Too short (min 6 chars)', color: 'bg-rose-500' };
    if (len < 9) return { score: 2, label: 'Moderate strength', color: 'bg-amber-500' };
    return { score: 3, label: 'Strong & Secure', color: 'bg-emerald-500' };
  }, [signUpPassword]);

  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signInEmail.trim() || !signInPassword) {
      toast.error('Please enter your email and password.');
      return;
    }

    setIsSigningIn(true);
    setTimeout(() => {
      setIsSigningIn(false);
      const res = signIn(signInEmail, signInPassword);
      if (res.success) {
        confetti({
          particleCount: 140,
          spread: 90,
          origin: { y: 0.6 }
        });
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    }, 450);
  };

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signUpEmail.trim() || !signUpPassword) {
      toast.error('Please fill in all required fields.');
      return;
    }

    if (signUpPassword.length < 6) {
      toast.error('Password must be at least 6 characters long.');
      return;
    }

    setIsSigningUp(true);
    setTimeout(() => {
      setIsSigningUp(false);
      const res = signUp(signUpName, signUpEmail, signUpPassword);
      if (res.success) {
        confetti({
          particleCount: 160,
          spread: 100,
          origin: { y: 0.55 }
        });
        toast.success(res.message);
      } else {
        toast.error(res.message);
        if (res.alreadyRegistered) {
          setSignInEmail(signUpEmail);
          setActiveTab('signin');
        }
      }
    }, 500);
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 overflow-hidden bg-[#F7F9FC] dark:bg-[#090C12] selection:bg-[#2B6FF3] selection:text-white card-3d-perspective py-12"
    >
      
      {/* ================= 3D BACKGROUND GRAPHICS & HOLOGRAPHIC ENVIRONMENT ================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
        
        {/* 3D Rotating Glowing Laser Grid Base */}
        <div 
          className="absolute w-[650px] sm:w-[950px] h-[650px] sm:h-[950px] rounded-full border border-[#2B6FF3]/25 bg-gradient-to-tr from-[#2B6FF3]/15 via-purple-600/10 to-cyan-500/15 shadow-2xl backdrop-blur-sm dark:border-[#3B82F6]/35 dark:from-[#3B82F6]/15 dark:via-purple-900/20 dark:to-cyan-900/15"
          style={{
            transform: `rotateX(72deg) rotateY(${tilt.x * 0.4}deg) rotateZ(0deg)`,
            boxShadow: '0 50px 120px -20px rgba(43, 111, 243, 0.35)'
          }}
        >
          {/* Concentric 3D Holographic Orbit Rings */}
          <div className="absolute inset-8 rounded-full border-2 border-[#2B6FF3]/40 border-dashed animate-spin [animation-duration:60s]" />
          <div className="absolute inset-20 rounded-full border border-purple-400/50 animate-spin [animation-duration:40s] [animation-direction:reverse]" />
          <div className="absolute inset-36 rounded-full border border-cyan-400/40 border-dotted animate-spin [animation-duration:25s]" />
          <div className="absolute inset-52 rounded-full border border-[#DCE5F2] dark:border-slate-700/60" />
          <div className="absolute inset-0 m-auto w-32 h-32 rounded-full bg-[#2B6FF3]/30 blur-3xl animate-pulse" />
        </div>

        {/* Ambient Radiant Glowing Orbs */}
        <div className="absolute -top-40 -left-40 w-[650px] h-[650px] rounded-full bg-radial from-[#2B6FF3]/25 to-transparent blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-[700px] h-[700px] rounded-full bg-radial from-purple-600/20 to-transparent blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-radial from-cyan-500/10 to-transparent blur-3xl" />
        
        {/* Futuristic Dot Matrix Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.05] dark:opacity-[0.09]" 
          style={{
            backgroundImage: `radial-gradient(#2B6FF3 1.2px, transparent 1.2px)`,
            backgroundSize: '28px 28px'
          }}
        />

        {/* Floating 3D Geometric Shards */}
        <div 
          className="absolute top-28 left-[18%] w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#2B6FF3]/20 to-cyan-400/20 border border-[#2B6FF3]/30 backdrop-blur-md rotate-12"
          style={{ animation: 'float3d 7s ease-in-out infinite alternate' }}
        />
        <div 
          className="absolute bottom-28 right-[18%] w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-500/20 to-pink-500/20 border border-purple-400/30 backdrop-blur-md -rotate-12"
          style={{ animation: 'float3d 8s ease-in-out infinite alternate', animationDelay: '1.5s' }}
        />
      </div>

      {/* ================= FLOATING 3D INTERACTIVE SATELLITE CRYSTALS ================= */}
      <div className="hidden xl:block pointer-events-none">
        
        {/* Top Left: Java & DSA Track */}
        <div 
          className="absolute top-16 left-12 z-10 flex items-center space-x-3 px-4 py-2.5 rounded-2xl bg-white/95 border border-[#DCE5F2] shadow-2xl text-xs font-extrabold text-[#16191D] card-3d-tilt dark:bg-[#121622]/95 dark:border-[#222B3D] dark:text-white"
          style={{ 
            animation: 'float3d 5.5s ease-in-out infinite alternate',
            transform: `translateZ(60px) rotateY(${tilt.x * 0.8}deg)`
          }}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-500/15 text-amber-500 text-base shadow-xs">☕</span>
          <div>
            <div className="font-bold">Java & DSA Track</div>
            <div className="text-[10px] text-[#687385] dark:text-[#94A3B8] font-normal">54 Topics • 162 MCQs</div>
          </div>
        </div>

        {/* Top Right: Python Core Track */}
        <div 
          className="absolute top-16 right-12 z-10 flex items-center space-x-3 px-4 py-2.5 rounded-2xl bg-white/95 border border-[#DCE5F2] shadow-2xl text-xs font-extrabold text-[#16191D] card-3d-tilt dark:bg-[#121622]/95 dark:border-[#222B3D] dark:text-white"
          style={{ 
            animation: 'float3d 6.5s ease-in-out infinite alternate', 
            animationDelay: '1s',
            transform: `translateZ(65px) rotateY(${tilt.x * 0.8}deg)`
          }}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#2B6FF3]/15 text-[#2B6FF3] text-base shadow-xs">🐍</span>
          <div>
            <div className="font-bold">Python Core</div>
            <div className="text-[10px] text-[#687385] dark:text-[#94A3B8] font-normal">48 Lessons • 144 MCQs</div>
          </div>
        </div>

        {/* Middle Left: Code Floating Shard */}
        <div 
          className="absolute top-1/2 left-8 -translate-y-1/2 z-10 p-3 rounded-2xl bg-white/90 border border-[#DCE5F2] shadow-xl font-mono text-[11px] text-slate-700 dark:bg-[#121622]/90 dark:border-[#222B3D] dark:text-slate-300 card-3d-tilt"
          style={{ 
            animation: 'float3d 7s ease-in-out infinite alternate', 
            animationDelay: '2.5s',
            transform: `translateZ(50px) rotateY(${tilt.x * 0.5}deg)`
          }}
        >
          <div className="text-emerald-500 font-bold">✓ Tests Passed (3/3)</div>
          <div className="text-[10px] text-slate-400">O(1) Auxiliary Space</div>
        </div>

        {/* Middle Right: CodeMentor AI Badge */}
        <div 
          className="absolute top-1/2 right-8 -translate-y-1/2 z-10 flex items-center space-x-3 px-4 py-2.5 rounded-2xl bg-white/95 border border-purple-300 shadow-2xl text-xs font-extrabold text-[#16191D] card-3d-tilt dark:bg-[#121622]/95 dark:border-purple-800 dark:text-white"
          style={{ 
            animation: 'float3d 5.8s ease-in-out infinite alternate', 
            animationDelay: '1.2s',
            transform: `translateZ(70px) rotateY(${tilt.x * 0.8}deg)`
          }}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-600/15 text-purple-600 shadow-xs">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <div className="font-bold flex items-center gap-1.5">
              <span>CodeMentor AI</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-purple-500/20 text-purple-600 dark:text-purple-300">Live</span>
            </div>
            <div className="text-[10px] text-[#687385] dark:text-[#94A3B8] font-normal">Progressive Error Hints</div>
          </div>
        </div>

        {/* Bottom Left: MySQL DBMS */}
        <div 
          className="absolute bottom-14 left-14 z-10 flex items-center space-x-3 px-4 py-2.5 rounded-2xl bg-white/95 border border-[#DCE5F2] shadow-2xl text-xs font-extrabold text-[#16191D] card-3d-tilt dark:bg-[#121622]/95 dark:border-[#222B3D] dark:text-white"
          style={{ 
            animation: 'float3d 6s ease-in-out infinite alternate', 
            animationDelay: '2s',
            transform: `translateZ(55px) rotateY(${tilt.x * 0.8}deg)`
          }}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-cyan-500/15 text-cyan-500 text-base shadow-xs">🗄️</span>
          <div>
            <div className="font-bold">MySQL DBMS</div>
            <div className="text-[10px] text-[#687385] dark:text-[#94A3B8] font-normal">10 Modules • 30 MCQs</div>
          </div>
        </div>

        {/* Bottom Right: One-Password Secure Gate */}
        <div 
          className="absolute bottom-14 right-14 z-10 flex items-center space-x-3 px-4 py-2.5 rounded-2xl bg-white/95 border border-[#DCE5F2] shadow-2xl text-xs font-extrabold text-[#16191D] card-3d-tilt dark:bg-[#121622]/95 dark:border-[#222B3D] dark:text-white"
          style={{ 
            animation: 'float3d 5s ease-in-out infinite alternate', 
            animationDelay: '0.8s',
            transform: `translateZ(65px) rotateY(${tilt.x * 0.8}deg)`
          }}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-500 shadow-xs">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <div className="font-bold">Single Account Access</div>
            <div className="text-[10px] text-[#687385] dark:text-[#94A3B8] font-normal">One Email = One Password</div>
          </div>
        </div>

      </div>

      {/* ================= MAIN 3D CENTERED CONTAINER ================= */}
      <div 
        className="relative z-20 w-full max-w-md space-y-6 transition-transform duration-300 ease-out"
        style={{
          transform: `rotateY(${tilt.x * 0.35}deg) rotateX(${tilt.y * 0.35}deg) translateZ(40px)`,
          transformStyle: 'preserve-3d'
        }}
      >
        
        {/* ================= TOP BIG OFFICIAL LOGO & BRAND HEADER ================= */}
        <div className="flex flex-col items-center text-center space-y-3">
          
          {/* Pure Floating Sticker of Fox with White Devil & Radiant Blue Aura (No Box) */}
          <div 
            className="relative flex items-center justify-center transition-all duration-300 hover:scale-105 group"
          >
            {/* Ambient Multi-Layer Radiant Blue Shade Aura */}
            <div className="absolute inset-0 -m-4 rounded-full bg-radial from-[#2B6FF3]/40 via-cyan-400/25 to-transparent blur-2xl pointer-events-none group-hover:scale-115 transition-transform duration-500" />
            
            {/* Fox Mascot Sticker */}
            <div className="relative w-72 sm:w-84 h-24 sm:h-28 flex items-center justify-center">
              <Image
                src="/images/topic_solver_logo.png"
                alt="TOPIC SOLVER Sticker"
                fill
                priority
                className="object-contain transition-all duration-300 group-hover:scale-105"
                style={{
                  filter: 'drop-shadow(0 0 12px rgba(43, 111, 243, 0.95)) drop-shadow(0 0 30px rgba(59, 130, 246, 0.7)) drop-shadow(0 0 60px rgba(0, 210, 255, 0.45))'
                }}
              />
            </div>
          </div>

          {/* Platform Title & Badge */}
          <div className="space-y-1">
            <div className="flex items-center justify-center space-x-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#16191D] font-3d-hero dark:text-white">
                TOPIC <span className="font-3d-highlight">SOLVER</span>
              </h1>
              <span className="inline-flex items-center gap-1 rounded-full bg-[#2B6FF3]/10 px-2 py-0.5 text-[10px] font-bold text-[#2B6FF3] border border-[#2B6FF3]/25 dark:bg-[#3B82F6]/20 dark:text-[#93C5FD] dark:border-[#3B82F6]/40">
                <span className="h-1.5 w-1.5 rounded-full bg-[#2B6FF3] dark:bg-[#3B82F6] animate-pulse" />
                AI Platform
              </span>
            </div>
            <p className="text-xs font-medium text-[#687385] dark:text-[#94A3B8] max-w-xs mx-auto">
              Your personalized adaptive pathway to Java, Python, SQL, and Data Structures.
            </p>
          </div>

        </div>

        {/* ================= GLASS CARD CONTAINER ================= */}
        <div 
          className="rounded-3xl border border-[#DCE5F2] bg-white/95 backdrop-blur-2xl p-7 sm:p-8 shadow-2xl space-y-6 dark:border-[#222B3D] dark:bg-[#121622]/95"
          style={{
            boxShadow: '0 25px 70px -15px rgba(43, 111, 243, 0.2), 0 0 0 1px #DCE5F2'
          }}
        >
          
          {/* Auth Tab Switcher (Sign In vs Sign Up) */}
          <div className="grid grid-cols-2 p-1.5 rounded-2xl bg-[#F7F9FC] border border-[#DCE5F2] dark:bg-[#0E121C] dark:border-[#222B3D]">
            <button
              type="button"
              onClick={() => setActiveTab('signin')}
              className={`flex items-center justify-center space-x-2 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'signin'
                  ? 'bg-[#2B6FF3] text-white shadow-md shadow-[#2B6FF3]/25 dark:bg-[#3B82F6]'
                  : 'text-[#687385] hover:text-[#16191D] dark:text-[#94A3B8] dark:hover:text-white'
              }`}
            >
              <LogIn className="h-4 w-4" />
              <span>Sign In</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('signup')}
              className={`flex items-center justify-center space-x-2 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'signup'
                  ? 'bg-[#2B6FF3] text-white shadow-md shadow-[#2B6FF3]/25 dark:bg-[#3B82F6]'
                  : 'text-[#687385] hover:text-[#16191D] dark:text-[#94A3B8] dark:hover:text-white'
              }`}
            >
              <UserPlus className="h-4 w-4" />
              <span>Sign Up</span>
            </button>
          </div>

          {/* ================= VIEW 1: SIGN IN ================= */}
          {activeTab === 'signin' && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="space-y-1">
                <h2 className="text-lg font-extrabold text-[#16191D] font-3d-sub dark:text-white">
                  Welcome to TOPIC SOLVER
                </h2>
                <p className="text-xs text-[#687385] dark:text-[#94A3B8]">
                  Sign in with your registered email and password to enter the website.
                </p>
              </div>

              <form onSubmit={handleSignInSubmit} className="space-y-4">
                {/* Email Address */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#16191D] dark:text-slate-300">
                    Email Address
                  </label>
                  <div className="relative flex items-center">
                    <Mail className="absolute left-3.5 h-4 w-4 text-[#687385] dark:text-[#94A3B8] pointer-events-none" />
                    <input
                      type="email"
                      value={signInEmail}
                      onChange={(e) => setSignInEmail(e.target.value)}
                      placeholder="name@example.com"
                      required
                      className="w-full rounded-xl bg-[#F7F9FC] border border-[#DCE5F2] pl-10 pr-4 py-2.5 text-xs text-[#16191D] font-medium focus:outline-none focus:ring-2 focus:ring-[#2B6FF3] dark:bg-[#0E121C] dark:border-[#222B3D] dark:text-white"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#16191D] dark:text-slate-300">
                    Password
                  </label>
                  <div className="relative flex items-center">
                    <Lock className="absolute left-3.5 h-4 w-4 text-[#687385] dark:text-[#94A3B8] pointer-events-none" />
                    <input
                      type={showSignInPwd ? 'text' : 'password'}
                      value={signInPassword}
                      onChange={(e) => setSignInPassword(e.target.value)}
                      placeholder="Enter your password"
                      required
                      className="w-full rounded-xl bg-[#F7F9FC] border border-[#DCE5F2] pl-10 pr-10 py-2.5 text-xs text-[#16191D] font-medium focus:outline-none focus:ring-2 focus:ring-[#2B6FF3] dark:bg-[#0E121C] dark:border-[#222B3D] dark:text-white"
                    />
                    <button
                      type="button"
                      onClick={() => setShowSignInPwd(!showSignInPwd)}
                      className="absolute right-3.5 text-[#687385] hover:text-[#16191D] dark:text-[#94A3B8] dark:hover:text-white"
                    >
                      {showSignInPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* Submit CTA */}
                <button
                  type="submit"
                  disabled={isSigningIn}
                  className="w-full flex items-center justify-center space-x-2 rounded-xl bg-[#2B6FF3] hover:bg-[#1557D6] text-white py-3 px-4 text-xs font-bold shadow-lg shadow-[#2B6FF3]/25 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 dark:bg-[#3B82F6] dark:hover:bg-[#2563EB]"
                >
                  <span>{isSigningIn ? 'Verifying Credentials...' : 'Sign In & Open Dashboard'}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>

              <div className="pt-2 text-center text-xs text-[#687385] dark:text-[#94A3B8]">
                <span>First time here? </span>
                <button
                  type="button"
                  onClick={() => setActiveTab('signup')}
                  className="font-bold text-[#2B6FF3] hover:underline dark:text-[#60A5FA]"
                >
                  Create an Account
                </button>
              </div>
            </div>
          )}

          {/* ================= VIEW 2: SIGN UP ================= */}
          {activeTab === 'signup' && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="space-y-1">
                <h2 className="text-lg font-extrabold text-[#16191D] font-3d-sub dark:text-white">
                  Create Your TOPIC SOLVER Account
                </h2>
                <p className="text-xs text-[#687385] dark:text-[#94A3B8]">
                  Sign up once. You can sign in anytime with your email & password.
                </p>
              </div>

              <form onSubmit={handleSignUpSubmit} className="space-y-4">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#16191D] dark:text-slate-300">
                    Full Name
                  </label>
                  <div className="relative flex items-center">
                    <User className="absolute left-3.5 h-4 w-4 text-[#687385] dark:text-[#94A3B8] pointer-events-none" />
                    <input
                      type="text"
                      value={signUpName}
                      onChange={(e) => setSignUpName(e.target.value)}
                      placeholder="Alex Morgan"
                      required
                      className="w-full rounded-xl bg-[#F7F9FC] border border-[#DCE5F2] pl-10 pr-4 py-2.5 text-xs text-[#16191D] font-medium focus:outline-none focus:ring-2 focus:ring-[#2B6FF3] dark:bg-[#0E121C] dark:border-[#222B3D] dark:text-white"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#16191D] dark:text-slate-300">
                    Email Address
                  </label>
                  <div className="relative flex items-center">
                    <Mail className="absolute left-3.5 h-4 w-4 text-[#687385] dark:text-[#94A3B8] pointer-events-none" />
                    <input
                      type="email"
                      value={signUpEmail}
                      onChange={(e) => setSignUpEmail(e.target.value)}
                      placeholder="name@example.com"
                      required
                      className="w-full rounded-xl bg-[#F7F9FC] border border-[#DCE5F2] pl-10 pr-4 py-2.5 text-xs text-[#16191D] font-medium focus:outline-none focus:ring-2 focus:ring-[#2B6FF3] dark:bg-[#0E121C] dark:border-[#222B3D] dark:text-white"
                    />
                  </div>
                  <span className="text-[10px] text-[#687385] dark:text-[#94A3B8]">
                    Only one password will be registered for each email.
                  </span>
                </div>

                {/* Password with Strength Indicator */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#16191D] dark:text-slate-300">
                    Password (min 6 characters)
                  </label>
                  <div className="relative flex items-center">
                    <Lock className="absolute left-3.5 h-4 w-4 text-[#687385] dark:text-[#94A3B8] pointer-events-none" />
                    <input
                      type={showSignUpPwd ? 'text' : 'password'}
                      value={signUpPassword}
                      onChange={(e) => setSignUpPassword(e.target.value)}
                      placeholder="Create a secure password"
                      required
                      className="w-full rounded-xl bg-[#F7F9FC] border border-[#DCE5F2] pl-10 pr-10 py-2.5 text-xs text-[#16191D] font-medium focus:outline-none focus:ring-2 focus:ring-[#2B6FF3] dark:bg-[#0E121C] dark:border-[#222B3D] dark:text-white"
                    />
                    <button
                      type="button"
                      onClick={() => setShowSignUpPwd(!showSignUpPwd)}
                      className="absolute right-3.5 text-[#687385] hover:text-[#16191D] dark:text-[#94A3B8] dark:hover:text-white"
                    >
                      {showSignUpPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>

                  {/* Password Strength Meter */}
                  {signUpPassword.length > 0 && (
                    <div className="space-y-1 pt-1">
                      <div className="flex h-1.5 w-full rounded-full bg-slate-200 overflow-hidden dark:bg-slate-700">
                        <div 
                          className={`h-full ${pwdStrength.color} transition-all duration-300`} 
                          style={{ width: `${(pwdStrength.score / 3) * 100}%` }}
                        />
                      </div>
                      <span className="text-[10px] font-semibold text-[#687385] dark:text-[#94A3B8]">
                        Strength: {pwdStrength.label}
                      </span>
                    </div>
                  )}
                </div>

                {/* Submit CTA */}
                <button
                  type="submit"
                  disabled={isSigningUp}
                  className="w-full flex items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-[#2B6FF3] to-[#1557D6] hover:from-[#1557D6] hover:to-[#0D44B8] text-white py-3 px-4 text-xs font-bold shadow-lg shadow-[#2B6FF3]/25 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 dark:from-[#3B82F6] dark:to-[#1D4ED8]"
                >
                  <span>{isSigningUp ? 'Registering Account...' : 'Create Account & Enter Platform'}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>

              <div className="pt-2 text-center text-xs text-[#687385] dark:text-[#94A3B8]">
                <span>Already registered? </span>
                <button
                  type="button"
                  onClick={() => setActiveTab('signin')}
                  className="font-bold text-[#2B6FF3] hover:underline dark:text-[#60A5FA]"
                >
                  Sign In to Your Account
                </button>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
