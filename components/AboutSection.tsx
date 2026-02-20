import { Globe2, Handshake, Sparkles } from "lucide-react";
import { HomeContent } from "@/lib/content";
import AnimatedSection from "./AnimatedSection";
import SectionContainer from "./SectionContainer";
import SectionHeader from "./SectionHeader";

const iconMap = { globe: Globe2, handshake: Handshake, sparkles: Sparkles } as const;

type AboutSectionProps = {
  content: HomeContent["about"];
};

export default function AboutSection({ content }: AboutSectionProps) {
  return (
    <SectionContainer id="about" className="py-24" ariaLabel="About UCOS">
      <AnimatedSection>
        <SectionHeader eyebrow={content.eyebrow} title={content.title} description={content.description} />
      </AnimatedSection>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {content.cards.map((card, index) => {
          const Icon = iconMap[card.icon as keyof typeof iconMap] ?? Globe2;
          return (
          <AnimatedSection key={card.title} delay={index * 0.1}>
            <article className="h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-soft">
              <div className="mb-4 inline-flex rounded-xl bg-brand-50 p-3 text-brand-700">
                <Icon aria-hidden="true" size={22} />
              </div>
              <h3 className="text-xl font-semibold text-slate-900">{card.title}</h3>
              <p className="mt-3 leading-relaxed text-slate-600">{card.text}</p>
            </article>
          </AnimatedSection>
          );
        })}
      </div>
    </SectionContainer>
  );
}
