import React, { useState, useRef } from 'react';
import { 
  UploadCloud, 
  FileText, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight, 
  Loader2, 
  Sparkles, 
  FileCheck,
  FileType,
  RefreshCw
} from 'lucide-react';
import { SampleResume, SAMPLE_RESUMES } from '../data/sampleResumes';
import { ResumeAnalysisResult } from '../types';

interface ResumeUploadProps {
  onAnalysisComplete: (result: ResumeAnalysisResult) => void;
  userId?: string;
}

export const ResumeUpload: React.FC<ResumeUploadProps> = ({ onAnalysisComplete, userId }) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'paste'>('upload');
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [pastedText, setPastedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const validateAndSetFile = (file: File) => {
    setErrorMessage(null);
    const validExtensions = ['.pdf', '.docx', '.doc', '.txt'];
    const hasValidExt = validExtensions.some(ext => file.name.toLowerCase().endsWith(ext));
    
    if (!hasValidExt) {
      setErrorMessage('Unsupported file format. Please upload a PDF (.pdf) or Word document (.docx).');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage('File size exceeds the 5MB limit. Please upload a smaller document.');
      return;
    }

    setSelectedFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  // Upload File API Call
  const handleUploadFile = async () => {
    if (!selectedFile) return;

    setIsLoading(true);
    setErrorMessage(null);
    setLoadingStep('Uploading binary document stream...');

    try {
      const formData = new FormData();
      formData.append('resume', selectedFile);
      if (userId) formData.append('userId', userId);

      setLoadingStep('Extracting text and decoding OpenXML/PDF trees...');
      
      const response = await fetch('/api/resume/upload', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Failed to process resume file');
      }

      setLoadingStep('Running NLP pipeline: NER, Skill Taxonomy, ATS scoring...');
      const analysis: ResumeAnalysisResult = await response.json();

      setTimeout(() => {
        setIsLoading(false);
        onAnalysisComplete(analysis);
      }, 400);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'An error occurred during resume processing');
      setIsLoading(false);
    }
  };

  // Analyze Pasted Text API Call
  const handleAnalyzeText = async () => {
    if (!pastedText.trim() || pastedText.trim().length < 50) {
      setErrorMessage('Please enter at least 50 characters of resume content.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);
    setLoadingStep('Segmenting sections and identifying candidate entities...');

    try {
      const response = await fetch('/api/resume/analyze-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: pastedText,
          fileName: 'Pasted_Resume_Profile.txt',
          userId: userId || 'usr-student-1'
        })
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Failed to analyze text');
      }

      setLoadingStep('Computing ATS compliance & generating recommendations...');
      const analysis: ResumeAnalysisResult = await response.json();

      setTimeout(() => {
        setIsLoading(false);
        onAnalysisComplete(analysis);
      }, 400);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'Analysis failed');
      setIsLoading(false);
    }
  };

  // Load Sample Directly
  const handleLoadSample = async (sample: SampleResume) => {
    setIsLoading(true);
    setErrorMessage(null);
    setLoadingStep(`Ingesting sample candidate: ${sample.name}...`);

    try {
      const response = await fetch('/api/resume/analyze-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: sample.text,
          fileName: sample.fileName,
          userId: userId || 'usr-student-1'
        })
      });

      if (!response.ok) throw new Error('Failed to load sample');

      setLoadingStep('Running full NLP tokenization and ATS scoring...');
      const analysis: ResumeAnalysisResult = await response.json();

      setTimeout(() => {
        setIsLoading(false);
        onAnalysisComplete(analysis);
      }, 300);
    } catch (err: any) {
      setErrorMessage('Could not load sample resume');
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">
          Upload Your Resume for AI Analysis
        </h1>
        <p className="text-sm text-slate-600 max-w-xl mx-auto">
          Upload your resume in PDF or DOCX format. Our multi-stage NLP pipeline will extract 
          your skills, credentials, evaluate ATS compliance, and score your profile.
        </p>
      </div>

      {/* Mode Tabs */}
      <div className="flex justify-center">
        <div className="bg-slate-100 p-1 rounded-xl inline-flex border border-slate-200">
          <button
            onClick={() => { setActiveTab('upload'); setErrorMessage(null); }}
            className={`px-5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'upload'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <UploadCloud className="w-4 h-4" />
            Upload File (PDF / DOCX)
          </button>
          <button
            onClick={() => { setActiveTab('paste'); setErrorMessage(null); }}
            className={`px-5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'paste'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-4 h-4" />
            Paste Plain Text
          </button>
        </div>
      </div>

      {/* Error Banner */}
      {errorMessage && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-semibold">Processing Notice:</span>
            <p>{errorMessage}</p>
          </div>
        </div>
      )}

      {/* Upload Zone */}
      {activeTab === 'upload' ? (
        <div className="space-y-4">
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-8 md:p-12 text-center transition-all cursor-pointer bg-white ${
              dragActive
                ? 'border-indigo-500 bg-indigo-50/50 scale-[1.01]'
                : selectedFile
                ? 'border-emerald-500 bg-emerald-50/20'
                : 'border-slate-300 hover:border-indigo-400 hover:bg-slate-50/50'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.docx,.doc,.txt,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              onChange={handleFileInputChange}
              className="hidden"
            />

            {selectedFile ? (
              <div className="space-y-3">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <FileCheck className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">{selectedFile.name}</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    {(selectedFile.size / 1024).toFixed(1)} KB &bull; Ready for NLP extraction
                  </p>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedFile(null);
                  }}
                  className="text-xs text-slate-500 hover:text-rose-600 font-medium underline inline-flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" /> Select a different file
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <UploadCloud className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Choose a resume file or drag & drop here
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Supported formats: PDF (.pdf), Microsoft Word (.docx), or Text (.txt)
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Maximum file size: 5 MB</p>
                </div>
                <button
                  type="button"
                  className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer transition-colors"
                >
                  Browse Computer
                </button>
              </div>
            )}
          </div>

          {/* Analyze Action Button */}
          {selectedFile && (
            <button
              onClick={handleUploadFile}
              disabled={isLoading}
              className="w-full py-3.5 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{loadingStep || 'Processing resume...'}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Analyze Resume with AI Engine</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          )}
        </div>
      ) : (
        /* Plain Text Input Mode */
        <div className="space-y-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Paste Raw Resume Content
            </label>
            <p className="text-xs text-slate-500 mb-2">
              Copy and paste the plain text of your resume below. Sections will be parsed automatically.
            </p>
            <textarea
              rows={12}
              value={pastedText}
              onChange={(e) => setPastedText(e.target.value)}
              placeholder="Aarav Sharma&#10;aarav@example.com | +91 9876543210&#10;&#10;EDUCATION&#10;B.Tech in Computer Science, 2021-2025&#10;&#10;SKILLS&#10;Python, React, TypeScript, Node.js, SQL...&#10;&#10;PROJECTS..."
              className="w-full rounded-xl border border-slate-300 p-3.5 text-xs text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none font-mono"
            />
            <div className="flex justify-between items-center text-[11px] text-slate-400 mt-1">
              <span>Characters: {pastedText.length}</span>
              <span>Words: {pastedText.split(/\s+/).filter(Boolean).length}</span>
            </div>
          </div>

          <button
            onClick={handleAnalyzeText}
            disabled={isLoading || pastedText.trim().length < 50}
            className="w-full py-3.5 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>{loadingStep || 'Parsing text...'}</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Run NLP Analysis on Pasted Text</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      )}

      {/* Fast 1-Click Sandbox Test Samples */}
      <div className="pt-4 border-t border-slate-200">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            Quick Test: Load Pre-Built Sample Resumes
          </span>
          <span className="text-[11px] text-slate-400">1-click instant test</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {SAMPLE_RESUMES.map((sample) => (
            <button
              key={sample.id}
              onClick={() => handleLoadSample(sample)}
              disabled={isLoading}
              className="p-3 rounded-xl border border-slate-200 bg-white hover:border-indigo-300 hover:bg-indigo-50/40 text-left transition-all group cursor-pointer disabled:opacity-50"
            >
              <div className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 flex items-center justify-between">
                <span>{sample.name}</span>
                <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all" />
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">{sample.role}</div>
              <div className="text-[10px] text-indigo-500 font-mono mt-1">{sample.fileName}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
