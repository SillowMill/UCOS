import { Globe2, Handshake, Sparkles } from "lucide-react";
import Link from "next/link";
import { HomeContent } from "@/lib/content";
import { Locale } from "@/lib/i18n";
import AnimatedSection from "./AnimatedSection";
import SectionContainer from "./SectionContainer";
import SectionHeader from "./SectionHeader";

const iconMap = { globe: Globe2, handshake: Handshake, sparkles: Sparkles } as const;

type AboutSectionProps = {
  content: HomeContent["about"];
  locale: Locale;
};

export default function AboutSection({ content, locale }: AboutSectionProps) {
  const moreInfoLabel = locale === "en" ? "Learn more" : locale === "fr" ? "En savoir plus" : "Meer info";

  return (
    <SectionContainer id="about" className="py-24" ariaLabel="About UCOS">
      <AnimatedSection>
        <SectionHeader eyebrow={content.eyebrow} title={content.title} description={content.description} />
      </AnimatedSection>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {content.cards.map((card, index) => {
          const Icon = iconMap[card.icon as keyof typeof iconMap] ?? Globe2;
          const cardHref =
            card.icon === "globe"
              ? `/${locale}/about/missie`
              : card.icon === "handshake"
                ? `/${locale}/about/visie`
                : `/${locale}/about/impact`;

          return (
          <AnimatedSection key={card.title} delay={index * 0.1}>
            <Link
              href={cardHref}
              className="group block h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
            >
              <div className="mb-4 inline-flex rounded-xl bg-brand-50 p-3 text-brand-700">
                <Icon aria-hidden="true" size={22} />
              </div>
              <h3 className="text-xl font-semibold text-slate-900">{card.title}</h3>
              <p className="mt-3 leading-relaxed text-slate-600">{card.text}</p>
              <span className="mt-5 inline-flex items-center text-sm font-semibold text-brand-700 transition group-hover:text-brand-800">
                {moreInfoLabel} →
              </span>
            </Link>
          </AnimatedSection>
          );
        })}
      </div>
    </SectionContainer>
  );
}
