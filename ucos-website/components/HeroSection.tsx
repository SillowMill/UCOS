"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { HomeContent } from "@/lib/content";
import SectionContainer from "./SectionContainer";

function WorldMapLines() {
  return (
    // Lightweight SVG motif to suggest global connections without heavy assets.
    <svg viewBox="0 0 1200 420" aria-hidden="true" className="h-full w-full">
      <g fill="none" stroke="rgba(23,53,134,0.2)" strokeWidth="1.2">
        <path d="M56,196 C146,130 240,134 330,195 C410,248 478,247 570,194 C668,135 756,143 840,202 C923,261 1013,255 1144,175" />
        <path d="M90,258 C170,192 262,188 360,242 C440,286 508,288 600,235 C698,178 784,183 868,246 C946,305 1020,299 1110,243" />
        <path d="M116,112 C220,48 322,56 415,117 C498,170 574,169 666,112 C772,48 860,58 944,118 C1036,183 1110,174 1180,129" />
      </g>
      <g fill="rgba(242,100,48,0.9)">
        <circle cx="208" cy="142" r="4" />
        <circle cx="436" cy="230" r="4" />
        <circle cx="618" cy="112" r="4" />
        <circle cx="820" cy="214" r="4" />
        <circle cx="1008" cy="157" r="4" />
      </g>
    </svg>
  );
}

type HeroSectionProps = {
  content: HomeContent["hero"];
};

export default function HeroSection({ content }: HeroSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yOffset = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <SectionContainer id="home" className="relative overflow-hidden bg-hero-gradient pb-20 pt-36 sm:pt-40" ariaLabel="Hero">
      <div ref={ref} className="relative">
        <motion.div style={{ y: yOffset }} className="pointer-events-none absolute inset-0 -z-10 opacity-80">
          {/* Soft animated color fields for depth and warmth */}
          <div className="absolute -left-20 top-16 h-56 w-56 rounded-full bg-brand-300/30 blur-3xl" />
          <div className="absolute right-8 top-0 h-64 w-64 rounded-full bg-accent-300/30 blur-3xl" />
          <div className="absolute bottom-8 left-1/4 h-44 w-44 rounded-full bg-brand-200/40 blur-3xl" />
        </motion.div>

        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="mb-4 inline-flex rounded-full border border-brand-200 bg-white/75 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-800">
              {content.eyebrow}
            </p>
            <h1 className="max-w-3xl text-4xl font-bold leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
              {content.title} <span className="text-brand-700">{content.highlight}</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-xl">
              {content.description}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="#what-we-do"
                className="group inline-flex items-center rounded-full bg-brand-700 px-6 py-3 font-semibold text-white transition hover:bg-brand-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
              >
                {content.primaryCta}
                <span className="ml-2 transition-transform group-hover:translate-x-1" aria-hidden="true">
                  -&gt;
                </span>
              </Link>
              <Link
                href="#get-involved"
                className="inline-flex items-center rounded-full border border-brand-300 bg-white px-6 py-3 font-semibold text-brand-800 transition hover:border-brand-500 hover:bg-brand-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
              >
                {content.secondaryCta}
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="relative"
          >
            <div className="absolute inset-0 -z-10 rounded-[2rem] bg-gradient-to-br from-brand-200/70 via-brand-50 to-accent-100 blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-brand-100 bg-white p-5 shadow-soft sm:p-7">
              <div className="world-grid rounded-2xl border border-dashed border-brand-200 p-4 sm:p-6">
                <div className="aspect-[16/8] rounded-xl bg-white/70 p-2">
                  <WorldMapLines />
                </div>
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-white p-4">
                    <p className="text-sm text-slate-500">{content.cardStatOneLabel}</p>
                    <p className="mt-2 text-3xl font-bold text-brand-800">{content.cardStatOneValue}</p>
                  </div>
                  <div className="rounded-xl bg-white p-4">
                    <p className="text-sm text-slate-500">{content.cardStatTwoLabel}</p>
                    <p className="mt-2 text-3xl font-bold text-brand-800">{content.cardStatTwoValue}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </SectionContainer>
  );
}
