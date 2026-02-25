"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useMemo } from "react";
import ProjectCard from "./ProjectCard";
import { Plus, X, ArrowRight, LayoutGrid, Calendar, Tag } from "lucide-react";

export type Project = {
    title: string;
    description: string;
    tech: string[];
    github: string | null;
    demo: string | null;
    image: string | null;
    featured: boolean;
    date: string;
    type: "Full-Stack" | "AI/ML" | "Automation";
    stats: {
        views: number;
        likes: number;
        forks: number;
    };
};

const projects: Project[] = [
    {
        title: "SolviqAI Assessment Platform",
        description:
            "Full-stack AI hiring platform with automated interview rounds, coding evaluation, and LLM-powered feedback. Built with Next.js, FastAPI, and LangChain — serving 500+ active users with real-time proctored assessment capabilities.",
        tech: ["Next.js", "FastAPI", "PostgreSQL", "LangChain"],
        github: null,
        demo: null,
        image: "/projects/solviq.jpg",
        featured: true,
        date: "2025-05-01",
        type: "Full-Stack",
        stats: { views: 1250, likes: 450, forks: 12 },
    },
    {
        title: "Odia Alphanumeric Recognition",
        description:
            "End-to-end image classification app to recognize Odia alphanumeric characters. Integrated pre-trained CNN models (ResNet, EfficientNet) with custom fine-tuning, deployed as a REST API using Flask. (Jan 2025 – Apr 2025)",
        tech: ["Python", "Flask", "TensorFlow", "CNN"],
        github: "https://github.com/adwaita",
        demo: null,
        image: "/projects/odia.jpg",
        featured: true,
        date: "2025-04-15",
        type: "AI/ML",
        stats: { views: 820, likes: 180, forks: 5 },
    },
    {
        title: "Stock Price Prediction",
        description:
            "Time-series forecasting model using LSTM integrated into a Flask dashboard. Designed data pipelines, preprocessing scripts, automated visualization modules, and performed feature extraction with TensorFlow and Keras. (Oct 2024 – Dec 2024)",
        tech: ["Python", "TensorFlow", "Keras", "Flask"],
        github: "https://github.com/adwaita",
        demo: null,
        image: "/projects/stock.jpg",
        featured: false,
        date: "2024-12-20",
        type: "AI/ML",
        stats: { views: 1540, likes: 320, forks: 24 },
    },
    {
        title: "PDF Data Extraction Tool",
        description:
            "Python tool to extract, parse, and convert PDF content into structured JSON/Excel files using OCR and NLP for document understanding — demonstrating backend logic and modular coding. (June 2025 – July 2025)",
        tech: ["Python", "PyMuPDF", "PaddleOCR", "Pandas"],
        github: "https://github.com/adwaita",
        demo: null,
        image: "/projects/ocr.jpg",
        featured: false,
        date: "2025-07-10",
        type: "Automation",
        stats: { views: 640, likes: 95, forks: 8 },
    },
];

const FILTER_TYPES = ["All", "Full-Stack", "AI/ML", "Automation"];

export default function Projects() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [filter, setFilter] = useState("All");
    const [sortBy, setSortBy] = useState<"date" | "stats">("date");
    const [showGallery, setShowGallery] = useState(false);

    const filteredProjects = useMemo(() => {
        let items = [...projects];
        if (filter !== "All") {
            items = items.filter((p) => p.type === filter);
        }
        if (sortBy === "date") {
            items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        } else {
            items.sort((a, b) => b.stats.views - a.stats.views);
        }
        return items;
    }, [filter, sortBy]);

    return (
        <section id="projects" className="py-24 relative">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, x: -30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-6xl md:text-9xl font-serif text-white tracking-tighter mb-4">
                        Projects
                    </h2>
                    <p className="text-zinc-500 max-w-md uppercase tracking-widest text-[10px] font-bold">
                        A collection of engineering experiments, AI models, and full-stack solutions.
                    </p>
                </motion.div>

                {/* Filter Controls */}
                <div className="flex flex-wrap gap-4">
                    <div className="flex bg-zinc-900 p-1 rounded-full border border-white/5">
                        {FILTER_TYPES.map((t) => (
                            <button
                                key={t}
                                onClick={() => setFilter(t)}
                                className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${filter === t ? "bg-white text-black" : "text-zinc-500 hover:text-white"
                                    }`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={() => setSortBy(s => s === 'date' ? 'stats' : 'date')}
                        className="flex items-center gap-2 bg-zinc-900 border border-white/5 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-white transition-colors"
                    >
                        {sortBy === 'date' ? <Calendar size={12} /> : <LayoutGrid size={12} />}
                        Sort By {sortBy === 'date' ? 'Date' : 'Popularity'}
                    </button>
                </div>
            </div>

            <motion.div
                layout
                className="grid gap-px bg-zinc-900 border border-zinc-900"
            >
                <AnimatePresence mode="popLayout">
                    {filteredProjects.map((project, index) => (
                        <ProjectCard key={project.title} project={project} index={index} />
                    ))}
                </AnimatePresence>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="mt-16 flex justify-center"
            >
                <button
                    onClick={() => setShowGallery(true)}
                    className="group flex items-center gap-4 bg-white text-black px-8 py-4 rounded-full font-black uppercase tracking-widest text-xs hover:scale-105 transition-transform"
                >
                    View All Gallery <Plus size={16} className="group-hover:rotate-90 transition-transform" />
                </button>
            </motion.div>

            {/* Gallery Modal */}
            <AnimatePresence>
                {showGallery && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex flex-col p-8"
                    >
                        <header className="flex justify-between items-center mb-12">
                            <h3 className="text-4xl font-serif text-white">Project Archive</h3>
                            <button
                                onClick={() => setShowGallery(false)}
                                className="w-12 h-12 flex items-center justify-center bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </header>

                        <div className="flex-1 overflow-y-auto grid md:grid-cols-3 gap-8">
                            {projects.map((p, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="group relative h-[300px] bg-zinc-900 rounded-3xl overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />
                                    <div className="absolute inset-x-0 bottom-0 p-6 z-20">
                                        <h4 className="text-xl font-bold text-white mb-1">{p.title}</h4>
                                        <p className="text-xs text-zinc-400 mb-4">{p.type}</p>
                                        <button className="flex items-center gap-2 text-white text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                                            View Details <ArrowRight size={14} />
                                        </button>
                                    </div>
                                    <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
                                        <Tag className="text-zinc-700 w-24 h-24" />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
