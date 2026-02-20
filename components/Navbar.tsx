"use client";

import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HomeContent } from "@/lib/content";
import { Locale, localeNames, locales } from "@/lib/i18n";

type NavbarProps = {
  locale: Locale;
  content: HomeContent;
};

export default function Navbar({ locale, content }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const closeMenu = () => setMenuOpen(false);
    window.addEventListener("resize", closeMenu);
    return () => window.removeEventListener("resize", closeMenu);
  }, [menuOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-8">
      <div
        className={`mx-auto flex w-full max-w-7xl items-center justify-between rounded-2xl border px-4 py-2 transition-all duration-300 sm:px-6 ${
          scrolled
            ? "border-slate-200 bg-white shadow-soft glass-panel"
            : "border-slate-200/80 bg-white shadow-soft glass-panel"
        }`}
      >
        <Link href={`/${locale}`} className="flex items-center" aria-label={`${content.branding.name} home`}>
          {logoError ? (
            <div className="flex h-14 items-center justify-center rounded-md bg-gradient-to-r from-sky-500 via-cyan-500 to-emerald-500 px-5 text-lg font-black tracking-wide text-white shadow">
              UCOS
            </div>
          ) : (
            <div className="flex h-20 w-56 items-center justify-center overflow-hidden rounded-sm">
              <Image
                src="/Logo.png"
                alt={`${content.branding.name} logo`}
                width={460}
                height={128}
                quality={100}
                priority
                sizes="224px"
                className="-mx-3 h-32 w-auto max-w-none"
                onError={() => setLogoError(true)}
              />
            </div>
          )}
          <span className="mx-2 h-9 w-px bg-slate-300" aria-hidden="true" />
          <div>
            <p className="text-xs leading-tight text-slate-600">{content.branding.tagline}</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label={content.nav.ariaLabel}>
          {content.nav.items.map((item) => (
            <Link
              key={item.href}
              href={`/${locale}${item.href}`}
              className="whitespace-nowrap text-sm font-medium text-slate-700 transition-colors hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
            >
              {item.label}
            </Link>
          ))}
          <div className="flex items-center gap-1 rounded-full border border-slate-200 bg-white px-1 py-1">
            {locales.map((lang) => (
              <Link
                key={lang}
                href={`/${lang}`}
                aria-label={`${content.nav.languageLabel}: ${localeNames[lang]}`}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                  lang === locale ? "bg-brand-700 text-white" : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {lang.toUpperCase()}
              </Link>
            ))}
          </div>
          <Link
            href={`/${locale}#cta`}
            className="whitespace-nowrap rounded-full bg-accent-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-300"
          >
            {content.nav.cta}
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="grid h-11 w-11 place-items-center rounded-xl border border-slate-300 bg-white text-slate-700 lg:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? content.nav.closeMenuLabel : content.nav.openMenuLabel}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {menuOpen && (
        <motion.nav
          id="mobile-nav"
          aria-label={content.nav.ariaLabel}
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          className="mx-auto mt-3 w-full max-w-7xl rounded-2xl border border-slate-200 bg-white p-4 shadow-soft lg:hidden"
        >
          <div className="flex flex-col gap-2">
            {content.nav.items.map((item) => (
              <Link
                key={item.href}
                href={`/${locale}${item.href}`}
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-brand-50 hover:text-brand-700"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 flex gap-2 border-t border-slate-100 pt-3">
              {locales.map((lang) => (
                <Link
                  key={lang}
                  href={`/${lang}`}
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    lang === locale ? "bg-brand-700 text-white" : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {lang.toUpperCase()}
                </Link>
              ))}
            </div>
          </div>
        </motion.nav>
      )}
    </header>
  );
}
