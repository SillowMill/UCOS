import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { HomeContent, StoryPreview } from "@/lib/content";
import { Locale } from "@/lib/i18n";
import AnimatedSection from "./AnimatedSection";
import SectionContainer from "./SectionContainer";
import SectionHeader from "./SectionHeader";

type NewsSectionProps = {
  content: HomeContent["stories"];
  stories: StoryPreview[];
  locale: Locale;
};

export default function NewsSection({ content, stories, locale }: NewsSectionProps) {
  return (
    <SectionContainer id="stories" className="bg-slate-900 py-24 text-white" ariaLabel="News and stories">
      <AnimatedSection>
        <SectionHeader eyebrow={content.eyebrow} title={content.title} description={content.description} centered light />
      </AnimatedSection>

      <div className="mt-12 grid gap-5 lg:grid-cols-3">
        {stories.map((story, index) => (
          <AnimatedSection key={story.title} delay={index * 0.1}>
            <article className="group h-full rounded-2xl border border-slate-700 bg-slate-800/80 p-6 transition duration-300 hover:-translate-y-1 hover:border-brand-300 hover:bg-slate-800">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent-300">{story.category}</p>
              <h3 className="mt-3 text-xl font-semibold leading-snug text-white">{story.title}</h3>
              <div className="mt-8 flex items-center justify-between text-sm text-slate-300">
                <span>{story.date}</span>
                <Link href={`/${locale}/stories/${story.slug}`} className="inline-flex items-center gap-1 text-brand-300">
                  {content.readLabel} <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </article>
          </AnimatedSection>
        ))}
      </div>
    </SectionContainer>
  );
}
