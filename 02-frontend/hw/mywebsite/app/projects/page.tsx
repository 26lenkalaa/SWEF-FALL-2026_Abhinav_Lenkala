const projects = [
  {
    title: "Water Tracker",
    description: "Describe what your water tracker does here.",
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
    <main className="flex w-full flex-1 flex-col items-center px-8 py-20">
      <div className="mx-auto flex w-full max-w-2xl flex-col items-center gap-6 text-center">
        <div className="flex flex-col gap-1">
          <h1 className="text-4xl font-bold tracking-tight text-[#f0dede]">
            Projects
          </h1>
          <p className="text-lg text-[#f0dede]/70">Things I&apos;ve built</p>
        </div>

        <div className="flex w-full flex-col gap-4">
          {projects.map((project) => (
            <a
              key={project.title}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col gap-1 rounded-xl border border-white/10 p-5 ring-4 ring-white/5 transition-colors hover:bg-white/5"
            >
              <h2 className="text-xl font-semibold text-[#f0dede]">
                {project.title}
              </h2>
              <p className="leading-7 text-[#f0dede]/80">
                {project.description}
              </p>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}