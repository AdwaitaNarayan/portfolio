export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string | "Present";
  description: string[];
  technologies?: string[];
}

export const experiences: Experience[] = [
  {
    id: "1",
    company: "Hirekarma",
    role: "GenAI Engineer",
    startDate: "2024-01",
    endDate: "Present",
    description: [
      "Built AI-powered assessment platform processing 50K+ assessments monthly with automated question generation",
      "Developed RAG system for knowledge retrieval reducing response time by 60% and improving accuracy by 40%",
      "Implemented OCR pipeline for document processing handling 10K+ documents daily with 95% accuracy",
      "Deployed LLM-based evaluation system reducing manual grading time by 80% while maintaining quality standards"
    ],
    technologies: [
      "Python",
      "FastAPI",
      "LangChain",
      "OpenAI",
      "PostgreSQL",
      "React",
      "Docker",
      "AWS"
    ],
  },
  {
    id: "2",
    company: "AAANS Services",
    role: "Machine Learning Engineer",
    startDate: "2022-06",
    endDate: "2023-12",
    description: [
      "Developed and deployed ML models for predictive analytics improving forecast accuracy by 35%",
      "Built scalable data pipelines processing 5M+ records daily with 99.9% uptime",
      "Optimized model inference performance achieving 50% reduction in latency and 40% cost savings",
      "Led migration to cloud infrastructure reducing infrastructure costs by 45% while improving scalability"
    ],
    technologies: [
      "Python",
      "PyTorch",
      "TensorFlow",
      "FastAPI",
      "PostgreSQL",
      "AWS",
      "Docker",
      "Kubernetes"
    ],
  },
];
