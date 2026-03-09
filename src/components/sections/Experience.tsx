"use client";

import {
    motion, useScroll, useTransform, useInView, AnimatePresence, MotionValue,
} from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";

// ─── Data ─────────────────────────────────────────────────────────────────────
const STATS = [
    { label: "Experience", target: 6, suffix: "+" },
    { label: "Companies", target: 2, suffix: "" },
    { label: "Projects", target: 12, suffix: "+" },
];

const experiences = [
    {
        company: "Hirekarma Pvt. Ltd.",
        logoLetter: "H", logoColor: "bg-cyan-500",
        role: "AI Developer",
        period: "Nov 2025 – Present", duration: "Current Role",
        description: [
            "Engineered AI-driven assessment automation tools to streamline hiring workflows",
            "Architected scalable backend APIs using FastAPI, SQLAlchemy, and PostgreSQL",
            "Implemented ATS resume scoring systems and domain classification models",
            "Designed personalized job recommendation pipelines for candidate matching",
        ],
        achievements: [
            "Automated core hiring assessment evaluations",
            "Optimized database performance for large-scale candidate metadata",
        ],
        tech: ["Python", "FastAPI", "PostgreSQL", "SQLAlchemy", "Node.js", "React.js"],
    },
    {
        company: "AAANS Services Pvt. Ltd.",
        logoLetter: "A", logoColor: "bg-zinc-800",
        role: "AI/ML Engineer Intern",
        period: "July 2025 – Oct 2025", duration: "4 months",
        description: [
            "Developed Python automation pipelines for structured PDF data extraction",
            "Implemented high-throughput OCR pipelines for large-scale text processing",
            "Designed Retrieval-Augmented Generation (RAG) systems for interactive querying",
            "Fine-tuned LLMs for domain-specific question answering and classification",
        ],
        achievements: [
            "Significantly reduced manual data entry via automated extraction",
            "Improved OCR accuracy for complex document structures",
        ],
        tech: ["Python", "PaddleOCR", "PyTesseract", "LangChain", "HuggingFace", "FAISS"],
    },
];

// ─── CountUp ──────────────────────────────────────────────────────────────────
function CountUp({ target, suffix, trigger }: { target: number; suffix: string; trigger: boolean }) {
    const [count, setCount] = useState(0);
    const started = useRef(false);

    useEffect(() => {
        if (!trigger || started.current) return;
        started.current = true;
        const duration = 1600;
        const start = Date.now();
        const tick = () => {
            const elapsed = Date.now() - start;
            const t = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
            setCount(Math.round(eased * target));
            if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    }, [trigger, target]);

    return <>{count}{suffix}</>;
}

// ─── RoleTag with ripple on click ─────────────────────────────────────────────
type Ripple = { id: number; x: number; y: number };
function RoleTag({ role }: { role: string }) {
    const [ripples, setRipples] = useState<Ripple[]>([]);
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const id = Date.now();
        setRipples((p) => [...p, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }]);
        setTimeout(() => setRipples((p) => p.filter((r) => r.id !== id)), 700);
    };
    return (
        <div className="relative text-[12px] text-zinc-400 font-black uppercase tracking-wider overflow-hidden cursor-pointer select-none inline-block"
            data-cursor="name" onClick={handleClick}>
            {role}
            <AnimatePresence>
                {ripples.map((r) => (
                    <motion.span key={r.id}
                        className="absolute rounded-full bg-black/10 pointer-events-none"
                        style={{ left: r.x, top: r.y, width: 8, height: 8, marginLeft: -4, marginTop: -4 }}
                        initial={{ scale: 0, opacity: 0.7 }}
                        animate={{ scale: 12, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }} />
                ))}
            </AnimatePresence>
        </div>
    );
}

