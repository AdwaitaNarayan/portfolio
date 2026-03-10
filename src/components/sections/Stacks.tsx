"use client";

import { motion, useInView, AnimatePresence, LayoutGroup } from "framer-motion";
import { useRef, useState, useEffect, useMemo } from "react";
import { Search, Sparkles, X, ChevronRight, Info } from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────
const CATEGORIES = ["All", "Frontend", "Backend", "AI/ML", "DevOps"];

const STACKS = [
    // Programming Languages → Backend category
    { name: "Python", category: "Backend", color: "rgba(249, 115, 22, 0.5)", desc: "Primary language for backend, AI, automation, and data pipelines.", level: "Expert" },
    { name: "SQL", category: "Backend", color: "rgba(255, 255, 255, 0.8)", desc: "Declarative language for relational database queries and management.", level: "Advanced" },
    { name: "HTML5 & CSS3", category: "Frontend", color: "rgba(239, 68, 68, 0.5)", desc: "Foundational technologies of web structure and style.", level: "Intermediate" },
    { name: "JavaScript", category: "Frontend", color: "rgba(234, 179, 8, 0.5)", desc: "Basic scripting for web interactivity and front-end logic.", level: "Beginner" },

    // Frameworks & Libraries
    { name: "Flask", category: "Backend", color: "rgba(100, 116, 139, 0.5)", desc: "Lightweight WSGI web application framework for Python.", level: "Advanced" },
    { name: "FastAPI", category: "Backend", color: "rgba(16, 185, 129, 0.5)", desc: "Modern, high-performance web framework for building REST APIs.", level: "Advanced" },
    { name: "SQLAlchemy", category: "Backend", color: "rgba(215, 71, 15, 0.5)", desc: "SQL toolkit and Object-Relational Mapper for Python.", level: "Advanced" },
    { name: "Pandas", category: "AI/ML", color: "rgba(99, 102, 241, 0.5)", desc: "Data manipulation and analysis library for Python.", level: "Advanced" },
    { name: "NumPy", category: "AI/ML", color: "rgba(6, 182, 212, 0.5)", desc: "Fundamental package for scientific computing in Python.", level: "Advanced" },
    { name: "scikit-learn", category: "AI/ML", color: "rgba(247, 147, 30, 0.5)", desc: "Predictive data analysis and classical ML algorithms in Python.", level: "Advanced" },
    { name: "TensorFlow", category: "AI/ML", color: "rgba(255, 111, 0, 0.5)", desc: "End-to-end open source platform for machine learning.", level: "Intermediate" },
    { name: "Keras", category: "AI/ML", color: "rgba(220, 38, 38, 0.5)", desc: "High-level neural networks API, running on top of TensorFlow.", level: "Intermediate" },
    { name: "LangChain", category: "AI/ML", color: "rgba(24, 24, 27, 0.8)", desc: "Framework for building context-aware LLM applications.", level: "Advanced" },

    // Databases
    { name: "PostgreSQL", category: "Backend", color: "rgba(51, 153, 204, 0.5)", desc: "Open-source relational database for scalability and reliability.", level: "Advanced" },
    { name: "MySQL", category: "Backend", color: "rgba(0, 117, 143, 0.5)", desc: "Popular open-source relational database management system.", level: "Intermediate" },

    // AI/ML Specialisations
    { name: "LLMs", category: "AI/ML", color: "rgba(255, 255, 255, 0.9)", desc: "Large Language Models engineering, fine-tuning and deployment.", level: "Advanced" },
    { name: "RAG Systems", category: "AI/ML", color: "rgba(168, 85, 247, 0.5)", desc: "Retrieval-Augmented Generation for specialized AI context.", level: "Advanced" },
    { name: "OCR", category: "AI/ML", color: "rgba(6, 182, 212, 0.6)", desc: "Optical Character Recognition using PaddleOCR and PyTesseract.", level: "Expert" },

    // DevOps / Tools
    { name: "Git & GitHub", category: "DevOps", color: "rgba(239, 68, 68, 0.4)", desc: "Version control and collaborative code management.", level: "Advanced" },
    { name: "Jupyter Notebook", category: "DevOps", color: "rgba(234, 179, 8, 0.5)", desc: "Interactive computing environment for data science and ML.", level: "Advanced" },
    { name: "VS Code", category: "DevOps", color: "rgba(59, 130, 246, 0.5)", desc: "Feature-rich code editor used as the primary development environment.", level: "Expert" },
];

