"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
    motion, useMotionValue, useSpring, useTransform,
    useScroll, AnimatePresence,
} from "framer-motion";

// ─── Data ─────────────────────────────────────────────────────────────────────
const NAME = "Adwaita Narayan Behera";
const SUBTITLE = "Artificial Intelligence & Machine Learning Enthusiast";

const ORBITALS = [
    { r: 185, size: 5, dur: 8, delay: 0, a: 0.70, rgb: "6,182,212" },
    { r: 235, size: 3, dur: 13, delay: -4, a: 0.50, rgb: "251,191,36" },
    { r: 160, size: 4, dur: 6, delay: -2, a: 0.60, rgb: "168,85,247" },
    { r: 270, size: 2, dur: 17, delay: -8, a: 0.36, rgb: "255,255,255" },
    { r: 140, size: 3, dur: 10, delay: -5, a: 0.55, rgb: "34,197,94" },
    { r: 205, size: 2, dur: 19, delay: -10, a: 0.32, rgb: "6,182,212" },
    { r: 295, size: 4, dur: 9, delay: -3, a: 0.40, rgb: "251,191,36" },
    { r: 125, size: 2, dur: 7, delay: -1, a: 0.58, rgb: "255,255,255" },
];

const Q_RGB: Record<string, string> = {
    tl: "99,102,241", tr: "251,191,36", bl: "168,85,247", br: "6,182,212",
};

// ─── Subtitle stagger variants ────────────────────────────────────────────────
const subCtr = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.043, delayChildren: NAME.length * 0.074 + 0.5 } },
};
const subCh = {
    hidden: { opacity: 0, y: 6 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.36, ease: [0.22, 1, 0.36, 1] } },
};

type Ripple = { id: number; x: number; y: number };

