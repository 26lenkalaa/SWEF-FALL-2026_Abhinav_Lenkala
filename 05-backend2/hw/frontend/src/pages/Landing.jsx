import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchMe } from "../api.js";

const links = [
  { label: "GitHub", href: "https://github.com/26lenkalaa" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/abhinav-lenkala/" },
  { label: "Instagram", href: "https://www.instagram.com/abhi.lenkala/" },
];

export default function Landing() {
  const navigate = useNavigate();
  const [me, setMe] = useState(null);
  const [error, setError] = useState("");

  // On load, ask the protected endpoint who we are. 401 -> back to login.
  useEffect(() => {
    let cancelled = false;
    fetchMe()
      .then((data) => {
        if (cancelled) return;
        if (!data) navigate("/login", { replace: true });
        else setMe(data);
      })
      .catch(() => !cancelled && setError("The server isn't responding. Start the Flask backend on port 8000 and reload."));
    return () => {
      cancelled = true;
    };
  }, [navigate]);

  if (error) return <p className="mx-auto mt-20 max-w-3xl px-6 text-error">{error}</p>;
  if (!me) return <p className="mx-auto mt-20 max-w-3xl px-6 text-muted">Loading…</p>;

  return (
    <main className="w-full flex-1 px-6 py-16 sm:py-24">
      <div className="mx-auto flex max-w-3xl flex-col gap-16">
        <section className="grid items-center gap-8 sm:grid-cols-[11rem_1fr] sm:gap-10">
          <div className="h-44 w-44 overflow-hidden rounded-full">
            <img
              src="/abhi.jpg"
              alt="Abhi Lenkala"
              width={352}
              height={352}
              className="h-full w-full translate-x-2 translate-y-3 scale-125 object-cover object-[50%_0%]"
            />
          </div>
          <div className="flex min-w-0 flex-col gap-3">
            <p className="text-muted">{me.message}</p>
            <h1 className="text-5xl font-bold leading-none tracking-tight sm:text-6xl">
              Abhi Lenkala
            </h1>
            <p className="text-lg text-muted">AI and Business at Northeastern</p>
          </div>
        </section>

        <section className="flex max-w-xl flex-col gap-6 text-lg leading-8">
          <p>
            I&apos;m a first-year at Northeastern studying AI and Business. I grew up in East
            Granby, Connecticut, with an older brother and a twin sister.
          </p>
          <p className="text-muted">
            Since you&apos;re logged in, here&apos;s something the server only tells members:{" "}
            <span className="text-paper">{me.secret_fact}</span>
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-base">
            {links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-line underline-offset-4 hover:decoration-paper"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
