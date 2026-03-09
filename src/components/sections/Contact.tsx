"use client";

import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import {
    Mail, Phone, MapPin, Github, Linkedin, Twitter,
    Send, MessageSquare, ExternalLink, Code, Brain, Network,
    ArrowRight, Check, X as CloseIcon, Loader2, Sparkles, AlertCircle,
    Download, FileText, Calendar as CalendarIcon, ChevronDown,
    Upload, Copy, CheckCircle2, Plus, Minus
} from "lucide-react";

// ─── Constants & Data ────────────────────────────────────────────────────────
const ROLES = "AI/ML Engineer • Full-Stack Developer • Tech Enthusiast";
const SOCIALS = [
    { label: "GitHub", icon: Github, href: "https://github.com/adwaita", color: "hover:text-white" },
    { label: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/in/adwaita", color: "hover:text-cyan-400" },
    { label: "Twitter", icon: Twitter, href: "https://twitter.com/adwaita", color: "hover:text-blue-400" },
];

const SUBJECTS = [
    "General Inquiry",
    "Project Collaboration",
    "Frontend Development",
    "AI/ML Engineering",
    "Consulting",
    "Other"
];

const FAQS = [
    { q: "Do you offer consultation for AI integration?", a: "Yes, I provide strategic consultation for businesses looking to integrate Large Language Models (LLMs), RAG systems, and custom AI agents into their existing tech stacks." },
    { q: "What is your typical project turnaround time?", a: "Turnaround varies by complexity. MVP-ready AI applications usually take 3–6 weeks, while complex full-stack systems may range from 2–4 months." },
    { q: "Are you available for freelance or contract work?", a: "I'm currently open to high-impact collaborations and specialized contract roles in AI engineering and Full-stack development." },
    { q: "Do you build custom RAG pipelines?", a: "Absolutely. I specialize in building highly optimized Retrieval-Augmented Generation pipelines using LangChain, Vector Databases (Pinecone/Weaviate), and various LLM providers." }
];

const AI_SYMBOLS = ["🤖", "∑", "∫", "λ", "π", "∆"];

// ─── Sub-Components ───────────────────────────────────────────────────────────

function AIParticle({ index }: { index: number }) {
    const symbol = AI_SYMBOLS[index % AI_SYMBOLS.length];
    const [coords, setCoords] = useState<{ x: number, y: number } | null>(null);
    const [duration] = useState(() => 20 + Math.random() * 30);
    const [size] = useState(() => 14 + Math.random() * 14);

    useEffect(() => {
        setCoords({
            x: Math.random() * 100,
            y: Math.random() * 100
        });
    }, []);

    if (!coords) return null;

    return (
        <motion.div
            className="absolute text-cyan-500/15 pointer-events-none select-none font-serif"
            initial={{ left: `${coords.x}%`, top: `${coords.y}%` }}
            animate={{
                left: [`${coords.x}%`, `${coords.x + 10}%`, `${coords.x - 10}%`, `${coords.x}%`],
                top: [`${coords.y}%`, `${coords.y - 15}%`, `${coords.y + 10}%`, `${coords.y}%`],
                rotate: [0, 360],
            }}
            transition={{ duration, repeat: Infinity, ease: "linear" }}
            style={{ fontSize: size }}
        >
            {symbol}
        </motion.div>
    );
}

// ─── Form Elements ───

function FloatingSelect({ label, options, id, name, required }: { label: string; options: string[]; id: string; name: string; required?: boolean }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState("");
    const [focused, setFocused] = useState(false);

    return (
        <div className="relative mb-6">
            <motion.label
                animate={{
                    y: (focused || selected) ? -28 : 12,
                    x: (focused || selected) ? -12 : 0,
                    scale: (focused || selected) ? 0.8 : 1,
                    color: focused ? "rgb(6, 182, 212)" : "rgb(113, 113, 122)"
                }}
                className="absolute left-6 top-1 text-[12px] uppercase tracking-widest font-black pointer-events-none z-10"
                style={{ originX: 0 }}
            >
                {label} {required && <span className="text-cyan-500">*</span>}
            </motion.label>
            <div
                className={`w-full bg-zinc-900/30 backdrop-blur-sm border px-6 py-4 pt-6 text-white text-sm cursor-pointer transition-all rounded-2xl flex items-center justify-between ${focused ? 'border-cyan-500/40' : 'border-zinc-800'}`}
                onClick={() => setIsOpen(!isOpen)}
                onMouseEnter={() => setFocused(true)}
                onMouseLeave={() => setFocused(false)}
            >
                <span>{selected || "Select a subject"}</span>
                <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
                    <ChevronDown size={16} className="text-zinc-600" />
                </motion.div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-zinc-950 border border-zinc-900 rounded-2xl overflow-hidden z-50 shadow-2xl"
                    >
                        {options.map((opt) => (
                            <div
                                key={opt}
                                className="px-6 py-3 text-sm text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors cursor-pointer"
                                onClick={() => { setSelected(opt); setIsOpen(false); }}
                            >
                                {opt}
                            </div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
            <input type="hidden" name={name} value={selected} required={required} />
        </div>
    );
}

function FileUpload() {
    const [file, setFile] = useState<File | null>(null);
    const [dragging, setDragging] = useState(false);

    return (
        <div
            className={`relative mb-6 border-2 border-dashed rounded-2xl p-6 transition-all group ${dragging ? 'border-cyan-500 bg-cyan-500/5' : 'border-zinc-800 hover:border-zinc-700 bg-zinc-900/10'}`}
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => { e.preventDefault(); setDragging(false); if (e.dataTransfer.files[0]) setFile(e.dataTransfer.files[0]); }}
        >
            <div className="flex flex-col items-center justify-center gap-3 text-center">
                <div className="p-3 bg-zinc-950 rounded-xl">
                    <Upload size={20} className={file ? "text-cyan-400" : "text-zinc-600"} />
                </div>
                <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-white">
                        {file ? file.name : "Upload Brief / RFQ"}
                    </p>
                    <p className="text-[9px] font-bold text-zinc-600 uppercase tracking-tighter mt-1">
                        {file ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : "PDF, ZIP or DOCX (Max 10MB)"}
                    </p>
                </div>
                <input
                    type="file"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={(e) => e.target.files?.[0] && setFile(e.target.files[0])}
                />
            </div>
            {file && (
                <button onClick={() => setFile(null)} className="absolute top-4 right-4 text-zinc-600 hover:text-red-400 transition-colors">
                    <CloseIcon size={14} />
                </button>
            )}
        </div>
    );
}

function FloatingInput({ label, type = "text", id, name, required, textarea, rows = 4, maxLength, validate }: any) {
    const [focused, setFocused] = useState(false);
    const [value, setValue] = useState("");
    const [isValid, setIsValid] = useState<boolean | null>(null);
    const inputRef = useRef<HTMLInputElement & HTMLTextAreaElement>(null);

    const handleChange = (e: any) => {
        const val = e.target.value;
        setValue(val);
        setIsValid(val.length > 0 ? (validate ? validate(val) : true) : null);
        if (textarea && inputRef.current) {
            inputRef.current.style.height = "auto";
            inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
        }
    };

    return (
        <div className={`relative mb-6 ${isValid === false ? 'animate-shake' : ''}`}>
            <motion.label
                animate={{
                    y: (focused || value) ? -28 : 12,
                    x: (focused || value) ? -12 : 0,
                    scale: (focused || value) ? 0.8 : 1,
                    color: focused ? "rgb(6, 182, 212)" : "rgb(113, 113, 122)"
                }}
                className="absolute left-6 top-1 text-[12px] uppercase tracking-widest font-black pointer-events-none z-10"
                style={{ originX: 0 }}
            >
                {label} {required && <span className="text-cyan-500">*</span>}
            </motion.label>
            {textarea ? (
                <textarea
                    ref={inputRef} id={id} name={name} required={required} value={value}
                    onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
                    onChange={handleChange} maxLength={maxLength}
                    className={`w-full bg-zinc-900/30 backdrop-blur-sm border px-6 py-4 pt-6 text-white text-sm outline-none transition-all rounded-2xl custom-scrollbar ${focused ? 'border-cyan-500/40 shadow-[0_0_20px_rgba(6,182,212,0.1)]' : 'border-zinc-800'}`}
                />
            ) : (
                <input
                    id={id} name={name} type={type} required={required} value={value}
                    onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
                    onChange={handleChange}
                    className={`w-full bg-zinc-900/30 backdrop-blur-sm border px-6 py-4 pt-6 text-white text-sm outline-none transition-all rounded-2xl ${focused ? 'border-cyan-500/40 shadow-[0_0_20px_rgba(6,182,212,0.1)]' : 'border-zinc-800'}`}
                />
            )}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                {isValid === true && <Check size={14} className="text-green-500" />}
                {isValid === false && <AlertCircle size={14} className="text-red-500" />}
            </div>
            {textarea && maxLength && (
                <span className="absolute bottom-2 right-4 text-[8px] font-bold text-zinc-700 uppercase">{value.length}/{maxLength}</span>
            )}
        </div>
    );
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function Contact() {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const isHeadingInView = useInView(headingRef, { once: true, margin: "-100px" });
    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });

    const headingOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
    const headingScl = useTransform(scrollYProgress, [0, 0.4], [1, 0.8]);
    const backgroundBlur = useTransform(scrollYProgress, [0, 0.5], ["blur(0px)", "blur(24px)"]);

    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [submitState, setSubmitState] = useState<"idle" | "loading" | "success">("idle");
    const [copyToast, setCopyToast] = useState(false);
    const [activeFaq, setActiveFaq] = useState<number | null>(null);

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopyToast(true);
        setTimeout(() => setCopyToast(false), 2000);
    };

    return (
        <section ref={sectionRef} id="contact" className="relative min-h-[220vh] bg-[#050a12] overflow-hidden flex flex-col font-sans" onMouseMove={(e) => {
            const rect = sectionRef.current?.getBoundingClientRect();
            if (rect) setMousePos({ x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 });
        }}>

            {/* ── Background: Cyber Aura ── */}
            <motion.div className="absolute inset-0 pointer-events-none" style={{ backdropFilter: backgroundBlur }}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(15,52,96,0.3),transparent_70%)]" />
                <motion.div
                    className="absolute inset-0 opacity-15"
                    animate={{ background: [`radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(6,182,212,0.4) 0%, transparent 60%)`] }}
                />
                {[...Array(15)].map((_, i) => <AIParticle key={i} index={i} />)}
            </motion.div>

            {/* ── SECTION 1: HERO (40vh) ── */}
            <motion.div
                style={{ opacity: headingOpacity, scale: headingScl }}
                className="relative z-10 flex flex-col items-center justify-center h-[50vh] text-center px-6"
            >
                <motion.div
                    initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                    className="bg-zinc-900/40 backdrop-blur-md border border-cyan-500/20 px-4 py-2 rounded-full flex items-center gap-3 mb-8"
                >
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inset-0 rounded-full bg-green-400 opacity-75" />
                        <span className="relative h-2 w-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.6)]" />
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400">Available for Opportunities</span>
                </motion.div>

                <h2 ref={headingRef} className="font-black text-white tracking-tighter leading-[0.85] uppercase whitespace-nowrap" style={{ fontSize: "clamp(2.8rem, 9.5vw, 11rem)" }}>
                    {"Let's Connect".split("").map((c, i) => (
                        <motion.span
                            key={i} initial={{ opacity: 0, y: 40 }} animate={isHeadingInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.05, duration: 0.8 }}
                            className="inline-block hover:text-cyan-400 transition-colors cursor-default"
                        >
                            {c === " " ? "\u00A0" : c}
                        </motion.span>
                    ))}
                </h2>
                <motion.div
                    className="h-1 bg-cyan-500 mt-6"
                    initial={{ width: 0 }} whileInView={{ width: "320px" }} transition={{ delay: 1, duration: 1.5 }}
                />
                <p className="mt-12 text-zinc-600 font-bold uppercase tracking-[0.6em] text-[10px] md:text-sm">{ROLES}</p>
            </motion.div>

            {/* ── SECTION 2 & 3: HUB (Main Form Area) ── */}
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-7xl mx-auto w-full px-6 py-24">

                {/* FORM SECTION */}
                <motion.div
                    initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                    className="bg-[#0a1628]/60 backdrop-blur-2xl border border-white/5 p-12 rounded-[3.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.4)]"
                >
                    <div className="flex items-center gap-4 mb-14">
                        <div className="p-4 bg-cyan-500/10 rounded-[2rem] border border-cyan-500/20">
                            <Sparkles size={28} className="text-cyan-400" />
                        </div>
                        <div>
                            <h3 className="text-4xl font-black text-white tracking-tight uppercase">AI Hub Brief</h3>
                            <p className="text-[10px] font-bold text-zinc-500 tracking-[0.2em] mt-1 flex items-center gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-purple-500 animate-pulse" />
                                EST. RESPONSE: &lt; 24H
                            </p>
                        </div>
                    </div>

                    <form onSubmit={(e) => { e.preventDefault(); setSubmitState("loading"); setTimeout(() => setSubmitState("success"), 1500); }} className="space-y-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                            <FloatingInput id="name" name="name" label="Full Name" required />
                            <FloatingInput id="email" name="email" label="Email Address" type="email" required />
                        </div>
                        <FloatingSelect id="subject" name="subject" label="Subject of Interest" options={SUBJECTS} required />
                        <FileUpload />
                        <FloatingInput id="message" name="message" label="How can I help you?" textarea rows={5} maxLength={1000} required />

                        <motion.button
                            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                            className={`w-full h-16 rounded-2xl font-black uppercase tracking-widest text-[11px] overflow-hidden relative flex items-center justify-center gap-4 transition-all duration-500 ${submitState === "success" ? "bg-green-500 text-black" : "bg-gradient-to-r from-[#6A0DAD] via-cyan-500 to-[#0A1628] text-white"}`}
                        >
                            {submitState === "idle" && <><Send size={16} /> Transmit Query</>}
                            {submitState === "loading" && <><Loader2 size={16} className="animate-spin" /> Processing Neural Link...</>}
                            {submitState === "success" && <><CheckCircle2 size={18} /> Brief Sent Successfully!</>}

                            <motion.div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity" />
                        </motion.button>
                    </form>
                </motion.div>

                {/* INFO SECTION */}
                <div className="space-y-10">
                    <motion.div
                        initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                        className="bg-zinc-900/20 border border-white/5 p-12 rounded-[3.5rem] relative overflow-hidden group"
                    >
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/10 blur-[80px] rounded-full" />
                        <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600 mb-10">Direct Connectivity</h4>

                        <div className="space-y-8">
                            <div className="flex items-center justify-between p-6 bg-zinc-950/40 border border-white/5 rounded-3xl group/item hover:border-cyan-500/30 transition-all">
                                <div className="flex items-center gap-5">
                                    <div className="p-4 bg-cyan-500/10 rounded-2xl group-hover/item:scale-110 transition-transform">
                                        <Mail size={24} className="text-cyan-400" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase text-zinc-600 mb-1">Email</p>
                                        <p className="text-xl font-bold text-white tracking-tight">adwaitana@gmail.com</p>
                                    </div>
                                </div>
                                <button onClick={() => handleCopy("adwaitana@gmail.com")} className="p-3 text-zinc-600 hover:text-cyan-400 transition-colors">
                                    <Copy size={18} />
                                </button>
                            </div>

                            <a href="tel:+917008139369" className="flex items-center gap-5 p-6 bg-zinc-950/40 border border-white/5 rounded-3xl hover:border-purple-500/30 transition-all group/call">
                                <div className="p-4 bg-purple-500/10 rounded-2xl group-hover/call:scale-110 transition-transform">
                                    <Phone size={24} className="text-purple-400" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase text-zinc-600 mb-1">Phone</p>
                                    <p className="text-xl font-bold text-white tracking-tight">+91 7008139369</p>
                                </div>
                            </a>

                            <div className="flex items-center gap-5 p-6 bg-zinc-950/40 border border-white/5 rounded-3xl hover:border-green-500/30 transition-all">
                                <div className="p-4 bg-green-500/10 rounded-2xl">
                                    <MapPin size={24} className="text-green-500" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase text-zinc-600 mb-1">Location</p>
                                    <p className="text-xl font-bold text-white tracking-tight">Bhubaneswar, India</p>
                                </div>
                                <div className="ml-auto flex items-center gap-2 bg-green-500/10 px-3 py-1 rounded-full">
                                    <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                                    <span className="text-[9px] font-black text-green-500 uppercase">Online Now</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-14 pt-10 border-t border-white/5">
                            <div className="flex flex-wrap gap-4">
                                {SOCIALS.map((s, i) => (
                                    <motion.a
                                        key={s.label} href={s.href} target="_blank" whileHover={{ y: -5 }}
                                        className={`flex items-center gap-3 bg-zinc-950/60 p-4 rounded-2xl border border-white/5 ${s.color} transition-all`}
                                    >
                                        <s.icon size={20} />
                                        <span className="text-[10px] font-black uppercase tracking-widest">{s.label}</span>
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* FAQ SECTION */}
                    <div className="space-y-4">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600 ml-4 mb-6">Service FAQ</h4>
                        {FAQS.map((faq, idx) => (
                            <div key={idx} className="bg-zinc-900/10 border border-white/5 rounded-3xl overflow-hidden">
                                <button
                                    className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
                                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                                >
                                    <p className="text-sm font-bold text-zinc-300 tracking-tight">{faq.q}</p>
                                    <div className={`transition-transform duration-500 ${activeFaq === idx ? 'rotate-180 text-cyan-400' : 'text-zinc-700'}`}>
                                        <Plus size={18} />
                                    </div>
                                </button>
                                <AnimatePresence>
                                    {activeFaq === idx && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden bg-zinc-900/20"
                                        >
                                            <p className="p-8 pt-0 text-sm text-zinc-500 leading-relaxed">{faq.a}</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── SECTION 5: QUICK ACTION BAR (10vh) ── */}
            <div id="quick-links" className="relative z-10 w-full bg-zinc-950/80 backdrop-blur-xl border-t border-white/5 py-12 mt-auto">
                <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-between gap-8">
                    <p className="text-[11px] font-bold text-zinc-700 uppercase tracking-[0.3em] max-w-sm">Elevate your specialized AI infrastructure with precision engineering.</p>
                    <div className="flex flex-wrap gap-4">
                        {[
                            { label: "Resume", icon: Download, bg: "bg-white text-black" },
                            { label: "LinkedIn", icon: Linkedin, bg: "bg-zinc-900 text-white border border-white/10" },
                            { label: "Schedule Call", icon: CalendarIcon, bg: "bg-cyan-500 text-black shadow-[0_10px_30px_rgba(6,182,212,0.3)]" }
                        ].map(lk => (
                            <motion.button
                                key={lk.label} whileHover={{ y: -4, scale: 1.05 }}
                                className={`flex items-center gap-3 px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-widest ${lk.bg}`}
                            >
                                {lk.label} <lk.icon size={12} />
                            </motion.button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Copy Notification Toast */}
            <AnimatePresence>
                {copyToast && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }}
                        className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] bg-cyan-500 text-black px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl flex items-center gap-3"
                    >
                        <Check size={16} /> Link Copied to Clipboard
                    </motion.div>
                )}
            </AnimatePresence>

            <style jsx global>{`
                @font-face { font-family: 'Grotesk'; src: local('Space Grotesk'), local('Inter'); }
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(6,182,212,0.1); border-radius: 20px; }
                @keyframes shake { 0%, 100%{transform: translateX(0)} 25%{transform: translateX(-6px)} 75%{transform: translateX(6px)} }
                .animate-shake { animation: shake 0.4s ease-in-out; }
            `}</style>
        </section>
    );
}
