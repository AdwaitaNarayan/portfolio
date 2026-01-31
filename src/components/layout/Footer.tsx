export default function Footer() {
    return (
        <footer id="contact" className="border-t border-white/[0.06] bg-white/[0.01] py-16">
            <div className="mx-auto max-w-2xl text-center">
                <h2 className="mb-4 text-3xl font-semibold text-white">
                    Let's Build Something
                </h2>
                <p className="mb-8 text-sm text-zinc-500">
                    Open to full-time opportunities and consulting projects in AI/ML, full-stack development, and system automation.
                </p>

                <div className="mb-8 space-y-2">
                    <a
                        href="mailto:adwaita@example.com"
                        className="block text-sm font-medium text-zinc-400 transition-colors hover:text-amber-500"
                    >
                        adwaita@example.com
                    </a>
                    <a
                        href="https://github.com/adwaita"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-sm font-medium text-zinc-400 transition-colors hover:text-amber-500"
                    >
                        github.com/adwaita
                    </a>
                    <a
                        href="https://linkedin.com/in/adwaita"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-sm font-medium text-zinc-400 transition-colors hover:text-amber-500"
                    >
                        linkedin.com/in/adwaita
                    </a>
                </div>

                <div className="text-xs text-zinc-600">
                    © 2026 Adwaita Narayan · Built with Next.js
                </div>
            </div>
        </footer>
    );
}
