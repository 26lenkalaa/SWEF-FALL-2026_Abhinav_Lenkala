import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-10 w-full border-b border-white/10 bg-[#0e163e]/90 backdrop-blur">
      <div className="mx-auto flex max-w-2xl items-center justify-between px-8 py-4 text-[#f0dede]">
        <Link href="/" className="font-semibold tracking-tight">
          Abhi Lenkala
        </Link>
        <div className="flex gap-6 text-sm">
          <Link href="/" className="transition-colors hover:text-white">
            Home
          </Link>
          <Link href="/projects" className="transition-colors hover:text-white">
            Projects
          </Link>
          <Link href="/contact" className="transition-colors hover:text-white">
            Contact
          </Link>
          <Link href="/tottenham" className="transition-colors hover:text-white">
  Tottenham
</Link>
        </div>
      </div>
    </nav>
  );
}