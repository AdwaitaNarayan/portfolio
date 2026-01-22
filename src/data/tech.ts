export interface TechCategory {
  name: string;
  technologies: string[];
}

export const techStack: TechCategory[] = [
  {
    name: "Languages",
    technologies: ["Python", "TypeScript", "JavaScript", "SQL"],
  },
  {
    name: "AI / ML",
    technologies: [
      "PyTorch",
      "TensorFlow",
      "Scikit-learn",
      "Transformers",
    ],
  },
  {
    name: "GenAI",
    technologies: [
      "LangChain",
      "OpenAI API",
      "RAG",
      "OCR",
      "LLMs",
    ],
  },
  {
    name: "Backend",
    technologies: ["FastAPI", "Node.js"],
  },
  {
    name: "Databases",
    technologies: ["PostgreSQL", "MongoDB", "Redis"],
  },
  {
    name: "Tools",
    technologies: ["Docker", "Git", "AWS", "Celery", "Alembic"],
  },
];
