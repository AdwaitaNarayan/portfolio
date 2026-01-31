"use client";

import { motion, useInView } from "framer-motion";
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

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1
        }
    },
};

const itemVariants = {
    hidden: {
        opacity: 0,
        y: 15
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1]
        }
    },
};

export default function Experience() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    return (
        <section id="experience" className="min-h-screen flex flex-col justify-center py-20" ref={sectionRef}>
            {/* Header and Stats Row */}
            <div className="flex flex-col md:flex-row items-baseline justify-between mb-8 gap-8">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="flex items-center gap-4 self-start"
                >
                    <h2 className="text-6xl md:text-8xl font-bold text-white tracking-tight">
                        Experience
                    </h2>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="flex gap-2"
                >
                    {stats.map((stat, i) => (
                        <div key={stat.label} className="bg-white p-3 w-28 h-16 flex flex-col items-center justify-center border border-zinc-200">
                            <span className="text-xl font-serif text-black leading-none">{stat.value}</span>
                            <span className="text-[9px] text-zinc-400 mt-1 uppercase tracking-tight">{stat.label}</span>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Pillar Cards */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl"
            >
                {experiences.map((exp, idx) => (
                    <motion.div
                        key={exp.company}
                        variants={itemVariants}
                        whileHover={{
                            y: -1.5,
                            boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.08)"
                        }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="bg-white p-6 flex flex-col h-full shadow-sm cursor-default"
                    >
                        {/* Header: Logo, Name, Role */}
                        <div className="flex items-center gap-4 mb-6">
                            <div className={`w-12 h-12 relative flex-shrink-0 flex items-center justify-center ${exp.logoColor} text-white font-bold text-xl rounded-sm overflow-hidden`}>
                                <div className="absolute inset-0 flex items-center justify-center translate-z-0">
                                    {exp.logoLetter}
                                </div>
                                <Image
                                    src={exp.logo}
                                    alt={exp.company}
                                    fill
                                    className="object-contain opacity-0 group-hover:opacity-100 transition-opacity"
                                    onError={(e) => {
                                        // Hide image if it doesn't exist
                                        (e.target as any).style.display = 'none';
                                    }}
                                />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-black border-b border-black w-fit leading-tight mb-1">
                                    {exp.company}
                                </h3>
                                <div className="text-sm text-zinc-400 font-bold">{exp.role}</div>
                            </div>
                        </div>

                        {/* Date and Duration */}
                        <div className="text-xs text-zinc-400 font-bold mb-8 uppercase tracking-tight">
                            {exp.period} <span className="mx-1">&ndash;</span> {exp.duration}
                        </div>

                        {/* Bulleted Description */}
                        <ul className="space-y-4 mb-8">
                            {exp.description.map((point, i) => (
                                <li key={i} className="flex gap-3">
                                    <div className="w-1.5 h-1.5 bg-black mt-1.5 flex-shrink-0" />
                                    <p className="text-[13px] text-zinc-700 font-medium leading-relaxed">
                                        {point}
                                    </p>
                                </li>
                            ))}
                        </ul>

                        {/* Key Achievements */}
                        <div className="">
                            <div className="text-[10px] text-zinc-400 font-black uppercase tracking-widest mb-4">Key Achievements</div>
                            <ul className="space-y-2">
                                {exp.achievements.map((ach, i) => (
                                    <li key={i} className="flex gap-2 text-[12px] text-zinc-500 font-bold">
                                        <span className="text-zinc-300">-</span>
                                        <span>{ach}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}
