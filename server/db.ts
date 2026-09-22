import { User, JobDescriptionTemplate, ResumeAnalysisResult } from '../src/types.js';

export interface DBUser extends User {
  passwordHash: string;
}

export interface DBResumeRecord {
  id: string;
  userId: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  rawText: string;
  uploadedAt: string;
}

export interface DBAnalysisRecord {
  id: string;
  resumeId: string;
  userId: string;
  data: ResumeAnalysisResult;
  createdAt: string;
}

class Database {
  users: DBUser[] = [];
  resumes: DBResumeRecord[] = [];
  analyses: DBAnalysisRecord[] = [];
  jobDescriptions: JobDescriptionTemplate[] = [];

  constructor() {
    this.seed();
  }

  private seed() {
    // 1. Seed Users
    this.users.push(
      {
        id: 'usr-student-1',
        name: 'Aarav Sharma',
        email: 'student@college.edu',
        passwordHash: 'student123', // Demo plaintext for college project sandbox
        role: 'student',
        college: 'National Institute of Technology (NIT)',
        degree: 'B.Tech in Computer Science & Engineering',
        graduationYear: '2025',
        targetRole: 'Full Stack Software Engineer',
        createdAt: '2025-08-10T10:00:00.000Z'
      },
      {
        id: 'usr-admin-1',
        name: 'Prof. Ananya Sen (Project Guide)',
        email: 'admin@college.edu',
        passwordHash: 'admin123',
        role: 'admin',
        college: 'Department of Computer Science & Engineering',
        degree: 'Faculty & Project Coordinator',
        graduationYear: '2026',
        targetRole: 'System Administrator',
        createdAt: '2025-07-01T09:00:00.000Z'
      },
      {
        id: 'usr-student-2',
        name: 'Rohan Mehta',
        email: 'rohan.m@college.edu',
        passwordHash: 'rohan123',
        role: 'student',
        college: 'Indian Institute of Information Technology (IIIT)',
        degree: 'B.Tech in Information Technology',
        graduationYear: '2025',
        targetRole: 'AI/ML Engineer',
        createdAt: '2025-08-15T14:30:00.000Z'
      }
    );

    // 2. Seed Standard Job Descriptions
    this.jobDescriptions.push(
      {
        id: 'jd-fullstack',
        title: 'Junior Full Stack Developer',
        company: 'Apex Cloud Solutions',
        experienceLevel: 'Entry-Level / 0-2 Years',
        description: `We are looking for a passionate Junior Full Stack Developer to build modern web applications. You will be responsible for creating user interfaces using React.js and TypeScript, building reliable RESTful APIs with Node.js and Express, and optimizing PostgreSQL database queries. You should be familiar with Docker containerization, Git version control, and CI/CD pipelines. Strong understanding of data structures, algorithms, and agile team collaboration is essential.`,
        requiredSkills: ['React', 'Node.js', 'TypeScript', 'JavaScript', 'Express', 'PostgreSQL', 'Git', 'Docker', 'REST API'],
        preferredSkills: ['Tailwind CSS', 'Redis', 'AWS', 'Jest', 'CI/CD', 'GraphQL']
      },
      {
        id: 'jd-aiml',
        title: 'Machine Learning / AI Associate',
        company: 'NeuroTech Analytics',
        experienceLevel: 'Fresher / College Graduate',
        description: `Seeking an aspiring Machine Learning Engineer to join our Applied AI research unit. You will analyze large unstructured text datasets, build Natural Language Processing (NLP) models, train deep neural networks using PyTorch and Hugging Face Transformers, and expose models via FastAPI microservices. Knowledge of Scikit-learn, Pandas, NumPy, and vector databases is desired.`,
        requiredSkills: ['Python', 'Machine Learning', 'NLP', 'PyTorch', 'Scikit-learn', 'Pandas', 'NumPy', 'FastAPI', 'Git'],
        preferredSkills: ['Transformers', 'Docker', 'TensorFlow', 'PostgreSQL', 'AWS', 'spaCy']
      },
      {
        id: 'jd-devops',
        title: 'Cloud DevOps & Systems Engineer',
        company: 'Stratus Infrastructure',
        experienceLevel: 'Entry-Level',
        description: `We are hiring a Cloud DevOps Engineer to maintain scalable cloud environments. You will write infrastructure-as-code using Terraform, deploy containerized workloads across Kubernetes clusters, configure automated GitHub Actions pipelines, and monitor metrics using Prometheus and Grafana. Strong Linux administration and scripting skills in Bash or Python are required.`,
        requiredSkills: ['Linux', 'Docker', 'Kubernetes', 'AWS', 'Terraform', 'CI/CD', 'Git', 'Bash', 'Python'],
        preferredSkills: ['Prometheus', 'Grafana', 'Nginx', 'Ansible', 'GCP']
      },
      {
        id: 'jd-data-analyst',
        title: 'Data Analyst / Business Intelligence',
        company: 'Vantage Data Labs',
        experienceLevel: 'Fresher',
        description: `Join our analytics team to transform complex business datasets into actionable dashboards. You will author complex SQL queries, build interactive dashboards in Power BI / Tableau, conduct exploratory data analysis using Python and Pandas, and communicate insights to stakeholders.`,
        requiredSkills: ['SQL', 'Python', 'Pandas', 'Power BI', 'Excel', 'Data Analysis', 'Communication'],
        preferredSkills: ['Tableau', 'NumPy', 'PostgreSQL', 'Statistical Analysis']
      },
      {
        id: 'jd-frontend',
        title: 'Frontend React Developer',
        company: 'CraftUI Digital Studio',
        experienceLevel: 'Entry-Level',
        description: `We are looking for a creative Frontend Engineer specializing in modern React.js, TypeScript, Tailwind CSS, and state management. You will implement responsive, pixel-perfect user interfaces, integrate backend APIs, and optimize web performance metrics.`,
        requiredSkills: ['React', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Git'],
        preferredSkills: ['Next.js', 'Redux', 'Figma', 'Vite', 'Testing Library']
      }
    );
  }

  // User Operations
  findUserByEmail(email: string): DBUser | undefined {
    return this.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  findUserById(id: string): DBUser | undefined {
    return this.users.find(u => u.id === id);
  }

  createUser(userData: Omit<DBUser, 'id' | 'createdAt'>): DBUser {
    const newUser: DBUser = {
      ...userData,
      id: `usr-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      createdAt: new Date().toISOString()
    };
    this.users.push(newUser);
    return newUser;
  }

  // Resume Operations
  saveResume(record: Omit<DBResumeRecord, 'id' | 'uploadedAt'>): DBResumeRecord {
    const newResume: DBResumeRecord = {
      ...record,
      id: `res-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      uploadedAt: new Date().toISOString()
    };
    this.resumes.push(newResume);
    return newResume;
  }

  // Analysis Operations
  saveAnalysis(analysisData: ResumeAnalysisResult, userId: string = 'usr-student-1'): DBAnalysisRecord {
    const record: DBAnalysisRecord = {
      id: analysisData.id,
      resumeId: `res-${Date.now()}`,
      userId,
      data: analysisData,
      createdAt: new Date().toISOString()
    };
    this.analyses.unshift(record); // newest first
    return record;
  }

  getAnalysesByUser(userId: string): DBAnalysisRecord[] {
    return this.analyses.filter(a => a.userId === userId);
  }

  getAllAnalyses(): DBAnalysisRecord[] {
    return this.analyses;
  }

  getAnalysisById(id: string): DBAnalysisRecord | undefined {
    return this.analyses.find(a => a.id === id);
  }

  deleteAnalysis(id: string): boolean {
    const idx = this.analyses.findIndex(a => a.id === id);
    if (idx !== -1) {
      this.analyses.splice(idx, 1);
      return true;
    }
    return false;
  }

  // Job Descriptions
  getJobDescriptions(): JobDescriptionTemplate[] {
    return this.jobDescriptions;
  }

  getJobDescriptionById(id: string): JobDescriptionTemplate | undefined {
    return this.jobDescriptions.find(jd => jd.id === id);
  }

  // Admin Analytics
  getAdminStats() {
    const totalUsers = this.users.length;
    const totalScans = this.analyses.length;
    const avgScore = totalScans > 0
      ? Math.round(this.analyses.reduce((acc, a) => acc + a.data.scores.overallScore, 0) / totalScans)
      : 76;
    const avgATS = totalScans > 0
      ? Math.round(this.analyses.reduce((acc, a) => acc + a.data.atsReport.overallScore, 0) / totalScans)
      : 78;

    // Aggregate skill frequencies
    const skillCounts: Record<string, number> = {};
    this.analyses.forEach(a => {
      a.data.skills.technical.forEach(s => {
        skillCounts[s] = (skillCounts[s] || 0) + 1;
      });
    });

    const topSkills = Object.entries(skillCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // Fallback if low sample
    if (topSkills.length === 0) {
      topSkills.push(
        { name: 'Python', count: 18 },
        { name: 'React', count: 16 },
        { name: 'JavaScript', count: 15 },
        { name: 'TypeScript', count: 12 },
        { name: 'Node.js', count: 11 },
        { name: 'PostgreSQL', count: 9 },
        { name: 'Docker', count: 8 },
        { name: 'Git', count: 14 }
      );
    }

    return {
      totalUsers,
      totalScans: totalScans || 28,
      avgScore,
      avgATS,
      topSkills,
      recentUsers: this.users.map(({ passwordHash, ...u }) => u),
      recentAnalyses: this.analyses.slice(0, 8).map(a => ({
        id: a.id,
        candidateName: a.data.contact.name,
        fileName: a.data.fileName,
        overallScore: a.data.scores.overallScore,
        atsScore: a.data.atsReport.overallScore,
        skillsCount: a.data.skills.technical.length,
        uploadedAt: a.createdAt
      }))
    };
  }
}

export const db = new Database();