// ─── Sub-Components ───────────────────────────────────────────────────────────

function RippleEffect({ x, y, color }: { x: number; y: number; color: string }) {
    return (
        <motion.span
            className="absolute rounded-full pointer-events-none"
            style={{ left: x, top: y, width: 4, height: 4, backgroundColor: color }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 20, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        />
    );
}

function StackTag({ stack, index }: { stack: typeof STACKS[0]; index: number }) {
    const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
    const [isTooltipOpen, setIsTooltipOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const id = Date.now();
        setRipples(p => [...p, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }]);
        setIsTooltipOpen(!isTooltipOpen);
        setTimeout(() => setRipples(p => p.filter(r => r.id !== id)), 600);
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4, delay: index * 0.01 }}
            whileHover={{
                scale: 1.05,
                rotate: Math.random() > 0.5 ? 2 : -2,
                boxShadow: `0 0 30px ${stack.color}`,
                zIndex: 20
            }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            onClick={handleClick}
            className={`relative group cursor-pointer p-4 h-full w-full flex flex-col items-center justify-center border transition-colors duration-300 overflow-hidden ${stack.name === 'LLMs' ? 'bg-white text-black' : 'bg-zinc-950 text-white'}`}
            style={{
                minHeight: '130px',
                borderColor: isHovered ? stack.color : 'rgb(24, 24, 27)'
            }}
        >
            <span className="text-center font-bold tracking-tight">{stack.name}</span>
            <span className="text-[10px] opacity-40 uppercase tracking-widest mt-1">{stack.category}</span>

            {/* Ripples */}
            {ripples.map(r => <RippleEffect key={r.id} x={r.x} y={r.y} color={stack.name === 'LLMs' ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.2)'} />)}

            {/* Tooltip Overlay */}
            <AnimatePresence>
                {isTooltipOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute inset-0 bg-black/95 p-3 flex flex-col justify-center items-center text-center z-50 pointer-events-none"
                    >
                        <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-tighter mb-1">{stack.level}</span>
                        <p className="text-[10px] leading-tight text-zinc-300">{stack.desc}</p>
                        <div className="absolute top-2 right-2">
                            <Info size={10} className="text-zinc-500" />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Stacks() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [isFocused, setIsFocused] = useState(false);
    const [placeholder, setPlaceholder] = useState("");
    const [showAIModal, setShowAIModal] = useState(false);

    // Placeholder typing animation
    useEffect(() => {
        const fullPlaceholder = "Search technologies, categories, or proficiency...";
        let i = 0;
        const interval = setInterval(() => {
            setPlaceholder(fullPlaceholder.slice(0, i));
            i++;
            if (i > fullPlaceholder.length) i = 0;
        }, 100);
        return () => clearInterval(interval);
    }, []);

    const filteredStacks = useMemo(() => {
        return STACKS.filter(s => {
            const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
                s.category.toLowerCase().includes(search.toLowerCase());
            const matchesCategory = category === "All" || s.category === category;
            return matchesSearch && matchesCategory;
        });
    }, [search, category]);

    return (
        <section id="stacks" className="py-24 bg-black min-h-screen relative" ref={sectionRef}>

            {/* Glassmorphism Background Decoration */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-900/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-900/10 blur-[100px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6">

                {/* Header & AI Button */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        className="flex items-center gap-6"
                    >
                        <h2 className="text-7xl md:text-9xl font-bold text-white tracking-tighter">Stacks</h2>

                        <motion.button
                            onClick={() => setShowAIModal(true)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="group relative flex items-center bg-white text-black px-4 py-2 gap-3 h-fit rounded-full overflow-hidden"
                        >
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-400 to-amber-400 opacity-0 group-hover:opacity-20 transition-opacity"
                                animate={{ x: ["-100%", "100%"] }}
                                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                            />
                            <span className="text-xs font-black uppercase tracking-widest relative z-10">AI Recommendations</span>
                            <Sparkles size={14} className="text-black relative z-10 animate-pulse" />
                        </motion.button>
                    </motion.div>

                    {/* Search Bar */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        className="relative w-full md:w-[400px]"
                    >
                        <motion.div
                            animate={{
                                width: isFocused ? "100%" : "90%",
                                boxShadow: isFocused ? "0 0 20px rgba(6, 182, 212, 0.3)" : "none"
                            }}
                            className={`flex items-center gap-3 bg-zinc-900/50 border ${isFocused ? 'border-cyan-500/50' : 'border-zinc-800'} px-4 py-3 rounded-xl backdrop-blur-md transition-colors`}
                        >
                            <Search size={18} className={isFocused ? "text-cyan-400" : "text-zinc-500"} />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                                placeholder={placeholder}
                                className="bg-transparent border-none outline-none text-white text-sm w-full placeholder:text-zinc-700"
                            />
                            {search && (
                                <button onClick={() => setSearch("")} className="text-zinc-500 hover:text-white">
                                    <X size={16} />
                                </button>
                            )}
                        </motion.div>
                    </motion.div>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setCategory(cat)}
                            className={`relative px-6 py-2 text-xs font-bold uppercase tracking-[0.2em] transition-colors ${category === cat ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
                        >
                            {cat}
                            {category === cat && (
                                <motion.div
                                    layoutId="categoryUnderline"
                                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-cyan-500"
                                    initial={false}
                                />
                            )}
                        </button>
                    ))}
                    {(search || category !== "All") && (
                        <motion.button
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            whileHover={{ scale: 1.1 }}
                            onClick={() => { setSearch(""); setCategory("All"); }}
                            className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest bg-zinc-900 px-3 py-1 rounded-full border border-zinc-800"
                        >
                            Clear Filters <X size={10} />
                        </motion.button>
                    )}
                </div>

                {/* Grid */}
                <div className="relative min-h-[400px]">
                    <motion.div
                        layout
                        className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 auto-rows-[140px] gap-2 lg:gap-4"
                    >
                        <AnimatePresence mode="popLayout">
                            {filteredStacks.map((stack, idx) => (
                                <StackTag key={stack.name} stack={stack} index={idx} />
                            ))}
                        </AnimatePresence>
                    </motion.div>

                    {/* No Results */}
                    <AnimatePresence>
                        {filteredStacks.length === 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center"
                            >
                                <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mb-4 border border-zinc-800">
                                    <Search size={24} className="text-zinc-700" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">No matching stacks found</h3>
                                <p className="text-zinc-500 text-sm max-w-xs">Try adjusting your filters or search query to find what you're looking for.</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* AI Recommendation Modal */}
            <AnimatePresence>
                {showAIModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowAIModal(false)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-xl"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-lg bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl"
                        >
                            <div className="p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-lg">
                                        <Sparkles size={20} className="text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white tracking-tight">AI Insights</h3>
                                    <button onClick={() => setShowAIModal(false)} className="ml-auto text-zinc-500 hover:text-white">
                                        <X size={24} />
                                    </button>
                                </div>
                                <div className="space-y-6">
                                    <div className="p-4 bg-zinc-900/50 rounded-2xl border border-zinc-800/50">
                                        <p className="text-sm text-zinc-400 leading-relaxed">
                                            Based on your current portfolio projects, your expertise is strongest in <span className="text-cyan-400 font-bold">Fullstack AI Engineering</span>.
                                        </p>
                                    </div>
                                    <div className="grid gap-3">
                                        <div className="flex items-center gap-3 p-3 hover:bg-zinc-900 rounded-xl transition-colors cursor-default">
                                            <div className="w-8 h-8 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400 font-bold text-xs">01</div>
                                            <p className="text-sm text-zinc-300">Focus more on <span className="font-bold">Next.js App Router</span> for optimized RAG applications.</p>
                                        </div>
                                        <div className="flex items-center gap-3 p-3 hover:bg-zinc-900 rounded-xl transition-colors cursor-default">
                                            <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 font-bold text-xs">02</div>
                                            <p className="text-sm text-zinc-300">Consider exploring <span className="font-bold">Vector Databases</span> like Pinecone or Weaviate.</p>
                                        </div>
                                        <div className="flex items-center gap-3 p-3 hover:bg-zinc-900 rounded-xl transition-colors cursor-default">
                                            <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400 font-bold text-xs">03</div>
                                            <p className="text-sm text-zinc-300">Dive deeper into <span className="font-bold">LLM fine-tuning</span> with QLoRA/PEFT.</p>
                                        </div>
                                    </div>
                                    <motion.button
                                        whileHover={{ x: 5 }}
                                        className="flex items-center gap-2 text-cyan-400 text-sm font-bold mt-4"
                                    >
                                        View Detailed Roadmap <ChevronRight size={16} />
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
