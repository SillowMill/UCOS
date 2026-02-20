import { getHomeContent, getUcosPageBySlug, getUcosPageSlugs } from "@/lib/content";
import { Locale, locales, isLocale } from "@/lib/i18n";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type EcosystemPageProps = {
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
  const all = await Promise.all(
    locales.map(async (locale) => {
      const slugs = await getUcosPageSlugs(locale);
      return slugs.map((slug) => ({ locale, slug }));
    })
  );
  return all.flat();
}

export async function generateMetadata({ params }: EcosystemPageProps): Promise<Metadata> {
  const locale = await resolveLocale(params.locale);
  const page = await getUcosPageBySlug(locale, params.slug);
  return {
    title: `${page.frontmatter.title} | UCOS`,
    description: page.frontmatter.summary
  };
}

export default async function EcosystemPage({ params }: EcosystemPageProps) {
  const locale = await resolveLocale(params.locale);
  const [page, home] = await Promise.all([getUcosPageBySlug(locale, params.slug), getHomeContent(locale)]);

  return (
    <main lang={locale} className="relative overflow-hidden pb-24 pt-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.86), rgba(255,255,255,0.92)), url('https://www.ucos.be/wp-content/uploads/2024/06/UCOS_CHANGE_MIETTE-63-1500x430.jpg')"
        }}
      />

      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8 lg:px-12">
        <Link href={`/${locale}#ecosystem`} className="text-sm font-semibold text-accent-700 hover:text-brand-700">
          &larr; {home.stories.allStoriesLabel}
        </Link>

        <article className="mt-6 overflow-hidden rounded-2xl border border-accent-100 bg-white/75 shadow-soft backdrop-blur-md">
          <div className="relative h-64 sm:h-80">
            <Image
              src={page.frontmatter.heroImage}
              alt={page.frontmatter.title}
              fill
              className="object-contain bg-white p-2"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-accent-900/60 via-accent-900/25 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-100">{page.frontmatter.eyebrow}</p>
              <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl">{page.frontmatter.title}</h1>
            </div>
          </div>

          <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_0.9fr]">
            <div>
              <p className="text-lg leading-relaxed text-slate-700">{page.frontmatter.summary}</p>

              <div className="mt-6 space-y-5">
                {page.frontmatter.sections.map((section) => (
                  <section key={section.heading} className="rounded-brand border border-accent-100 bg-white/70 p-4">
                    <h2 className="text-xl font-semibold text-accent-800">{section.heading}</h2>
                    <p className="mt-2 leading-relaxed text-slate-700">{section.text}</p>
                  </section>
                ))}
              </div>

              <div className="mt-8 text-base leading-relaxed text-slate-700">{page.content}</div>
            </div>

            <aside className="space-y-6">
              <div className="rounded-brand border border-accent-100 bg-white/70 p-4">
                <h3 className="text-lg font-semibold text-accent-800">Snelle links</h3>
                <ul className="mt-3 space-y-2">
                  {page.frontmatter.quickLinks.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} target="_blank" rel="noreferrer" className="text-sm font-medium text-accent-700 hover:text-brand-700">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {page.frontmatter.gallery.map((image, index) => (
                  <div key={`${image}-${index}`} className="relative h-28 overflow-hidden rounded-brand border border-accent-100">
                    <Image
                      src={image}
                      alt={`${page.frontmatter.title} visual ${index + 1}`}
                      fill
                      className="object-contain bg-white p-1"
                    />
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </article>
      </div>
    </main>
  );
}
