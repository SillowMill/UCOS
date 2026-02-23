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
    title: "Global Quest Room",
    intro:
      "Global Quest Room is een interactief leertraject waarin studenten complexe mondiale thema's samen ontleden en vertalen naar haalbare acties in hun eigen context.",
    sections: [
      {
        heading: "Leerdoel",
        text: "Studenten ontwikkelen systeemdenken en leren hoe thema's zoals klimaat, migratie, gezondheid en ongelijkheid met elkaar verweven zijn."
      },
      {
        heading: "Werkvorm",
        text: "Via challenge-based opdrachten, groepsreflectie en begeleide dialoog werken teams stap voor stap van probleemverkenning naar gezamenlijke oplossingen."
      },
      {
        heading: "Concrete opbrengst",
        text: "Deelnemers vertrekken met toepasbare inzichten, sterke samenwerkingsvaardigheden en een duidelijk actieplan voor campus of stagecontext."
      }
    ],
    ctaLabel: "Vraag info over Global Quest Room",
    backLabel: "Terug naar programma's"
  },
  en: {
    title: "Global Quest Room",
    intro:
      "Global Quest Room is an interactive learning track where students unpack complex global issues together and translate them into practical action in their own context.",
    sections: [
      {
        heading: "Learning focus",
        text: "Students strengthen systems thinking and explore how climate, migration, health, and inequality are structurally connected."
      },
      {
        heading: "Format",
        text: "Through challenge-based tasks, group reflection, and facilitated dialogue, teams move from problem framing to co-created responses."
      },
      {
        heading: "Practical output",
        text: "Participants leave with actionable insights, stronger collaboration skills, and a clear implementation plan for campus or fieldwork settings."
      }
    ],
    ctaLabel: "Request details about Global Quest Room",
    backLabel: "Back to programs"
  },
  fr: {
    title: "Global Quest Room",
    intro:
      "Global Quest Room est un parcours d'apprentissage interactif ou les etudiants analysent ensemble des enjeux mondiaux complexes et les traduisent en actions concretes.",
    sections: [
      {
        heading: "Objectif pedagogique",
        text: "Les etudiants renforcent leur pensee systemique et comprennent les liens entre climat, migrations, sante et inegalites."
      },
      {
        heading: "Format de travail",
        text: "A travers des defis, des temps de reflexion collective et un accompagnement, les equipes passent de l'analyse a des reponses co-construites."
      },
      {
        heading: "Resultat concret",
        text: "Les participants repartent avec des pistes d'action applicables, des competences de cooperation et un plan de mise en oeuvre clair."
      }
    ],
    ctaLabel: "Demander des infos sur Global Quest Room",
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

export default async function GlobalQuestRoomPage({ params }: PageProps) {
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
