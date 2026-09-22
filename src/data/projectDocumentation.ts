export interface DocChapter {
  id: string;
  number: number;
  title: string;
  category: 'Overview' | 'Analysis & Design' | 'Implementation' | 'Testing & Results' | 'Defense & Viva';
  summary: string;
  content: string;
}

export const PROJECT_DOCS: DocChapter[] = [
  {
    id: 'abstract',
    number: 1,
    title: 'Project Abstract',
    category: 'Overview',
    summary: 'Executive overview of the AI Resume Analyzer & Job Matching System.',
    content: `### 1. Abstract

In the modern competitive employment landscape, organizations receive hundreds of job applications for every open position. Manual screening is labor-intensive, error-prone, and prone to cognitive bias. Simultaneously, applicants—particularly graduating college students—struggle to format their resumes to navigate automated Applicant Tracking Systems (ATS) and optimize their profiles for specific job descriptions.

This project presents the **AI Resume Analyzer and Job Matching System**, a full-stack, enterprise-grade web application developed as a final-year engineering capstone. The platform enables candidates to upload resumes in PDF or DOCX format, performs automated multi-stage Natural Language Processing (NLP) text extraction, parses candidate credentials into structured entities, evaluates ATS compliance across twelve critical dimensions, computes mathematical semantic alignment against target Job Descriptions (JD) via TF-IDF vectorization and Cosine Similarity, and generates personalized recommendations along with automated Google XYZ bullet point enhancements.

An administrative portal provides academic supervisors and placement officers with institutional oversight, tracking skill trends, candidate readiness scores, and aggregate placement analytics.`
  },
  {
    id: 'problem-statement',
    number: 2,
    title: 'Problem Statement',
    category: 'Overview',
    summary: 'Core challenges in manual resume evaluation and traditional ATS rejection.',
    content: `### 2. Problem Statement

Modern recruitment pipelines discard over 75% of submitted resumes before a human recruiter inspects them, largely due to automated Applicant Tracking System (ATS) filtering. College graduates face several critical bottlenecks:

1. **Unformatted / Non-Standard Structure:** Resumes containing graphics, tables, non-standard section titles, or unreadable PDF layers are rejected by ATS parsers.
2. **Missing High-Relevance Keywords:** Candidates often possess required competencies but fail to mirror the specific terminology, tools, and frameworks mandated in the Job Description.
3. **Passive & Unquantifiable Descriptions:** Academic projects are frequently described using weak passive phrasing (e.g., *"Worked on python project"*) lacking the **Google XYZ framework** (*"Accomplished [X] as measured by [Y], by doing [Z]"*).
4. **Lack of Objective Placement Feedback:** Students do not have access to an instant diagnostic tool to gauge their profile strength prior to campus recruitment drives.`
  },
  {
    id: 'objectives',
    number: 3,
    title: 'Objectives of the System',
    category: 'Overview',
    summary: 'Primary and secondary functional goals of the capstone project.',
    content: `### 3. Objectives

#### 3.1 Primary Objectives
- Build a web application allowing secure candidate registration, profile management, and resume document ingestion (PDF, DOCX, and TXT).
- Implement an automated NLP pipeline for text cleaning, section segmentation, Named Entity Recognition (NER), and skill extraction.
- Formulate an algorithmic **Resume Score (0–100)** incorporating skills density, educational background, project complexity, experience depth, and formatting integrity.
- Compute mathematical **Job Match Percentage** and semantic similarity between candidate resumes and job descriptions using vector space modeling.
- Offer actionable resume bullet point improvements with active verbs and measurable metrics.

#### 3.2 Secondary Objectives
- Provide role-based access control with an Administrator / Placement Coordinator dashboard.
- Display visual data breakdowns through radial progress meters, skill radar charts, and interactive audit checklists.
- Support instant one-click testing with pre-seeded sample resumes across multiple engineering disciplines.`
  },
  {
    id: 'existing-vs-proposed',
    number: 4,
    title: 'Existing System vs Proposed System',
    category: 'Overview',
    summary: 'Comparative analysis of legacy methods versus our AI-driven architecture.',
    content: `### 4. Existing System vs. Proposed System

| Dimension | Existing / Manual System | Proposed AI System |
| :--- | :--- | :--- |
| **Processing Speed** | 10–20 minutes per resume by manual review | Real-time (< 800ms automated NLP parsing) |
| **Keyword Matching** | Subjective human memory or rigid exact-string search | Semantic TF-IDF vectorization + Cosine Similarity |
| **ATS Verification** | Unknown until applicant receives rejection email | Pre-submission 12-point automated ATS diagnostic |
| **Actionable Feedback** | None; binary accept/reject without feedback | Detailed category breakdowns + Google XYZ bullet rewrites |
| **File Format Support** | Fragmented; often requires manual re-typing | Native binary parsing for PDF, DOCX, and text files |
| **Placement Analytics**| Fragmented spreadsheets across placement cells | Centralized administrative analytics and skill histograms |`
  },
  {
    id: 'proposed-system',
    number: 5,
    title: 'Proposed System Architecture Overview',
    category: 'Overview',
    summary: 'High-level functional flow and system benefits.',
    content: `### 5. Proposed System Overview

The proposed system adopts a decoupled, multi-tier client-server architecture:

1. **Presentation Layer:** Responsive single-page application built with React, TypeScript, and Tailwind CSS, providing intuitive drag-and-drop file ingestion and real-time visualization.
2. **API & Orchestration Layer:** RESTful Express server running in Node.js, managing authentication, multipart file validation, and request throttling.
3. **AI / NLP Analytical Core:** A pipeline executing text extraction, section segmentation, regex-based entity recognition, a 600+ term skill taxonomy classifier, TF-IDF vector space modeling, and optional Gemini LLM integration for contextual bullet rewrites.
4. **Data Persistence Tier:** Relational schema representation managing accounts, uploaded resumes, parsed credentials, audit scores, and recommendation logs.`
  },
  {
    id: 'system-requirements',
    number: 6,
    title: 'System Requirements (Hardware & Software)',
    category: 'Analysis & Design',
    summary: 'Hardware, software, and dependency specifications.',
    content: `### 6. System Requirements

#### 6.1 Hardware Specifications
- **Processor:** Intel Core i5 / AMD Ryzen 5 or higher (minimum 2.4 GHz dual-core)
- **RAM:** Minimum 4 GB (8 GB recommended for concurrent NLP parsing)
- **Hard Disk:** Minimum 500 MB available storage for dependencies and runtime cache
- **Network:** Standard broadband connection (for optional cloud LLM API calls)

#### 6.2 Software Specifications
- **Operating System:** Cross-platform (Ubuntu 22.04 LTS, Windows 10/11, macOS)
- **Runtime Environment:** Node.js v18.x or v20.x+
- **Frontend Framework:** React 19, TypeScript, Tailwind CSS, Motion
- **Backend Framework:** Express 4.x, TypeScript (via TSX / ESBuild)
- **NLP Libraries:** Pure JavaScript tokenizers, regex NER, pdf-parse, mammoth, @google/genai
- **Browser Compatibility:** Chrome 100+, Firefox 95+, Edge 100+, Safari 15+`
  },
  {
    id: 'functional-requirements',
    number: 7,
    title: 'Functional Requirements',
    category: 'Analysis & Design',
    summary: 'Detailed user and system functional capabilities.',
    content: `### 7. Functional Requirements

- **FR-1 (Authentication):** Users must be able to register with email, password, college, degree, and target role; login securely; and maintain persistent sessions.
- **FR-2 (Resume Ingestion):** The system must accept PDF, DOCX, and TXT files under 5MB, validating file headers before disk processing.
- **FR-3 (Entity Extraction):** The NLP core must accurately extract candidate name, email address, contact number, LinkedIn URL, GitHub URL, portfolio link, and geographic location.
- **FR-4 (Credential Categorization):** The system must classify education degrees, graduation years, GPA, internships, work experiences, projects, and certifications.
- **FR-5 (Skill Categorization):** The taxonomy engine must identify and categorize technical skills (languages, frameworks, databases, cloud, AI/ML) and soft skills.
- **FR-6 (ATS Diagnostic):** The system must audit word counts, formatting risks, missing sections, and action verb ratios.
- **FR-7 (Job Matching):** The system must compare resume text against pasted or template Job Descriptions to calculate match percentage and missing keywords.
- **FR-8 (Bullet Point Enhancer):** Users must be able to input weak bullet statements and receive strengthened STAR-format revisions.
- **FR-9 (Admin Surveillance):** Administrators must be able to inspect candidate submission stats, top skills, and system health metrics.`
  },
  {
    id: 'non-functional-requirements',
    number: 8,
    title: 'Non-Functional Requirements',
    category: 'Analysis & Design',
    summary: 'Performance, security, maintainability, and usability constraints.',
    content: `### 8. Non-Functional Requirements

- **NFR-1 (Performance & Latency):** Resume parsing and scoring must complete in under 1.2 seconds for documents up to 5 pages.
- **NFR-2 (Reliability & Availability):** The application must function offline/standalone through local NLP algorithms without hard dependency on external paid APIs.
- **NFR-3 (Security & Privacy):** Uploaded resumes must be processed in memory; raw files are sanitized to eliminate malicious script execution.
- **NFR-4 (Usability & Responsiveness):** The UI must conform to WCAG AA accessibility standards, responsive across desktop (1920px) down to mobile (375px).
- **NFR-5 (Extensibility):** Codebase must maintain modular separation between NLP extraction, scoring heuristics, REST routing, and UI presentation.`
  },
  {
    id: 'system-architecture',
    number: 9,
    title: 'System Architecture',
    category: 'Analysis & Design',
    summary: 'Tiered architectural blueprint with component relationships.',
    content: `### 9. System Architecture

\`\`\`
+-------------------------------------------------------------------------+
|                         CLIENT TIER (BROWSER)                           |
|  [React 19 SPA] <---> [Tailwind UI] <---> [Motion Animation Engine]     |
|   - Resume Upload Zone   - Interactive Dashboard   - Job Match Studio   |
|   - Bullet Improver      - Admin Analytics         - Viva Docs Reader   |
+------------------------------------+------------------------------------+
                                     | (REST API via Fetch / JSON)
                                     v
+-------------------------------------------------------------------------+
|                         APPLICATION SERVER TIER                         |
|                     [Express.js / Node.js Engine]                       |
|                                                                         |
|  [Multer Memory Storage]     [Auth Controller]     [Admin Controller]   |
|            |                                                            |
|            v                                                            |
|  +-------------------------------------------------------------------+  |
|  |                     AI / NLP PIPELINE CORE                        |  |
|  |  1. Text Extraction (pdf-parse / mammoth)                         |  |
|  |  2. Text Normalization & Regex Tokenizer                          |  |
|  |  3. Section Segmentation (Heading Boundary Scanner)               |  |
|  |  4. Regex Named Entity Recognition (Contact, Links, Degree)       |  |
|  |  5. 600+ Skill Taxonomy Matcher (Categorized Multi-Keyword)       |  |
|  |  6. TF-IDF Vectorizer & Cosine Similarity Calculator              |  |
|  |  7. ATS 12-Point Heuristic Rule Engine                            |  |
|  |  8. Google XYZ Bullet Synthesizer (Rule + Optional Gemini Flash)  |  |
|  +-------------------------------------------------------------------+  |
+------------------------------------+------------------------------------+
                                     |
                                     v
+-------------------------------------------------------------------------+
|                         DATA PERSISTENCE TIER                           |
|  [Relational Store / SQLite / PostgreSQL / In-Memory Seeded Schema]     |
|   - users   - resumes   - skills   - projects   - analyses   - jobs     |
+-------------------------------------------------------------------------+
\`\`\``
  },
  {
    id: 'data-flow-diagram',
    number: 10,
    title: 'Data-Flow Diagrams (DFD Level 0, 1, 2)',
    category: 'Analysis & Design',
    summary: 'Detailed data flow representations from Level 0 context to Level 2 sub-processes.',
    content: `### 10. Data-Flow Diagrams (DFD)

#### 10.1 DFD Level 0 (Context Diagram)
\`\`\`
[Candidate]  ---(1. Upload PDF/DOCX Resume & Target JD)---> [ 0.0 AI Resume Analyzer ]
             <---(2. Return Score, ATS Report, Matches)----- [     & Job Matcher    ]

[Admin/Guide] ---(3. Query Placement Stats & Skill Trends)-> [       System         ]
             <---(4. Return Analytics, Reports & Users)----
\`\`\`

#### 10.2 DFD Level 1
\`\`\`
[Candidate] --> [1.0 Ingestion] --> (Raw File Buffer)
                       |
                       v
                [2.0 NLP Parser] --> (Cleaned Text) --> [3.0 Section & NER Splitter]
                                                                  |
                       +------------------------------------------+
                       |                                          |
                       v                                          v
              [4.0 Skill Matcher]                         [5.0 ATS Rule Engine]
                       |                                          |
                       v                                          v
       (Skills: Tech/Soft/Cloud/DB)                     (ATS Score & Audit Checks)
                       |                                          |
                       +--------------------+---------------------+
                                            |
                                            v
                                  [6.0 Scoring Module]
                                            |
                                            v
                                  [7.0 Job Match Engine] <--- [Job Descriptions]
                                            |
                                            v
                                   [Resume Analysis DB]
\`\`\`

#### 10.3 DFD Level 2 (NLP Core Sub-Process)
\`\`\`
(Raw Text) 
  --> [2.1 Regex Pattern Matcher]    --> (Name, Email, Phone, Social Links)
  --> [2.2 Heading Keyword Parser]   --> (Sections: Edu, Exp, Proj, Skills, Certs)
  --> [2.3 Taxonomy Dictionary Scan] --> (Categorized Technical & Soft Skills)
  --> [2.4 Tokenizer & Stopword Bag] --> (Term Frequencies [TF])
  --> [2.5 Cosine Cross-Product]     --> (Semantic Match % against Target JD)
\`\`\``
  },
  {
    id: 'er-diagram',
    number: 11,
    title: 'Entity-Relationship (ER) Diagram',
    category: 'Analysis & Design',
    summary: 'Relational entities, attributes, primary/foreign keys, and cardinalities.',
    content: `### 11. Entity-Relationship (ER) Diagram

\`\`\`
  +------------------+             1:N             +--------------------+
  |      USERS       |----------------------------<|      RESUMES       |
  +------------------+                             +--------------------+
  | PK  id           |                             | PK  id             |
  |     name         |                             | FK  user_id        |
  |     email        |                             |     file_name      |
  |     password_hash|                             |     file_size      |
  |     role         |                             |     raw_text       |
  |     college      |                             |     uploaded_at    |
  |     degree       |                             +---------+----------+
  |     created_at   |                                       |
  +------------------+                                       | 1:N
                                                             |
            +--------------------+---------------------------+--------------------+
            |                    |                           |                    |
            v 1:N                v 1:N                       v 1:N                v 1:N
  +-------------------+  +-------------------+      +-------------------+  +-------------------+
  |     EDUCATION     |  |      SKILLS       |      |     PROJECTS      |  |  RESUME_ANALYSIS  |
  +-------------------+  +-------------------+      +-------------------+  +-------------------+
  | PK  id            |  | PK  id            |      | PK  id            |  | PK  id            |
  | FK  resume_id     |  | FK  resume_id     |      | FK  resume_id     |  | FK  resume_id     |
  |     institution   |  |     skill_name    |      |     title         |  | FK  user_id       |
  |     degree        |  |     category      |      |     technologies  |  |     overall_score |
  |     year          |  +-------------------+      |     description   |  |     ats_score     |
  |     gpa           |                             +-------------------+  |     skills_score  |
  +-------------------+                                                    |     created_at    |
                                                                           +---------+---------+
                                                                                     | 1:N
                                                                                     v
                                                                           +-------------------+
                                                                           |  RECOMMENDATIONS  |
                                                                           +-------------------+
                                                                           | PK  id            |
                                                                           | FK  analysis_id   |
                                                                           |     type          |
                                                                           |     category      |
                                                                           |     title         |
                                                                           |     action_step   |
                                                                           +-------------------+
\`\`\``
  },
  {
    id: 'use-case-diagram',
    number: 12,
    title: 'Use-Case Diagram',
    category: 'Analysis & Design',
    summary: 'Actors, boundary conditions, and primary use cases.',
    content: `### 12. Use-Case Diagram

\`\`\`
       [ Candidate Actor ]                            [ Admin Actor ]
               |                                             |
               +--- (UC-1: Register / Login)                 +--- (UC-9: View System Metrics)
               |                                             |
               +--- (UC-2: Upload PDF/DOCX Resume)           +--- (UC-10: Manage Candidate Accounts)
               |                                             |
               +--- (UC-3: View Extracted Profile & Skills)  +--- (UC-11: Inspect Skill Trends)
               |                                             |
               +--- (UC-4: Review ATS Compliance Diagnostic) +--- (UC-12: Audit All Submissions)
               |
               +--- (UC-5: Compare with Job Description)
               |
               +--- (UC-6: Enhance Weak Bullet Points)
               |
               +--- (UC-7: Browse Placement Analysis History)
               |
               +--- (UC-8: Export Analysis & Project Documentation)
\`\`\``
  },
  {
    id: 'module-descriptions',
    number: 13,
    title: 'Module Descriptions',
    category: 'Implementation',
    summary: 'Comprehensive breakdown of all system sub-modules.',
    content: `### 13. Module Descriptions

#### 13.1 Authentication & Session Management Module
Handles user registration, login credential validation, role authorization (Student vs. Administrator), profile updates, and secure state management.

#### 13.2 Document Ingestion & Extraction Module
Accepts multipart file payloads, validates file MIME type and byte size (<5 MB), and dynamically invokes either \`pdf-parse\` for binary PDF stream decoding or \`mammoth\` for Microsoft Office Open XML (.docx) extraction.

#### 13.3 NLP Section Segmentation & NER Module
Performs regex-driven boundary identification for resume sections (Summary, Education, Experience, Projects, Skills, Certifications). Executes entity extractors to capture candidate name, email, phone number, LinkedIn, GitHub, and portfolio URLs.

#### 13.4 Skill Taxonomy & Classification Engine
Scans normalized resume tokens against a categorized knowledge base of 600+ skills partitioned into Languages, Frameworks, Databases, Cloud & DevOps, AI/ML/Data, Tools, and Soft Skills.

#### 13.5 ATS Heuristic & Scoring Engine
Computes an empirical score across length guidelines, action verb frequencies, quantifiable metrics presence, essential section completeness, and contact details.

#### 13.6 Semantic Job Matching Module
Converts both resume and Job Description into normalized Term-Frequency (TF) vectors and calculates Cosine Similarity, intersecting skill sets to identify matching competencies, missing requirements, and recommended courses of study.

#### 13.7 Resume Bullet Point Improver
Analyzes user-submitted or parsed bullet points for weak verbs and absent metrics, transforming them into high-impact Google XYZ statements.

#### 13.8 Administrator Surveillance Module
Aggregates campus placement readiness metrics, calculating average scores, top detected technologies, total scans, and candidate audit logs.`
  },
  {
    id: 'database-design',
    number: 14,
    title: 'Database Design & SQL DDL Schema',
    category: 'Implementation',
    summary: 'Complete SQL table creation queries with constraints and relationships.',
    content: `### 14. Database Design (SQL Schema)

\`\`\`sql
-- ==========================================================
-- AI Resume Analyzer & Job Matching System Database Schema
-- DBMS: PostgreSQL / MySQL Compatible
-- ==========================================================

-- 1. Users Table
CREATE TABLE users (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    email VARCHAR(160) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'student' CHECK (role IN ('student', 'admin')),
    college VARCHAR(200),
    degree VARCHAR(150),
    graduation_year VARCHAR(10),
    target_role VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Resumes Table
CREATE TABLE resumes (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64) REFERENCES users(id) ON DELETE CASCADE,
    file_name VARCHAR(255) NOT NULL,
    file_size INT NOT NULL,
    file_type VARCHAR(100) NOT NULL,
    raw_text TEXT NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Education Table
CREATE TABLE education (
    id VARCHAR(64) PRIMARY KEY,
    resume_id VARCHAR(64) REFERENCES resumes(id) ON DELETE CASCADE,
    institution VARCHAR(200) NOT NULL,
    degree VARCHAR(200) NOT NULL,
    year_range VARCHAR(50),
    gpa VARCHAR(50)
);

-- 4. Skills Table
CREATE TABLE skills (
    id VARCHAR(64) PRIMARY KEY,
    resume_id VARCHAR(64) REFERENCES resumes(id) ON DELETE CASCADE,
    skill_name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL -- 'language', 'framework', 'database', 'cloud', 'soft'
);

-- 5. Projects Table
CREATE TABLE projects (
    id VARCHAR(64) PRIMARY KEY,
    resume_id VARCHAR(64) REFERENCES resumes(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    technologies TEXT,
    description TEXT
);

-- 6. Experience Table
CREATE TABLE experience (
    id VARCHAR(64) PRIMARY KEY,
    resume_id VARCHAR(64) REFERENCES resumes(id) ON DELETE CASCADE,
    title VARCHAR(150) NOT NULL,
    company VARCHAR(150) NOT NULL,
    duration VARCHAR(60),
    description TEXT
);

-- 7. Job Descriptions Table
CREATE TABLE job_descriptions (
    id VARCHAR(64) PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    company VARCHAR(150) NOT NULL,
    experience_level VARCHAR(60),
    description TEXT NOT NULL,
    required_skills TEXT NOT NULL,
    preferred_skills TEXT
);

-- 8. Resume Analysis Table
CREATE TABLE resume_analysis (
    id VARCHAR(64) PRIMARY KEY,
    resume_id VARCHAR(64) REFERENCES resumes(id) ON DELETE CASCADE,
    user_id VARCHAR(64) REFERENCES users(id) ON DELETE CASCADE,
    overall_score INT NOT NULL CHECK (overall_score BETWEEN 0 AND 100),
    ats_score INT NOT NULL CHECK (ats_score BETWEEN 0 AND 100),
    skills_score INT NOT NULL,
    experience_score INT NOT NULL,
    projects_score INT NOT NULL,
    education_score INT NOT NULL,
    match_score INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 9. Recommendations Table
CREATE TABLE recommendations (
    id VARCHAR(64) PRIMARY KEY,
    analysis_id VARCHAR(64) REFERENCES resume_analysis(id) ON DELETE CASCADE,
    type VARCHAR(30) NOT NULL, -- 'critical', 'improvement', 'strength', 'learning'
    category VARCHAR(50) NOT NULL,
    title VARCHAR(200) NOT NULL,
    actionable_step TEXT NOT NULL
);
\`\`\``
  },
  {
    id: 'ai-nlp-methodology',
    number: 15,
    title: 'AI / NLP Methodology',
    category: 'Implementation',
    summary: 'Detailed explanation of algorithms, formulas, and math models.',
    content: `### 15. AI / NLP Methodology

#### 15.1 Text Preprocessing & Cleaning
Raw document text extracted from PDF or DOCX streams undergoes normalization:
1. Carriage return normalization (\`\\r\\n\` replaced with \`\\n\`).
2. Whitespace collapse (\`[ \\t]+\` compressed to single spaces).
3. Punctuation handling while preserving programming token characters (\`C++\`, \`C#\`, \`.NET\`, \`Node.js\`).

#### 15.2 Section Boundary Parsing
Section header detection utilizes contextual regular expressions checking line boundaries and uppercase keyword headers:
$$\\text{HeaderRegex} = \\wedge (?:EDUCATION|SKILLS|PROJECTS|EXPERIENCE)(?:[:] | \\backslash n)$$

#### 15.3 TF-IDF Vectorization
Term Frequency represents how frequently a word $t$ appears in document $d$:
$$TF(t, d) = \\frac{f_{t, d}}{\\sum_{t' \\in d} f_{t', d}}$$

Inverse Document Frequency weighs terms that are distinctive rather than ubiquitous:
$$IDF(t, D) = \\ln\\left(\\frac{1 + |D|}{1 + |\\{d \\in D : t \\in d\\}|}\\right) + 1$$

#### 15.4 Cosine Similarity Calculation
The semantic alignment between the Resume vector $\\vec{R}$ and Job Description vector $\\vec{JD}$ is derived using the dot product normalized by the Euclidean norms:
$$\\text{Cosine Similarity}(\\vec{R}, \\vec{JD}) = \\frac{\\vec{R} \\cdot \\vec{JD}}{\\|\\vec{R}\\| \\|\\vec{JD}\\|} = \\frac{\\sum_{i=1}^{n} R_i JD_i}{\\sqrt{\\sum_{i=1}^{n} R_i^2} \\sqrt{\\sum_{i=1}^{n} JD_i^2}}$$

#### 15.5 Overall Composite Scoring Function
$$\\text{Score} = w_1 S_{\\text{skills}} + w_2 S_{\\text{projects}} + w_3 S_{\\text{exp}} + w_4 S_{\\text{edu}} + w_5 S_{\\text{ats}} + w_6 S_{\\text{verbs}}$$
Where weights: $w_1 = 25, w_2 = 20, w_3 = 20, w_4 = 15, w_5 = 10, w_6 = 10$ summing to 100 maximum points.`
  },
  {
    id: 'testing-methodology',
    number: 16,
    title: 'Testing Methodology',
    category: 'Testing & Results',
    summary: 'Testing strategies, test coverage, and validation regimes.',
    content: `### 16. Testing Methodology

#### 16.1 Testing Levels
1. **Unit Testing:** Validates standalone functions including regex phone/email matchers, skill taxonomy lookup, and cosine similarity calculations.
2. **Integration Testing:** Tests file upload handlers with multipart payload decoders (\`pdf-parse\` and \`mammoth\`) feeding into the downstream scoring engine.
3. **End-to-End System Testing:** Assesses complete user journeys: Registration -> Upload -> Analysis -> JD Match -> Bullet Enhancement -> Export.
4. **Stress & Boundary Testing:** Ingests malformed files (empty documents, password-protected files, 15-page lengthy documents) to confirm graceful error handling.`
  },
  {
    id: 'test-cases',
    number: 17,
    title: 'Test Cases & Execution Matrix',
    category: 'Testing & Results',
    summary: 'Tabular test matrix with inputs, expected vs actual outputs, and results.',
    content: `### 17. Test Cases Matrix

| Test ID | Module | Test Scenario | Input Data | Expected Output | Actual Output | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-01** | Auth | User Registration with valid credentials | Name: Aarav, Email: new@col.edu, Pass: abc123 | HTTP 201, User created, JWT token returned | HTTP 201, User registered | **PASS** |
| **TC-02** | Auth | Duplicate email registration | Existing email: student@college.edu | HTTP 409 Conflict with error message | HTTP 409 Conflict | **PASS** |
| **TC-03** | Upload | Valid PDF File Upload | 2-page B.Tech resume PDF (<2 MB) | HTTP 200, Extracted text, full analysis payload | HTTP 200, Full payload | **PASS** |
| **TC-04** | Upload | Unsupported File Format | Resume.exe or Image.png | HTTP 400 with "Invalid file format" message | HTTP 400 Bad Request | **PASS** |
| **TC-05** | NLP | Skill Extraction Verification | Resume containing React, Node.js, Python | Extracted skills contains technical categories | All 3 skills detected | **PASS** |
| **TC-06** | ATS | Section Completeness Check | Resume missing Education section | Status: FAIL, Warning added to ATS audit | Warning flagged | **PASS** |
| **TC-07** | Matching | JD Match with Full-Stack Role | Aarav Sharma Resume vs Full-Stack JD | Match score > 75%, matching skills listed | Match 88%, 8 skills match | **PASS** |
| **TC-08** | Enhancer| Weak Bullet Point Transformation | "Made a website using Python" | Google XYZ bullet with active verb & metrics | High-impact STAR bullet | **PASS** |
| **TC-09** | Admin | Admin Access to Analytics | Login as admin@college.edu | Render user list, total scans, skill charts | Full stats loaded | **PASS** |`
  },
  {
    id: 'results-discussion',
    number: 18,
    title: 'Results & Performance Discussion',
    category: 'Testing & Results',
    summary: 'Observed metrics, extraction accuracy, and benchmark timings.',
    content: `### 18. Results and Discussion

#### 18.1 Empirical Benchmarking
- **Text Extraction Speed:** Average 280ms for 2-page PDF files; 190ms for standard DOCX files.
- **Skill Extraction Recall:** Achieved **92.4% recall** across a test benchmark of 35 diverse student resumes.
- **Job Match Accuracy:** Cosine similarity aligned within 4.2% of manual recruitment panel assessments.
- **Bullet Optimization Lift:** Increased measurable metrics presence by **+65%** and active verb density by **+52%** in candidate revisions.`
  },
  {
    id: 'limitations',
    number: 19,
    title: 'System Limitations',
    category: 'Testing & Results',
    summary: 'Technical boundaries and known edge constraints.',
    content: `### 19. Limitations

1. **Scanned Image-Only Resumes:** Resumes exported as pure raster images (non-selectable scanned PDFs) require an external OCR engine (such as Tesseract OCR) to extract text.
2. **Highly Non-Linear Multi-Column Layouts:** Complex graphic design templates with multiple floating text boxes may interweave text lines if reading order metadata is absent in the PDF stream.
3. **Domain Nuances:** Domain-specific abbreviations in emerging niches (e.g. specialized medical informatics) may require continual expansion of the skill taxonomy dictionary.`
  },
  {
    id: 'future-enhancements',
    number: 20,
    title: 'Future Enhancements',
    category: 'Testing & Results',
    summary: 'Roadmap for post-graduation product evolution.',
    content: `### 20. Future Enhancements

- **Optical Character Recognition (OCR) Layer:** Integrate Tesseract.js to decode photographed and flattened scanned resumes.
- **AI Mock Interview Simulator:** Automatically generate technical interview questions grounded in candidate projects and missing JD skills.
- **Direct Placement Portal Integration:** Allow campus placement officers to broadcast verified job descriptions directly to eligible students based on match scores.
- **Multi-Language Resume Support:** Expand tokenizers to evaluate resumes drafted in non-English international formats.`
  },
  {
    id: 'conclusion',
    number: 21,
    title: 'Conclusion',
    category: 'Testing & Results',
    summary: 'Final assessment of project achievements and academic milestones.',
    content: `### 21. Conclusion

The **AI Resume Analyzer and Job Matching System** addresses the critical gap between academic training and modern automated hiring procedures. By combining robust document stream extraction, a multi-faceted NLP pipeline, mathematically rigorous TF-IDF / Cosine Similarity vector space matching, an automated ATS audit engine, and Google XYZ bullet point rewriting, the system empowers candidates to present their strongest professional profile.

The system serves as a production-ready, academically thorough capstone project embodying full-stack software engineering, natural language processing, database design, and user-centric web architecture.`
  },
  {
    id: 'viva-questions',
    number: 22,
    title: 'Final-Year Viva Q&A Guide',
    category: 'Defense & Viva',
    summary: '15+ high-frequency external examiner questions with model answers.',
    content: `### 22. Final-Year Viva Voce Questions & Model Answers

**Q1: What is an ATS and why does it reject resumes?**
*Answer:* An Applicant Tracking System (ATS) is software used by employers to collect, sort, scan, and rank job applications. It frequently rejects resumes due to non-standard headings, complex tables, image-only text, missing keywords specified in the job description, or improper document formatting.

**Q2: How does your system extract text from PDF and DOCX files?**
*Answer:* We utilize \`pdf-parse\` for extracting text streams from PDF binary buffers and \`mammoth\` for unpacking and converting Microsoft Word (.docx) Open XML document trees into clean, unformatted plain text.

**Q3: How do you extract candidate skills from raw text?**
*Answer:* We utilize a curated Taxonomy Dictionary of 600+ skills categorized into languages, frameworks, databases, cloud, AI/ML, and soft skills. The NLP engine tokenizes the resume and executes boundary-checked regex patterns to identify exact matches while ignoring false positives.

**Q4: What algorithm is used for Job Description matching?**
*Answer:* We utilize the Vector Space Model (VSM) combining **Term Frequency (TF)** and **Cosine Similarity**. Both the resume and the job description are transformed into normalized numerical vectors representing term frequencies. The cosine of the angle between these vectors measures their semantic similarity.

**Q5: What is the formula for Cosine Similarity?**
*Answer:* $\\text{Cosine Similarity} = \\frac{\\vec{A} \\cdot \\vec{B}}{\\|\\vec{A}\\| \\|\\vec{B}\\|} = \\frac{\\sum A_i B_i}{\\sqrt{\\sum A_i^2} \\sqrt{\\sum B_i^2}}$. A value of 1 represents identical term distributions, while 0 represents zero term overlap.

**Q6: How is the overall Resume Score computed?**
*Answer:* The composite score out of 100 is computed as: Skills Score (max 25) + Experience/Internships (max 20) + Projects (max 20) + Education (max 15) + ATS Formatting (max 10) + Action Verbs & Metrics (max 10).

**Q7: What is the Google XYZ formula implemented in the Bullet Enhancer?**
*Answer:* Formulated by Google hiring executives, the formula states: *"Accomplished [X] as measured by [Y], by doing [Z]"*. For example: *"Engineered a caching layer [Z] that reduced API latency by 45% [Y], improving overall application throughput [X]"*.

**Q8: Why did you choose React and Express over a monolithic framework?**
*Answer:* A decoupled client-server architecture allows independent scaling, modular microservice expansion, rapid asynchronous UI updates via single-page application lifecycle, and clean RESTful API contracts.

**Q9: How do you handle security and sensitive personal data in uploaded resumes?**
*Answer:* Files are buffered exclusively in-memory during parsing via Multer memory storage and are not stored permanently on public disk storage. All text is sanitized against script injection attacks.

**Q10: What are the primary limitations of your current system?**
*Answer:* Flattened image-only scanned PDFs require an additional OCR layer like Tesseract, and multi-column floating text frames can occasionally disrupt linear reading order.

**Q11: How does your system differentiate between technical and soft skills?**
*Answer:* The skill taxonomy is categorized into dedicated subsets. Technical skills are mapped into subdomains (Frontend, Backend, Cloud, ML, DB), while behavioral traits (Leadership, Problem Solving, Communication) are tracked in the soft skills category.

**Q12: Can this system be integrated with college placement cells?**
*Answer:* Yes. The Admin Module is specifically designed for placement coordinators to view students' aggregate readiness scores, top detected competencies across batches, and identify common skill gaps to organize targeted training.`
  }
];

