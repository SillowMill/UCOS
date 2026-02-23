import { Locale, isLocale } from "@/lib/i18n";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { getHomeContent } from "@/lib/content";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type PageProps = {
  params: {
    locale: string;
  };
};

type PageContent = {
  title: string;
  intro: string;
  sections: Array<{ heading: string; text: string }>;
  ctaLabel: string;
  backLabel: string;
};

const pageContent: Record<Locale, PageContent> = {
  nl: {
    title: "Campus voor Klimaatrechtvaardigheid",
    intro:
      "In dit traject begeleiden we studenten om klimaatverandering te koppelen aan sociale rechtvaardigheid, beleidskeuzes en concrete actie op de campus.",
    sections: [
      {
        heading: "Wat we doen",
        text: "We organiseren vormingen, werksessies en reflectiemomenten waarin studenten leren hoe klimaat, ongelijkheid en mondiale verantwoordelijkheid met elkaar verbonden zijn."
      },
      {
        heading: "Hoe we werken",
        text: "Samen met studententeams en partners vertalen we inzichten naar haalbare acties: van sensibilisering en debat tot projectwerk en beleidsvoorstellen."
      },
      {
        heading: "Resultaat op de campus",
        text: "Studenten bouwen leiderschap op, versterken hun kritische blik en zetten initiatieven op die bijdragen aan duurzame en inclusieve verandering."
      }
    ],
    ctaLabel: "Neem contact op over dit traject",
    backLabel: "Terug naar programma's"
  },
  en: {
    title: "Campus for Climate Justice",
    intro:
      "This trajectory helps students connect climate action with social justice, policy choices, and practical campus-based engagement.",
    sections: [
      {
        heading: "What we do",
        text: "We facilitate trainings, workshops, and reflection sessions where students explore links between climate change, inequality, and global responsibility."
      },
      {
        heading: "How we work",
        text: "Together with student teams and partners, we turn insights into realistic actions, from awareness campaigns and debate formats to concrete project proposals."
      },
      {
        heading: "Campus outcomes",
        text: "Students strengthen leadership, critical analysis, and collaboration while contributing to sustainable and inclusive change in their institution."
      }
    ],
    ctaLabel: "Contact us about this track",
    backLabel: "Back to programs"
  },
  fr: {
    title: "Campus pour la justice climatique",
    intro:
      "Ce parcours accompagne les etudiants pour relier action climatique, justice sociale, choix politiques et initiatives concretes sur le campus.",
    sections: [
      {
        heading: "Ce que nous faisons",
        text: "Nous proposons des formations, ateliers et temps de reflexion pour analyser les liens entre climat, inegalites et responsabilite mondiale."
      },
      {
        heading: "Notre methode",
        text: "Avec des equipes etudiantes et des partenaires, nous traduisons les apprentissages en actions realistes: sensibilisation, debat, projets et propositions."
      },
      {
        heading: "Impact sur le campus",
        text: "Les etudiants renforcent leur leadership, leur esprit critique et leur capacite de cooperation pour porter un changement durable et inclusif."
      }
    ],
    ctaLabel: "Nous contacter pour ce parcours",
    backLabel: "Retour aux programmes"
  }
};

function resolveLocale(localeParam: string): Locale {
  if (!isLocale(localeParam)) notFound();
  return localeParam;
}

export function generateMetadata({ params }: PageProps): Metadata {
  const locale = resolveLocale(params.locale);
  return {
    title: `${pageContent[locale].title} | UCOS`,
    description: pageContent[locale].intro
  };
}

export default async function CampusClimateJusticePage({ params }: PageProps) {
  const locale = resolveLocale(params.locale);
  const content = pageContent[locale];
  const home = await getHomeContent(locale);

  return (
    <>
      <Navbar locale={locale} content={home} />
      <main lang={locale} className="relative overflow-hidden pb-24 pt-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.94)), url('https://www.ucos.be/wp-content/uploads/2024/06/UCOS_CHANGE_MIETTE-63-1500x430.jpg')"
        }}
      />

      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
        <Link href={`/${locale}#programs`} className="text-sm font-semibold text-brand-700 hover:text-brand-800">
          {content.backLabel}
        </Link>

        <article className="mt-6 rounded-2xl border border-brand-200 bg-white/85 p-6 shadow-soft backdrop-blur-md sm:p-8">
          <h1 className="text-3xl font-bold text-brand-900 sm:text-4xl">{content.title}</h1>
          <p className="mt-4 text-lg leading-relaxed text-slate-700">{content.intro}</p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {content.sections.map((section) => (
              <section key={section.heading} className="rounded-xl border border-brand-200 bg-white p-4">
                <h2 className="text-lg font-semibold text-brand-800">{section.heading}</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">{section.text}</p>
              </section>
            ))}
          </div>

          <div className="mt-8">
            <Link
              href={`/${locale}/ecosystem/contact`}
              className="rounded-full bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-800"
            >
              {content.ctaLabel}
            </Link>
          </div>
        </article>
      </div>
      </main>
      <Footer locale={locale} content={home.footer} branding={home.branding} />
    </>
  );
}