// ─── Experience Card with hover gradient + glow border ────────────────────────
function ExpCard({
    exp, scrollX, scrollOpacity, side,
}: {
    exp: typeof experiences[0];
    scrollX: MotionValue<string>;
    scrollOpacity: MotionValue<number>;
    side: "left" | "right";
}) {
    const [grad, setGrad] = useState({ x: 50, y: 50 });
    const [hovered, setHovered] = useState(false);

    const handleMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const r = e.currentTarget.getBoundingClientRect();
        setGrad({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
    }, []);

    return (
        <motion.div style={{ x: scrollX, opacity: scrollOpacity }}>
            <motion.div
                whileHover={{
                    scale: 1.03,
                    boxShadow: "0 24px 64px rgba(0,0,0,0.35), 0 0 0 1.5px rgba(6,182,212,0.45)",
                    zIndex: 10,
                }}
                transition={{ type: "spring", stiffness: 340, damping: 30 }}
                onMouseMove={handleMove}
                onHoverStart={() => setHovered(true)}
                onHoverEnd={() => setHovered(false)}
                className="bg-white p-8 flex flex-col shadow-lg border-l-4 border-black relative overflow-hidden h-full"
                style={{
                    backgroundImage: `radial-gradient(ellipse 60% 60% at ${grad.x}% ${grad.y}%, rgba(6,182,212,0.07) 0%, transparent 70%)`,
                }}
            >
                {/* Glow border inset animation */}
                <motion.div className="absolute inset-0 pointer-events-none"
                    animate={{ boxShadow: hovered ? "inset 0 0 0 1.5px rgba(6,182,212,0.40)" : "inset 0 0 0 0px transparent" }}
                    transition={{ duration: 0.28 }} />

                {/* Company header */}
                <div className="flex items-center gap-5 mb-8">
                    <motion.div
                        className={`w-14 h-14 flex-shrink-0 flex items-center justify-center ${exp.logoColor} text-white font-bold text-2xl rounded-sm`}
                        animate={{ boxShadow: hovered ? "0 0 20px rgba(6,182,212,0.4)" : "0 0 0px transparent" }}
                        transition={{ duration: 0.3 }}
                    >
                        {exp.logoLetter}
                    </motion.div>
                    <div>
                        <motion.h3
                            className="text-2xl font-black text-black border-b-2 border-black w-fit leading-tight mb-1 uppercase"
                            animate={{ textShadow: hovered ? "0 0 16px rgba(6,182,212,0.35)" : "0 0 0px transparent" }}
                            transition={{ duration: 0.3 }}
                        >
                            {exp.company}
                        </motion.h3>
                        {/* Role badge with scale-in on hover + ripple */}
                        <motion.div
                            animate={{ scale: hovered ? 1.06 : 1, opacity: hovered ? 1 : 0.85 }}
                            transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        >
                            <RoleTag role={exp.role} />
                        </motion.div>
                    </div>
                </div>

                {/* Period pill */}
                <motion.div
                    className="text-[11px] text-zinc-400 font-black mb-8 uppercase tracking-widest bg-zinc-50 py-1 px-2 w-fit"
                    animate={{ backgroundColor: hovered ? "rgb(240,249,255)" : "rgb(250,250,250)" }}
                    transition={{ duration: 0.3 }}
                >
                    {exp.period} — {exp.duration}
                </motion.div>

                {/* Description — stagger + per-item text glow on hover */}
                <ul className="space-y-4 mb-10">
                    {exp.description.map((point, i) => (
                        <motion.li key={i} className="flex gap-3 group/desc"
                            initial={{ opacity: 0, x: side === "left" ? -14 : 14 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ delay: 0.1 + i * 0.07, duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <motion.div
                                className="w-1.5 h-1.5 bg-black mt-1.5 flex-shrink-0 rounded-full"
                                animate={{ backgroundColor: hovered ? "rgb(6,182,212)" : "rgb(0,0,0)" }}
                                transition={{ duration: 0.4 }}
                            />
                            <p
                                className="text-[14px] text-zinc-800 font-semibold leading-relaxed transition-all duration-300"
                                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.textShadow = "0 0 10px rgba(0,0,0,0.18)"; }}
                                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.textShadow = "none"; }}
                            >
                                {point}
                            </p>
                        </motion.li>
                    ))}
                </ul>

                {/* Achievements — stagger */}
                <div className="mt-auto border-t border-zinc-100 pt-6">
                    <div className="text-[10px] text-zinc-400 font-black uppercase tracking-widest mb-4">Key Achievements</div>
                    <ul className="space-y-2">
                        {exp.achievements.map((ach, i) => (
                            <motion.li key={i}
                                className="flex gap-2 text-[12px] text-zinc-500 font-bold"
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-30px" }}
                                transition={{ delay: 0.2 + i * 0.1, duration: 0.38 }}
                            >
                                <span className="text-cyan-400">✦</span>
                                <span>{ach}</span>
                            </motion.li>
                        ))}
                    </ul>
                </div>
            </motion.div>
        </motion.div>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Experience() {
    const containerRef = useRef(null);
    const statsRef = useRef<HTMLDivElement>(null);
    const statsInView = useInView(statsRef, { once: true, margin: "-60px" });

    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

    // Card entrance/exit (scroll-driven) — tighter window to reduce blank-space gap
    const xLeft = useTransform(scrollYProgress, [0, 0.18, 0.82, 1], ["-100%", "0%", "0%", "-100%"]);
    const opacityLeft = useTransform(scrollYProgress, [0, 0.14, 0.86, 1], [0, 1, 1, 0]);
    const xRight = useTransform(scrollYProgress, [0, 0.18, 0.82, 1], ["100%", "0%", "0%", "100%"]);
    const opacityRight = useTransform(scrollYProgress, [0, 0.14, 0.86, 1], [0, 1, 1, 0]);

    // Header fade
    const titleOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);
    const statsOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);

    // Timeline line grows as cards settle
    const timelineScaleY = useTransform(scrollYProgress, [0.15, 0.5], [0, 1]);

    return (
        <div ref={containerRef} className="relative h-[120vh] w-full">
            <div className="sticky top-0 h-screen flex flex-col justify-center" style={{ overflowX: "clip" }}>
                <div className="w-full">

                    {/* ── Header + Stats Row ────────────────────────────────── */}
                    <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-8 w-full">

                        {/* Heading with animated underline */}
                        <motion.div style={{ opacity: titleOpacity }} className="self-start">
                            <div className="relative inline-block">
                                <h2 className="text-6xl md:text-9xl font-bold text-white tracking-tighter">
                                    Experience
                                </h2>
                                <motion.div
                                    className="absolute bottom-1 left-0 right-0 h-[3px]"
                                    style={{
                                        background: "linear-gradient(90deg, transparent, rgba(6,182,212,0.9) 40%, rgba(255,255,255,0.7) 70%, transparent)",
                                        transformOrigin: "left center",
                                    }}
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{ delay: 0.4, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                                />
                            </div>
                        </motion.div>

                        {/* Stats with CountUp + pulse */}
                        <motion.div ref={statsRef} style={{ opacity: statsOpacity }} className="flex gap-2">
                            {STATS.map((stat, i) => (
                                <motion.div
                                    key={stat.label}
                                    className="bg-white p-4 w-32 h-20 flex flex-col items-center justify-center border border-zinc-200"
                                    animate={statsInView ? {
                                        boxShadow: [
                                            "0 0 0px rgba(6,182,212,0)",
                                            "0 0 18px rgba(6,182,212,0.5)",
                                            "0 0 0px rgba(6,182,212,0)",
                                        ],
                                    } : {}}
                                    transition={{
                                        delay: 0.3 + i * 0.18,
                                        duration: 1.2,
                                        ease: "easeOut",
                                    }}
                                    whileHover={{ scale: 1.08, boxShadow: "0 0 20px rgba(6,182,212,0.4)" }}
                                >
                                    <span className="text-xl font-serif text-black leading-none">
                                        <CountUp target={stat.target} suffix={stat.suffix} trigger={statsInView} />
                                    </span>
                                    <span className="text-[9px] text-zinc-400 mt-2 uppercase tracking-widest font-bold">
                                        {stat.label}
                                    </span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>

                    {/* ── Cards Grid + Timeline ─────────────────────────────── */}
                    <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 w-full">

                        {/* ── Vertical Timeline (desktop only) ─────────────── */}
                        <div className="hidden md:flex absolute top-0 bottom-0 left-1/2 -translate-x-1/2 flex-col items-center z-20 pointer-events-none gap-0">
                            {/* Top dot */}
                            <motion.div
                                className="w-3 h-3 rounded-full bg-cyan-400 flex-shrink-0"
                                animate={{ boxShadow: ["0 0 0px rgba(6,182,212,0.8)", "0 0 14px rgba(6,182,212,1)", "0 0 0px rgba(6,182,212,0.8)"] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            />
                            {/* Growing line */}
                            <motion.div
                                className="w-[1px] flex-1 origin-top"
                                style={{
                                    scaleY: timelineScaleY,
                                    background: "linear-gradient(to bottom, rgba(6,182,212,0.9), rgba(168,85,247,0.5))",
                                }}
                            />
                            {/* Bottom dot */}
                            <motion.div
                                className="w-3 h-3 rounded-full bg-violet-400 flex-shrink-0"
                                animate={{ boxShadow: ["0 0 0px rgba(168,85,247,0.8)", "0 0 14px rgba(168,85,247,1)", "0 0 0px rgba(168,85,247,0.8)"] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            />
                        </div>

                        {/* Card 1 */}
                        <ExpCard
                            exp={experiences[0]}
                            scrollX={xLeft}
                            scrollOpacity={opacityLeft}
                            side="left"
                        />

                        {/* Card 2 */}
                        <ExpCard
                            exp={experiences[1]}
                            scrollX={xRight}
                            scrollOpacity={opacityRight}
                            side="right"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
