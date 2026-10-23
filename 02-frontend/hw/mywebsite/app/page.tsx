export default function Home() {
  return (
    <div className="flex w-full flex-col gap-6 flex-1 items-center justify-center bg-[#0548ff]/11 font-sans dark:bg-[#0548ff]/11">
      <main className="flex flex-1 w-full flex-col items-center justify-between py-32 px-16 bg-[#0548ff]/11 dark:bg-[#0548ff]/11 sm:items-start">
        <div className="flex flex-col w-full items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="w-full text-center text-3xl font-bold leading-10 tracking-tight text-[#f0dede]">
            TAMID Bet Class - Week 2
          </h1>

          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold tracking-tight">Bio:</h2>
            <p className="whitespace-pre-line text-lg leading-8 text-[#f0dede]">
              {`Hi! I'm Abhinav Lenkala.
              I'm a first-year studying AI and Business.
              I'm from East Granby, CT.
              I have an older brother and a twin sister.`}
            </p>
            <div className="flex flex-row flex-wrap items-center gap-3 text-base">
              <a
                href="https://github.com/26lenkalaa"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                GitHub
              </a>
              <span aria-hidden="true">·</span>
              <a
                href="https://www.linkedin.com/in/abhinav-lenkala/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                LinkedIn
              </a>
              <span aria-hidden="true">·</span>
              <a
                href="https://www.instagram.com/abhi.lenkala/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}