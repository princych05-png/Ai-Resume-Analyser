import React from 'react';
import { 
  FileText, 
  BarChart3, 
  Briefcase, 
  Sparkles, 
  History, 
  ShieldCheck, 
  BookOpen, 
  User as UserIcon, 
  UploadCloud, 
  Home
} from 'lucide-react';
import { User } from '../types';

export interface NavbarProps {
  activeTab: 'home' | 'upload' | 'dashboard' | 'match' | 'enhancer' | 'history' | 'admin';
  onSelectTab: (tab: 'home' | 'upload' | 'dashboard' | 'match' | 'enhancer' | 'history' | 'admin') => void;
  currentUser: User | null;
  onOpenDocs: () => void;
  onOpenProfile: () => void;
  onLogout?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  currentUser,
  onOpenDocs,
  onOpenProfile
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur border-b border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Capstone Badge */}
          <div 
            className="flex items-center gap-3 cursor-pointer" 
            onClick={() => onSelectTab('home')}
          >
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-sky-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 text-white font-bold">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base tracking-tight text-white">ResumeAI</span>
                <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  B.Tech Capstone
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">AI Resume Analyzer & Job Matching</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            <button
              onClick={() => onSelectTab('home')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'home'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              Overview
            </button>

            <button
              onClick={() => onSelectTab('upload')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'upload'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <UploadCloud className="w-3.5 h-3.5" />
              Upload Resume
            </button>

            <button
              onClick={() => onSelectTab('dashboard')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'dashboard'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              Analysis Dashboard
            </button>

            <button
              onClick={() => onSelectTab('match')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'match'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              Job Matcher
            </button>

            <button
              onClick={() => onSelectTab('enhancer')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'enhancer'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              Bullet Enhancer
            </button>

            <button
              onClick={() => onSelectTab('history')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'history'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <History className="w-3.5 h-3.5" />
              History
            </button>

            <button
              onClick={() => onSelectTab('admin')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'admin'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'text-rose-300 hover:text-white hover:bg-rose-950/40 border border-rose-800/40'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Admin
            </button>
          </nav>

          {/* Right Action: Documentation & User Profile */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenDocs}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/25 transition-all flex items-center gap-1.5 cursor-pointer"
              title="View 22-Chapter Project Report & Viva Guide"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Project Docs</span>
              <span className="text-[10px] px-1 rounded bg-emerald-500/30">22 Ch</span>
            </button>

            {currentUser && (
              <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
                <button
                  onClick={onOpenProfile}
                  className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 transition-colors cursor-pointer"
                  title="View / Edit Profile"
                >
                  <div className="w-6 h-6 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold text-[11px]">
                    {currentUser.name.charAt(0)}
                  </div>
                  <span className="hidden md:inline font-medium truncate max-w-[110px]">
                    {currentUser.name}
                  </span>
                  {currentUser.role === 'admin' && (
                    <span className="text-[10px] bg-rose-500/20 text-rose-300 px-1.5 py-0.5 rounded border border-rose-500/30">
                      Admin
                    </span>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Tab Bar */}
      <div className="lg:hidden border-t border-slate-800 bg-slate-950 px-2 py-1.5 flex justify-around text-[10px]">
        <button
          onClick={() => onSelectTab('home')}
          className={`px-2 py-1 rounded flex flex-col items-center gap-0.5 ${
            activeTab === 'home' ? 'text-indigo-400 font-semibold' : 'text-slate-400'
          }`}
        >
          <Home className="w-3.5 h-3.5" />
          <span>Home</span>
        </button>
        <button
          onClick={() => onSelectTab('upload')}
          className={`px-2 py-1 rounded flex flex-col items-center gap-0.5 ${
            activeTab === 'upload' ? 'text-indigo-400 font-semibold' : 'text-slate-400'
          }`}
        >
          <UploadCloud className="w-3.5 h-3.5" />
          <span>Upload</span>
        </button>
        <button
          onClick={() => onSelectTab('dashboard')}
          className={`px-2 py-1 rounded flex flex-col items-center gap-0.5 ${
            activeTab === 'dashboard' ? 'text-indigo-400 font-semibold' : 'text-slate-400'
          }`}
        >
          <BarChart3 className="w-3.5 h-3.5" />
          <span>Dashboard</span>
        </button>
        <button
          onClick={() => onSelectTab('match')}
          className={`px-2 py-1 rounded flex flex-col items-center gap-0.5 ${
            activeTab === 'match' ? 'text-indigo-400 font-semibold' : 'text-slate-400'
          }`}
        >
          <Briefcase className="w-3.5 h-3.5" />
          <span>Match</span>
        </button>
        <button
          onClick={() => onSelectTab('enhancer')}
          className={`px-2 py-1 rounded flex flex-col items-center gap-0.5 ${
            activeTab === 'enhancer' ? 'text-indigo-400 font-semibold' : 'text-slate-400'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Enhance</span>
        </button>
        <button
          onClick={() => onSelectTab('admin')}
          className={`px-2 py-1 rounded flex flex-col items-center gap-0.5 ${
            activeTab === 'admin' ? 'text-rose-400 font-semibold' : 'text-slate-400'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Admin</span>
        </button>
      </div>
    </header>
  );
};
