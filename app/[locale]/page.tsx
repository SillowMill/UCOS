import AboutSection from "@/components/AboutSection";
import CallToActionSection from "@/components/CallToActionSection";
import Footer from "@/components/Footer";
import GetInvolvedSection from "@/components/GetInvolvedSection";
import HeroSection from "@/components/HeroSection";
import ImpactSection from "@/components/ImpactSection";
import Navbar from "@/components/Navbar";
import NewsSection from "@/components/NewsSection";
import ProgramsSection from "@/components/ProgramsSection";
import WhatWeDoSection from "@/components/WhatWeDoSection";
import { getHomeContent, getStoryPreviews } from "@/lib/content";
import { Locale, isLocale } from "@/lib/i18n";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type PageProps = {
  params: {
    locale: string;
  };
};

async function resolveLocale(localeParam: string): Promise<Locale> {
  if (!isLocale(localeParam)) notFound();
  return localeParam;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = await resolveLocale(params.locale);
  const content = await getHomeContent(locale);
  return {
    title: content.meta.title,
    description: content.meta.description,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        nl: "/nl",
        en: "/en",
        fr: "/fr"
      }
    },
    openGraph: {
      title: content.meta.title,
      description: content.meta.description,
      type: "website",
      locale
    }
  };
}

export default async function LocaleHomePage({ params }: PageProps) {
  const locale = await resolveLocale(params.locale);
  const [content, stories] = await Promise.all([getHomeContent(locale), getStoryPreviews(locale)]);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-brand-800"
      >
        {content.accessibility.skipToContent}
      </a>
      <Navbar locale={locale} content={content} />
      <main id="main-content" lang={locale}>
        <HeroSection content={content.hero} />
        <AboutSection content={content.about} />
        <WhatWeDoSection content={content.whatWeDo} />
        <ImpactSection content={content.impact} />
        <ProgramsSection content={content.programs} />
        <GetInvolvedSection content={content.involved} />
        <NewsSection content={content.stories} stories={stories.slice(0, 3)} locale={locale} />
        <CallToActionSection content={content.cta} locale={locale} />
      </main>
      <Footer locale={locale} content={content.footer} branding={content.branding} />
    </>
  );
}
