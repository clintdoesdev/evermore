import Link from "next/link";
import Image from "next/image";
import logoWhite from "../../public/images/logo-white.png";

export function Logo({
  className = "",
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label="Evermore home"
      className={`inline-flex items-center ${className}`}
    >
      <Image
        src={logoWhite}
        alt="Evermore"
        priority={priority}
        className="h-8 w-auto sm:h-9"
      />
    </Link>
  );
}
