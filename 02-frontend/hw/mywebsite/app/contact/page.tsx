export default function Contact() {
  return (
    <main className="flex w-full flex-1 flex-col items-center px-8 py-20">
      <div className="mx-auto flex w-full max-w-2xl flex-col items-center gap-6 text-center">
        <div className="flex flex-col gap-1">
          <h1 className="text-4xl font-bold tracking-tight text-[#f0dede]">
            Contact
          </h1>
          <p className="text-lg text-[#f0dede]/70">
            Reach out about opportunities, projects, or just to say hi
          </p>
        </div>

        <a
          href="mailto:lenkala.al@northeastern.edu"
          className="text-lg text-[#f0dede] underline transition-colors hover:text-white"
        >
          lenkala.a@northeastern.edu
        </a>

        <div className="flex flex-row flex-wrap items-center justify-center gap-3 text-base text-[#f0dede]">
          <a href="https://www.linkedin.com/in/abhinav-lenkala/" target="_blank" rel="noopener noreferrer" className="underline transition-colors hover:text-white">
            LinkedIn
          </a>
          <span aria-hidden="true">·</span>
          <a href="https://github.com/26lenkalaa" target="_blank" rel="noopener noreferrer" className="underline transition-colors hover:text-white">
            GitHub
          </a>
        </div>
      </div>
    </main>
  );
}