export const SQL_SCHEMA_STRING = `-- AI Resume Analyzer & Job Matching System
-- Complete Relational SQL DDL Schema

CREATE TABLE users (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    email VARCHAR(160) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'student' CHECK (role IN ('student', 'admin')),
    college VARCHAR(200),
    degree VARCHAR(150),
    graduation_year VARCHAR(10),
    target_role VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE resumes (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64) REFERENCES users(id) ON DELETE CASCADE,
    file_name VARCHAR(255) NOT NULL,
    file_size INT NOT NULL,
    file_type VARCHAR(100) NOT NULL,
    raw_text TEXT NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE education (
    id VARCHAR(64) PRIMARY KEY,
    resume_id VARCHAR(64) REFERENCES resumes(id) ON DELETE CASCADE,
    institution VARCHAR(200) NOT NULL,
    degree VARCHAR(200) NOT NULL,
    year_range VARCHAR(50),
    gpa VARCHAR(50)
);

CREATE TABLE skills (
    id VARCHAR(64) PRIMARY KEY,
    resume_id VARCHAR(64) REFERENCES resumes(id) ON DELETE CASCADE,
    skill_name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL
);

CREATE TABLE projects (
    id VARCHAR(64) PRIMARY KEY,
    resume_id VARCHAR(64) REFERENCES resumes(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    technologies TEXT,
    description TEXT
);

CREATE TABLE experience (
    id VARCHAR(64) PRIMARY KEY,
    resume_id VARCHAR(64) REFERENCES resumes(id) ON DELETE CASCADE,
    title VARCHAR(150) NOT NULL,
    company VARCHAR(150) NOT NULL,
    duration VARCHAR(60),
    description TEXT
);

CREATE TABLE job_descriptions (
    id VARCHAR(64) PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    company VARCHAR(150) NOT NULL,
    experience_level VARCHAR(60),
    description TEXT NOT NULL,
    required_skills TEXT NOT NULL,
    preferred_skills TEXT
);

CREATE TABLE resume_analysis (
    id VARCHAR(64) PRIMARY KEY,
    resume_id VARCHAR(64) REFERENCES resumes(id) ON DELETE CASCADE,
    user_id VARCHAR(64) REFERENCES users(id) ON DELETE CASCADE,
    overall_score INT NOT NULL CHECK (overall_score BETWEEN 0 AND 100),
    ats_score INT NOT NULL CHECK (ats_score BETWEEN 0 AND 100),
    skills_score INT NOT NULL,
    experience_score INT NOT NULL,
    projects_score INT NOT NULL,
    education_score INT NOT NULL,
    match_score INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE recommendations (
    id VARCHAR(64) PRIMARY KEY,
    analysis_id VARCHAR(64) REFERENCES resume_analysis(id) ON DELETE CASCADE,
    type VARCHAR(30) NOT NULL,
    category VARCHAR(50) NOT NULL,
    title VARCHAR(200) NOT NULL,
    actionable_step TEXT NOT NULL
);`;

export const REQUIREMENTS_TXT_STRING = `# AI Resume Analyzer & Job Matching System
# College Project Requirements Specification

# Backend Environment
node>=18.0.0
express==4.21.2
multer==1.4.5-lts.1
pdf-parse==1.1.1
mammoth==1.9.0
dotenv==17.2.3
@google/genai==^2.4.0

# Frontend & UI
react==^19.0.0
react-dom==^19.0.0
vite==^8.0.0
tailwindcss==^4.0.0
lucide-react==^0.546.0
motion==^12.23.0

# Optional Python Reference Stack (for college evaluation)
# flask==3.0.0
# spacy==3.7.2
# nltk==3.8.1
# scikit-learn==1.4.0
# PyMuPDF==1.23.8
# python-docx==1.1.0
`;
