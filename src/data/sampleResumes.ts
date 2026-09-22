export interface SampleResume {
  id: string;
  name: string;
  role: string;
  experienceLevel: string;
  fileName: string;
  text: string;
}

export const SAMPLE_RESUMES: SampleResume[] = [
  {
    id: 'sample-cs-grad',
    name: 'Aarav Sharma (B.Tech CSE)',
    role: 'Full Stack & Software Engineer',
    experienceLevel: 'Fresh Graduate / Entry-Level',
    fileName: 'Aarav_Sharma_Resume.pdf',
    text: `Aarav Sharma
Bengaluru, Karnataka, India | aarav.sharma@example.com | +91 98765 43210
linkedin.com/in/aarav-sharma | github.com/aaravsharma-dev | aaravdev.tech

PROFESSIONAL SUMMARY
Final-year Computer Science undergraduate with hands-on experience building full-stack web applications and machine learning prototypes. Proficient in React, TypeScript, Node.js, Python, and PostgreSQL with a solid grasp of data structures and cloud deployment.

EDUCATION
Bachelor of Technology (B.Tech) in Computer Science & Engineering
National Institute of Technology (NIT) | 2021 – 2025 | CGPA: 8.8 / 10

TECHNICAL SKILLS
• Programming Languages: Python, JavaScript, TypeScript, C++, SQL, Bash
• Frontend Technologies: React, Next.js, Tailwind CSS, HTML5, CSS3, Redux
• Backend & APIs: Node.js, Express, FastAPI, REST APIs, GraphQL
• Databases: PostgreSQL, MongoDB, Redis, SQLite
• Cloud & DevOps: Docker, Git, GitHub Actions, AWS (EC2, S3), Linux
• AI & Data Science: Machine Learning, Scikit-learn, Pandas, NumPy, NLP

PROJECTS
AI Resume Analyzer & ATS Screener (React, TypeScript, Node.js, Express, NLP)
• Architected a responsive web application that extracts resume text and evaluates ATS compatibility across 12 criteria.
• Engineered cosine similarity matching with TF-IDF vectorization, computing job description alignment with 95% accuracy.
• Implemented Google XYZ bullet rewriter resulting in 40% higher metric density in candidate profiles.

Cloud Distributed Task Queue (Python, Redis, FastAPI, Docker)
• Developed an asynchronous job scheduler handling 1,500+ concurrent tasks with sub-15ms message distribution latency.
• Containerized microservices using Docker Compose and automated testing via GitHub Actions CI/CD pipelines.

WORK EXPERIENCE
Software Engineering Intern | CloudScale Technologies | Jan 2024 – June 2024
• Spearheaded migration of 14 monolithic API endpoints to modular Express microservices, improving response times by 32%.
• Collaborated in an agile scrum team of 8 engineers, authoring comprehensive unit test suites achieving 88% code coverage.

CERTIFICATIONS
• AWS Certified Cloud Practitioner (2024)
• DeepLearning.AI Specialization in Natural Language Processing

ACHIEVEMENTS
• Winner, Smart India Hackathon (College Chapter, 2023) - 1st place out of 64 competing teams.
• Solved 450+ problems on LeetCode & Codeforces.`
  },
  {
    id: 'sample-aiml',
    name: 'Neha Verma (Data & AI)',
    role: 'AI / Machine Learning Engineer',
    experienceLevel: 'Final Year / Research Intern',
    fileName: 'Neha_Verma_AI_Resume.docx',
    text: `Neha Verma
Hyderabad, Telangana, India | neha.verma@example.com | +91 91234 56789
linkedin.com/in/neha-verma-ai | github.com/nehav-ai

OBJECTIVE
Motivated Computer Science senior specializing in Machine Learning, Natural Language Processing, and Computer Vision. Seeking an AI Engineer role to deploy production-ready deep learning models.

EDUCATION
Bachelor of Technology in Artificial Intelligence & Data Science
Indian Institute of Information Technology (IIIT) | 2021 – 2025 | CGPA: 9.1 / 10

TECHNICAL SKILLS
• Core Languages: Python, C++, SQL, R
• Machine Learning & Deep Learning: PyTorch, TensorFlow, Scikit-learn, Keras, Hugging Face, Transformers, BERT, OpenCV
• Data Analysis & Processing: Pandas, NumPy, SciPy, Matplotlib, Seaborn, SpaCy, NLTK
• Backend & Tools: FastAPI, Flask, Docker, Git, Linux, Jupyter, Postman

PROJECTS
Multilingual Medical Text Summarizer (PyTorch, Transformers, FastAPI, Hugging Face)
• Fine-tuned a BioBERT transformer model on 120,000 biomedical abstracts, boosting ROUGE-1 score to 47.8.
• Deployed an asynchronous inference API with FastAPI and Docker, reducing inference latency by 42%.

Real-Time Object Detection for Autonomous Systems (YOLOv8, PyTorch, OpenCV)
• Trained custom object detection pipeline achieving 91.4% mAP across complex low-light urban driving conditions.
• Optimized model weights using TensorRT quantization, attaining real-time 45 FPS processing on edge GPUs.

INTERNSHIP EXPERIENCE
Machine Learning Intern | DataCortex Labs | May 2024 – July 2024
• Conducted exploratory data analysis on 2.5 million transactional records using Pandas and PySpark.
• Built an XGBoost customer churn prediction model with 89% accuracy, saving an estimated 15% customer attrition.

CERTIFICATIONS
• Deep Learning Specialization by Andrew Ng (Coursera)
• TensorFlow Developer Certificate

ACHIEVEMENTS
• Published research paper in IEEE Student Conference on Applied Deep Learning (2024).
• Kaggle 3x Notebooks & Datasets Expert.`
  },
  {
    id: 'sample-weak-resume',
    name: 'Vikram Rao (Needs Improvement)',
    role: 'Junior Web Developer (Needs Polish)',
    experienceLevel: 'Student',
    fileName: 'Vikram_Draft_Resume.pdf',
    text: `Vikram Rao
vikram.rao@mail.com | 9988776655

Education
B.Tech Computer Science
City College of Engineering
2021-2025

Skills
HTML, CSS, JavaScript, React, Python, MySQL, Git

Projects
Ecommerce Website
Made a website using Python and Django. Added login and cart features. Stored data in database.

Bug Tracking Tool
Worked on frontend with React. Fixed bugs and styled pages.

Experience
Web Developer Intern
Helped company build their landing page and updated text content.`
  }
];
