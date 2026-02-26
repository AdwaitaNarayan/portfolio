"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// ─── Types & Constants ────────────────────────────────────────────────────────
type CursorMode = "default" | "avatar" | "name" | "link";

const MODE_RGB: Record<CursorMode, string> = {
    default: "255,255,255",
    avatar: "6,182,212",   // cyan
    name: "251,191,36",  // amber
    link: "168,85,247",  // violet
};
const MODE_SIZE: Record<CursorMode, number> = {
    default: 12,
    avatar: 28,
    name: 16,
    link: 8,
};

const TRAIL_LEN = 5;
const RING_INTERVAL_MS = 2200;

// ─── Component ────────────────────────────────────────────────────────────────
export default function CustomCursor() {
    const [mounted, setMounted] = useState(false);
    const [mode, setMode] = useState<CursorMode>("default");
    const [trail, setTrail] = useState<{ x: number; y: number }[]>([]);
    const [rings, setRings] = useState<number[]>([]); // timestamps of ring emits
    const [dotScale, setDotScale] = useState(1);

    // Raw cursor position → spring-smoothed for dot + rings
    const rawX = useMotionValue(-300);
    const rawY = useMotionValue(-300);
    const dotX = useSpring(rawX, { stiffness: 650, damping: 40 });
    const dotY = useSpring(rawY, { stiffness: 650, damping: 40 });

    // Internal refs (avoid stale closures in event listeners)
    const trailRef = useRef<{ x: number; y: number }[]>([]);
    const lastRef = useRef({ x: -300, y: -300, t: Date.now() });
    const magnetRef = useRef<{
        el: HTMLElement;
        cx: number;
        cy: number;
        radius: number;
    } | null>(null);

    useEffect(() => {
        // Skip on touch/mobile devices
        if (typeof window === "undefined") return;
        if ("ontouchstart" in window) return;

        setMounted(true);

        // ① Mouse move — velocity, magnetic pull, trail push
        const onMove = (e: MouseEvent) => {
            const { clientX: mx, clientY: my } = e;
            const now = Date.now();
            const dt = Math.max(now - lastRef.current.t, 1);
            const dx = mx - lastRef.current.x;
            const dy = my - lastRef.current.y;
            const speed = (Math.sqrt(dx * dx + dy * dy) / dt) * 16; // normalize ~0-3
            lastRef.current = { x: mx, y: my, t: now };

            // Velocity-based dot scale (capped at 2.2×)
            setDotScale(Math.min(1 + speed * 0.13, 2.2));

            // Magnetic pull
            let finalX = mx;
            let finalY = my;
            const magnet = magnetRef.current;
            if (magnet) {
                const dist = Math.hypot(mx - magnet.cx, my - magnet.cy);
                if (dist < magnet.radius) {
                    const pull = (1 - dist / magnet.radius) * 0.45;
                    finalX = mx + (magnet.cx - mx) * pull;
                    finalY = my + (magnet.cy - my) * pull;
                    magnet.el.style.transform = `translate(${(magnet.cx - mx) * pull * 0.28}px, ${(magnet.cy - my) * pull * 0.28}px)`;
                } else {
                    magnet.el.style.transform = "";
                }
            }

            rawX.set(finalX);
            rawY.set(finalY);
            trailRef.current = [{ x: finalX, y: finalY }, ...trailRef.current].slice(0, TRAIL_LEN);
        };

        // ② Mode detection via target inspection
        const onOver = (e: MouseEvent) => {
            const el = (e.target as HTMLElement).closest<HTMLElement>("[data-cursor], a, button, [role='button']");
            if (!el) { setMode("default"); return; }
            const dc = el.getAttribute("data-cursor");
            if (dc === "avatar") setMode("avatar");
            else if (dc === "name") setMode("name");
            else setMode("link");
        };
        const onOut = (e: MouseEvent) => {
            if (!(e.relatedTarget as HTMLElement)?.closest("[data-cursor], a, button")) {
                setMode("default");
            }
        };

        // ③ Magnetic elements (registered after DOM settles)
        const registerMagnets = () => {
            document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((el) => {
                el.addEventListener("mouseenter", () => {
                    const r = el.getBoundingClientRect();
                    magnetRef.current = {
                        el,
                        cx: r.left + r.width / 2,
                        cy: r.top + r.height / 2,
                        radius: 150, // #4 exact 150px attraction radius
                    };
                });
                el.addEventListener("mouseleave", () => {
                    if (magnetRef.current?.el === el) {
                        el.style.transform = "";
                        magnetRef.current = null;
                    }
                });
            });
        };

        // ④ rAF loop — keeps trail state in sync with trailRef
        let raf: number;
        const tick = () => {
            setTrail([...trailRef.current]);
            raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);

        // ⑤ Ring pulse interval
        const ringTimer = setInterval(() => {
            setRings((prev) => [...prev, Date.now()].slice(-3));
        }, RING_INTERVAL_MS);

        document.addEventListener("mousemove", onMove);
        document.addEventListener("mouseover", onOver);
        document.addEventListener("mouseout", onOut);
        const magTimer = setTimeout(registerMagnets, 600);
        document.body.style.cursor = "none";

        return () => {
            document.removeEventListener("mousemove", onMove);
            document.removeEventListener("mouseover", onOver);
            document.removeEventListener("mouseout", onOut);
            cancelAnimationFrame(raf);
            clearInterval(ringTimer);
            clearTimeout(magTimer);
            document.body.style.cursor = "";
        };
    }, [rawX, rawY]);

    if (!mounted) return null;

    const rgb = MODE_RGB[mode];
    const baseSize = MODE_SIZE[mode];
    const scaledSize = Math.round(baseSize * dotScale);
    const half = scaledSize / 2;

    return (
        <>
            {/* Hide native cursor globally */}
            <style>{`* { cursor: none !important; }`}</style>

            {/* ── Glow Trail ──────────────────────────────────────────── */}
            {trail.map((pos, i) => {
                const ratio = (TRAIL_LEN - i) / TRAIL_LEN;
                const sz = Math.max(2, ratio * 8);
                const opacity = ratio * 0.38;
                const blur = (i + 1) * 1.5;
                return (
                    <div
                        key={i}
                        className="fixed top-0 left-0 rounded-full pointer-events-none"
                        style={{
                            zIndex: 9996,
                            width: sz,
                            height: sz,
                            transform: `translate(${pos.x - sz / 2}px, ${pos.y - sz / 2}px)`,
                            background: `rgba(${rgb}, ${opacity})`,
                            filter: `blur(${blur}px)`,
                        }}
                    />
                );
            })}

            {/* ── Concentric Expanding Rings ───────────────────────────── */}
            {rings.flatMap((key) =>
                [0, 1, 2].map((i) => (
                    <motion.div
                        key={`${key}-${i}`}
                        className="fixed top-0 left-0 rounded-full pointer-events-none"
                        style={{
                            x: dotX,
                            y: dotY,
                            zIndex: 9995,
                            width: 18,
                            height: 18,
                            marginLeft: -9,
                            marginTop: -9,
                            border: `1px solid rgba(${rgb}, 0.55)`,
                        }}
                        initial={{ scale: 0.6, opacity: 0.65 }}
                        animate={{ scale: 4 + i * 1.4, opacity: 0 }}
                        transition={{
                            duration: 1.5 + i * 0.25,
                            delay: i * 0.14,
                            ease: "easeOut",
                        }}
                    />
                ))
            )}

            {/* ── Main Cursor Dot ───────────────────────────────────────── */}
            <motion.div
                className="fixed top-0 left-0 rounded-full pointer-events-none"
                style={{
                    x: dotX,
                    y: dotY,
                    zIndex: 9999,
                }}
                animate={{
                    width: scaledSize,
                    height: scaledSize,
                    marginLeft: -half,
                    marginTop: -half,
                    backgroundColor: `rgb(${rgb})`,
                    boxShadow: `0 0 ${baseSize}px rgba(${rgb},0.75), 0 0 ${baseSize * 3}px rgba(${rgb},0.25)`,
                }}
                transition={{ type: "spring", stiffness: 380, damping: 28 }}
            />
        </>
    );
}
