import Link from "next/link";
import { HomeContent } from "@/lib/content";
import { Locale } from "@/lib/i18n";

type FooterProps = {
  locale: Locale;
  content: HomeContent["footer"];
  branding: HomeContent["branding"];
};

export default function Footer({ locale, content, branding }: FooterProps) {
  return (
    <footer className="bg-accent-900 pb-10 pt-16 text-slate-100">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-4 lg:px-12">
        <div className="lg:col-span-2">
          <p className="text-lg font-bold text-white">{branding.name}</p>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-200">{content.description}</p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-300">{content.contactTitle}</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-100">
            {content.contactLines.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-300">{content.newsletterTitle}</h3>
          <form className="mt-3 flex flex-col gap-3" aria-label="Newsletter signup">
            <label htmlFor="newsletter" className="text-sm text-slate-100">
              {content.newsletterLabel}
            </label>
            <input
              id="newsletter"
              type="email"
              placeholder={content.newsletterPlaceholder}
              className="rounded-none border border-[#E1E1E1] bg-white px-3 py-2 text-sm text-black placeholder:text-slate-500 focus:border-accent-600 focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-brand bg-brand-500 px-3 py-2 text-sm font-semibold text-white transition hover:bg-brand-600"
            >
              {content.newsletterButton}
            </button>
          </form>
        </div>
      </div>

      <div className="mx-auto mt-10 flex w-full max-w-7xl flex-col items-start justify-between gap-3 border-t border-accent-700 px-5 pt-6 text-xs text-slate-300 sm:flex-row sm:px-8 lg:px-12">
        <p>
          © {new Date().getFullYear()} {branding.name}. {content.legal}
        </p>
        <div className="flex gap-4">
          {content.socialLinks.map((link) => (
            <Link key={link.label} href={link.href} className="text-slate-100 transition hover:text-brand-300">
              {link.label}
            </Link>
          ))}
          <Link href={`/${locale}`} className="text-slate-100 transition hover:text-brand-300">
            {branding.name}
          </Link>
        </div>
      </div>
    </footer>
  );
}
