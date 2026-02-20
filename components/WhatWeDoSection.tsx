import { GraduationCap, Leaf, Network, UsersRound } from "lucide-react";
import { HomeContent } from "@/lib/content";
import AnimatedSection from "./AnimatedSection";
import SectionContainer from "./SectionContainer";
import SectionHeader from "./SectionHeader";

const iconMap = {
  graduation: GraduationCap,
  users: UsersRound,
  network: Network,
  leaf: Leaf
} as const;

type WhatWeDoSectionProps = {
  content: HomeContent["whatWeDo"];
};

export default function WhatWeDoSection({ content }: WhatWeDoSectionProps) {
  return (
    <SectionContainer id="what-we-do" className="bg-white py-24" ariaLabel="What we do">
      <AnimatedSection>
        <SectionHeader eyebrow={content.eyebrow} title={content.title} description={content.description} centered />
      </AnimatedSection>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {content.items.map((item, index) => {
          const Icon = iconMap[item.icon as keyof typeof iconMap] ?? GraduationCap;
          return (
          <AnimatedSection key={item.title} delay={index * 0.1}>
            <article className="group h-full rounded-2xl border border-slate-200 bg-slate-50 p-6 transition-all duration-300 hover:border-brand-200 hover:bg-brand-50/40 hover:shadow-soft">
              <div className="mb-4 inline-flex rounded-xl bg-white p-3 text-brand-700 shadow-sm transition-transform group-hover:scale-105">
                <Icon size={22} aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-3 leading-relaxed text-slate-600">{item.text}</p>
            </article>
          </AnimatedSection>
          );
        })}
      </div>
    </SectionContainer>
  );
}
