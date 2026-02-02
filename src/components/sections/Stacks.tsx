"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.1
        }
    }
};

const tileVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1]
        }
    }
};

export default function Stacks() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    return (
        <section id="stacks" className="py-24 bg-black" ref={sectionRef}>
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center justify-center gap-4 mb-16"
            >
                <h2 className="text-6xl md:text-8xl font-bold text-white tracking-tight">
                    Stacks
                </h2>
                <div className="flex items-center bg-white border border-black px-2 py-1 gap-2 h-fit mt-4">
                    <span className="text-[10px] text-zinc-500 font-bold uppercase">Search With</span>
                    <div className="bg-black text-white text-[10px] font-black px-1 py-0.5 flex items-center gap-1">
                        AI <span className="text-[10px] font-normal">+</span>
                    </div>
                    <div className="w-1.5 h-1.5 bg-black" />
                </div>
            </motion.div>

            {/* Masonry Grid */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="flex gap-px h-[600px] w-full border-t border-b border-zinc-900 bg-zinc-900"
            >
                {/* Column 1 */}
                <div className="flex-[2.5] flex flex-col gap-px">
                    <motion.div variants={tileVariants} whileHover={{ backgroundColor: "#18181b" }} className="flex-[2] bg-zinc-900 flex items-center justify-center p-4">
                        <span className="text-white text-xl font-bold tracking-tight">React & Next.js</span>
                    </motion.div>
                    <motion.div variants={tileVariants} whileHover={{ backgroundColor: "#27272a" }} className="flex-[1.2] bg-zinc-800 flex items-center justify-center p-4">
                        <span className="text-white text-lg font-bold tracking-tight">Python</span>
                    </motion.div>
                    <motion.div variants={tileVariants} whileHover={{ backgroundColor: "#18181b" }} className="flex-[1] bg-zinc-900 flex items-center justify-center p-4">
                        <span className="text-white text-lg font-bold tracking-tight">TypeScript</span>
                    </motion.div>
                </div>

                {/* Column 2 */}
                <div className="flex-[1.8] flex flex-col gap-px">
                    <motion.div variants={tileVariants} whileHover={{ backgroundColor: "#09090b" }} className="flex-[1] bg-black flex flex-col items-center justify-center p-4">
                        <span className="text-white text-lg font-bold tracking-tight">FastAPI</span>
                    </motion.div>
                    <motion.div variants={tileVariants} whileHover={{ backgroundColor: "#18181b" }} className="flex-[1.5] bg-zinc-900 flex items-center justify-center p-4">
                        <span className="text-white text-lg font-bold tracking-tight">PostgreSQL</span>
                    </motion.div>
                    <motion.div variants={tileVariants} whileHover={{ backgroundColor: "#27272a" }} className="flex-[1.2] bg-zinc-800 flex items-center justify-center p-4">
                        <span className="text-white text-lg font-bold tracking-tight">Tailwind CSS</span>
                    </motion.div>
                </div>

                {/* Column 3 */}
                <div className="flex-[2] flex flex-col gap-px">
                    <motion.div variants={tileVariants} whileHover={{ backgroundColor: "#27272a" }} className="flex-[0.8] bg-zinc-800 flex items-center justify-center p-4">
                        <span className="text-white text-lg font-bold tracking-tight">JavaScript</span>
                    </motion.div>
                    <motion.div variants={tileVariants} whileHover={{ backgroundColor: "#18181b" }} className="flex-[1] bg-zinc-900 flex items-center justify-center p-4">
                        <span className="text-white text-lg font-bold tracking-tight">RAG Systems</span>
                    </motion.div>
                    <motion.div variants={tileVariants} whileHover={{ backgroundColor: "#09090b" }} className="flex-[1.3] bg-black flex items-center justify-center p-4 border border-zinc-950">
                        <span className="text-white text-xl font-black tracking-tighter">LLMs</span>
                    </motion.div>
                    <motion.div variants={tileVariants} whileHover={{ backgroundColor: "#3f3f46" }} className="flex-[0.9] bg-zinc-700 flex items-center justify-center p-4">
                        <span className="text-white text-lg font-bold tracking-tight">LangChain</span>
                    </motion.div>
                </div>

                {/* Column 4 */}
                <div className="flex-[1.2] flex flex-col gap-px">
                    <motion.div variants={tileVariants} whileHover={{ backgroundColor: "#27272a" }} className="flex-[2.5] bg-zinc-800 flex items-center justify-center p-4">
                        <span className="text-white text-xl font-bold tracking-tight vertical-text uppercase">HTML5</span>
                    </motion.div>
                    <motion.div variants={tileVariants} whileHover={{ backgroundColor: "#18181b" }} className="flex-[1.2] bg-zinc-900 flex items-center justify-center p-4">
                        <span className="text-white text-lg font-bold tracking-tight">OCR</span>
                    </motion.div>
                    <motion.div variants={tileVariants} whileHover={{ backgroundColor: "#27272a" }} className="flex-[0.8] bg-zinc-800 flex items-center justify-center p-4">
                        <span className="text-white text-lg font-bold tracking-tight">Flask</span>
                    </motion.div>
                    <motion.div variants={tileVariants} whileHover={{ backgroundColor: "#09090b" }} className="flex-[0.9] bg-black flex items-center justify-center p-4">
                        <span className="text-white text-lg font-bold tracking-tight">Docker</span>
                    </motion.div>
                </div>

                {/* Column 5 */}
                <div className="flex-[1] flex flex-col gap-px">
                    <motion.div variants={tileVariants} whileHover={{ backgroundColor: "#09090b" }} className="flex-[2.5] bg-zinc-950 flex items-center justify-center p-4">
                        <span className="text-white text-lg font-bold tracking-tight">CSS3</span>
                    </motion.div>
                    <motion.div variants={tileVariants} whileHover={{ backgroundColor: "#18181b" }} className="flex-[1.5] bg-zinc-900 flex items-center justify-center p-4">
                        <span className="text-white text-lg font-bold tracking-tight">PyTorch</span>
                    </motion.div>
                    <motion.div variants={tileVariants} whileHover={{ backgroundColor: "#27272a" }} className="flex-[1] bg-zinc-800 flex items-center justify-center p-4">
                        <span className="text-white text-lg font-bold tracking-tight">TensorFlow</span>
                    </motion.div>
                </div>

                {/* Column 6 */}
                <div className="flex-[1.2] flex flex-col gap-px">
                    <motion.div variants={tileVariants} whileHover={{ backgroundColor: "#f4f4f5" }} className="flex-[2] bg-zinc-100 flex items-center justify-center p-4">
                        <span className="text-black text-xl font-black tracking-tight">SQL</span>
                    </motion.div>
                    <motion.div variants={tileVariants} whileHover={{ backgroundColor: "#18181b" }} className="flex-[1] bg-zinc-900 flex items-center justify-center p-4">
                        <span className="text-white text-lg font-bold tracking-tight">Linux</span>
                    </motion.div>
                    <div className="flex-[1.5] flex gap-px">
                        <motion.div variants={tileVariants} whileHover={{ backgroundColor: "#27272a" }} className="flex-1 bg-zinc-800 flex items-center justify-center p-2 text-center">
                            <span className="text-white text-[12px] font-black tracking-tight">SQLAlchemy</span>
                        </motion.div>
                        <motion.div variants={tileVariants} whileHover={{ backgroundColor: "#3f3f46" }} className="flex-1 bg-zinc-700 flex items-center justify-center p-2 text-center">
                            <span className="text-white text-[12px] font-black tracking-tight">scikit-learn</span>
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            <style jsx>{`
                .vertical-text {
                    writing-mode: vertical-rl;
                    transform: rotate(180deg);
                }
            `}</style>
        </section>
    );
}
