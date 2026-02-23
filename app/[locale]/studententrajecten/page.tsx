import { Locale, isLocale } from "@/lib/i18n";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ContactEmailComposer from "@/components/ContactEmailComposer";
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
  blocks: Array<{ heading: string; text: string }>;
  primaryCta: string;
  secondaryCta: string;
};

const contentByLocale: Record<Locale, PageContent> = {
  nl: {
    title: "Studententrajecten",
    intro:
      "Via onze studententrajecten begeleiden we studenten van voorbereiding tot reflectie, met aandacht voor context, gelijkwaardigheid en maatschappelijke impact.",
    blocks: [
      {
        heading: "Voor vertrek",
        text: "We bieden voorbereidende sessies rond contextanalyse, ethiek, privileges en samenwerking, zodat studenten sterker en bewuster starten."
      },
      {
        heading: "Tijdens het traject",
        text: "Studenten krijgen houvast via methodieken en contactpunten om ervaringen te kaderen en obstakels constructief aan te pakken."
      },
      {
        heading: "Na terugkeer",
        text: "Debriefing en terugkommomenten helpen om ervaringen te vertalen naar kritisch inzicht, engagement op campus en duurzame opvolging."
      }
    ],
    primaryCta: "Bekijk contactmogelijkheden",
    secondaryCta: "Terug naar homepagina"
  },
  en: {
    title: "Student pathways",
    intro:
      "Our student pathways support participants from preparation to reflection, with focus on context, reciprocity, and long-term social impact.",
    blocks: [
      {
        heading: "Before departure",
        text: "We organize preparatory sessions on context analysis, ethics, privilege, and collaboration so students begin with stronger foundations."
      },
      {
        heading: "During the trajectory",
        text: "Students receive practical guidance and contact points to frame experiences and handle challenges in a constructive way."
      },
      {
        heading: "After return",
        text: "Debriefing moments help translate lived experiences into critical insight, campus engagement, and meaningful follow-up action."
      }
    ],
    primaryCta: "See contact options",
    secondaryCta: "Back to homepage"
  },
  fr: {
    title: "Parcours etudiants",
    intro:
      "Nos parcours etudiants accompagnent les participants de la preparation a la reflexion finale, avec attention au contexte, a la reciprocite et a l'impact durable.",
    blocks: [
      {
        heading: "Avant le depart",
        text: "Nous proposons des sessions preparatoires sur l'analyse de contexte, l'ethique, les privileges et la cooperation."
      },
      {
        heading: "Pendant le parcours",
        text: "Les etudiants disposent d'outils et de points de contact pour analyser leurs experiences et surmonter les difficultes."
      },
      {
        heading: "Au retour",
        text: "Les debriefings permettent de transformer l'experience en apprentissage critique, engagement sur campus et actions de suivi."
      }
    ],
    primaryCta: "Voir les contacts",
    secondaryCta: "Retour a l'accueil"
  }
};

function resolveLocale(localeParam: string): Locale {
  if (!isLocale(localeParam)) notFound();
  return localeParam;
}

export function generateMetadata({ params }: PageProps): Metadata {
  const locale = resolveLocale(params.locale);
  return {
    title: `${contentByLocale[locale].title} | UCOS`,
    description: contentByLocale[locale].intro
  };
}

export default async function StudentPathwaysPage({ params }: PageProps) {
  const locale = resolveLocale(params.locale);
  const content = contentByLocale[locale];
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
        <article className="mt-6 rounded-2xl border border-brand-200 bg-white/85 p-6 shadow-soft backdrop-blur-md sm:p-8">
          <h1 className="text-3xl font-bold text-brand-900 sm:text-4xl">{content.title}</h1>
          <p className="mt-4 text-lg leading-relaxed text-slate-700">{content.intro}</p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {content.blocks.map((block) => (
              <section key={block.heading} className="rounded-xl border border-brand-200 bg-white p-4">
                <h2 className="text-lg font-semibold text-brand-800">{block.heading}</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">{block.text}</p>
              </section>
            ))}
          </div>

          <ContactEmailComposer locale={locale} showQuestionType={false} fixedRecipient="contact@ucos.be" fixedTopicLabel={content.title} />

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={`/${locale}#get-involved`}
              className="inline-flex items-center rounded-full border border-brand-300 bg-white px-5 py-2.5 text-sm font-semibold text-brand-800 transition hover:bg-brand-50"
            >
              {content.secondaryCta}
            </Link>
          </div>

        </article>
      </div>
      </main>
      <Footer locale={locale} content={home.footer} branding={home.branding} />
    </>
  );
}
