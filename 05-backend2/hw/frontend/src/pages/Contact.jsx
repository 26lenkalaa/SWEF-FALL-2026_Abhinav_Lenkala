export default function Contact() {
  const linkClass = "underline decoration-line underline-offset-4 hover:decoration-paper";
  return (
    <main className="w-full flex-1 px-6 py-16 sm:py-24">
      <div className="mx-auto flex max-w-3xl flex-col gap-6">
        <h1 className="text-4xl font-bold tracking-tight">Contact</h1>
        <p className="max-w-xl text-lg leading-8 text-muted">
          Reach out about opportunities, projects, or just to say hi.
        </p>

        <a href="mailto:lenkala.a@northeastern.edu" className={`text-lg ${linkClass}`}>
          lenkala.a@northeastern.edu
        </a>

        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          <li>
            <a href="https://www.linkedin.com/in/abhinav-lenkala/" target="_blank" rel="noopener noreferrer" className={linkClass}>
              LinkedIn
            </a>
          </li>
          <li>
            <a href="https://github.com/26lenkalaa" target="_blank" rel="noopener noreferrer" className={linkClass}>
              GitHub
            </a>
          </li>
        </ul>
      </div>
    </main>
  );
}