// ─── Component ────────────────────────────────────────────────────────────────
export default function Hero() {
    const sectionRef = useRef<HTMLElement>(null);

    const [mounted, setMounted] = useState(false);
    const [stars, setStars] = useState<{ l: string; t: string; d: number }[]>([]);
    const [nameIdx, setNameIdx] = useState(0);
    const [heroHovered, setHeroHovered] = useState(false);
    const [nameHovered, setNameHovered] = useState(false);
    const [avatarHovered, setAvatarHovered] = useState(false); // #7 blur/focus
    const [quadrant, setQuadrant] = useState("tr");
    const [ripples, setRipples] = useState<Ripple[]>([]);
    const [winW, setWinW] = useState(1440);
    const [winH, setWinH] = useState(900);

    // Raw cursor (viewport pixels)
    const cX = useMotionValue(720);
    const cY = useMotionValue(450);

    // Normalized −0.5→0.5 (function form handles resize)
    const nX = useTransform(cX, (v) => v / winW - 0.5);
    const nY = useTransform(cY, (v) => v / winH - 0.5);

    // 3D tilt — #1 increased to ±18°Y / ±16°X
    const tCfg = { stiffness: 180, damping: 22 };
    const rotY = useSpring(useTransform(nX, [-0.5, 0.5], [-18, 18]), tCfg);
    const rotX = useSpring(useTransform(nY, [-0.5, 0.5], [16, -16]), tCfg);

    // Eye parallax
    const pCfg = { stiffness: 90, damping: 28 };
    const parX = useSpring(useTransform(nX, [-0.5, 0.5], [-10, 10]), pCfg);
    const parY = useSpring(useTransform(nY, [-0.5, 0.5], [-7, 7]), pCfg);

    // Light source (sluggish spring = volumetric lighting lag)
    const lX = useSpring(cX, { stiffness: 68, damping: 17 });
    const lY = useSpring(cY, { stiffness: 68, damping: 17 });

    // Scroll fade-out + parallax
    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
    const heroOpa = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
    const heroScl = useTransform(scrollYProgress, [0, 0.55], [1, 0.88]);
    const avatarY = useTransform(scrollYProgress, [0, 1], ["0px", "-70px"]);
    const bgY = useTransform(scrollYProgress, [0, 1], ["0px", "-18px"]);

    // Mount
    useEffect(() => {
        setMounted(true);
        setWinW(window.innerWidth);
        setWinH(window.innerHeight);
        setStars([...Array(30)].map(() => ({
            l: `${Math.random() * 100}%`,
            t: `${Math.random() * 100}%`,
            d: 2 + Math.random() * 3,
        })));
        const onResize = () => { setWinW(window.innerWidth); setWinH(window.innerHeight); };
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    // Typewriter
    useEffect(() => {
        if (nameIdx >= NAME.length) return;
        const t = setTimeout(() => setNameIdx((n) => n + 1), nameIdx === 0 ? 600 : 74);
        return () => clearTimeout(t);
    }, [nameIdx]);

    const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
        cX.set(e.clientX);
        cY.set(e.clientY);
        setQuadrant((e.clientY > winH / 2 ? "b" : "t") + (e.clientX > winW / 2 ? "r" : "l"));
    };

    const handleAvatarClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const id = Date.now();
        setRipples((p) => [...p, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }]);
        setTimeout(() => setRipples((p) => p.filter((r) => r.id !== id)), 1100);
    };

    const qRgb = Q_RGB[quadrant] ?? Q_RGB["tr"];

    return (
        <motion.section
            ref={sectionRef}
            className="relative flex flex-col items-center justify-center h-screen w-screen left-1/2 -ml-[50vw] overflow-hidden text-center border-b border-white/[0.03]"
            style={{ opacity: heroOpa, scale: heroScl }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setHeroHovered(true)}
            onMouseLeave={() => setHeroHovered(false)}
        >
            {/* ── Grid Mesh + Hotspot ─────────────────────────────────────────── */}
            <motion.div className="absolute inset-0 pointer-events-none z-0" style={{ y: bgY }}>
                <div className="absolute inset-0" style={{
                    backgroundImage: [
                        "linear-gradient(rgba(255,255,255,0.042) 1px, transparent 1px)",
                        "linear-gradient(90deg, rgba(255,255,255,0.042) 1px, transparent 1px)",
                    ].join(","),
                    backgroundSize: "58px 58px",
                }} />
                {/* Cursor grid-glow (dynamic background shift) */}
                <motion.div className="absolute pointer-events-none" style={{
                    x: lX, y: lY,
                    width: 700, height: 600, marginLeft: -350, marginTop: -300,
                    borderRadius: "50%",
                    background: `radial-gradient(ellipse at center, rgba(${qRgb},0.145) 0%, transparent 68%)`, // #5 warmer hotspot
                    filter: "blur(28px)",
                }} />
            </motion.div>

            {/* ── Stars ──────────────────────────────────────────────────────── */}
            <div className="absolute inset-0 z-[1] pointer-events-none">
                {mounted && stars.map((s, i) => (
                    <motion.div key={i} className="absolute w-[1px] h-[1px] bg-white rounded-full"
                        style={{ left: s.l, top: s.t, opacity: 0.18 }}
                        animate={{ opacity: [0.08, 0.38, 0.08], scale: [1, 1.3, 1] }}
                        transition={{ duration: s.d, repeat: Infinity, ease: "easeInOut" }} />
                ))}
            </div>

            {/* ── Quadrant Glow Zones ─────────────────────────────────────────── */}
            <motion.div
                className="absolute inset-0 pointer-events-none z-[2]"
                animate={{
                    background: `radial-gradient(ellipse 64% 64% at ${quadrant.includes("r") ? "74%" : "26%"} ${quadrant.includes("b") ? "74%" : "26%"}, rgba(${qRgb},0.095) 0%, transparent 60%)`, // #5 amplified quadrant zone
                }}
                transition={{ duration: 0.9, ease: "easeOut" }}
            />

            {/* ── Radial Light Source (warm) ─────────────────────────────────── */}
            <motion.div className="absolute pointer-events-none z-[3]" style={{
                x: lX, y: lY,
                width: 480, height: 480, marginLeft: -240, marginTop: -240,
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(255,210,120,0.13) 0%, transparent 65%)",
                filter: "blur(22px)",
                mixBlendMode: "screen",
            }} />

            {/* ── Avatar + Text — scroll-parallax wrapper ────────────────────── */}
            <motion.div
                className="relative z-10 flex flex-col items-center justify-center space-y-0 w-full pt-10"
                style={{ y: avatarY }}
            >
                {/* Hub: orbitals + layers */}
                <div className="relative mx-auto w-[300px] h-[400px] md:w-[500px] md:h-[650px]">

                    {/* ── Orbital Particles ──────────────────────────────────── */}
                    {mounted && ORBITALS.map((p, i) => (
                        <div key={i} className="absolute pointer-events-none" style={{
                            top: "50%", left: "50%", width: 0, height: 0,
                            animation: `orbSpin ${p.dur}s linear ${p.delay}s infinite`,
                        }}>
                            <div className="absolute rounded-full" style={{
                                width: p.size, height: p.size,
                                left: p.r, top: -p.size / 2,
                                backgroundColor: `rgba(${p.rgb},${p.a})`,
                                boxShadow: `0 0 ${p.size * 3}px rgba(${p.rgb},${p.a * 0.85})`,
                            }} />
                        </div>
                    ))}

                    {/* ── Layer 1: Entrance + 3D tilt ────────────────────────── */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        whileHover={{ scale: 1.07 }}     // #6 hover scale
                        whileTap={{ scale: 1.11 }}
                        style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d", perspective: 900 }}
                        data-cursor="avatar" data-magnetic
                        onMouseEnter={() => setAvatarHovered(true)}    // #7
                        onMouseLeave={() => setAvatarHovered(false)}   // #7
                        onClick={handleAvatarClick}
                        className="absolute inset-0"
                    >
                        {/* ── Layer 2: Float loop — #2 more pronounced ─────── */}
                        <motion.div className="absolute inset-0"
                            animate={{ y: [0, -28, 0] }}
                            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
                        >
                            {/* Breathing glow ring — #3 amplified, 2.4s */}
                            <motion.div className="absolute inset-0 rounded-full pointer-events-none"
                                animate={{
                                    boxShadow: [
                                        "0 0 20px rgba(6,182,212,0.08), 0 0  50px rgba(6,182,212,0.02)",
                                        "0 0 90px rgba(6,182,212,0.70), 0 0 180px rgba(6,182,212,0.32)",
                                        "0 0 20px rgba(6,182,212,0.08), 0 0  50px rgba(6,182,212,0.02)",
                                    ]
                                }}
                                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }} />

                            {/* Breathing blob — #3 amplified */}
                            <motion.div className="absolute inset-0 rounded-full blur-[120px] pointer-events-none"
                                animate={{
                                    backgroundColor: ["rgba(6,182,212,0.05)", "rgba(6,182,212,0.32)", "rgba(6,182,212,0.05)"],
                                    scale: [1, 1.18, 1],
                                }}
                                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }} />

                            {/* ── Layer 3: Eye parallax + #7 blur/focus ──── */}
                            <motion.div className="absolute inset-0" style={{ x: parX, y: parY }}
                                animate={{ filter: avatarHovered ? "blur(0px) brightness(1.08)" : "blur(1.5px) brightness(0.92)" }}
                                transition={{ duration: 0.45, ease: "easeOut" }}
                            >
                                <Image src="/adwaita_face.svg" alt="Adwaita Narayan Behera"
                                    fill className="object-contain object-top scale-115 md:scale-[1.5]" priority />
                            </motion.div>

                            {/* ── Ripples ───────────────────────────────── */}
                            <AnimatePresence>
                                {ripples.map((r) => (
                                    <motion.div key={r.id}
                                        className="absolute rounded-full border border-cyan-400/50 pointer-events-none"
                                        style={{ left: r.x, top: r.y, width: 20, height: 20, marginLeft: -10, marginTop: -10 }}
                                        initial={{ scale: 0.5, opacity: 0.8 }}
                                        animate={{ scale: 9, opacity: 0 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 1.0, ease: "easeOut" }} />
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    </motion.div>
                </div>

                {/* ── Name: typewriter + glow + self-drawing underline ─────────── */}
                <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: nameIdx > 0 ? 1 : 0 }}
                    className="space-y-4 px-4 -mt-16 md:-mt-24 relative z-20"
                >
                    <div className="relative inline-block"
                        onMouseEnter={() => setNameHovered(true)}
                        onMouseLeave={() => setNameHovered(false)}
                    >
                        <h1 data-cursor="name"
                            className="text-4xl md:text-7xl font-serif text-white leading-tight transition-all duration-700"
                            style={{ textShadow: heroHovered ? "0 0 30px rgba(255,255,255,0.45),0 0 60px rgba(6,182,212,0.28)" : "none" }}
                        >
                            {NAME.split("").map((ch, i) => (
                                <motion.span key={i}
                                    initial={{ opacity: 0, textShadow: "0 0 18px rgba(255,255,255,1)" }}
                                    animate={i < nameIdx ? {
                                        opacity: 1,
                                        textShadow: ["0 0 18px rgba(255,255,255,1)", "0 0 0px rgba(255,255,255,0)"],
                                    } : {}}
                                    transition={{ duration: 0.55, ease: "easeOut" }}
                                >
                                    {ch === " " ? "\u00A0" : ch}
                                </motion.span>
                            ))}
                        </h1>

                        {/* Self-drawing gradient underline */}
                        <motion.div className="absolute bottom-0 left-0 right-0 h-[1px]"
                            style={{
                                background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.7) 30%,rgba(6,182,212,0.9) 70%,transparent)",
                                transformOrigin: "left center",
                            }}
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: nameHovered ? 1 : 0 }}
                            transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }} />
                    </div>

                    {/* ── Subtitle: staggered char fade-in ──────────────────────── */}
                    <motion.h2
                        variants={subCtr} initial="hidden" animate="visible"
                        className="text-[10px] md:text-xs font-sans uppercase tracking-[0.6em] text-zinc-500 font-medium"
                        style={{
                            textShadow: heroHovered ? "0 0 20px rgba(6,182,212,0.38)" : "none",
                            transition: "text-shadow 0.7s ease",
                        }}
                    >
                        {SUBTITLE.split("").map((ch, i) => (
                            <motion.span key={i} variants={subCh}>
                                {ch === " " ? "\u00A0" : ch}
                            </motion.span>
                        ))}
                    </motion.h2>
                </motion.div>
            </motion.div>

            {/* Orbital keyframe */}
            <style>{`@keyframes orbSpin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
        </motion.section>
    );
}
