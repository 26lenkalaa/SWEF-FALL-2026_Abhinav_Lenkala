// Shared pieces for the login and sign-up forms.

export function AuthShell({ title, intro, children }) {
  return (
    <main className="w-full flex-1 px-6 py-16 sm:py-24">
      <div className="mx-auto grid max-w-3xl gap-12 md:grid-cols-[1fr_22rem] md:gap-16">
        <div className="flex flex-col gap-4">
          <img
            src="/abhi.jpg"
            alt="Abhi Lenkala"
            width={56}
            height={56}
            className="h-14 w-14 rounded-full object-cover object-top"
          />
          <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
          <div className="max-w-md space-y-3 leading-7 text-muted">{intro}</div>
        </div>
        <div className="min-w-0">{children}</div>
      </div>
    </main>
  );
}

export function Field({ id, label, hint, ...inputProps }) {
  const Tag = inputProps.rows ? "textarea" : "input";
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <Tag
        id={id}
        name={id}
        className="w-full rounded-md border border-line bg-ink-raised px-3 py-2 text-paper placeholder:text-muted/60 focus:border-paper/60 focus:outline-none"
        {...inputProps}
      />
      {hint && <p className="text-xs text-muted">{hint}</p>}
    </div>
  );
}

export function ErrorText({ children }) {
  if (!children) return null;
  return (
    <p role="alert" className="text-sm text-error">
      {children}
    </p>
  );
}

export const primaryButton =
  "rounded-md bg-paper px-4 py-2 font-medium text-ink transition-colors hover:bg-white disabled:opacity-60";
export const secondaryButton =
  "rounded-md border border-line px-4 py-2 font-medium text-paper transition-colors hover:border-paper/50";
