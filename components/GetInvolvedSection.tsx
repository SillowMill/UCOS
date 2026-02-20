import { ArrowRight, HandHelping, Users, WalletCards } from "lucide-react";
import { HomeContent } from "@/lib/content";
import AnimatedSection from "./AnimatedSection";
import SectionContainer from "./SectionContainer";
import SectionHeader from "./SectionHeader";

const iconMap = {
  helping: HandHelping,
  users: Users,
  student: WalletCards
} as const;

type GetInvolvedSectionProps = {
  content: HomeContent["involved"];
};

export default function GetInvolvedSection({ content }: GetInvolvedSectionProps) {
  return (
    <SectionContainer id="get-involved" className="py-24" ariaLabel="Get involved">
      <AnimatedSection>
        <SectionHeader eyebrow={content.eyebrow} title={content.title} description={content.description} />
      </AnimatedSection>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {content.items.map((item, index) => {
          const Icon = iconMap[item.icon as keyof typeof iconMap] ?? HandHelping;
          return (
          <AnimatedSection key={item.title} delay={index * 0.1}>
            <article className="group h-full rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-brand-200 hover:shadow-soft">
              <div className="mb-4 inline-flex rounded-xl bg-accent-50 p-3 text-accent-600">
                <Icon size={22} aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-3 text-slate-600">{item.text}</p>
              <button
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-700 transition-colors group-hover:text-brand-800"
                type="button"
              >
                {content.learnMoreLabel} <ArrowRight size={16} aria-hidden="true" />
              </button>
            </article>
          </AnimatedSection>
          );
        })}
      </div>
    </SectionContainer>
  );
}
