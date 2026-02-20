"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { HomeContent } from "@/lib/content";
import AnimatedSection from "./AnimatedSection";
import SectionContainer from "./SectionContainer";
import SectionHeader from "./SectionHeader";

type CounterProps = {
  value: number;
  suffix?: string;
};

function Counter({ value, suffix = "" }: CounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1200;
    const startTime = performance.now();

    const animate = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      setDisplay(Math.floor(progress * value));
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [inView, value]);

  return (
    <div ref={ref} className="text-4xl font-bold text-brand-800 sm:text-5xl" aria-live="polite">
      {display.toLocaleString()}
      {suffix}
    </div>
  );
}

type ImpactSectionProps = {
  content: HomeContent["impact"];
};

export default function ImpactSection({ content }: ImpactSectionProps) {
  return (
    <SectionContainer id="impact" className="relative overflow-hidden py-24" ariaLabel="Impact">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-brand-50 via-white to-accent-50" />
      <AnimatedSection>
        <SectionHeader eyebrow={content.eyebrow} title={content.title} description={content.description} />
      </AnimatedSection>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {content.stats.map((stat, index) => (
          <AnimatedSection key={stat.label} delay={index * 0.08}>
            <article className="rounded-2xl border border-brand-100 bg-white p-6 shadow-sm">
              <Counter value={stat.value} suffix={stat.suffix} />
              <p className="mt-3 text-sm font-medium leading-relaxed text-slate-600">{stat.label}</p>
            </article>
          </AnimatedSection>
        ))}
      </div>

      <motion.blockquote
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, delay: 0.25 }}
        className="mt-12 rounded-2xl border border-slate-200 bg-white p-7"
      >
        <p className="text-xl leading-relaxed text-slate-700">&ldquo;{content.quote}&rdquo;</p>
        <footer className="mt-4 text-sm font-semibold text-brand-800">- {content.quoteAuthor}</footer>
      </motion.blockquote>
    </SectionContainer>
  );
}
