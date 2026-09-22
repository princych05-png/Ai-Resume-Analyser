# AI Resume Analyzer & Job Matching System

A full-stack, enterprise-grade AI-powered resume parsing and placement readiness platform engineered as a final-year Computer Science & Engineering capstone project.

[![Node.js](https://img.shields.io/badge/Node.js-v18+-68a063.svg)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-19-61dafb.svg)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6.svg)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v4-38bdf8.svg)](https://tailwindcss.com)

---

## 📌 Project Overview

This platform automatically parses candidate resumes in **PDF** and **Word DOCX** formats, executes deep heuristic ATS compliance audits, categorizes 600+ technical and soft skills, computes semantic vector alignment against role job descriptions using **TF-IDF & Cosine Similarity**, and re-writes weak bullet points using the **Google XYZ framework**.

It also features a complete **Placement Officer & Admin Console** for department-wide candidate tracking and a **22-Chapter Academic Documentation Suite** with complete system architecture, DFDs, ER diagrams, test cases, and viva voce guides.

---

## 🚀 Key Modules & Capabilities

1. **Resume Ingestion & Parsing**
   - Supports binary streaming for `.pdf` (via `pdf-parse`) and `.docx` (via `mammoth`).
   - File validation (type checking and 5 MB size constraint) plus live text-paste sandbox.

2. **AI/NLP Extraction Pipeline**
   - **Boundary Segmentation**: Identifies Contact Information, Education, Skills, Projects, Work Experience, Certifications, and Achievements.
   - **Entity Extraction**: Regex parsers for Emails, Phone Numbers, LinkedIn, GitHub, and Portfolio URLs.
   - **Skill Taxonomy**: Categorizes 600+ skills into Languages, Frameworks, Databases, Cloud & DevOps, AI/ML, Developer Tools, and Soft Skills.

3. **Dual Scoring System**
   - **Composite Resume Score (0–100)**: Evaluated across 6 weighted placement dimensions (Skills, Projects, Experience, Education, ATS Structure, Active Verbs).
   - **ATS Diagnostic Audit (12 Automated Checks)**: Verifies file parsability, contact completeness, keyword density distribution, action verb frequencies, and measurable impact metrics.

4. **TF-IDF & Cosine Similarity Job Matching**
   - Mathematical vector space alignment comparing candidate experience with Job Description requirements.
   - Interactive competency alignment breakdown (Domain Knowledge, Tools & Tech, Soft Skills, Experience Fit).
   - Identifies matching keywords, critical missing requirements, and prioritized skills to learn.

5. **Google XYZ Bullet Point Optimizer**
   - Transforms passive statements into high-conversion accomplishments using the STAR / Google XYZ formula: *"Accomplished [X] as measured by [Y], by doing [Z]"*.
   - Includes before/after examples and 1-click clipboard integration.

6. **Placement Officer & Institutional Admin Dashboard**
   - Cohort-wide analytics: student registration rosters, average readiness scores, and visual distribution bar graphs of top skills across candidates.

7. **Academic Capstone Documentation Suite**
   - 22 comprehensive chapters (Abstract, Problem Statement, Objectives, DFD Level 0/1/2, ER Diagrams, Module Specifications, Test Cases Matrix, SQL DDL Script, and Examiner Viva Voce Q&As).
   - Printable report generator and downloadable `schema.sql` and `requirements.txt`.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Lucide Icons, Motion
- **Backend**: Node.js, Express, tsx
- **NLP & Parsing**: `pdf-parse`, `mammoth`, TF-IDF Vector Space Model, Regex NER
- **AI Integration**: Optional `@google/genai` Gemini SDK proxy for advanced bullet rewriting
- **Database Architecture**: In-memory relational store with full PostgreSQL/MySQL DDL migration schema provided in `schema.sql`

---

## 📦 Getting Started

### Prerequisites

- Node.js 18.x or later
- npm 9.x or later

### Installation

1. Clone or download this repository:
   ```bash
   git clone https://github.com/your-username/ai-resume-analyzer.git
   cd ai-resume-analyzer
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables (optional for Gemini AI features):
   ```bash
   cp .env.example .env
   # Add GEMINI_API_KEY="your-api-key" if utilizing Gemini enhancements
   ```

4. Launch development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

### Production Build

To compile both client and backend bundles for production deployment:
```bash
npm run build
npm start
```

---

## 📂 Project Directory Structure

```
├── server.ts                  # Express backend entry point with Vite middleware
├── server/
│   ├── db.ts                  # In-memory relational database & seed data
│   └── nlpEngine.ts           # Core NLP extraction, 600+ skill taxonomy, ATS & Cosine matcher
├── src/
│   ├── App.tsx                # Main application state and view router
│   ├── main.tsx               # Client entry point
│   ├── types.ts               # Core TypeScript models and interfaces
│   ├── index.css              # Global styles with Tailwind CSS
│   ├── components/
│   │   ├── Navbar.tsx         # Responsive header navigation
│   │   ├── LandingPage.tsx    # Presentation overview and quick test sandboxes
│   │   ├── ResumeUpload.tsx   # PDF/DOCX file uploader and paste sandbox
│   │   ├── AnalysisDashboard.tsx # Comprehensive score breakdown & ATS diagnostics
│   │   ├── JobMatcher.tsx     # Vector space cosine similarity matcher
│   │   ├── BulletEnhancer.tsx # Google XYZ bullet optimizer
│   │   ├── AnalysisHistory.tsx# Historical evaluation logs
│   │   ├── AdminPanel.tsx     # Placement officer dashboard & batch analytics
│   │   ├── ProjectDocsModal.tsx # 22-chapter academic report reader
│   │   └── UserProfileModal.tsx# Student/admin profile & account switcher
│   └── data/
│       ├── sampleResumes.ts   # Pre-built test resumes (Aarav, Neha, Vikram)
│       └── projectDocumentation.ts # Full 22-chapter capstone project report & SQL schema
├── metadata.json              # Platform configuration
├── package.json               # Dependencies and scripts
└── vite.config.ts             # Vite configuration
```

---

## 📜 License & Academic Integrity

This project is developed as an academic capstone project in Computer Science & Engineering. All rights reserved under the Apache-2.0 License.
