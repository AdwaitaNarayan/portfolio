"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import Image from "next/image";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const portraitVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 50 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const textVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const buttonVariants = {
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
    <section className="relative min-h-screen overflow-hidden bg-zinc-950">
      {/* Background Texture Overlay */}
      <div
        className="absolute inset-0 z-0 opacity-40"
        style={{
          backgroundImage: "url('/background-texture.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Gradient Overlays for Depth */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-zinc-950/50 via-transparent to-zinc-950/80" />

      <motion.div
        className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-6 py-20 lg:px-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid w-full gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Portrait Section */}
          <motion.div
            variants={portraitVariants}
            className="flex items-center justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Golden Glow Effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-500/20 via-orange-500/10 to-transparent blur-3xl" />

              {/* Portrait Image */}
              <div className="relative h-[320px] w-[320px] overflow-hidden rounded-full border-2 border-zinc-800/50 shadow-2xl md:h-[400px] md:w-[400px] lg:h-[450px] lg:w-[450px]">
                <Image
                  src="/portrait.png"
                  alt="Adwaita Narayan Behera - GenAI Engineer"
                  fill
                  className="object-cover"
                  priority
                  quality={95}
                />
              </div>

              {/* Accent Ring */}
              <div className="absolute -inset-4 -z-10 rounded-full border border-amber-500/10" />
            </div>
          </motion.div>

          {/* Text Content Section */}
          <div className="flex flex-col justify-center text-center lg:text-left">
            <motion.div variants={textVariants}>
              <h1 className="mb-4 text-5xl font-bold tracking-tight text-zinc-50 md:text-6xl lg:text-7xl">
                Adwaita Narayan
                <span className="block text-amber-500">Behera</span>
              </h1>
            </motion.div>

            <motion.div variants={textVariants}>
              <h2 className="mb-6 text-2xl font-medium text-zinc-300 md:text-3xl">
                GenAI Engineer
              </h2>
            </motion.div>

            <motion.p
              variants={textVariants}
              className="mb-8 max-w-xl text-lg leading-relaxed text-zinc-400"
            >
              Building and deploying AI systems that solve real-world problems.
              Specialized in RAG pipelines, OCR solutions, and production-ready ML systems.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={buttonVariants}
              className="flex flex-wrap gap-4 lg:justify-start justify-center"
            >
              <button
                onClick={handleScrollToProjects}
                className="group relative overflow-hidden rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 px-8 py-3.5 text-sm font-semibold text-zinc-950 transition-all hover:scale-105 hover:shadow-lg hover:shadow-amber-500/25 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-zinc-950"
              >
                <span className="relative z-10">View Projects</span>
                <div className="absolute inset-0 -z-0 bg-gradient-to-r from-orange-500 to-amber-500 opacity-0 transition-opacity group-hover:opacity-100" />
              </button>

              <a
                href="#contact"
                className="rounded-lg border border-zinc-700 bg-zinc-900/50 px-8 py-3.5 text-sm font-semibold text-zinc-50 backdrop-blur-sm transition-all hover:border-zinc-600 hover:bg-zinc-800/50 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:ring-offset-2 focus:ring-offset-zinc-950"
              >
                Get in Touch
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              variants={buttonVariants}
              className="mt-8 flex gap-4 lg:justify-start justify-center"
            >
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900/50 text-zinc-400 backdrop-blur-sm transition-all hover:border-amber-500/50 hover:bg-zinc-800/50 hover:text-amber-500 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-zinc-950"
                aria-label="GitHub Profile"
              >
                <Github size={20} />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900/50 text-zinc-400 backdrop-blur-sm transition-all hover:border-amber-500/50 hover:bg-zinc-800/50 hover:text-amber-500 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-zinc-950"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="#"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900/50 text-zinc-400 backdrop-blur-sm transition-all hover:border-amber-500/50 hover:bg-zinc-800/50 hover:text-amber-500 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-zinc-950"
                aria-label="Email Contact"
              >
                <Mail size={20} />
              </a>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-zinc-50 to-transparent dark:from-zinc-900" />
    </section>
  );
}
