const projects = [
  {
    title: "Water Tracker",
    description: "Sends text messages to log water consumption and provide reminders to drink more water.",
    link: "https://github.com/26lenkalaa",
  },
  {
    title: "CVC Absorbance Analysis",
    description:
      "Analyzes plate-reader absorbance spectra to determine the critical vesicle concentration (CVC) of a sample.",
    link: "https://github.com/26lenkalaa",
  },
];

export default function Projects() {
  return (
    <main className="w-full flex-1 px-6 py-16 sm:py-24">
      <div className="mx-auto flex max-w-3xl flex-col gap-10">
        <h1 className="text-4xl font-bold tracking-tight">Projects</h1>

        <ul className="flex flex-col">
          {projects.map((project) => (
            <li key={project.title} className="border-t border-line py-6 last:border-b">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex max-w-xl flex-col gap-1"
              >
                <h2 className="text-xl font-semibold underline decoration-transparent underline-offset-4 group-hover:decoration-paper">
                  {project.title}
                </h2>
                <p className="leading-7 text-muted">{project.description}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
