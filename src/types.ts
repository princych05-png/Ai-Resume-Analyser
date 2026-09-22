export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin' | 'user';
  college?: string;
  degree?: string;
  graduationYear?: string | number;
  targetRole?: string;
  createdAt: string;
}

export interface ExtractedContact {
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  portfolio: string;
  location: string;
}

export interface EducationItem {
  institution: string;
  degree: string;
  fieldOfStudy?: string;
  year?: string;
  gpa?: string;
}

export interface ExperienceItem {
  title: string;
  company: string;
  duration?: string;
  description: string[];
}

export interface ProjectItem {
  title: string;
  technologies: string[];
  description: string;
  impact?: string;
}

export interface ExtractedSkills {
  technical: string[];
  soft: string[];
  languages: string[];
  frameworks: string[];
  tools: string[];
  databases: string[];
  cloudDevOps: string[];
}

export interface ATSCheckItem {
  category: string;
  title: string;
  status: 'pass' | 'warning' | 'fail';
  message: string;
  tip?: string;
}

export interface ATSReport {
  overallScore: number;
  wordCount: number;
  readingTimeMinutes: number;
  actionVerbsCount: number;
  measurableMetricsCount: number;
  sectionsDetected: string[];
  missingCrucialSections: string[];
  formatIssues: string[];
  checks: ATSCheckItem[];
  keywordDensity: { keyword: string; count: number; density: number }[];
}

export interface ScoreBreakdown {
  skillsScore: number;       // out of 25
  experienceScore: number;   // out of 20
  projectsScore: number;     // out of 20
  educationScore: number;    // out of 15
  atsFormattingScore: number;// out of 10
  impactVerbsScore: number;  // out of 10
  overallScore: number;      // out of 100
}

export interface Recommendation {
  id: string;
  type: 'critical' | 'improvement' | 'strength' | 'learning';
  category: 'skills' | 'projects' | 'formatting' | 'certifications' | 'experience';
  title: string;
  description: string;
  actionableStep: string;
}

export interface BulletImprovement {
  original: string;
  improved: string;
  technique: string;
  actionVerbUsed: string;
  metricsAdded: string;
}

export interface JobMatchResult {
  jobTitle: string;
  matchScore: number; // 0 - 100
  semanticSimilarity: number; // 0 - 100
  matchingSkills: string[];
  missingSkills: string[];
  recommendedSkillsToLearn: { skill: string; reason: string; priority: 'High' | 'Medium' | 'Low' }[];
  matchSummary: string;
  competencyBreakdown: {
    domainKnowledge: number;
    toolsAndTech: number;
    softSkills: number;
    experienceFit: number;
  };
}

export interface ResumeAnalysisResult {
  id: string;
  userId?: string;
  fileName: string;
  uploadedAt: string;
  rawText: string;
  contact: ExtractedContact;
  education: EducationItem[];
  experience: ExperienceItem[];
  projects: ProjectItem[];
  certifications: string[];
  achievements: string[];
  skills: ExtractedSkills;
  scores: ScoreBreakdown;
  atsReport: ATSReport;
  recommendations: Recommendation[];
  bulletImprovements: BulletImprovement[];
  jobMatch?: JobMatchResult;
}

export interface JobDescriptionTemplate {
  id: string;
  title: string;
  company: string;
  experienceLevel: string;
  description: string;
  requiredSkills: string[];
  preferredSkills: string[];
}
