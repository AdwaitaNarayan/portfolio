"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="bg-zinc-50 py-20 dark:bg-zinc-900">
      <div className="mx-auto max-w-4xl px-6">
        <h2 className="mb-6 text-3xl font-bold text-zinc-900 dark:text-zinc-50 md:text-4xl">
          About
        </h2>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950 md:p-8"
        >
          <div className="space-y-5 text-base leading-relaxed text-zinc-700 dark:text-zinc-300 md:text-lg">
            <p>
              I am a GenAI and Machine Learning Engineer with hands-on experience building OCR pipelines, Retrieval-Augmented Generation (RAG) systems, and fine-tuning large language models for real-world applications.
            </p>
            <p>
              I have worked on end-to-end AI systems — from data extraction and preprocessing to model training, API development, and deployment using Python and FastAPI.
            </p>
            <p>
              My focus is on building reliable, scalable AI solutions that can be integrated into production environments.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
