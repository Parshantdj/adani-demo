import React, { useState } from 'react';
import { Disc, ShieldCheck, ArrowRight, Mail, Lock, Loader2, AlertCircle } from 'lucide-react';
import LOGO from "../logo.png"

interface LoginProps {
  onLogin: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('isafetyrobo@binarysemantics.com');
  const [password, setPassword] = useState('test@123');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      if (email && password) {
        setIsLoading(false);
        onLogin();
      } else {
        setIsLoading(false);
        setError('Please enter valid credentials to proceed.');
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full flex font-sans bg-slate-50 selection:bg-primary/30">
      {/* Left Panel - Brand & Visuals */}
      <div className="hidden lg:flex w-7/12 bg-secondary relative overflow-hidden flex-col justify-between p-16 text-white border-r border-slate-800">

        {/* Dynamic Background Effects */}
        <div className="absolute inset-0">
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)]"></div>

          {/* Glowing Orbs */}
          <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] animate-[pulse_8s_infinite]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px] animate-[pulse_10s_infinite_reverse]"></div>
        </div>

        {/* Brand Header */}
        <div className="relative z-10 flex items-center ">
          <div className="w-10">
            <img src={LOGO} alt="Logo" className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="text-[12px] uppercase tracking-[0.2em]">Binary Semantics</p>
            </div>
            <h1 className="text-2xl font-semibold tracking-tight text-white">iSafetyRobo</h1>

          </div>
        </div>

        {/* Video Display Section */}
        <div className="relative z-10 flex-1 flex flex-col justify-center">
          <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border border-slate-700/50 bg-black/50 backdrop-blur-sm group">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 pointer-events-none"></div>

            {/* Status Overlay */}
            <div className="absolute top-4 left-4 z-20 flex gap-2">
              <span className="px-2 py-1 bg-black/60 backdrop-blur rounded text-[10px] font-mono text-red-400 font-semibold border border-red-500/30 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span> LIVE
              </span>
              <span className="px-2 py-1 bg-black/60 backdrop-blur rounded text-[10px] font-mono text-primary-400 font-semibold border border-primary/30 flex items-center gap-1.5">
                AI VISION
              </span>
            </div>

            <video
              src="https://vision-module-bsl.s3.amazonaws.com/videos/ppe_kit_detection/bbd81933-e1f7-4278-bbcd-44b5dfd18cea.mp4"
              className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-[20s]"
              autoPlay
              loop
              muted
              playsInline
            />

            <div className="absolute bottom-4 left-4 z-20">
              <p className="text-[10px] text-slate-300 font-mono tracking-widest uppercase">Analyzing Frame: PPE Compliance</p>
            </div>
          </div>
        </div>

        {/* Brand Label Placeholder (Footer Removed) */}
        <div className="relative z-10 h-10"></div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-5/12 bg-white flex items-center justify-center p-8 relative">
        <div className="w-full max-w-[420px] animate-in fade-in slide-in-from-right-8 duration-700">
          <div className="mb-10">
            <h3 className="text-3xl font-semibold text-slate-900 mb-3">Welcome to Unified Safety Platform</h3>
            <p className="text-slate-500">Enter your credentials to access the safety command center.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-3 text-red-600 text-sm animate-in slide-in-from-top-2">
                <AlertCircle size={20} className="shrink-0 mt-0.5" />
                <span className="font-medium">{error}</span>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-900 ml-1">WORK EMAIL</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all shadow-sm"
                  placeholder="name@company.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-semibold text-slate-900">PASSWORD</label>
                <a href="#" className="text-xs font-semibold text-primary hover:text-primary-700">Forgot password?</a>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={20} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all shadow-sm"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-white py-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:bg-slate-800 hover:shadow-xl hover:shadow-slate-900/20 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed group relative overflow-hidden"
            >
              {isLoading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <>
                  <span className="relative z-10">Sign In to Dashboard</span>
                  <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                </>
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1s_infinite]"></div>
            </button>
          </form>

          <div className="mt-8 flex items-center gap-4 text-xs text-slate-400 font-medium before:h-px before:flex-1 before:bg-slate-100 after:h-px after:flex-1 after:bg-slate-100">
            OR CONTINUE WITH
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all text-sm font-semibold text-slate-600">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Google
            </button>
            <button className="flex items-center justify-center gap-2 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all text-sm font-semibold text-slate-600">
              <ShieldCheck size={18} />
              SSO
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};