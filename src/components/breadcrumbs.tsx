import Link from "next/link";
import Script from "next/script";
import { siteConfig } from "@/lib/site-config";

export type Crumb = {
  label: string;
  href: string;
};

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: `${siteConfig.url}${item.href}`,
    })),
  };

  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <Script
        id={`breadcrumb-jsonld-${items[items.length - 1]?.href ?? "root"}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-2">
              {index > 0 && (
                <span aria-hidden="true" className="text-white/30">
                  /
                </span>
              )}
              {isLast ? (
                <span aria-current="page" className="text-white/60">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="text-white/70 transition-colors hover:text-brand-mint"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
