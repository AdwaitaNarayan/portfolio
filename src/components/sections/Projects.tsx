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
        title: "AI-Driven Assessment Automation Platform",
        description:
            "Developed AI-driven assessment automation tools for hiring workflows including question generation, evaluation, and scoring engines. Built backend APIs using Python, FastAPI, and PostgreSQL to support candidate assessments, playlists, job roles, and reporting modules. Implemented ATS resume scoring, domain classification, and personalized job recommendation pipelines.",
        tech: ["Python", "FastAPI", "PostgreSQL", "SQLAlchemy", "Node.js", "React.js", "REST APIs", "ATS Systems", "Domain Classification"],
        github: null,
        demo: null,
        image: null,
        featured: true,
        date: "2025-11-15",
        type: "AI/ML",
        stats: { views: 2450, likes: 580, forks: 42 },
    },
    {
        title: "PDF Data Extraction & RAG Systems",
        description:
            "Designed Python-based automation pipelines for structured data extraction from PDFs. Implemented OCR and API-based systems to handle large-scale text processing. Built Retrieval-Augmented Generation (RAG) systems to enable interactive chat with PDF documents. Fine-tuned LLMs for domain-specific question answering and text classification.",
        tech: ["Python", "PaddleOCR", "PyTesseract", "PyMuPDF", "LangChain", "Hugging Face Transformers", "Ollama", "TensorFlow", "PyTorch", "Pandas", "FAISS"],
        github: null,
        demo: null,
        image: null,
        featured: true,
        date: "2025-10-15",
        type: "AI/ML",
        stats: { views: 1820, likes: 410, forks: 28 },
    },
    {
        title: "Odia Alphanumeric Recognition",
        description:
            "Built an end-to-end image classification app to recognize Odia alphanumeric characters. Integrated pre-trained CNN models (ResNet, EfficientNet) with custom fine-tuning, and deployed the model as a REST API using Flask. (Jan 2025 – Apr 2025)",
        tech: ["Python", "Flask", "TensorFlow", "SVM", "REST API"],
        github: "https://github.com/AdwaitaNarayan",
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
            "Developed a time-series forecasting model using LSTM and integrated it into a Flask dashboard. Performed data preprocessing, feature extraction, and model training using TensorFlow and Keras. (Oct 2024 – Dec 2024)",
        tech: ["Python", "TensorFlow", "Keras", "Flask", "Pandas", "Matplotlib"],
        github: "https://github.com/AdwaitaNarayan",
        demo: null,
        image: "/projects/stock.jpg",
        featured: true,
        date: "2024-12-20",
        type: "AI/ML",
        stats: { views: 640, likes: 120, forks: 8 },
    },
];

const FILTER_TYPES = ["All", "AI/ML"];

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
