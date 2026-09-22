import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { ResumeUpload } from './components/ResumeUpload';
import { AnalysisDashboard } from './components/AnalysisDashboard';
import { JobMatcher } from './components/JobMatcher';
import { BulletEnhancer } from './components/BulletEnhancer';
import { AnalysisHistory } from './components/AnalysisHistory';
import { AdminPanel } from './components/AdminPanel';
import { ProjectDocsModal } from './components/ProjectDocsModal';
import { UserProfileModal } from './components/UserProfileModal';
import { ResumeAnalysisResult, User } from './types';
import { SampleResume, SAMPLE_RESUMES } from './data/sampleResumes';
import { BookOpen, Database, Award, ShieldCheck, Heart } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'upload' | 'dashboard' | 'match' | 'enhancer' | 'history' | 'admin'>('home');
  const [currentAnalysis, setCurrentAnalysis] = useState<ResumeAnalysisResult | null>(null);
  const [isDocsModalOpen, setIsDocsModalOpen] = useState<boolean>(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);

  // Current logged in user (starts as Student Aarav Sharma)
  const [currentUser, setCurrentUser] = useState<User>({
    id: 'usr-student-1',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@example.com',
    role: 'user',
    college: 'National Institute of Technology, Trichy',
    degree: 'B.Tech in Computer Science and Engineering',
    graduationYear: 2025,
    targetRole: 'Full Stack Software Engineer',
    createdAt: new Date().toISOString()
  });

  // Pre-load default sample resume analysis on startup so the user can immediately experience the dashboard
  useEffect(() => {
    fetch('/api/resume/analyze-text', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: SAMPLE_RESUMES[0].text,
        fileName: SAMPLE_RESUMES[0].fileName,
        userId: currentUser.id
      })
    })
      .then(res => res.json())
      .then((data: ResumeAnalysisResult) => {
        setCurrentAnalysis(data);
      })
      .catch(err => console.error('Failed to preload sample analysis', err));
  }, []);

  const handleAnalysisComplete = (result: ResumeAnalysisResult) => {
    setCurrentAnalysis(result);
    setActiveTab('dashboard');
  };

  const handleLoadSampleResume = async (sample: SampleResume) => {
    try {
      const response = await fetch('/api/resume/analyze-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: sample.text,
          fileName: sample.fileName,
          userId: currentUser.id
        })
      });
      if (response.ok) {
        const data: ResumeAnalysisResult = await response.json();
        setCurrentAnalysis(data);
        setActiveTab('dashboard');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSwitchAccount = (newRole: 'user' | 'admin') => {
    if (newRole === 'admin') {
      setCurrentUser({
        id: 'usr-admin-1',
        name: 'Dr. Sunita Mehra',
        email: 'hod.cse@college.edu.in',
        role: 'admin',
        college: 'National Institute of Technology',
        degree: 'Ph.D. in Computer Science',
        graduationYear: 2008,
        targetRole: 'Head of Department & Placement Dean',
        createdAt: new Date().toISOString()
      });
    } else {
      setCurrentUser({
        id: 'usr-student-1',
        name: 'Aarav Sharma',
        email: 'aarav.sharma@example.com',
        role: 'user',
        college: 'National Institute of Technology, Trichy',
        degree: 'B.Tech in Computer Science and Engineering',
        graduationYear: 2025,
        targetRole: 'Full Stack Software Engineer',
        createdAt: new Date().toISOString()
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Main Navigation */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        currentUser={currentUser}
        onOpenDocs={() => setIsDocsModalOpen(true)}
        onOpenProfile={() => setIsProfileModalOpen(true)}
      />

      {/* Main Viewport Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {activeTab === 'home' && (
          <LandingPage
            onStartUpload={() => setActiveTab('upload')}
            onLoadSample={handleLoadSampleResume}
            onOpenDocs={() => setIsDocsModalOpen(true)}
            onViewDashboard={() => {
              if (currentAnalysis) setActiveTab('dashboard');
              else setActiveTab('upload');
            }}
          />
        )}

        {activeTab === 'upload' && (
          <ResumeUpload
            onAnalysisComplete={handleAnalysisComplete}
            userId={currentUser.id}
          />
        )}

        {activeTab === 'dashboard' && (
          currentAnalysis ? (
            <AnalysisDashboard
              analysis={currentAnalysis}
              onNavigateToJobMatch={() => setActiveTab('match')}
              onNavigateToEnhancer={() => setActiveTab('enhancer')}
              onUploadNew={() => setActiveTab('upload')}
            />
          ) : (
            <ResumeUpload
              onAnalysisComplete={handleAnalysisComplete}
              userId={currentUser.id}
            />
          )
        )}

        {activeTab === 'match' && (
          currentAnalysis ? (
            <JobMatcher
              analysis={currentAnalysis}
              onNavigateToEnhancer={() => setActiveTab('enhancer')}
            />
          ) : (
            <div className="max-w-md mx-auto my-12 bg-white rounded-2xl p-8 text-center space-y-4 border border-slate-200">
              <p className="text-xs text-slate-600">Please analyze a resume first before testing job match alignment.</p>
              <button
                onClick={() => setActiveTab('upload')}
                className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold cursor-pointer"
              >
                Upload Resume Now
              </button>
            </div>
          )
        )}

        {activeTab === 'enhancer' && <BulletEnhancer />}

        {activeTab === 'history' && (
          <AnalysisHistory
            onSelectAnalysis={(record) => {
              setCurrentAnalysis(record);
              setActiveTab('dashboard');
            }}
            userId={currentUser.id}
          />
        )}

        {activeTab === 'admin' && (
          <AdminPanel
            currentUser={currentUser}
            onSelectResume={(id) => {
              fetch(`/api/resume/${id}`)
                .then(r => r.json())
                .then(d => {
                  if (d) {
                    setCurrentAnalysis(d);
                    setActiveTab('dashboard');
                  }
                });
            }}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <Award className="w-4 h-4 text-indigo-600" />
              <span className="font-bold text-slate-800">
                AI Resume Analyzer & Job Matching System
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-semibold">
                Final-Year B.Tech Capstone Project
              </span>
            </div>
            <p>
              Department of Computer Science and Engineering &bull; NLP Entity Extraction &amp; TF-IDF Vector Space Model
            </p>
          </div>

          <div className="flex items-center gap-4 flex-wrap justify-center">
            <button
              onClick={() => setIsDocsModalOpen(true)}
              className="text-indigo-600 hover:text-indigo-700 font-semibold flex items-center gap-1 cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5" />
              22 Project Report Chapters
            </button>
            <button
              onClick={() => setIsDocsModalOpen(true)}
              className="text-slate-600 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
            >
              <Database className="w-3.5 h-3.5" />
              SQL DDL Script
            </button>
            <button
              onClick={() => {
                handleSwitchAccount(currentUser.role === 'admin' ? 'user' : 'admin');
              }}
              className="text-slate-600 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
              Toggle Admin/Student Demo
            </button>
          </div>
        </div>
      </footer>

      {/* Project Documentation Modal */}
      <ProjectDocsModal
        isOpen={isDocsModalOpen}
        onClose={() => setIsDocsModalOpen(false)}
      />

      {/* User Profile Modal */}
      <UserProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        currentUser={currentUser}
        onUpdateUser={(updated) => setCurrentUser(updated)}
        onSwitchAccount={(role) => handleSwitchAccount(role)}
      />
    </div>
  );
}
