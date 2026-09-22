import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Users, 
  BarChart3, 
  FileText, 
  TrendingUp, 
  CheckCircle2, 
  Search, 
  UserCheck, 
  Award, 
  RefreshCw,
  Clock,
  Layers
} from 'lucide-react';
import { User, ResumeAnalysisResult } from '../types';

interface AdminPanelProps {
  currentUser: User | null;
  onSelectResume: (id: string) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ currentUser, onSelectResume }) => {
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const loadAdminStats = () => {
    setIsLoading(true);
    fetch('/api/admin/stats')
      .then(res => res.json())
      .then(data => {
        setStats(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    loadAdminStats();
  }, []);

  if (!currentUser || currentUser.role !== 'admin') {
    return (
      <div className="max-w-2xl mx-auto my-12 bg-white rounded-2xl p-8 border border-rose-200 text-center space-y-3">
        <ShieldCheck className="w-12 h-12 text-rose-500 mx-auto" />
        <h2 className="text-lg font-bold text-slate-900">Administrator Access Restricted</h2>
        <p className="text-xs text-slate-500">
          This management panel is reserved for academic faculty, project guides, and placement coordinators. 
          Use the quick-login dropdown in the navigation header to switch to the admin demo account.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-16">
      {/* Admin Header */}
      <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-rose-600" />
              <h1 className="text-2xl font-extrabold text-slate-900">
                Institutional Placement & System Administration
              </h1>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-200">
                Placement Officer Console
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Department of Computer Science &bull; Cohort 2025 Placement Readiness Analytics
            </p>
          </div>

          <button
            onClick={loadAdminStats}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Refresh Metrics
          </button>
        </div>
      </div>

      {isLoading || !stats ? (
        <div className="bg-white rounded-2xl p-12 text-center text-xs text-slate-500 border border-slate-200">
          Aggregating institutional placement data and skill frequencies...
        </div>
      ) : (
        <>
          {/* Top KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-slate-500 uppercase">
                <span>Registered Students</span>
                <Users className="w-4 h-4 text-indigo-600" />
              </div>
              <div className="text-3xl font-black text-slate-900">{stats.totalUsers}</div>
              <p className="text-[11px] text-slate-500">Total student candidate accounts</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-slate-500 uppercase">
                <span>Total Resume Scans</span>
                <FileText className="w-4 h-4 text-sky-600" />
              </div>
              <div className="text-3xl font-black text-sky-600">{stats.totalScans}</div>
              <p className="text-[11px] text-slate-500">Evaluations processed via NLP core</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-slate-500 uppercase">
                <span>Average Composite Score</span>
                <Award className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-3xl font-black text-emerald-600">{stats.avgScore} <span className="text-sm font-normal text-slate-400">/ 100</span></div>
              <p className="text-[11px] text-slate-500">Batch average readiness index</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-slate-500 uppercase">
                <span>Average ATS Score</span>
                <CheckCircle2 className="w-4 h-4 text-purple-600" />
              </div>
              <div className="text-3xl font-black text-purple-600">{stats.avgATS}%</div>
              <p className="text-[11px] text-slate-500">Automated scanner compliance</p>
            </div>
          </div>

          {/* Skill Distribution Frequency (Bar Graph) */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-indigo-600" />
                Frequently Detected Technical Skills (Batch Distribution)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Top skills recognized across student resumes to assist faculty in organizing targeted workshops.
              </p>
            </div>

            <div className="space-y-2.5 pt-2">
              {stats.topSkills.map((item: any, idx: number) => {
                const maxCount = stats.topSkills[0]?.count || 1;
                const percentage = Math.round((item.count / maxCount) * 100);
                return (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-800 font-mono">{item.name}</span>
                      <span className="text-slate-500 font-mono">{item.count} candidates</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Candidate Submissions Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-0">
            <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Recent Resume Submissions & Audits
                </h3>
                <p className="text-xs text-slate-500">Live feed of student evaluations</p>
              </div>

              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter candidate..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none w-56"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-50/70 border-b border-slate-200 text-slate-400 font-semibold uppercase text-[10px]">
                    <th className="py-3 px-6">Candidate Name</th>
                    <th className="py-3 px-4">File Name</th>
                    <th className="py-3 px-4">Composite Score</th>
                    <th className="py-3 px-4">ATS Rating</th>
                    <th className="py-3 px-4">Skills Found</th>
                    <th className="py-3 px-6">Submitted At</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {stats.recentAnalyses
                    .filter((a: any) =>
                      a.candidateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      a.fileName.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((item: any) => (
                      <tr
                        key={item.id}
                        onClick={() => onSelectResume(item.id)}
                        className="hover:bg-slate-50/60 cursor-pointer transition-colors"
                      >
                        <td className="py-3 px-6 font-bold text-slate-900">{item.candidateName}</td>
                        <td className="py-3 px-4 text-slate-500 font-mono text-[11px]">{item.fileName}</td>
                        <td className="py-3 px-4">
                          <span className="font-bold text-indigo-600">{item.overallScore} / 100</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-bold text-emerald-600">{item.atsScore}%</span>
                        </td>
                        <td className="py-3 px-4 text-slate-600 font-mono">{item.skillsCount} skills</td>
                        <td className="py-3 px-6 text-slate-400 text-[11px]">
                          {new Date(item.uploadedAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Registered User Management Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-0">
            <div className="p-6 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">Registered Students & Faculty</h3>
              <p className="text-xs text-slate-500">System user directory</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-50/70 border-b border-slate-200 text-slate-400 font-semibold uppercase text-[10px]">
                    <th className="py-3 px-6">Name</th>
                    <th className="py-3 px-4">Email</th>
                    <th className="py-3 px-4">Role</th>
                    <th className="py-3 px-4">College / Dept</th>
                    <th className="py-3 px-4">Target Role</th>
                    <th className="py-3 px-6">Joined</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {stats.recentUsers.map((user: User) => (
                    <tr key={user.id} className="hover:bg-slate-50/60">
                      <td className="py-3 px-6 font-bold text-slate-900">{user.name}</td>
                      <td className="py-3 px-4 text-slate-600">{user.email}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                            user.role === 'admin'
                              ? 'bg-rose-100 text-rose-800'
                              : 'bg-indigo-100 text-indigo-800'
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-500">{user.college}</td>
                      <td className="py-3 px-4 text-slate-700 font-medium">{user.targetRole || 'Software Engineer'}</td>
                      <td className="py-3 px-6 text-slate-400 text-[11px]">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
