"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
    const [mounted, setMounted] = useState(false);
    const [stars, setStars] = useState<{ left: string; top: string; duration: number }[]>([]);

    useEffect(() => {
        setMounted(true);
        // Pre-calculate stars once on mount to avoid re-randomizing on every render
        const newStars = [...Array(30)].map(() => ({
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            duration: 2 + Math.random() * 3,
        }));
        setStars(newStars);
    }, []);

    return (
        <section
            className="relative flex flex-col items-center justify-center h-screen w-screen left-1/2 -ml-[50vw] overflow-hidden text-center border-b border-white/[0.03]"
        >

            {/* Background Content Grid (Subtle Client-side Stars) */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {mounted && stars.map((star, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-[1px] h-[1px] bg-white rounded-full opacity-20"
                        style={{
                            left: star.left,
                            top: star.top,
                        }}
                        animate={{
                            opacity: [0.1, 0.4, 0.1],
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            duration: star.duration,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center space-y-0 w-full pt-10">
                {/* Floating Hero Image with Neon Hover Effect */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="relative w-[300px] h-[400px] md:w-[500px] md:h-[650px] mx-auto group transition-all duration-500 rounded-full hover:shadow-[0_0_50px_rgba(6,182,212,0.4),0_0_100px_rgba(6,182,212,0.2)]"
                >
                    {/* Dynamic Background Glow */}
                    <div className="absolute inset-0 bg-cyan-500/5 blur-[120px] rounded-full scale-100 group-hover:bg-cyan-500/20 group-hover:scale-110 transition-all duration-700" />

                    <Image
                        src="/adwaita_face.svg"
                        alt="Adwaita Narayan Behera"
                        fill
                        className="object-contain object-top scale-115 md:scale-[1.5] transition-transform duration-700 group-hover:scale-[1.55]"
                        priority
                    />
                </motion.div>

                {/* Name and Title - Perfectly Integrated */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="space-y-4 px-4 -mt-16 md:-mt-24 relative z-20"
                >
                    <h1 className="text-4xl md:text-7xl font-serif text-white leading-tight">
                        Adwaita Narayan Behera
                    </h1>
                    <h2 className="text-[10px] md:text-xs font-sans uppercase tracking-[0.6em] text-zinc-500 font-medium whitespace-nowrap">
                        Artificial Intelligence & Machine Learning Enthusiast
                    </h2>
                </motion.div>
            </div>

        </section>
    );
}
