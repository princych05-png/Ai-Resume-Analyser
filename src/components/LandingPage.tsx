import React from 'react';
import { 
  FileText, 
  Sparkles, 
  ShieldAlert, 
  Target, 
  Cpu, 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  Database, 
  BookOpen, 
  UploadCloud,
  Code2,
  Award
} from 'lucide-react';
import { SampleResume, SAMPLE_RESUMES } from '../data/sampleResumes';

interface LandingPageProps {
  onStartUpload: () => void;
  onLoadSample: (sample: SampleResume) => void;
  onOpenDocs: () => void;
  onViewDashboard: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartUpload,
  onLoadSample,
  onOpenDocs,
  onViewDashboard
}) => {
  return (
    <div className="space-y-12 pb-16">
      {/* Hero Presentation Banner */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 text-white p-8 md:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-8 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-semibold">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>Final-Year B.Tech / BE Computer Science Capstone Project</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            AI Resume Analyzer & <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-300">Job Matching System</span>
          </h1>

          <p className="text-slate-300 text-base md:text-lg leading-relaxed">
            A comprehensive, full-stack intelligence platform that parses resumes (PDF & DOCX), performs 
            heuristic ATS audit diagnostics, extracts categorized technical skills, calculates semantic cosine 
            match against job descriptions, and rewrites bullet points using the Google XYZ formula.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={onStartUpload}
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all shadow-lg shadow-indigo-600/30 flex items-center gap-2 group cursor-pointer"
            >
              <UploadCloud className="w-4 h-4" />
              Upload Your Resume
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <button
              onClick={onViewDashboard}
              className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-sm transition-all border border-slate-700 flex items-center gap-2 cursor-pointer"
            >
              <Target className="w-4 h-4 text-sky-400" />
              View Active Dashboard
            </button>

            <button
              onClick={onOpenDocs}
              className="px-5 py-3 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/50 text-emerald-300 font-medium text-sm transition-all border border-emerald-800/40 flex items-center gap-2 cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-emerald-400" />
              Read 22-Chapter Project Docs
            </button>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10 pt-8 border-t border-slate-800/80">
          <div className="bg-slate-800/40 rounded-xl p-3 border border-slate-700/50">
            <div className="text-2xl font-bold text-white">600+</div>
            <div className="text-xs text-slate-400 mt-0.5">Categorized Skills in Taxonomy</div>
          </div>
          <div className="bg-slate-800/40 rounded-xl p-3 border border-slate-700/50">
            <div className="text-2xl font-bold text-sky-400">12 Criteria</div>
            <div className="text-xs text-slate-400 mt-0.5">Automated ATS Audit Checks</div>
          </div>
          <div className="bg-slate-800/40 rounded-xl p-3 border border-slate-700/50">
            <div className="text-2xl font-bold text-indigo-400">TF-IDF</div>
            <div className="text-xs text-slate-400 mt-0.5">Cosine Similarity Vector Matching</div>
          </div>
          <div className="bg-slate-800/40 rounded-xl p-3 border border-slate-700/50">
            <div className="text-2xl font-bold text-emerald-400">Google XYZ</div>
            <div className="text-xs text-slate-400 mt-0.5">Quantified Bullet Point Enhancer</div>
          </div>
        </div>
      </section>

      {/* 1-Click Test Resumes for Evaluators */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-600" />
              Quick Evaluation Sandbox: Test with Sample Resumes
            </h2>
            <p className="text-xs text-slate-500">
              Select any pre-built candidate profile to evaluate the complete end-to-end NLP and scoring pipeline instantly.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {SAMPLE_RESUMES.map((sample) => (
            <div
              key={sample.id}
              className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                    {sample.experienceLevel}
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">{sample.fileName}</span>
                </div>
                <h3 className="font-bold text-slate-900 text-base">{sample.name}</h3>
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {sample.text.slice(0, 180)}...
                </p>
              </div>

              <button
                onClick={() => onLoadSample(sample)}
                className="mt-4 w-full py-2 px-3 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-indigo-200"
              >
                Analyze This Sample Profile
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* The AI/NLP Pipeline Stages (Required for Final Year Viva) */}
      <section className="bg-slate-50 rounded-2xl p-6 md:p-8 border border-slate-200 space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Core Engineering</span>
          <h2 className="text-2xl font-extrabold text-slate-900 mt-1">
            End-to-End AI/NLP Pipeline Architecture
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Designed and implemented as prescribed in the academic project requirements:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">
              01
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Resume Ingestion & Parsing</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Streams raw PDF/DOCX binary buffers with <code className="text-indigo-600 font-mono">pdf-parse</code> and <code className="text-indigo-600 font-mono">mammoth</code> into normalized UTF-8 text strings.
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-2">
            <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-xs">
              02
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Segmentation & NER</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Regex-driven heading boundary segmentation divides documents into Education, Skills, Projects, and Experience while extracting emails, phones, and social URLs.
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-2">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-xs">
              03
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Skill Taxonomy & ATS Audit</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Categorizes 600+ skills across languages, frameworks, DBs, and cloud. Evaluates word count, action verbs, and quantifiable metrics.
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
              04
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Cosine Match & Enhancer</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Calculates vector space similarity against target Job Descriptions, highlighting missing skills and formulating Google XYZ bullet revisions.
            </p>
          </div>
        </div>
      </section>

      {/* College Project Submission Features */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Database className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">Relational Database Design</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Complete relational database schema comprising 10 structured tables (users, resumes, skills, education, projects, job_descriptions, recommendations) with primary and foreign key constraints.
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">Mathematical Vector Space Model</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            No hardcoded results. Computes real term-frequency (TF) matrices, tokenization, stopword filtering, and Euclidean normalized dot products to deliver mathematically rigorous match scores.
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <BookOpen className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">22-Chapter Project Report & Viva Guide</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Includes Abstract, DFD Diagrams (Level 0, 1, 2), ER Diagram, System Architecture, Test Cases Matrix, SQL DDL Script, requirements.txt, and 15+ Examiner Viva Q&As.
          </p>
        </div>
      </section>
    </div>
  );
};
