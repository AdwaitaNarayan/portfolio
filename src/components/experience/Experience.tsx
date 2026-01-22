import { experiences } from "@/src/data/experience";

export default function Experience() {
  return (
    <section id="experience" className="bg-white py-24 dark:bg-zinc-950">
      <div className="mx-auto max-w-4xl px-6">
        <h2 className="mb-12 text-3xl font-bold text-zinc-900 dark:text-zinc-50 md:text-4xl">
          Experience
        </h2>
        <div className="space-y-8">
          {experiences.map((exp) => (
            <div key={exp.id} className="border-l-2 border-zinc-200 pl-6 dark:border-zinc-800">
              <div className="mb-2 flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                    {exp.role}
                  </h3>
                  <p className="text-lg text-zinc-600 dark:text-zinc-400">
                    {exp.company}
                  </p>
                </div>
                <p className="text-sm text-zinc-500 dark:text-zinc-500">
                  {new Date(exp.startDate).toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                  })}{" "}
                  -{" "}
                  {exp.endDate === "Present"
                    ? "Present"
                    : new Date(exp.endDate).toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })}
                </p>
              </div>
              <ul className="mt-4 space-y-2">
                {exp.description.map((item, index) => (
                  <li
                    key={index}
                    className="text-zinc-600 dark:text-zinc-400"
                  >
                    <span className="mr-2">•</span>
                    {item}
                  </li>
                ))}
              </ul>
              {exp.technologies && exp.technologies.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded bg-zinc-100 px-2 py-1 text-xs text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
