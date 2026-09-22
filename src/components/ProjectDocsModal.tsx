import React, { useState } from 'react';
import { 
  X, 
  BookOpen, 
  Search, 
  Download, 
  Copy, 
  Check, 
  FileCode2, 
  Printer, 
  ExternalLink,
  ChevronRight,
  Database,
  Award,
  Layers,
  HelpCircle
} from 'lucide-react';
import { 
  PROJECT_DOCS, 
  SQL_SCHEMA_STRING, 
  REQUIREMENTS_TXT_STRING,
  DocChapter 
} from '../data/projectDocumentation';

interface ProjectDocsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectDocsModal: React.FC<ProjectDocsModalProps> = ({ isOpen, onClose }) => {
  const [selectedChapterId, setSelectedChapterId] = useState<string>('abstract');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedSQL, setCopiedSQL] = useState<boolean>(false);
  const [copiedReqs, setCopiedReqs] = useState<boolean>(false);

  if (!isOpen) return null;

  const categories = ['All', 'Overview', 'Analysis & Design', 'Implementation', 'Testing & Results', 'Defense & Viva'];

  const filteredChapters = PROJECT_DOCS.filter(ch => {
    const matchesCat = selectedCategory === 'All' || ch.category === selectedCategory;
    const matchesSearch = ch.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          ch.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const currentChapter = PROJECT_DOCS.find(ch => ch.id === selectedChapterId) || PROJECT_DOCS[0];

  const handleDownloadFile = (filename: string, content: string) => {
    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleCopySQL = () => {
    navigator.clipboard.writeText(SQL_SCHEMA_STRING);
    setCopiedSQL(true);
    setTimeout(() => setCopiedSQL(false), 2000);
  };

  const handleCopyReqs = () => {
    navigator.clipboard.writeText(REQUIREMENTS_TXT_STRING);
    setCopiedReqs(true);
    setTimeout(() => setCopiedReqs(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      <div className="bg-white w-full max-w-6xl h-[92vh] rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Top Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white">Final-Year Capstone Project Documentation</h2>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-semibold">
                  22 Required Chapters Complete
                </span>
              </div>
              <p className="text-xs text-slate-400">Department of Computer Science &bull; Comprehensive Engineering Report & Viva Guide</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Print full documentation report"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print Document</span>
            </button>

            <button
              onClick={() => handleDownloadFile('schema.sql', SQL_SCHEMA_STRING)}
              className="px-3 py-1.5 rounded-lg bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 border border-indigo-500/30 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Download schema.sql"
            >
              <Database className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">schema.sql</span>
            </button>

            <button
              onClick={() => handleDownloadFile('requirements.txt', REQUIREMENTS_TXT_STRING)}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Download requirements.txt"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">requirements.txt</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body: Sidebar + Main Viewer */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Sidebar: Chapter List (320px) */}
          <div className="w-80 border-r border-slate-200 bg-slate-50/70 flex flex-col overflow-hidden shrink-0">
            {/* Search & Filter */}
            <div className="p-3.5 space-y-2 border-b border-slate-200 bg-white">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search chapters or viva..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-1 overflow-x-auto pb-0.5 text-[10px]">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-2 py-1 rounded-md font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Chapter Items List */}
            <div className="flex-1 overflow-y-auto p-2 space-y-1 divide-y divide-slate-100">
              {filteredChapters.map((ch) => (
                <button
                  key={ch.id}
                  onClick={() => setSelectedChapterId(ch.id)}
                  className={`w-full p-2.5 rounded-xl text-left transition-all flex items-start justify-between gap-2 cursor-pointer ${
                    selectedChapterId === ch.id
                      ? 'bg-indigo-50 text-indigo-900 border border-indigo-200 shadow-xs'
                      : 'hover:bg-slate-100/70 text-slate-700'
                  }`}
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-bold font-mono px-1.5 py-0.2 rounded bg-slate-200/80 text-slate-700">
                        Ch {ch.number}
                      </span>
                      <span className="text-xs font-bold truncate max-w-[170px]">{ch.title}</span>
                    </div>
                    <p className="text-[10px] text-slate-500 line-clamp-1">{ch.summary}</p>
                  </div>
                  <ChevronRight className={`w-3.5 h-3.5 shrink-0 mt-1 ${selectedChapterId === ch.id ? 'text-indigo-600' : 'text-slate-300'}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Right Main Viewer */}
          <div className="flex-1 overflow-y-auto p-6 md:p-10 bg-white">
            <div className="max-w-3xl mx-auto space-y-8">
              {/* Chapter Header */}
              <div className="space-y-2 border-b border-slate-100 pb-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                    Chapter {currentChapter.number} &bull; {currentChapter.category}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">Academic Report v1.0</span>
                </div>
                <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">
                  {currentChapter.title}
                </h1>
                <p className="text-xs text-slate-500 italic">{currentChapter.summary}</p>
              </div>

              {/* Chapter Body Markdown Rendering */}
              <div className="prose prose-slate max-w-none text-xs md:text-sm text-slate-700 leading-relaxed space-y-4">
                <pre className="whitespace-pre-wrap font-sans text-xs md:text-sm text-slate-800 leading-relaxed bg-transparent p-0 border-0">
                  {currentChapter.content}
                </pre>
              </div>

              {/* Special Chapter Action Bars */}
              {currentChapter.id === 'database-design' && (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Relational Database DDL Script</h4>
                    <p className="text-[11px] text-slate-500">PostgreSQL / MySQL compatible table definitions with foreign keys</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopySQL}
                      className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-700 text-xs font-semibold flex items-center gap-1.5 hover:bg-slate-50 cursor-pointer"
                    >
                      {copiedSQL ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedSQL ? 'Copied' : 'Copy SQL'}</span>
                    </button>
                    <button
                      onClick={() => handleDownloadFile('schema.sql', SQL_SCHEMA_STRING)}
                      className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-semibold flex items-center gap-1.5 hover:bg-indigo-500 cursor-pointer"
                    >
                      <Download className="w-3 h-3" />
                      <span>Download schema.sql</span>
                    </button>
                  </div>
                </div>
              )}

              {currentChapter.id === 'system-requirements' && (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Download Requirements Specification</h4>
                    <p className="text-[11px] text-slate-500">Node.js and Python requirements.txt for external project examiners</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopyReqs}
                      className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-700 text-xs font-semibold flex items-center gap-1.5 hover:bg-slate-50 cursor-pointer"
                    >
                      {copiedReqs ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedReqs ? 'Copied' : 'Copy'}</span>
                    </button>
                    <button
                      onClick={() => handleDownloadFile('requirements.txt', REQUIREMENTS_TXT_STRING)}
                      className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-semibold flex items-center gap-1.5 hover:bg-indigo-500 cursor-pointer"
                    >
                      <Download className="w-3 h-3" />
                      <span>requirements.txt</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Navigation between chapters */}
              <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-xs">
                {currentChapter.number > 1 ? (
                  <button
                    onClick={() => {
                      const prev = PROJECT_DOCS.find(c => c.number === currentChapter.number - 1);
                      if (prev) setSelectedChapterId(prev.id);
                    }}
                    className="font-semibold text-slate-600 hover:text-indigo-600 cursor-pointer"
                  >
                    &larr; Chapter {currentChapter.number - 1}
                  </button>
                ) : <div />}

                {currentChapter.number < PROJECT_DOCS.length ? (
                  <button
                    onClick={() => {
                      const next = PROJECT_DOCS.find(c => c.number === currentChapter.number + 1);
                      if (next) setSelectedChapterId(next.id);
                    }}
                    className="font-semibold text-indigo-600 hover:text-indigo-700 cursor-pointer"
                  >
                    Chapter {currentChapter.number + 1} &rarr;
                  </button>
                ) : <div />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
