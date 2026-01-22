"use client";

import { techStack } from "@/src/data/tech";
import {
  Code,
  Database,
  Cpu,
  Brain,
  Link,
  Sparkles,
  Search,
  FileText,
  Server,
  Box,
  GitBranch,
  Cloud,
  Settings,
} from "lucide-react";
import { ComponentType } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const iconMap: Record<string, ComponentType<{ size?: number; className?: string }>> = {
  Python: Code,
  TypeScript: Code,
  JavaScript: Code,
  SQL: Database,
  "PyTorch": Cpu,
  TensorFlow: Cpu,
  "Scikit-learn": Cpu,
  Transformers: Brain,
  LangChain: Link,
  "OpenAI API": Sparkles,
  RAG: Search,
  OCR: FileText,
  LLMs: Brain,
  FastAPI: Server,
  "Node.js": Server,
  PostgreSQL: Database,
  MongoDB: Database,
  Redis: Database,
  Docker: Box,
  Git: GitBranch,
  AWS: Cloud,
  Celery: Settings,
  Alembic: Database,
};

function getIcon(tech: string) {
  return iconMap[tech] || Code;
}

export default function TechStack() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="bg-white py-20 dark:bg-zinc-950">
      <div className="mx-auto max-w-4xl px-6">
        <h2 className="mb-6 text-3xl font-bold text-zinc-900 dark:text-zinc-50 md:text-4xl">
          Tech Stack
        </h2>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {techStack.map((category) => (
            <div key={category.name} className="flex flex-col">
              <h3 className="mb-3 text-base font-semibold text-zinc-900 dark:text-zinc-50 md:text-lg">
                {category.name}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.technologies.map((tech) => {
                  const Icon = getIcon(tech);
                  return (
                    <div
                      key={tech}
                      className="group relative"
                      title={tech}
                      role="tooltip"
                      aria-label={tech}
                    >
                      <span className="flex items-center gap-2 rounded border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-sm text-zinc-700 transition-all hover:scale-105 hover:border-zinc-300 hover:bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-zinc-700 dark:hover:bg-zinc-800 dark:focus:ring-zinc-600">
                        <Icon size={14} className="flex-shrink-0" aria-hidden="true" />
                        <span>{tech}</span>
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
