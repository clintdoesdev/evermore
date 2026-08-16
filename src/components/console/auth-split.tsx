import Image from "next/image";
import logoWhite from "../../../public/images/logo-white.png";

export function AuthSplit({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <main className="grid min-h-full grid-cols-1 lg:grid-cols-2">
      <div className="bg-brand-gradient relative hidden overflow-hidden lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div aria-hidden="true" className="bg-grid absolute inset-0 opacity-40" />
        <div
          aria-hidden="true"
          className="animate-glow-pulse pointer-events-none absolute -left-20 top-1/3 h-72 w-72 rounded-full bg-brand-green/25 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="animate-glow-pulse pointer-events-none absolute -right-16 bottom-10 h-80 w-80 rounded-full bg-brand-mint/20 blur-3xl [animation-delay:1.5s]"
        />

        <Image src={logoWhite} alt="Evermore" priority className="relative h-9 w-auto" />

        <div className="relative max-w-md">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand-mint">
            {eyebrow}
          </span>
          <h1 className="font-display mt-5 text-3xl font-semibold leading-tight text-white">
            {title}
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-white/60">{description}</p>
        </div>

        <p className="relative text-xs text-white/35">Exist Beyond the Moment.</p>
      </div>

      <div className="flex items-center justify-center bg-surface-0 px-5 py-16">
        <div className="w-full max-w-sm">{children}</div>
      </div>
    </main>
  );
}
