import { getHomeContent, getStoryBySlug, getStoryPreviews } from "@/lib/content";
import { Locale, isLocale } from "@/lib/i18n";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type StoryPageProps = {
  params: {
    locale: string;
    slug: string;
  };
};

async function resolveLocale(localeParam: string): Promise<Locale> {
  if (!isLocale(localeParam)) notFound();
  return localeParam;
}

export async function generateStaticParams() {
  const allLocales: Locale[] = ["nl", "en", "fr"];
  const entries = await Promise.all(
    allLocales.map(async (locale) => {
      const stories = await getStoryPreviews(locale);
      return stories.map((story) => ({ locale, slug: story.slug }));
    })
  );
  return entries.flat();
}

export async function generateMetadata({ params }: StoryPageProps): Promise<Metadata> {
  const locale = await resolveLocale(params.locale);
  const story = await getStoryBySlug(locale, params.slug);
  return {
    title: `${story.frontmatter.title} | UCOS`,
    description: story.frontmatter.excerpt
  };
}

export default async function StoryPage({ params }: StoryPageProps) {
  const locale = await resolveLocale(params.locale);
  const [story, homeContent] = await Promise.all([getStoryBySlug(locale, params.slug), getHomeContent(locale)]);

  return (
    <main lang={locale} className="mx-auto max-w-4xl px-5 pb-20 pt-14 sm:px-8 lg:px-12">
      <Link href={`/${locale}`} className="text-sm font-semibold text-brand-700 hover:text-brand-800">
        {homeContent.stories.allStoriesLabel}
      </Link>
      <article className="mt-8 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-700">{story.frontmatter.category}</p>
        <h1 className="mt-3 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">{story.frontmatter.title}</h1>
        <p className="mt-4 text-sm text-slate-500">{story.frontmatter.date}</p>
        <div className="mt-8 space-y-4 text-base leading-relaxed text-slate-700">
          {story.content}
        </div>
      </article>
    </main>
  );
}
