"use client";

import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Github, ExternalLink, Bookmark, Eye, Heart, GitFork, ArrowUpRight } from "lucide-react";
import type { Project } from "./Projects";

// ─── CountUp Component ────────────────────────────────────────────────────────
function CountUp({ target, trigger }: { target: number; trigger: boolean }) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!trigger) return;
        let start = 0;
        const end = target;
        if (start === end) return;
        let totalDuration = 1200;
        let increment = end / (totalDuration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);
        return () => clearInterval(timer);
    }, [trigger, target]);
    return <>{count.toLocaleString()}</>;
}

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    // ─── 3D Tilt Logic ────────────────────────────────────────────────────────
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { stiffness: 150, damping: 20 };
    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), springConfig);
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), springConfig);

    // Smooth light position
    const lightX = useSpring(mouseX, { stiffness: 60, damping: 20 });
    const lightY = useSpring(mouseY, { stiffness: 60, damping: 20 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXVal = e.clientX - rect.left;
        const mouseYVal = e.clientY - rect.top;

        const xPct = mouseXVal / width - 0.5;
        const yPct = mouseYVal / height - 0.5;

        x.set(xPct);
        y.set(yPct);
        mouseX.set(mouseXVal);
        mouseY.set(mouseYVal);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={cardRef}
            layout
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6, delay: index * 0.05 }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            style={{ perspective: 1200 }}
            className="group relative bg-black p-8 md:p-12 border-b border-white/[0.03] overflow-hidden"
        >
            {/* ── Floating Animation & 3D Layer ── */}
            <motion.div
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                animate={isHovered ? {} : { y: [0, -8, 0] }}
                transition={isHovered ? {} : { duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10 w-full"
            >
                {/* ── Glowing Cursor Light Source ── */}
                <motion.div
                    className="absolute pointer-events-none z-0 rounded-full blur-[80px]"
                    style={{
                        left: lightX,
                        top: lightY,
                        width: 300,
                        height: 300,
                        marginLeft: -150,
                        marginTop: -150,
                        background: `radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)`,
                        opacity: isHovered ? 1 : 0
                    }}
                />

                {/* ── Card Header + Star Button ── */}
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <motion.span
                            animate={{ opacity: isHovered ? 1 : 0.4 }}
                            className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400 mb-2 block"
                        >
                            {project.type} — {new Date(project.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short' })}
                        </motion.span>
                        <h3 className="text-3xl md:text-5xl font-serif text-white tracking-tight leading-none">
                            {project.title}
                        </h3>
                    </div>

                    <motion.button
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: isHovered ? 1 : 0, opacity: isHovered ? 1 : 0 }}
                        className="p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
                    >
                        <Bookmark size={18} />
                    </motion.button>
                </div>

                {/* ── Description with Auto-Expand ── */}
                <div className="relative mb-10 max-w-2xl">
                    <motion.p
                        animate={{ height: isHovered ? "auto" : "3.5rem" }}
                        className="text-base text-zinc-500 leading-relaxed overflow-hidden"
                    >
                        {project.description}
                    </motion.p>
                    <AnimatePresence>
                        {!isHovered && (
                            <motion.div
                                exit={{ opacity: 0 }}
                                className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-black to-transparent"
                            />
                        )}
                    </AnimatePresence>
                </div>

                {/* ── Tech Tags Staggered ── */}
                <div className="flex flex-wrap gap-3 mb-12">
                    {project.tech.map((t, i) => (
                        <motion.span
                            key={t}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: isHovered ? 1 : 0.4, y: isHovered ? 0 : 0 }}
                            transition={{ delay: isHovered ? i * 0.05 : 0 }}
                            whileHover={{ scale: 1.1, color: "#fff", backgroundColor: "rgba(255,255,255,0.05)" }}
                            className="px-3 py-1 rounded-full text-[10px] uppercase tracking-widest text-zinc-600 font-bold border border-white/5 bg-white/[0.02] flex items-center gap-2"
                        >
                            <div className="w-1 h-1 rounded-full bg-cyan-500" />
                            {t}
                        </motion.span>
                    ))}
                </div>

                {/* ── Footer: Stats + Links ── */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pt-8 border-t border-white/5">

                    <div className="flex gap-8">
                        <div className="flex items-center gap-2">
                            <Eye size={14} className="text-zinc-600" />
                            <span className="text-xs font-bold text-zinc-400">
                                <CountUp target={project.stats.views} trigger={isHovered} />
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Heart size={14} className="text-zinc-600" />
                            <span className="text-xs font-bold text-zinc-400">
                                <CountUp target={project.stats.likes} trigger={isHovered} />
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <GitFork size={14} className="text-zinc-600" />
                            <span className="text-xs font-bold text-zinc-400">
                                <CountUp target={project.stats.forks} trigger={isHovered} />
                            </span>
                        </div>
                    </div>

                    <div className="flex gap-6 items-center">
                        {project.github && (
                            <motion.a
                                whileHover={{ scale: 1.1, x: 4 }}
                                href={project.github}
                                target="_blank"
                                className="group/link flex items-center gap-2 text-xs text-zinc-400 hover:text-white transition-colors uppercase tracking-[0.2em] font-black"
                            >
                                <Github size={14} />
                                Source
                                <motion.span animate={{ x: isHovered ? 2 : 0 }}>
                                    <ArrowUpRight size={14} className="opacity-40" />
                                </motion.span>
                            </motion.a>
                        )}
                        <motion.button
                            animate={{
                                y: isHovered ? 0 : 20,
                                opacity: isHovered ? 1 : 0
                            }}
                            className="flex items-center gap-3 bg-white text-black px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-[0_10px_30px_rgba(255,255,255,0.1)]"
                        >
                            View Project <ArrowUpRight size={14} />
                        </motion.button>
                    </div>
                </div>
            </motion.div>

            {/* ── Hover Border Overlay ── */}
            <motion.div
                className="absolute inset-0 pointer-events-none z-20 border border-white/0"
                animate={{ borderColor: isHovered ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0)" }}
            />
        </motion.div>
    );
}
