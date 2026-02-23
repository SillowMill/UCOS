import Image from "next/image";
import Link from "next/link";
import { HomeContent } from "@/lib/content";
import { Locale } from "@/lib/i18n";
import AnimatedSection from "./AnimatedSection";
import SectionContainer from "./SectionContainer";
import SectionHeader from "./SectionHeader";

type ProgramsSectionProps = {
  content: HomeContent["programs"];
  locale: Locale;
};

export default function ProgramsSection({ content, locale }: ProgramsSectionProps) {
  const isTwoItemLayout = content.items.length === 2;
  const programHrefs = [
    `/${locale}/programs/campus-klimaatrechtvaardigheid`,
    `/${locale}/programs/global-quest-room`
  ];

  return (
    <SectionContainer id="programs" className="bg-white py-24" ariaLabel="Programs and projects">
      <AnimatedSection>
        <SectionHeader eyebrow={content.eyebrow} title={content.title} description={content.description} centered />
      </AnimatedSection>

      <div className={`mt-12 grid gap-6 ${isTwoItemLayout ? "lg:mx-auto lg:max-w-5xl lg:grid-cols-2" : "lg:grid-cols-3"}`}>
        {content.items.map((program, index) => (
          <AnimatedSection key={program.title} delay={index * 0.1}>
            <Link
              href={programHrefs[index] ?? `/${locale}#programs`}
              className="group relative block overflow-hidden rounded-2xl border border-slate-200 bg-slate-900 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
            >
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
            </Link>
          </AnimatedSection>
        ))}
      </div>
    </SectionContainer>
  );
}
