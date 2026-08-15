export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  light = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  light?: boolean;
}) {
  return (
    <div
      className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : "text-left"}`}
    >
      {eyebrow && (
        <span
          className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] ${
            light
              ? "border-white/20 text-brand-mint"
              : "border-brand-blue/15 text-brand-blue-dark bg-brand-blue/5"
          }`}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={`font-display mt-4 text-3xl font-semibold text-balance sm:text-4xl ${
          light ? "text-white" : "text-brand-ink"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-base leading-relaxed sm:text-lg ${
            light ? "text-white/70" : "text-brand-ink/65"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
