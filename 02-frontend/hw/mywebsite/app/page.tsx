import Image from "next/image";

export default function Home() {
  return (
    <div className="flex w-full flex-1 flex-col items-center bg-[#0e163e] font-sans">
      <main className="flex w-full flex-1 flex-col items-center px-8 py-20">
        <div className="mx-auto flex w-full max-w-2xl flex-col items-center gap-6 text-center">
          <div className="h-56 w-56 shrink-0 overflow-hidden rounded-full ring-4 ring-white/10">
            <Image
              src="/abhi.jpg"
              alt="Photo of Abhinav Lenkala"
              width={448}
              height={448}
              className="h-full w-full object-cover object-[50%_0%] scale-125 translate-x-3 translate-y-4"
            />
          </div>

          <div className="flex flex-col gap-1">
            <h1 className="text-4xl font-bold tracking-tight text-[#f0dede]">
              Abhi Lenkala
            </h1>
            <p className="text-lg text-[#f0dede]/70">
              AI and Business @ Northeastern
            </p>
          </div>

          <p className="text-lg leading-8 text-[#f0dede]">
            Hi! I&apos;m Abhi, a first-year at Northeastern studying AI and
            Business. I&apos;m from East Granby, CT, and I have an older
            brother and a twin sister.
          </p>

          <div className="flex flex-row flex-wrap items-center justify-center gap-3 text-base text-[#f0dede]">
            <a
              href="https://github.com/26lenkalaa"
              target="_blank"
              rel="noopener noreferrer"
              className="underline transition-colors hover:text-white"
            >
              GitHub
            </a>
            <span aria-hidden="true">·</span>
            <a
              href="https://www.linkedin.com/in/abhinav-lenkala/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline transition-colors hover:text-white"
            >
              LinkedIn
            </a>
            <span aria-hidden="true">·</span>
            <a
              href="https://www.instagram.com/abhi.lenkala/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline transition-colors hover:text-white"
            >
              Instagram
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}