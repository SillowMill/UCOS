import { ArrowRight, HandHelping, Users, WalletCards } from "lucide-react";
import Link from "next/link";
import { HomeContent } from "@/lib/content";
import { Locale } from "@/lib/i18n";
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
  locale: Locale;
};

export default function GetInvolvedSection({ content, locale }: GetInvolvedSectionProps) {
  return (
    <SectionContainer id="get-involved" className="py-24" ariaLabel="Get involved">
      <AnimatedSection>
        <SectionHeader eyebrow={content.eyebrow} title={content.title} description={content.description} />
      </AnimatedSection>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {content.items.map((item, index) => {
          const Icon = iconMap[item.icon as keyof typeof iconMap] ?? HandHelping;
          const itemHref =
            item.icon === "helping"
              ? `/${locale}/vrijwillig-meewerken`
              : item.icon === "users"
                ? `/${locale}/partner-worden`
                : `/${locale}/studententrajecten`;

          return (
          <AnimatedSection key={item.title} delay={index * 0.1}>
            <Link
              href={itemHref}
              className="group block h-full rounded-2xl border border-brand-200 bg-white p-6 transition hover:-translate-y-1 hover:border-brand-300 hover:shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
            >
              <div className="mb-4 inline-flex rounded-xl bg-accent-50 p-3 text-accent-600">
                <Icon size={22} aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-3 text-slate-600">{item.text}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-700 transition-colors group-hover:text-brand-800">
                {content.learnMoreLabel} <ArrowRight size={16} aria-hidden="true" />
              </span>
            </Link>
          </AnimatedSection>
          );
        })}
      </div>
    </SectionContainer>
  );
}
