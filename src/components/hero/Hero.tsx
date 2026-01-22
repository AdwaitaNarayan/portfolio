"use client";

import { motion } from "framer-motion";
import { Github, FileText } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export default function Hero() {
  const handleScrollToProjects = () => {
    const element = document.querySelector("#projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <motion.section
      className="flex min-h-[90vh] items-center justify-center bg-zinc-950"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="mx-auto max-w-6xl px-6 py-24 text-center">
        <motion.h1
          variants={itemVariants}
          className="mb-6 text-5xl font-bold tracking-tight text-zinc-50 md:text-6xl lg:text-7xl"
        >
          Adwaita Narayan Behera
        </motion.h1>
        <motion.h2
          variants={itemVariants}
          className="mb-6 text-2xl font-medium text-zinc-300 md:text-3xl"
        >
          GenAI Engineer
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-zinc-400"
        >
          Building and deploying AI systems that solve real-world problems
        </motion.p>
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={handleScrollToProjects}
            className="rounded-lg border border-zinc-700 bg-zinc-900 px-6 py-3 text-sm font-medium text-zinc-50 transition-colors hover:border-zinc-600 hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:ring-offset-2 focus:ring-offset-zinc-950"
            aria-label="Scroll to projects section"
          >
            View Projects
          </button>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900 px-6 py-3 text-sm font-medium text-zinc-50 transition-colors hover:border-zinc-600 hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:ring-offset-2 focus:ring-offset-zinc-950"
            aria-label="View resume"
          >
            <FileText size={18} aria-hidden="true" />
            Resume
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900 px-6 py-3 text-sm font-medium text-zinc-50 transition-colors hover:border-zinc-600 hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:ring-offset-2 focus:ring-offset-zinc-950"
            aria-label="Visit GitHub profile"
          >
            <Github size={18} aria-hidden="true" />
            GitHub
          </a>
        </motion.div>
      </div>
    </motion.section>
  );
}
