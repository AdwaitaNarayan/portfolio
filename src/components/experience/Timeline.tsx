import { experiences } from "@/src/data/experience";

export default function Timeline() {
  const formatDate = (date: string) => {
    if (date === "Present") return "Present";
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  const formatDuration = (startDate: string, endDate: string | "Present") => {
    const start = new Date(startDate);
    const end = endDate === "Present" ? new Date() : new Date(endDate);
    const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    
    if (years > 0 && remainingMonths > 0) {
      return `${years} yr ${remainingMonths} mo`;
    } else if (years > 0) {
      return `${years} yr`;
    } else {
      return `${remainingMonths} mo`;
    }
  };

  return (
    <section className="bg-zinc-50 py-24 dark:bg-zinc-900">
      <div className="mx-auto max-w-4xl px-6">
        <h2 className="mb-12 text-3xl font-bold text-zinc-900 dark:text-zinc-50 md:text-4xl">
          Experience Timeline
        </h2>
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 top-0 h-full w-0.5 bg-zinc-200 dark:bg-zinc-800 md:left-8" />
          
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div key={exp.id} className="relative pl-12 md:pl-16">
                {/* Timeline dot */}
                <div className="absolute left-2 h-4 w-4 rounded-full border-2 border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950 md:left-6" />
                
                <div className="space-y-2">
                  <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                        {exp.company}
                      </h3>
                      <p className="text-lg text-zinc-600 dark:text-zinc-400">
                        {exp.role}
                      </p>
                    </div>
                    <div className="flex flex-col items-start gap-1 md:items-end">
                      <p className="text-sm text-zinc-500 dark:text-zinc-500">
                        {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                      </p>
                      <p className="text-xs text-zinc-400 dark:text-zinc-600">
                        {formatDuration(exp.startDate, exp.endDate)}
                      </p>
                    </div>
                  </div>
                  
                  <ul className="mt-4 space-y-2">
                    {exp.description.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start text-zinc-600 dark:text-zinc-400"
                      >
                        <span className="mr-3 mt-1 flex-shrink-0 text-zinc-400 dark:text-zinc-600">
                          •
                        </span>
                        <span className="leading-relaxed">{item}</span>
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
