"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const stats = [
    { label: "Experience", value: "6+ Months" },
    { label: "Companies", value: "2" },
    { label: "Projects", value: "12+" },
];

const experiences = [
    {
        company: "Hirekarma Pvt. Ltd.",
        logo: "/logos/hirekarma.png",
        logoLetter: "H",
        logoColor: "bg-cyan-500",
        role: "AI Developer",
        period: "Nov 2025 – Present",
        duration: "Current Role",
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
        tech: ["Python", "FastAPI", "PostgreSQL", "SQLAlchemy", "Node.js", "React.js", "REST APIs"],
    },
    {
        company: "AAANS Services Pvt. Ltd.",
        logo: "/logos/aaans.png",
        logoLetter: "A",
        logoColor: "bg-zinc-800",
        role: "AI/ML Engineer Intern",
        period: "July 2025 – Oct 2025",
        duration: "4 months",
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
        tech: ["Python", "PaddleOCR", "PyTesseract", "LangChain", "HuggingFace", "FAISS", "TensorFlow"],
    },
];

export default function Experience() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Animate Card 1 (Left to Center, then out Left)
    const xLeft = useTransform(
        scrollYProgress,
        [0, 0.12, 0.88, 1],
        ["-100%", "0%", "0%", "-100%"]
    );
    const opacityLeft = useTransform(
        scrollYProgress,
        [0, 0.08, 0.92, 1],
        [0, 1, 1, 0]
    );

    // Animate Card 2 (Right to Center, then out Right)
    const xRight = useTransform(
        scrollYProgress,
        [0, 0.12, 0.88, 1],
        ["100%", "0%", "0%", "100%"]
    );
    const opacityRight = useTransform(
        scrollYProgress,
        [0, 0.08, 0.92, 1],
        [0, 1, 1, 0]
    );

    // Header animations - tightened for responsiveness
    const titleX = useTransform(scrollYProgress, [0, 0.12], [-40, 0]);
    const titleOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
    const statsX = useTransform(scrollYProgress, [0, 0.12], [40, 0]);
    const statsOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

    return (
        <div ref={containerRef} className="relative h-[200vh] w-full">
            <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
                <div className="w-full">
                    {/* Header and Stats Row */}
                    <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-8 w-full">
                        <motion.div
                            style={{ x: titleX, opacity: titleOpacity }}
                            className="flex items-center gap-4 self-start"
                        >
                            <h2 className="text-6xl md:text-9xl font-bold text-white tracking-tighter">
                                Experience
                            </h2>
                        </motion.div>

                        <motion.div
                            style={{ x: statsX, opacity: statsOpacity }}
                            className="flex gap-2"
                        >
                            {stats.map((stat) => (
                                <div key={stat.label} className="bg-white p-4 w-32 h-20 flex flex-col items-center justify-center border border-zinc-200">
                                    <span className="text-xl font-serif text-black leading-none">{stat.value}</span>
                                    <span className="text-[9px] text-zinc-400 mt-2 uppercase tracking-widest font-bold">{stat.label}</span>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Pillar Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                        {/* Card 1 */}
                        <motion.div
                            style={{ x: xLeft, opacity: opacityLeft }}
                            className="bg-white p-8 flex flex-col h-full shadow-lg border-l-4 border-black"
                        >
                            <div className="flex items-center gap-5 mb-8">
                                <div className={`w-14 h-14 relative flex-shrink-0 flex items-center justify-center ${experiences[0].logoColor} text-white font-bold text-2xl rounded-sm`}>
                                    {experiences[0].logoLetter}
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black text-black border-b-2 border-black w-fit leading-tight mb-1 uppercase">
                                        {experiences[0].company}
                                    </h3>
                                    <div className="text-[12px] text-zinc-400 font-black uppercase tracking-wider">{experiences[0].role}</div>
                                </div>
                            </div>
                            <div className="text-[11px] text-zinc-400 font-black mb-8 uppercase tracking-widest bg-zinc-50 py-1 px-2 w-fit">
                                {experiences[0].period} — {experiences[0].duration}
                            </div>
                            <ul className="space-y-4 mb-10">
                                {experiences[0].description.map((point, i) => (
                                    <li key={i} className="flex gap-3">
                                        <div className="w-1.5 h-1.5 bg-black mt-1.5 flex-shrink-0" />
                                        <p className="text-[14px] text-zinc-800 font-semibold leading-relaxed">
                                            {point}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-auto border-t border-zinc-100 pt-6">
                                <div className="text-[10px] text-zinc-400 font-black uppercase tracking-widest mb-4">Key Achievements</div>
                                <ul className="space-y-2">
                                    {experiences[0].achievements.map((ach, i) => (
                                        <li key={i} className="flex gap-2 text-[12px] text-zinc-500 font-bold">
                                            <span className="text-zinc-300">-</span>
                                            <span>{ach}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>

                        {/* Card 2 */}
                        <motion.div
                            style={{ x: xRight, opacity: opacityRight }}
                            className="bg-white p-8 flex flex-col h-full shadow-lg border-l-4 border-black"
                        >
                            <div className="flex items-center gap-5 mb-8">
                                <div className={`w-14 h-14 relative flex-shrink-0 flex items-center justify-center ${experiences[1].logoColor} text-white font-bold text-2xl rounded-sm`}>
                                    {experiences[1].logoLetter}
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black text-black border-b-2 border-black w-fit leading-tight mb-1 uppercase">
                                        {experiences[1].company}
                                    </h3>
                                    <div className="text-[12px] text-zinc-400 font-black uppercase tracking-wider">{experiences[1].role}</div>
                                </div>
                            </div>
                            <div className="text-[11px] text-zinc-400 font-black mb-8 uppercase tracking-widest bg-zinc-50 py-1 px-2 w-fit">
                                {experiences[1].period} — {experiences[1].duration}
                            </div>
                            <ul className="space-y-4 mb-10">
                                {experiences[1].description.map((point, i) => (
                                    <li key={i} className="flex gap-3">
                                        <div className="w-1.5 h-1.5 bg-black mt-1.5 flex-shrink-0" />
                                        <p className="text-[14px] text-zinc-800 font-semibold leading-relaxed">
                                            {point}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-auto border-t border-zinc-100 pt-6">
                                <div className="text-[10px] text-zinc-400 font-black uppercase tracking-widest mb-4">Key Achievements</div>
                                <ul className="space-y-2">
                                    {experiences[1].achievements.map((ach, i) => (
                                        <li key={i} className="flex gap-2 text-[12px] text-zinc-500 font-bold">
                                            <span className="text-zinc-300">-</span>
                                            <span>{ach}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
