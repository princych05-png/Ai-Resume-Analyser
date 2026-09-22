import React, { useState, useEffect } from 'react';
import { 
  Briefcase, 
  Target, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  ArrowRight, 
  Loader2, 
  Layers, 
  Code, 
  Building2,
  BookOpen,
  ChevronRight
} from 'lucide-react';
import { ResumeAnalysisResult, JobDescriptionTemplate, JobMatchResult } from '../types';

interface JobMatcherProps {
  analysis: ResumeAnalysisResult;
  onNavigateToEnhancer: () => void;
}

export const JobMatcher: React.FC<JobMatcherProps> = ({ analysis, onNavigateToEnhancer }) => {
  const [jobTemplates, setJobTemplates] = useState<JobDescriptionTemplate[]>([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('jd-fullstack');
  const [customTitle, setCustomTitle] = useState<string>('Full Stack Developer');
  const [customDescription, setCustomDescription] = useState<string>('');
  const [isCustomMode, setIsCustomMode] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [matchResult, setMatchResult] = useState<JobMatchResult | null>(null);

  // Fetch job templates on mount
  useEffect(() => {
    fetch('/api/jobs')
      .then(res => res.json())
      .then((data: JobDescriptionTemplate[]) => {
        setJobTemplates(data);
        if (data.length > 0) {
          const first = data[0];
          setSelectedTemplateId(first.id);
          setCustomTitle(first.title);
          setCustomDescription(first.description);
          // Run initial match
          executeMatch(first.description, first.requiredSkills, first.title);
        }
      })
      .catch(err => console.error('Failed to load job templates', err));
  }, []);

  const handleSelectTemplate = (template: JobDescriptionTemplate) => {
    setSelectedTemplateId(template.id);
    setIsCustomMode(false);
    setCustomTitle(template.title);
    setCustomDescription(template.description);
    executeMatch(template.description, template.requiredSkills, template.title);
  };

  const executeMatch = async (jdText: string, requiredSkills: string[] = [], title?: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/resume/match-jd', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resumeText: analysis.rawText,
          resumeSkills: analysis.skills,
          jdText,
          requiredSkills,
          jobTitle: title || customTitle
        })
      });

      if (!response.ok) throw new Error('Job match calculation failed');
      const result: JobMatchResult = await response.json();
      setMatchResult(result);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCustomMatch = () => {
    if (!customDescription.trim()) return;
    executeMatch(customDescription, [], customTitle);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              Vector Space Matching Engine
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Job Description Alignment Studio
            </h1>
            <p className="text-xs text-slate-600 mt-1">
              Comparing candidate <strong className="text-slate-800">{analysis.contact.name}</strong> against role requirements using TF-IDF term frequency and Cosine Similarity.
            </p>
          </div>
        </div>

        {/* Job Template Selector Chips */}
        <div className="pt-3 border-t border-slate-100 flex items-center gap-2 overflow-x-auto pb-1">
          <span className="text-xs font-semibold text-slate-500 whitespace-nowrap">Target Roles:</span>
          {jobTemplates.map((template) => (
            <button
              key={template.id}
              onClick={() => handleSelectTemplate(template)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                !isCustomMode && selectedTemplateId === template.id
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {template.title}
            </button>
          ))}
          <button
            onClick={() => {
              setIsCustomMode(true);
              setCustomTitle('Custom Position Title');
              setCustomDescription('');
              setMatchResult(null);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              isCustomMode
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            + Paste Custom JD
          </button>
        </div>
      </div>

      {/* Main Matching Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Job Description Input / Details (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-indigo-600" />
                Job Description Parameters
              </h3>
              {isCustomMode && (
                <span className="text-[10px] uppercase font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                  Custom Mode
                </span>
              )}
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">
                Job Title
              </label>
              <input
                type="text"
                value={customTitle}
                disabled={!isCustomMode}
                onChange={(e) => setCustomTitle(e.target.value)}
                className="w-full text-xs font-semibold px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none disabled:bg-slate-50"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">
                Job Description Text & Requirements
              </label>
              <textarea
                rows={10}
                value={customDescription}
                disabled={!isCustomMode}
                onChange={(e) => setCustomDescription(e.target.value)}
                placeholder="Paste the full job description requirements, responsibilities, and qualifications..."
                className="w-full text-xs font-mono p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none disabled:bg-slate-50 leading-relaxed"
              />
            </div>

            {isCustomMode && (
              <button
                onClick={handleCustomMatch}
                disabled={isLoading || !customDescription.trim()}
                className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Calculating vector alignment...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Calculate Cosine Job Match</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Right Column: Match Analysis & Competency Breakdown (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {isLoading ? (
            <div className="bg-white rounded-2xl p-12 border border-slate-200 text-center space-y-3">
              <Loader2 className="w-8 h-8 text-indigo-600 animate-spin mx-auto" />
              <h4 className="text-sm font-bold text-slate-800">Executing Vector Space Analysis</h4>
              <p className="text-xs text-slate-500">
                Tokenizing resume & job description, building term-frequency matrices, and computing cosine angle...
              </p>
            </div>
          ) : matchResult ? (
            <div className="space-y-6">
              {/* Top Match Score Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold text-slate-500 uppercase tracking-wider">
                    <span>Overall Match Score</span>
                    <Target className="w-4 h-4 text-indigo-600" />
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black text-indigo-600">{matchResult.matchScore}%</span>
                    <span className="text-xs text-slate-500 font-semibold">composite fit</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                      style={{ width: `${matchResult.matchScore}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-slate-600 pt-1 leading-snug">{matchResult.matchSummary}</p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold text-slate-500 uppercase tracking-wider">
                    <span>Cosine Similarity</span>
                    <Layers className="w-4 h-4 text-sky-600" />
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black text-sky-600">{matchResult.semanticSimilarity}%</span>
                    <span className="text-xs text-slate-500 font-semibold">vector dot product</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-sky-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${matchResult.semanticSimilarity}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-slate-500 pt-1">
                    Normalized Euclidean term frequency alignment between candidate and JD.
                  </p>
                </div>
              </div>

              {/* Competency Breakdown Bars */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Competency Alignment Breakdown
                </h3>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                      <span>Domain Knowledge & Core Architecture</span>
                      <span className="font-mono text-indigo-600">{matchResult.competencyBreakdown.domainKnowledge}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${matchResult.competencyBreakdown.domainKnowledge}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                      <span>Tools, Frameworks & Tech Stack</span>
                      <span className="font-mono text-sky-600">{matchResult.competencyBreakdown.toolsAndTech}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-sky-500 h-full rounded-full" style={{ width: `${matchResult.competencyBreakdown.toolsAndTech}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                      <span>Soft Skills & Collaboration Fit</span>
                      <span className="font-mono text-emerald-600">{matchResult.competencyBreakdown.softSkills}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${matchResult.competencyBreakdown.softSkills}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                      <span>Experience & Project Scale Alignment</span>
                      <span className="font-mono text-purple-600">{matchResult.competencyBreakdown.experienceFit}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-purple-500 h-full rounded-full" style={{ width: `${matchResult.competencyBreakdown.experienceFit}%` }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Skills Intersection: Matching vs Missing */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Matching Skills */}
                <div className="bg-white p-5 rounded-2xl border border-emerald-200 bg-emerald-50/10 shadow-sm space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Matching Skills ({matchResult.matchingSkills.length})
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {matchResult.matchingSkills.length > 0 ? (
                      matchResult.matchingSkills.map((s, i) => (
                        <span key={i} className="text-xs font-medium px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 border border-emerald-200">
                          {s}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-slate-400 italic">No matching keywords found</span>
                    )}
                  </div>
                </div>

                {/* Missing Skills */}
                <div className="bg-white p-5 rounded-2xl border border-rose-200 bg-rose-50/10 shadow-sm space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-rose-700 flex items-center gap-1.5">
                    <XCircle className="w-4 h-4 text-rose-600" />
                    Missing Key Requirements ({matchResult.missingSkills.length})
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {matchResult.missingSkills.length > 0 ? (
                      matchResult.missingSkills.map((s, i) => (
                        <span key={i} className="text-xs font-medium px-2.5 py-1 rounded-lg bg-rose-100 text-rose-800 border border-rose-200">
                          {s}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-emerald-600 font-medium">All specified keywords met!</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Recommended Skills to Learn */}
              {matchResult.recommendedSkillsToLearn.length > 0 && (
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-indigo-600" />
                    Recommended Skills to Learn for this Role
                  </h3>

                  <div className="space-y-2.5">
                    {matchResult.recommendedSkillsToLearn.map((item, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start justify-between gap-3">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs text-slate-900">{item.skill}</span>
                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                              item.priority === 'High'
                                ? 'bg-rose-100 text-rose-700'
                                : 'bg-amber-100 text-amber-700'
                            }`}>
                              {item.priority} Priority
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500">{item.reason}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center space-y-2">
              <AlertCircle className="w-8 h-8 text-slate-400 mx-auto" />
              <h4 className="text-sm font-bold text-slate-700">No Job Description Loaded</h4>
              <p className="text-xs text-slate-500">
                Select one of the standard role presets on the left or paste a custom JD to compute matching.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
