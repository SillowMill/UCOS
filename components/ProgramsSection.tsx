import Image from "next/image";
import { HomeContent } from "@/lib/content";
import AnimatedSection from "./AnimatedSection";
import SectionContainer from "./SectionContainer";
import SectionHeader from "./SectionHeader";

type ProgramsSectionProps = {
  content: HomeContent["programs"];
};

export default function ProgramsSection({ content }: ProgramsSectionProps) {
  return (
    <SectionContainer id="programs" className="bg-white py-24" ariaLabel="Programs and projects">
      <AnimatedSection>
        <SectionHeader eyebrow={content.eyebrow} title={content.title} description={content.description} centered />
      </AnimatedSection>

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {content.items.map((program, index) => (
          <AnimatedSection key={program.title} delay={index * 0.1}>
            <article className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-900 shadow-sm">
              <Image
                src={program.image}
                alt={program.title}
                width={900}
                height={700}
                className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/35 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="text-2xl font-semibold text-white">{program.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-200">{program.description}</p>
              </div>
            </article>
          </AnimatedSection>
        ))}
      </div>
    </SectionContainer>
  );
}
