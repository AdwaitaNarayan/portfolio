import { Mail, Github, Linkedin } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="bg-zinc-50 py-24 dark:bg-zinc-900">
      <div className="mx-auto max-w-4xl px-6">
        <h2 className="mb-8 text-3xl font-bold text-zinc-900 dark:text-zinc-50 md:text-4xl">
          Contact
        </h2>
        <div className="space-y-6">
          <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            I'm always open to discussing new opportunities, interesting projects, or
            collaborating on AI/ML initiatives. Feel free to reach out!
          </p>
          <div className="flex flex-col gap-4">
            <a
              href="mailto:your.email@example.com"
              className="flex items-center gap-3 text-lg text-zinc-900 transition-colors hover:text-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 dark:text-zinc-50 dark:hover:text-zinc-300 dark:focus:ring-zinc-600"
              aria-label="Send email"
            >
              <Mail size={20} className="text-zinc-600 dark:text-zinc-400" aria-hidden="true" />
              your.email@example.com
            </a>
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-lg text-zinc-900 transition-colors hover:text-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 dark:text-zinc-50 dark:hover:text-zinc-300 dark:focus:ring-zinc-600"
              aria-label="Visit GitHub profile"
            >
              <Github size={20} className="text-zinc-600 dark:text-zinc-400" aria-hidden="true" />
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-lg text-zinc-900 transition-colors hover:text-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 dark:text-zinc-50 dark:hover:text-zinc-300 dark:focus:ring-zinc-600"
              aria-label="Visit LinkedIn profile"
            >
              <Linkedin size={20} className="text-zinc-600 dark:text-zinc-400" aria-hidden="true" />
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
