import React, { useState, useEffect } from 'react';
import { 
  History, 
  FileText, 
  Trash2, 
  ArrowRight, 
  Clock, 
  CheckCircle2, 
  Award,
  AlertCircle
} from 'lucide-react';
import { ResumeAnalysisResult } from '../types';

interface AnalysisHistoryProps {
  onSelectAnalysis: (analysis: ResumeAnalysisResult) => void;
  userId?: string;
}

export const AnalysisHistory: React.FC<AnalysisHistoryProps> = ({ onSelectAnalysis, userId }) => {
  const [historyItems, setHistoryItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchHistory = () => {
    setIsLoading(true);
    fetch(`/api/history?userId=${userId || 'usr-student-1'}`)
      .then(res => res.json())
      .then(data => {
        setHistoryItems(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchHistory();
  }, [userId]);

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm('Are you sure you want to remove this resume scan from your history?')) return;

    try {
      await fetch(`/api/history/${id}`, { method: 'DELETE' });
      setHistoryItems(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-16">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-2">
        <div className="flex items-center gap-2">
          <History className="w-5 h-5 text-indigo-600" />
          <h1 className="text-2xl font-extrabold text-slate-900">Analysis History & Logs</h1>
        </div>
        <p className="text-xs text-slate-500">
          Review previous resume evaluations, compare score improvements, and reload past audit reports.
        </p>
      </div>

      {/* List */}
      {isLoading ? (
        <div className="bg-white rounded-2xl p-12 text-center text-xs text-slate-500 border border-slate-200">
          Loading previous evaluation logs...
        </div>
      ) : historyItems.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center space-y-3 border border-slate-200">
          <AlertCircle className="w-8 h-8 text-slate-400 mx-auto" />
          <h3 className="text-sm font-bold text-slate-700">No Analysis History Found</h3>
          <p className="text-xs text-slate-500">
            Upload a resume or load a sample resume to generate your first audit report.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="divide-y divide-slate-100">
            {historyItems.map((record) => {
              const data: ResumeAnalysisResult = record.data;
              return (
                <div
                  key={record.id}
                  onClick={() => onSelectAnalysis(data)}
                  className="p-5 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-sm font-bold text-slate-900">
                          {data.contact?.name || 'Candidate Resume'}
                        </h3>
                        <span className="text-[11px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                          {data.fileName}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 text-xs text-slate-500 flex-wrap">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          {new Date(record.createdAt).toLocaleDateString()} at{' '}
                          {new Date(record.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        <span>&bull;</span>
                        <span>{data.skills?.technical?.length || 0} skills detected</span>
                        <span>&bull;</span>
                        <span>{data.atsReport?.wordCount || 0} words</span>
                      </div>
                    </div>
                  </div>

                  {/* Scores & Actions */}
                  <div className="flex items-center gap-4 self-end sm:self-center">
                    <div className="text-right">
                      <div className="text-xs font-bold text-indigo-600">
                        {data.scores?.overallScore || 0} / 100
                      </div>
                      <div className="text-[10px] text-slate-400">Composite Score</div>
                    </div>

                    <div className="text-right">
                      <div className="text-xs font-bold text-emerald-600">
                        {data.atsReport?.overallScore || 0}%
                      </div>
                      <div className="text-[10px] text-slate-400">ATS Rating</div>
                    </div>

                    <button
                      onClick={(e) => handleDelete(record.id, e)}
                      className="p-2 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                      title="Delete record"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div className="text-slate-400 hover:text-indigo-600">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
