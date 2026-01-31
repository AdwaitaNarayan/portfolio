"use client";

import React from "react";

export default function ThreeColumnLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="relative min-h-screen w-full bg-[#0a0a0a] text-zinc-50 overflow-hidden font-sans">
            {/* Background Texture Overlay */}
            <div
                className="pointer-events-none fixed inset-0 z-0 opacity-40 mix-blend-soft-light"
                style={{
                    backgroundImage: 'url("/background-texture.png")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            />

            <div className="relative z-10 mx-auto max-w-[1400px] px-8 md:px-16">
                {children}
            </div>
        </main>
    );
}
