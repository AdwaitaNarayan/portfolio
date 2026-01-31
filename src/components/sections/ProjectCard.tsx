"use client";

import { motion } from "framer-motion";

interface Project {
    title: string;
    description: string;
    tech: string[];
    github: string | null;
    demo: string | null;
}

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group py-8 border-b border-white/[0.06] last:border-0"
        >
            <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-4">
                <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-serif text-white mb-2 group-hover:text-zinc-400 transition-colors duration-500">
                        {project.title}
                    </h3>
                    <p className="text-sm text-zinc-500 leading-relaxed max-w-xl">
                        {project.description}
                    </p>
                </div>

                <div className="flex flex-wrap gap-x-4 gap-y-2">
                    {project.tech.map((t) => (
                        <span key={t} className="text-[10px] uppercase tracking-widest text-zinc-600 font-semibold">
                            {t}
                        </span>
                    ))}
                </div>
            </div>

            <div className="mt-6 flex gap-6">
                {project.github && (
                    <a href={project.github} className="text-xs text-zinc-400 hover:text-white transition-colors">
                        Source ↗
                    </a>
                )}
                {project.demo && (
                    <a href={project.demo} className="text-xs text-zinc-400 hover:text-white transition-colors">
                        Live ↗
                    </a>
                )}
            </div>
        </motion.div>
    );
}
