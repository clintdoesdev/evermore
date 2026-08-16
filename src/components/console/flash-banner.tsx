import { CheckIcon, XIcon } from "./icons";

export function FlashBanner({
  message,
  tone = "success",
}: {
  message?: string;
  tone?: "success" | "error";
}) {
  if (!message) return null;

  const isError = tone === "error";

  return (
    <div
      role="status"
      className={`animate-fade-up mb-6 flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm font-medium ${
        isError
          ? "border-red-500/25 bg-red-500/10 text-red-300"
          : "border-brand-green/25 bg-brand-green/10 text-brand-mint"
      }`}
    >
      <span
        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
          isError ? "bg-red-500/20" : "bg-brand-green/20"
        }`}
      >
        {isError ? <XIcon className="h-3.5 w-3.5" /> : <CheckIcon className="h-3.5 w-3.5" />}
      </span>
      {message}
    </div>
  );
}
