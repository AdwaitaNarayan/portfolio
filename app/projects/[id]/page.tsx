import { projects } from "@/src/data/projects";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Github } from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }));
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950">
      <div className="mx-auto max-w-4xl px-6 py-24">
        <Link
          href="/#projects"
          className="mb-8 inline-flex items-center gap-2 text-zinc-600 transition-colors hover:text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 dark:text-zinc-400 dark:hover:text-zinc-50 dark:focus:ring-zinc-600"
          aria-label="Back to projects section"
        >
          <ArrowLeft size={18} aria-hidden="true" />
          Back to Projects
        </Link>

        <h1 className="mb-4 text-4xl font-bold text-zinc-900 dark:text-zinc-50 md:text-5xl">
          {project.title}
        </h1>

        <p className="mb-4 text-lg text-zinc-600 dark:text-zinc-400">
          {project.shortDescription}
        </p>

        <p className="mb-8 text-lg font-medium text-zinc-600 dark:text-zinc-400">
          {project.problemStatement}
        </p>

        <div className="mb-8 flex flex-wrap gap-4">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:border-zinc-300 hover:bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-zinc-700 dark:hover:bg-zinc-800 dark:focus:ring-zinc-600"
              aria-label={`View ${project.title} on GitHub`}
            >
              <Github size={16} aria-hidden="true" />
              GitHub
            </a>
          )}
        </div>

        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-semibold text-zinc-900 dark:text-zinc-50 md:text-3xl">
            Key Features
          </h2>
          <ul className="space-y-3 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            {project.keyFeatures.map((feature, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-3 mt-1.5 flex-shrink-0 text-zinc-400 dark:text-zinc-600">
                  •
                </span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-semibold text-zinc-900 dark:text-zinc-50 md:text-3xl">
            Tech Stack
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded border border-zinc-200 bg-zinc-50 px-3 py-1 text-sm text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
