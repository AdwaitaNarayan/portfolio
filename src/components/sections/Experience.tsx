"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const stats = [
    { label: "Years", value: "2.5+" },
    { label: "Companies", value: "3" },
    { label: "Projects", value: "15+" },
    { label: "Technologies", value: "10+" },
];

const experiences = [
    {
        company: "Papaya Global",
        logo: "/logos/papaya.png",
        role: "SDE 1",
        period: "Aug 2024 - Present",
        duration: "1 year 4 months",
        description: [
            "Built MCP Agent with Generative AI for Figma-to-UI conversion",
            "Contributed to backend with Java Spring Boot, Kafka, RabbitMQ",
        ],
        achievements: [
            "Accelerated design-to-production pipeline with AI",
            "Develped Centralized Knolege Base of Company",
        ],
        tech: ["React", "TypeScript", "Java Spring Boot", "Kafka", "RabbitMQ", "MariaDB", "Playwright", "Generative AI"],
    },
    {
        company: "AlphaBI",
        logo: "/logos/alphabi.png",
        role: "SDE Intern",
        period: "Jan 2024 - Aug 2024",
        duration: "7 months",
        description: [
            "Implemented Next.js 14, Prisma, Strapi, Kafka, Docker",
            "Enhanced company website with SEO optimizations",
            "Worked on a real-time health monitoring app with Flutter",
        ],
        achievements: [
            "Increased UX of the websites",
            "Impraved the design of real-time health monitoring app",
        ],
        tech: ["Next.js 14", "Prisma", "Strapi", "Kafka", "Flutter", "Docker", "TypeScript"],
    },
    {
        company: "Intelligent Cloud Applications",
        logo: "/logos/intelligent.png",
        role: "SDE Part Time",
        period: "Mar 2023 - Dec 2023",
        duration: "10 months",
        description: [
            "Built serverless backend and interactive frontend service",
            "Optimized legacy backend for low API overhead",
            "Led technical team as Tech Lead",
        ],
        achievements: [
            "Reduced server load by 50%",
            "Designed scalable architecture for future growth",
        ],
        tech: ["Serverless", "React", "Node.js", "AWS", "Next.js", "AWS"],
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Experience() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    return (
        <section id="experience" className="py-24" ref={sectionRef}>
            {/* Header and Stats Row */}
            <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-8">
                <div className="flex items-center gap-4 self-start">
                    <h2 className="text-6xl md:text-8xl font-bold text-white tracking-tight">
                        Experience
                    </h2>
                    <div className="flex items-center bg-white border border-black px-2 py-1 gap-2 h-fit mt-4">
                        <span className="text-[10px] text-zinc-500 font-bold uppercase">Search With</span>
                        <div className="bg-black text-white text-[10px] font-black px-1 py-0.5 flex items-center gap-1">
                            AI <span className="text-[10px] font-normal">+</span>
                        </div>
                        <div className="w-1.5 h-1.5 bg-black" />
                    </div>
                </div>

                <div className="flex gap-2">
                    {stats.map((stat, i) => (
                        <div key={stat.label} className="bg-white p-4 w-32 h-20 flex flex-col items-center justify-center border border-zinc-200">
                            <span className="text-2xl font-serif text-black">{stat.value}</span>
                            <span className="text-[10px] text-zinc-400 mt-1 uppercase tracking-tight">{stat.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Three Pillar Cards */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
                {experiences.map((exp, idx) => (
                    <motion.div
                        key={exp.company}
                        variants={itemVariants}
                        className="bg-white p-8 flex flex-col h-[850px] shadow-sm"
                    >
                        {/* Header: Logo, Name, Role */}
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 relative flex-shrink-0">
                                <Image
                                    src={exp.logo}
                                    alt={exp.company}
                                    fill
                                    className="object-contain"
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
                        <div className="mb-8">
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

                        {/* Technologies */}
                        <div className="mt-auto">
                            <div className="text-[10px] text-zinc-400 font-black uppercase tracking-widest mb-4">Technologies</div>
                            <div className="flex flex-wrap gap-2">
                                {exp.tech.map((t) => (
                                    <span key={t} className="bg-zinc-100 text-zinc-500 text-[10px] font-bold px-2 py-1 border border-zinc-200">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}
