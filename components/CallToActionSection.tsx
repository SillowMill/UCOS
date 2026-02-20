"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { HomeContent } from "@/lib/content";
import { Locale } from "@/lib/i18n";
import SectionContainer from "./SectionContainer";

type CallToActionSectionProps = {
  content: HomeContent["cta"];
  locale: Locale;
};

export default function CallToActionSection({ content, locale }: CallToActionSectionProps) {
  return (
    <SectionContainer id="cta" className="relative overflow-hidden py-24" ariaLabel="Call to action">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-brand-800 via-brand-700 to-brand-900" />
      <div className="pointer-events-none absolute -left-20 top-6 h-72 w-72 rounded-full bg-accent-400/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-brand-300/30 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.65, ease: "easeOut" }}
        className="mx-auto max-w-4xl text-center"
      >
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-100">{content.eyebrow}</p>
        <h2 className="mt-4 text-3xl font-bold leading-tight text-white sm:text-5xl">
          {content.title}
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-brand-100">{content.description}</p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <Link
            href={`/${locale}#get-involved`}
            className="rounded-full bg-accent-500 px-7 py-3 font-semibold text-white transition hover:bg-accent-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-200"
          >
            {content.primary}
          </Link>
          <Link
            href={`/${locale}#stories`}
            className="rounded-full border border-brand-200/50 bg-white/10 px-7 py-3 font-semibold text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-200"
          >
            {content.secondary}
          </Link>
        </div>
      </motion.div>
    </SectionContainer>
  );
}
