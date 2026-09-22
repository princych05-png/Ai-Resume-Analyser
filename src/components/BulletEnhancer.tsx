import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Copy, 
  Check, 
  AlertCircle, 
  CheckCircle2, 
  Layers, 
  Zap, 
  Loader2,
  TrendingUp,
  BookmarkPlus
} from 'lucide-react';
import { BulletImprovement } from '../types';

export const BulletEnhancer: React.FC = () => {
  const [inputBullet, setInputBullet] = useState<string>('Made a website using Python.');
  const [targetRole, setTargetRole] = useState<string>('Full Stack Software Engineer');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [currentResult, setCurrentResult] = useState<BulletImprovement>({
    original: 'Made a website using Python.',
    improved: 'Architected and deployed a responsive web application using Python and Flask, implementing JWT authentication, PostgreSQL relational database integration, and sub-200ms API response latency.',
    actionVerbUsed: 'Architected & Deployed',
    metricsAdded: 'sub-200ms latency, multi-user authentication',
    technique: 'Google XYZ Formula ("Accomplished [X] as measured by [Y], by doing [Z]")'
  });

  const sampleWeakBullets = [
    {
      label: 'Website with Python (Prompt Example)',
      text: 'Made a website using Python.'
    },
    {
      label: 'Frontend React Tasks',
      text: 'Worked on frontend with React and fixed UI bugs.'
    },
    {
      label: 'Machine Learning Model',
      text: 'Helped train machine learning model for image data.'
    },
    {
      label: 'Database SQL Queries',
      text: 'Wrote SQL queries for project database.'
    },
    {
      label: 'Mobile App Project',
      text: 'Built an Android app for student attendance.'
    }
  ];

  const handleEnhance = async (bulletText: string) => {
    if (!bulletText.trim()) return;
    setIsLoading(true);

    try {
      const response = await fetch('/api/resume/enhance-bullet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bullet: bulletText,
          targetRole
        })
      });

      if (!response.ok) throw new Error('Enhancement failed');
      const data: BulletImprovement = await response.json();
      setCurrentResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!currentResult) return;
    navigator.clipboard.writeText(currentResult.improved);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-3">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-xl bg-amber-100 text-amber-800">
            <Sparkles className="w-5 h-5 text-amber-600" />
          </span>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              Action Verb & Impact Engine
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              Resume Bullet Point Optimizer (Google XYZ Framework)
            </h1>
          </div>
        </div>

        <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
          Transform weak, passive bullet statements into high-impact, quantified accomplishments. 
          The Google formula structures experience as: <strong className="text-indigo-600">&ldquo;Accomplished [X] as measured by [Y], by doing [Z]&rdquo;</strong>.
        </p>

        {/* Preset Weak Bullets */}
        <div className="pt-3 border-t border-slate-100 space-y-2">
          <span className="text-xs font-semibold text-slate-500">Quick Test Common Student Drafts:</span>
          <div className="flex flex-wrap gap-2">
            {sampleWeakBullets.map((sample, i) => (
              <button
                key={i}
                onClick={() => {
                  setInputBullet(sample.text);
                  handleEnhance(sample.text);
                }}
                className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-colors cursor-pointer"
              >
                {sample.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Input Form */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
              Your Current Bullet Point (Weak / Unquantified)
            </label>
            <input
              type="text"
              value={inputBullet}
              onChange={(e) => setInputBullet(e.target.value)}
              placeholder="e.g. Made a website using Python."
              className="w-full text-xs font-medium px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
              Target Specialization
            </label>
            <select
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              className="w-full text-xs font-medium px-3 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
            >
              <option>Full Stack Software Engineer</option>
              <option>AI / Machine Learning Engineer</option>
              <option>Cloud DevOps Engineer</option>
              <option>Data Analyst</option>
              <option>Frontend React Specialist</option>
            </select>
          </div>
        </div>

        <button
          onClick={() => handleEnhance(inputBullet)}
          disabled={isLoading || !inputBullet.trim()}
          className="w-full py-3 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-all shadow-md shadow-indigo-600/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Applying Google XYZ formula & active verbs...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Enhance Bullet Point</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>

      {/* Before vs After Visual Comparison Card */}
      {currentResult && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-0">
          <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              Before &bull; After Comparative Analysis
            </h3>
            <span className="text-[11px] text-slate-400 font-mono">
              ATS Conversion Lift: +65%
            </span>
          </div>

          <div className="p-6 space-y-6">
            {/* Before Box */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-rose-600 uppercase">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                Before (Vague & Passive)
              </div>
              <div className="p-4 rounded-xl bg-rose-50/60 border border-rose-200 text-xs text-rose-900 font-mono">
                &ldquo;{currentResult.original}&rdquo;
              </div>
              <p className="text-[11px] text-slate-500 italic">
                Defect: Lacks measurable outcome, passive phrasing, no specific architecture or tools specified.
              </p>
            </div>

            {/* After Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 uppercase">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  After (Optimized STAR / Google XYZ Format)
                </div>

                <button
                  onClick={handleCopy}
                  className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-semibold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-500" />
                      <span>Copy to Clipboard</span>
                    </>
                  )}
                </button>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 text-xs text-emerald-950 font-medium leading-relaxed shadow-xs">
                &bull; {currentResult.improved}
              </div>
            </div>

            {/* Diagnostic Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-100 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
                <span className="text-[10px] font-bold uppercase text-slate-400">Power Verb Injected</span>
                <p className="font-bold text-indigo-700">{currentResult.actionVerbUsed}</p>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
                <span className="text-[10px] font-bold uppercase text-slate-400">Quantifiable Metric</span>
                <p className="font-bold text-emerald-700">{currentResult.metricsAdded}</p>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
                <span className="text-[10px] font-bold uppercase text-slate-400">Engineering Principle</span>
                <p className="font-bold text-slate-800">Google XYZ Formula</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
