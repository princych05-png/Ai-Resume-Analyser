import React, { useState } from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Award, 
  Briefcase, 
  FileText, 
  GraduationCap, 
  Code, 
  Cpu, 
  Sparkles, 
  ArrowRight, 
  Mail, 
  Phone, 
  Linkedin, 
  Github, 
  Globe, 
  Clock, 
  TrendingUp,
  Download,
  Share2,
  ExternalLink,
  ChevronRight,
  Printer
} from 'lucide-react';
import { ResumeAnalysisResult } from '../types';

interface AnalysisDashboardProps {
  analysis: ResumeAnalysisResult;
  onNavigateToJobMatch: () => void;
  onNavigateToEnhancer: () => void;
  onUploadNew: () => void;
}

export const AnalysisDashboard: React.FC<AnalysisDashboardProps> = ({
  analysis,
  onNavigateToJobMatch,
  onNavigateToEnhancer,
  onUploadNew
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'skills' | 'ats' | 'sections' | 'recommendations'>('overview');

  const { contact, scores, atsReport, skills, education, projects, experience, recommendations } = analysis;

  // Rating badge helpers
  const getScoreRating = (score: number) => {
    if (score >= 85) return { label: 'Exceptional', color: 'text-emerald-700 bg-emerald-100 border-emerald-300' };
    if (score >= 70) return { label: 'Strong Fit', color: 'text-indigo-700 bg-indigo-100 border-indigo-300' };
    if (score >= 50) return { label: 'Moderate', color: 'text-amber-700 bg-amber-100 border-amber-300' };
    return { label: 'Needs Polish', color: 'text-rose-700 bg-rose-100 border-rose-300' };
  };

  const resumeRating = getScoreRating(scores.overallScore);
  const atsRating = getScoreRating(atsReport.overallScore);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Candidate Profile Header Card */}
      <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                {contact.name || 'Candidate Profile'}
              </h1>
              <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${resumeRating.color}`}>
                {resumeRating.label} ({scores.overallScore}/100)
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 font-mono">
                {analysis.fileName}
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Evaluated on {new Date(analysis.uploadedAt).toLocaleDateString()} at{' '}
              {new Date(analysis.uploadedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} &bull; Multi-Stage NLP Analysis Engine
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={onUploadNew}
              className="px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
            >
              Analyze Another Resume
            </button>
            <button
              onClick={handlePrint}
              className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              Print / Save PDF
            </button>
          </div>
        </div>

        {/* Contact Info Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 text-xs text-slate-600">
          {contact.email && (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-50 border border-slate-200">
              <Mail className="w-3.5 h-3.5 text-indigo-500" />
              <span>{contact.email}</span>
            </div>
          )}
          {contact.phone && (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-50 border border-slate-200">
              <Phone className="w-3.5 h-3.5 text-indigo-500" />
              <span>{contact.phone}</span>
            </div>
          )}
          {contact.linkedin && (
            <a
              href={contact.linkedin.startsWith('http') ? contact.linkedin : `https://${contact.linkedin}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-sky-50 text-sky-700 border border-sky-200 hover:bg-sky-100 transition-colors"
            >
              <Linkedin className="w-3.5 h-3.5 text-sky-600" />
              <span>LinkedIn Profile</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          )}
          {contact.github && (
            <a
              href={contact.github.startsWith('http') ? contact.github : `https://${contact.github}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 text-slate-800 border border-slate-300 hover:bg-slate-200 transition-colors"
            >
              <Github className="w-3.5 h-3.5 text-slate-800" />
              <span>GitHub</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          )}
          {contact.portfolio && (
            <a
              href={contact.portfolio.startsWith('http') ? contact.portfolio : `https://${contact.portfolio}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100 transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-purple-600" />
              <span>Portfolio</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          )}
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Composite Resume Score */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Composite Score</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black text-slate-900">{scores.overallScore}</span>
            <span className="text-sm text-slate-400 font-semibold">/ 100</span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div
              className="bg-indigo-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${scores.overallScore}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-500">Based on 6 weighted placement dimensions</p>
        </div>

        {/* ATS Compatibility */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">ATS Compliance</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black text-emerald-600">{atsReport.overallScore}</span>
            <span className="text-sm text-slate-400 font-semibold">/ 100</span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${atsReport.overallScore}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-500">12 automated ATS diagnostic criteria</p>
        </div>

        {/* Skills Detected */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Skills Detected</span>
            <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center font-bold">
              <Code className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black text-sky-600">
              {skills.technical.length + skills.soft.length}
            </span>
            <span className="text-sm text-slate-400 font-semibold">total</span>
          </div>
          <p className="text-xs text-slate-600">
            {skills.technical.length} technical &bull; {skills.soft.length} soft skills
          </p>
          <p className="text-[11px] text-slate-500">Parsed across 7 taxonomy categories</p>
        </div>

        {/* Content Depth & Metrics */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Metrics & Verbs</span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black text-purple-600">{atsReport.actionVerbsCount}</span>
            <span className="text-sm text-slate-400 font-semibold">verbs</span>
          </div>
          <p className="text-xs text-slate-600">
            {atsReport.measurableMetricsCount} quantifiable results &bull; {atsReport.wordCount} words
          </p>
          <p className="text-[11px] text-slate-500">~{atsReport.readingTimeMinutes} min recruiter scan time</p>
        </div>
      </div>

      {/* Quick Launch Action Banner */}
      <div className="bg-gradient-to-r from-indigo-900 to-slate-900 text-white p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md">
        <div className="space-y-1">
          <h3 className="font-bold text-base flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-sky-400" />
            Test this resume against a specific Job Description
          </h3>
          <p className="text-xs text-slate-300">
            Compare candidate skills with role requirements using TF-IDF Cosine Similarity.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onNavigateToJobMatch}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-all flex items-center gap-1.5 shadow-sm cursor-pointer whitespace-nowrap"
          >
            Launch Job Matcher
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onNavigateToEnhancer}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-all flex items-center gap-1.5 border border-slate-700 cursor-pointer whitespace-nowrap"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            Enhance Bullets
          </button>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="border-b border-slate-200">
        <nav className="flex space-x-6 overflow-x-auto pb-px text-xs font-semibold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-3 border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'overview'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Score Breakdown
          </button>
          <button
            onClick={() => setActiveTab('skills')}
            className={`pb-3 border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'skills'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Skills Matrix ({skills.technical.length + skills.soft.length})
          </button>
          <button
            onClick={() => setActiveTab('ats')}
            className={`pb-3 border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'ats'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            ATS Audit Diagnostic ({atsReport.checks.length} Checks)
          </button>
          <button
            onClick={() => setActiveTab('sections')}
            className={`pb-3 border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'sections'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Extracted Credentials & Experience
          </button>
          <button
            onClick={() => setActiveTab('recommendations')}
            className={`pb-3 border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'recommendations'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            AI Recommendations ({recommendations.length})
          </button>
        </nav>
      </div>

      {/* TAB CONTENT: 1. OVERVIEW / SCORE BREAKDOWN */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Skills Score */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-700">Technical & Soft Skills</span>
                <span className="font-black text-indigo-600">{scores.skillsScore} / 25</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${(scores.skillsScore / 25) * 100}%` }} />
              </div>
              <p className="text-[11px] text-slate-500">Evaluates breadth of modern languages, frameworks, and databases.</p>
            </div>

            {/* Experience Score */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-700">Experience & Internships</span>
                <span className="font-black text-indigo-600">{scores.experienceScore} / 20</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${(scores.experienceScore / 20) * 100}%` }} />
              </div>
              <p className="text-[11px] text-slate-500">Analyzes internship history, professional roles, and tenures.</p>
            </div>

            {/* Projects Score */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-700">Projects Depth & Tech Stack</span>
                <span className="font-black text-indigo-600">{scores.projectsScore} / 20</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${(scores.projectsScore / 20) * 100}%` }} />
              </div>
              <p className="text-[11px] text-slate-500">Checks for substantial real-world projects with mapped technologies.</p>
            </div>

            {/* Education Score */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-700">Academic Education</span>
                <span className="font-black text-indigo-600">{scores.educationScore} / 15</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${(scores.educationScore / 15) * 100}%` }} />
              </div>
              <p className="text-[11px] text-slate-500">Accredited university degree, year of completion, and GPA notation.</p>
            </div>

            {/* ATS Formatting */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-700">ATS Structure & Formatting</span>
                <span className="font-black text-indigo-600">{scores.atsFormattingScore} / 10</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${(scores.atsFormattingScore / 10) * 100}%` }} />
              </div>
              <p className="text-[11px] text-slate-500">Clear standard section headers, clean text layout, and optimal length.</p>
            </div>

            {/* Action Verbs & Metrics */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-700">Active Verbs & Impact</span>
                <span className="font-black text-indigo-600">{scores.impactVerbsScore} / 10</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${(scores.impactVerbsScore / 10) * 100}%` }} />
              </div>
              <p className="text-[11px] text-slate-500">Proactive ownership verbs (Architected, Spearheaded) and % metrics.</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: 2. SKILLS MATRIX */}
      {activeTab === 'skills' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Programming Languages */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center justify-between">
                <span>Programming Languages</span>
                <span className="text-indigo-600 font-mono">{skills.languages.length}</span>
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {skills.languages.length > 0 ? (
                  skills.languages.map((skill, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-medium border border-indigo-200">
                      {skill}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-slate-400 italic">No standard languages detected</span>
                )}
              </div>
            </div>

            {/* Frameworks & Libraries */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center justify-between">
                <span>Frameworks & Libraries</span>
                <span className="text-indigo-600 font-mono">{skills.frameworks.length}</span>
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {skills.frameworks.length > 0 ? (
                  skills.frameworks.map((skill, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-sky-50 text-sky-700 text-xs font-medium border border-sky-200">
                      {skill}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-slate-400 italic">No web frameworks detected</span>
                )}
              </div>
            </div>

            {/* Databases & Storage */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center justify-between">
                <span>Databases & Storage</span>
                <span className="text-indigo-600 font-mono">{skills.databases.length}</span>
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {skills.databases.length > 0 ? (
                  skills.databases.map((skill, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-medium border border-emerald-200">
                      {skill}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-slate-400 italic">No database systems detected</span>
                )}
              </div>
            </div>

            {/* Cloud & DevOps */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center justify-between">
                <span>Cloud & DevOps</span>
                <span className="text-indigo-600 font-mono">{skills.cloudDevOps.length}</span>
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {skills.cloudDevOps.length > 0 ? (
                  skills.cloudDevOps.map((skill, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 text-xs font-medium border border-amber-200">
                      {skill}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-slate-400 italic">No cloud/container tools detected</span>
                )}
              </div>
            </div>

            {/* Developer Tools */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center justify-between">
                <span>Developer Tools & Platforms</span>
                <span className="text-indigo-600 font-mono">{skills.tools.length}</span>
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {skills.tools.length > 0 ? (
                  skills.tools.map((skill, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200">
                      {skill}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-slate-400 italic">No developer tools detected</span>
                )}
              </div>
            </div>

            {/* Soft Skills */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center justify-between">
                <span>Soft & Interpersonal Competencies</span>
                <span className="text-indigo-600 font-mono">{skills.soft.length}</span>
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {skills.soft.length > 0 ? (
                  skills.soft.map((skill, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-purple-50 text-purple-700 text-xs font-medium border border-purple-200">
                      {skill}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-slate-400 italic">No soft skills detected</span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: 3. ATS AUDIT DIAGNOSTIC */}
      {activeTab === 'ats' && (
        <div className="space-y-6">
          {/* Checks Matrix */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Automated ATS Screening Results
            </h3>

            <div className="divide-y divide-slate-100">
              {atsReport.checks.map((check, idx) => (
                <div key={idx} className="py-3.5 flex items-start gap-3">
                  {check.status === 'pass' && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  )}
                  {check.status === 'warning' && (
                    <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  )}
                  {check.status === 'fail' && (
                    <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                  )}

                  <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-slate-900">{check.title}</h4>
                      <span className="text-[10px] font-semibold uppercase text-slate-400">
                        {check.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600">{check.message}</p>
                    {check.tip && (
                      <div className="text-[11px] text-indigo-700 bg-indigo-50/70 p-2 rounded-lg border border-indigo-100 mt-1">
                        <strong>Actionable Tip:</strong> {check.tip}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Keyword Density Table */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900">
              Top Keywords & Frequency Density
            </h3>
            <p className="text-xs text-slate-500">
              ATS parsers compute term frequency to identify your core specialization areas.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 font-semibold uppercase text-[10px]">
                    <th className="pb-2">Keyword</th>
                    <th className="pb-2">Count</th>
                    <th className="pb-2">Density</th>
                    <th className="pb-2">Relative Prominence</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {atsReport.keywordDensity.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50">
                      <td className="py-2.5 font-bold text-slate-800 font-mono capitalize">{item.keyword}</td>
                      <td className="py-2.5 text-slate-600 font-mono">{item.count}</td>
                      <td className="py-2.5 text-slate-600 font-mono">{item.density}%</td>
                      <td className="py-2.5">
                        <div className="w-36 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                          <div
                            className="bg-indigo-600 h-full rounded-full"
                            style={{ width: `${Math.min(100, item.density * 20)}%` }}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: 4. EXTRACTED CREDENTIALS & SECTIONS */}
      {activeTab === 'sections' && (
        <div className="space-y-6">
          {/* Education */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-indigo-600" />
              Education & Academic Background
            </h3>

            <div className="space-y-3">
              {education.length > 0 ? (
                education.map((edu, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <div className="flex justify-between items-start">
                      <h4 className="text-xs font-bold text-slate-900">{edu.degree}</h4>
                      {edu.year && <span className="text-[11px] text-slate-500 font-mono">{edu.year}</span>}
                    </div>
                    <p className="text-xs text-slate-600">{edu.institution}</p>
                    {edu.gpa && (
                      <span className="inline-block text-[11px] font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                        Grade / GPA: {edu.gpa}
                      </span>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-400 italic">No formal education entries recognized.</p>
              )}
            </div>
          </div>

          {/* Projects */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Code className="w-4 h-4 text-indigo-600" />
              Technical Projects
            </h3>

            <div className="space-y-3">
              {projects.length > 0 ? (
                projects.map((proj, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex justify-between items-start flex-wrap gap-1">
                      <h4 className="text-xs font-bold text-slate-900">{proj.title}</h4>
                      <div className="flex gap-1 flex-wrap">
                        {proj.technologies.map((t, i) => (
                          <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-100 text-indigo-700">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{proj.description}</p>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-400 italic">No projects extracted.</p>
              )}
            </div>
          </div>

          {/* Work Experience */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-indigo-600" />
              Work & Internship Experience
            </h3>

            <div className="space-y-3">
              {experience.length > 0 ? (
                experience.map((exp, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">{exp.title}</h4>
                        <p className="text-xs text-indigo-600 font-medium">{exp.company}</p>
                      </div>
                      {exp.duration && (
                        <span className="text-[11px] text-slate-500 font-mono">{exp.duration}</span>
                      )}
                    </div>
                    <ul className="list-disc list-inside text-xs text-slate-600 space-y-1">
                      {exp.description.map((bullet, i) => (
                        <li key={i}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-400 italic">No work experience or internship section detected.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: 5. AI RECOMMENDATIONS */}
      {activeTab === 'recommendations' && (
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Personalized Recommendations for Profile Elevation
            </h3>
            <p className="text-xs text-slate-500">
              Specific, actionable enhancements generated by our AI diagnostic engine to improve ATS score and interview readiness.
            </p>

            <div className="space-y-3">
              {recommendations.map((rec) => (
                <div
                  key={rec.id}
                  className={`p-4 rounded-xl border space-y-2 ${
                    rec.type === 'critical'
                      ? 'bg-rose-50/50 border-rose-200 text-rose-950'
                      : rec.type === 'improvement'
                      ? 'bg-amber-50/50 border-amber-200 text-amber-950'
                      : 'bg-indigo-50/50 border-indigo-200 text-indigo-950'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                          rec.type === 'critical'
                            ? 'bg-rose-200 text-rose-800'
                            : rec.type === 'improvement'
                            ? 'bg-amber-200 text-amber-800'
                            : 'bg-indigo-200 text-indigo-800'
                        }`}
                      >
                        {rec.type}
                      </span>
                      <h4 className="text-xs font-bold text-slate-900">{rec.title}</h4>
                    </div>
                    <span className="text-[10px] font-mono uppercase text-slate-500">{rec.category}</span>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed">{rec.description}</p>

                  <div className="bg-white/80 p-2.5 rounded-lg border border-slate-200/60 text-xs text-slate-800 flex items-start gap-2">
                    <strong className="text-indigo-600 font-semibold shrink-0">Action Step:</strong>
                    <span>{rec.actionableStep}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
