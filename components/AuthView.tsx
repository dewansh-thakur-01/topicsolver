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
  Check,
  Shield,
  Fingerprint,
  Activity
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
    if (len === 0) return { score: 0, label: '', color: 'bg-slate-700' };
    if (len < 6) return { score: 1, label: 'Weak (min 6 chars)', color: 'bg-rose-500' };
    if (len < 9) return { score: 2, label: 'Moderate strength', color: 'bg-amber-500' };
    return { score: 3, label: 'Cyber-Grade Strong', color: 'bg-cyan-400' };
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
      className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 overflow-hidden bg-[#030712] selection:bg-[#00E5FF] selection:text-black card-3d-perspective py-12 text-slate-100"
      style={{
        backgroundColor: '#040916' // Cyber Security Deep Navy Blue
      }}
    >
      
      {/* ================= CYBER SECURITY BLUE 3D BACKGROUND & LASER GRID ================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
        
        {/* Cyber Security Radiant Glow Canvases */}
        <div className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full bg-radial from-[#0055FF]/30 via-[#002288]/15 to-transparent blur-3xl animate-pulse [animation-duration:8s]" />
        <div className="absolute -bottom-40 -right-40 w-[750px] h-[750px] rounded-full bg-radial from-[#00E5FF]/25 via-[#0044CC]/15 to-transparent blur-3xl animate-pulse [animation-duration:10s]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-radial from-[#1E40AF]/20 to-transparent blur-3xl" />
        
        {/* 3D Rotating Cyber Security Holographic Ring Base */}
        <div 
          className="absolute w-[650px] sm:w-[950px] h-[650px] sm:h-[950px] rounded-full border border-[#00E5FF]/30 bg-gradient-to-tr from-[#0033AA]/25 via-[#0066FF]/15 to-[#00E5FF]/20 shadow-2xl backdrop-blur-xs"
          style={{
            transform: `rotateX(72deg) rotateY(${tilt.x * 0.4}deg) rotateZ(0deg)`,
            boxShadow: '0 0 120px 20px rgba(0, 112, 243, 0.35), inset 0 0 80px rgba(0, 229, 255, 0.2)'
          }}
        >
          {/* Concentric Cyber Orbit Rings */}
          <div className="absolute inset-6 rounded-full border-2 border-[#00E5FF]/40 border-dashed animate-spin [animation-duration:50s]" />
          <div className="absolute inset-16 rounded-full border border-[#3B82F6]/60 animate-spin [animation-duration:35s] [animation-direction:reverse]" />
          <div className="absolute inset-28 rounded-full border border-cyan-300/40 border-dotted animate-spin [animation-duration:20s]" />
          <div className="absolute inset-44 rounded-full border border-[#1E3A8A]" />
          <div className="absolute inset-0 m-auto w-36 h-36 rounded-full bg-[#00E5FF]/30 blur-2xl animate-pulse" />
        </div>

        {/* Cyber Security Hex & Matrix Grid Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.14]" 
          style={{
            backgroundImage: `linear-gradient(to right, #0070F3 1px, transparent 1px), linear-gradient(to bottom, #00E5FF 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />

        {/* Floating Cyber Defense Geometric Shards */}
        <div 
          className="absolute top-24 left-[15%] w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#0070F3]/30 to-[#00E5FF]/30 border border-[#00E5FF]/40 backdrop-blur-md rotate-12 shadow-[0_0_20px_rgba(0,229,255,0.3)]"
          style={{ animation: 'float3d 6.5s ease-in-out infinite alternate' }}
        />
        <div 
          className="absolute bottom-24 right-[15%] w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#1D4ED8]/30 to-[#38BDF8]/30 border border-[#38BDF8]/40 backdrop-blur-md -rotate-12 shadow-[0_0_20px_rgba(56,189,248,0.3)]"
          style={{ animation: 'float3d 7.5s ease-in-out infinite alternate', animationDelay: '1.5s' }}
        />
      </div>

      {/* ================= FLOATING CYBERSECURITY SATELLITE WIDGETS ================= */}
      <div className="hidden xl:block pointer-events-none">
        
        {/* Top Left: Zero-Trust Security Sentinel */}
        <div 
          className="absolute top-16 left-12 z-10 flex items-center space-x-3 px-4 py-2.5 rounded-2xl bg-[#091326]/90 border border-[#1E3A8A] shadow-[0_10px_30px_rgba(0,112,243,0.3)] text-xs font-extrabold text-white card-3d-tilt backdrop-blur-xl"
          style={{ 
            animation: 'float3d 5.5s ease-in-out infinite alternate',
            transform: `translateZ(60px) rotateY(${tilt.x * 0.8}deg)`
          }}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-400 text-base shadow-[0_0_15px_rgba(0,229,255,0.4)]">
            <Shield className="h-4 w-4 text-cyan-400" />
          </span>
          <div>
            <div className="font-bold text-cyan-300">Cyber Sentinel Guard</div>
            <div className="text-[10px] text-slate-400 font-normal">AES-256 Auth Encryption</div>
          </div>
        </div>

        {/* Top Right: Real-time Threat Defense */}
        <div 
          className="absolute top-16 right-12 z-10 flex items-center space-x-3 px-4 py-2.5 rounded-2xl bg-[#091326]/90 border border-[#1E3A8A] shadow-[0_10px_30px_rgba(0,112,243,0.3)] text-xs font-extrabold text-white card-3d-tilt backdrop-blur-xl"
          style={{ 
            animation: 'float3d 6.5s ease-in-out infinite alternate', 
            animationDelay: '1s',
            transform: `translateZ(65px) rotateY(${tilt.x * 0.8}deg)`
          }}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-600/20 text-blue-400 text-base shadow-[0_0_15px_rgba(59,130,246,0.4)]">
            <Fingerprint className="h-4 w-4 text-blue-400" />
          </span>
          <div>
            <div className="font-bold text-blue-300">Identity Security</div>
            <div className="text-[10px] text-slate-400 font-normal">Session Handshake Active</div>
          </div>
        </div>

        {/* Middle Left: Code Floating Shard */}
        <div 
          className="absolute top-1/2 left-8 -translate-y-1/2 z-10 p-3.5 rounded-2xl bg-[#091326]/90 border border-cyan-500/30 shadow-[0_0_25px_rgba(0,229,255,0.2)] font-mono text-[11px] text-cyan-300 card-3d-tilt backdrop-blur-xl"
          style={{ 
            animation: 'float3d 7s ease-in-out infinite alternate', 
            animationDelay: '2.5s',
            transform: `translateZ(50px) rotateY(${tilt.x * 0.5}deg)`
          }}
        >
          <div className="text-cyan-400 font-bold flex items-center gap-1.5">
            <Activity className="h-3.5 w-3.5 text-cyan-400 animate-pulse" />
            <span>Encrypted Tunnel: 100%</span>
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">TLS 1.3 Strict Transport</div>
        </div>

        {/* Middle Right: CodeMentor AI Assistant */}
        <div 
          className="absolute top-1/2 right-8 -translate-y-1/2 z-10 flex items-center space-x-3 px-4 py-2.5 rounded-2xl bg-[#091326]/90 border border-[#2563EB]/40 shadow-[0_0_25px_rgba(37,99,235,0.25)] text-xs font-extrabold text-white card-3d-tilt backdrop-blur-xl"
          style={{ 
            animation: 'float3d 5.8s ease-in-out infinite alternate', 
            animationDelay: '1.2s',
            transform: `translateZ(70px) rotateY(${tilt.x * 0.8}deg)`
          }}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-500/20 text-cyan-400 shadow-xs">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <div className="font-bold flex items-center gap-1.5 text-cyan-300">
              <span>CodeMentor AI</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">Active</span>
            </div>
            <div className="text-[10px] text-slate-400 font-normal">Progressive Clue Engine</div>
          </div>
        </div>

        {/* Bottom Left: Multi-Subject Vault */}
        <div 
          className="absolute bottom-14 left-14 z-10 flex items-center space-x-3 px-4 py-2.5 rounded-2xl bg-[#091326]/90 border border-[#1E3A8A] shadow-[0_10px_30px_rgba(0,112,243,0.3)] text-xs font-extrabold text-white card-3d-tilt backdrop-blur-xl"
          style={{ 
            animation: 'float3d 6s ease-in-out infinite alternate', 
            animationDelay: '2s',
            transform: `translateZ(55px) rotateY(${tilt.x * 0.8}deg)`
          }}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-400 text-base shadow-xs">⚡</span>
          <div>
            <div className="font-bold text-cyan-300">142 Adaptive Levels</div>
            <div className="text-[10px] text-slate-400 font-normal">Java • Python • SQL • DSA • C</div>
          </div>
        </div>

        {/* Bottom Right: One-Password Gate */}
        <div 
          className="absolute bottom-14 right-14 z-10 flex items-center space-x-3 px-4 py-2.5 rounded-2xl bg-[#091326]/90 border border-[#1E3A8A] shadow-[0_10px_30px_rgba(0,112,243,0.3)] text-xs font-extrabold text-white card-3d-tilt backdrop-blur-xl"
          style={{ 
            animation: 'float3d 5s ease-in-out infinite alternate', 
            animationDelay: '0.8s',
            transform: `translateZ(65px) rotateY(${tilt.x * 0.8}deg)`
          }}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-400 shadow-xs">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <div className="font-bold text-cyan-300">Unified Access</div>
            <div className="text-[10px] text-slate-400 font-normal">One Email = One Password</div>
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
          
          {/* Pure Floating Sticker of Fox with White Devil & Radiant Electric Blue Aura (No Box) */}
          <div 
            className="relative flex items-center justify-center transition-all duration-300 hover:scale-105 group"
          >
            {/* Multi-Layer Radiant Cyber Security Blue Aura */}
            <div className="absolute inset-0 -m-6 rounded-full bg-radial from-[#00E5FF]/45 via-[#0055FF]/35 to-transparent blur-3xl pointer-events-none group-hover:scale-115 transition-transform duration-500" />
            
            {/* Fox Mascot Sticker */}
            <div className="relative w-72 sm:w-84 h-24 sm:h-28 flex items-center justify-center">
              <Image
                src="/images/topic_solver_logo.png"
                alt="TOPIC SOLVER Cyber Security Sticker"
                fill
                priority
                className="object-contain transition-all duration-300 group-hover:scale-105"
                style={{
                  filter: 'drop-shadow(0 0 16px rgba(0, 229, 255, 0.95)) drop-shadow(0 0 35px rgba(0, 112, 243, 0.85)) drop-shadow(0 0 70px rgba(0, 229, 255, 0.5))'
                }}
              />
            </div>
          </div>

          {/* Platform Title & Badge */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-center space-x-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-3d-hero">
                TOPIC <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300 drop-shadow-[0_0_20px_rgba(0,229,255,0.6)]">SOLVER</span>
              </h1>
              <span className="inline-flex items-center gap-1 rounded-full bg-cyan-500/15 px-2.5 py-0.5 text-[10px] font-bold text-cyan-300 border border-cyan-400/35 shadow-[0_0_10px_rgba(0,229,255,0.3)]">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
                Cyber Auth
              </span>
            </div>
            <p className="text-xs font-medium text-slate-300 max-w-xs mx-auto">
              Your secure, personalized adaptive pathway to Java, Python, SQL, DSA, and C.
            </p>
          </div>

        </div>

        {/* ================= CYBER SECURITY GLASS CARD CONTAINER ================= */}
        <div 
          className="rounded-3xl border border-[#1E3A8A]/80 bg-[#081226]/90 backdrop-blur-2xl p-7 sm:p-8 space-y-6 shadow-2xl"
          style={{
            boxShadow: '0 25px 80px -15px rgba(0, 112, 243, 0.35), 0 0 0 1px rgba(0, 229, 255, 0.2), inset 0 0 40px rgba(0, 112, 243, 0.1)'
          }}
        >
          
          {/* Auth Tab Switcher (Sign In vs Sign Up) */}
          <div className="grid grid-cols-2 p-1.5 rounded-2xl bg-[#040A1A] border border-[#1E3A8A]">
            <button
              onClick={() => setActiveTab('signin')}
              className={`flex items-center justify-center space-x-2 py-2.5 text-xs font-bold rounded-xl transition-all ${
                activeTab === 'signin'
                  ? 'bg-gradient-to-r from-[#0055FF] to-[#0099FF] text-white shadow-[0_0_20px_rgba(0,112,243,0.6)] border border-cyan-400/40'
                  : 'text-slate-400 hover:text-cyan-300'
              }`}
            >
              <LogIn className="h-3.5 w-3.5" />
              <span>Sign In</span>
            </button>
            <button
              onClick={() => setActiveTab('signup')}
              className={`flex items-center justify-center space-x-2 py-2.5 text-xs font-bold rounded-xl transition-all ${
                activeTab === 'signup'
                  ? 'bg-gradient-to-r from-[#0055FF] to-[#0099FF] text-white shadow-[0_0_20px_rgba(0,112,243,0.6)] border border-cyan-400/40'
                  : 'text-slate-400 hover:text-cyan-300'
              }`}
            >
              <UserPlus className="h-3.5 w-3.5" />
              <span>Sign Up</span>
            </button>
          </div>

          {/* ================= TAB 1: SIGN IN FORM ================= */}
          {activeTab === 'signin' && (
            <form onSubmit={handleSignInSubmit} className="space-y-4 animate-in fade-in duration-200">
              
              {/* Email Address */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-cyan-400" />
                  <input
                    type="email"
                    required
                    placeholder="student@example.com"
                    value={signInEmail}
                    onChange={(e) => setSignInEmail(e.target.value)}
                    className="w-full rounded-xl bg-[#040A1A] border border-[#1E3A8A] pl-10 pr-4 py-3 text-xs text-white placeholder-slate-500 focus:border-[#00E5FF] focus:ring-2 focus:ring-[#00E5FF]/30 focus:outline-none transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider">
                    Password
                  </label>
                  <span className="text-[11px] text-cyan-400 font-mono">Single Password</span>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-cyan-400" />
                  <input
                    type={showSignInPwd ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    value={signInPassword}
                    onChange={(e) => setSignInPassword(e.target.value)}
                    className="w-full rounded-xl bg-[#040A1A] border border-[#1E3A8A] pl-10 pr-10 py-3 text-xs text-white placeholder-slate-500 focus:border-[#00E5FF] focus:ring-2 focus:ring-[#00E5FF]/30 focus:outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowSignInPwd(!showSignInPwd)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-300"
                  >
                    {showSignInPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSigningIn}
                className="w-full mt-2 flex items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-[#0055FF] via-[#0070F3] to-[#00E5FF] hover:from-[#0044DD] hover:to-[#00D0EE] py-3.5 text-xs font-extrabold text-white shadow-[0_0_25px_rgba(0,112,243,0.5)] transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 cursor-pointer"
              >
                {isSigningIn ? (
                  <>
                    <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                    <span>Verifying Credentials...</span>
                  </>
                ) : (
                  <>
                    <span>Enter TOPIC SOLVER</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>

              {/* Single Account Sentinel Notice */}
              <div className="rounded-xl bg-[#040A1A]/80 border border-[#1E3A8A]/60 p-3 text-[11px] text-slate-300 flex items-start space-x-2.5">
                <ShieldCheck className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <b>Single Account Security:</b> One email = one master password. New users can switch to <b>Sign Up</b> to create an account.
                </p>
              </div>

            </form>
          )}

          {/* ================= TAB 2: SIGN UP FORM ================= */}
          {activeTab === 'signup' && (
            <form onSubmit={handleSignUpSubmit} className="space-y-4 animate-in fade-in duration-200">
              
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-cyan-400" />
                  <input
                    type="text"
                    required
                    placeholder="Alex Chen"
                    value={signUpName}
                    onChange={(e) => setSignUpName(e.target.value)}
                    className="w-full rounded-xl bg-[#040A1A] border border-[#1E3A8A] pl-10 pr-4 py-3 text-xs text-white placeholder-slate-500 focus:border-[#00E5FF] focus:ring-2 focus:ring-[#00E5FF]/30 focus:outline-none transition-all"
                  />
                </div>
              </div>

              {/* Email Address */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-cyan-400" />
                  <input
                    type="email"
                    required
                    placeholder="student@example.com"
                    value={signUpEmail}
                    onChange={(e) => setSignUpEmail(e.target.value)}
                    className="w-full rounded-xl bg-[#040A1A] border border-[#1E3A8A] pl-10 pr-4 py-3 text-xs text-white placeholder-slate-500 focus:border-[#00E5FF] focus:ring-2 focus:ring-[#00E5FF]/30 focus:outline-none transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider">
                  Create Master Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-cyan-400" />
                  <input
                    type={showSignUpPwd ? 'text' : 'password'}
                    required
                    placeholder="At least 6 characters"
                    value={signUpPassword}
                    onChange={(e) => setSignUpPassword(e.target.value)}
                    className="w-full rounded-xl bg-[#040A1A] border border-[#1E3A8A] pl-10 pr-10 py-3 text-xs text-white placeholder-slate-500 focus:border-[#00E5FF] focus:ring-2 focus:ring-[#00E5FF]/30 focus:outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowSignUpPwd(!showSignUpPwd)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-300"
                  >
                    {showSignUpPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>

                {/* Password Strength Indicator */}
                {signUpPassword.length > 0 && (
                  <div className="space-y-1 pt-1">
                    <div className="flex items-center justify-between text-[10px] font-mono">
                      <span className="text-slate-400">Strength:</span>
                      <span className="font-bold text-cyan-300">{pwdStrength.label}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1.5 h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                      <div className={`h-full ${pwdStrength.score >= 1 ? pwdStrength.color : 'bg-transparent'}`} />
                      <div className={`h-full ${pwdStrength.score >= 2 ? pwdStrength.color : 'bg-transparent'}`} />
                      <div className={`h-full ${pwdStrength.score >= 3 ? pwdStrength.color : 'bg-transparent'}`} />
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSigningUp}
                className="w-full mt-2 flex items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-[#0055FF] via-[#0070F3] to-[#00E5FF] hover:from-[#0044DD] hover:to-[#00D0EE] py-3.5 text-xs font-extrabold text-white shadow-[0_0_25px_rgba(0,112,243,0.5)] transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 cursor-pointer"
              >
                {isSigningUp ? (
                  <>
                    <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                    <span>Creating Cyber Profile...</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="h-4 w-4" />
                    <span>Create Account & Start Learning</span>
                  </>
                )}
              </button>

              {/* Single Account Security Note */}
              <div className="rounded-xl bg-[#040A1A]/80 border border-[#1E3A8A]/60 p-3 text-[11px] text-slate-300 flex items-start space-x-2.5">
                <ShieldCheck className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  Your progress across all 142 lessons, quizzes, and CodeMentor sessions is securely encrypted.
                </p>
              </div>

            </form>
          )}

        </div>

      </div>

    </div>
  );
};
