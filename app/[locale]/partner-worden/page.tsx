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
    title: "Partner worden",
    intro:
      "Werk je bij een hogeschool, universiteit, NGO of maatschappelijke organisatie? Dan bouwen we graag met jou aan trajecten die onderwijs en maatschappelijke impact verbinden.",
    blocks: [
      {
        heading: "Samenwerkingsvormen",
        text: "We werken samen rond vorming, internationalisering, uitwisseling, curriculumondersteuning en campusbrede sensibilisering."
      },
      {
        heading: "Toegevoegde waarde",
        text: "Als partner krijg je toegang tot UCOS-expertise, methodieken en netwerken die studenten en teams helpen om lokale actie aan mondiale thema's te koppelen."
      },
      {
        heading: "Eerste stap",
        text: "In een verkennend gesprek brengen we doelen, doelgroep en timing in kaart en vertalen die naar een haalbaar samenwerkingstraject."
      }
    ],
    primaryCta: "Plan een kennismaking",
    secondaryCta: "Terug naar homepagina"
  },
  en: {
    title: "Become a partner",
    intro:
      "Do you represent a university, college, NGO, or social organization? We are ready to co-create trajectories that connect education with social impact.",
    blocks: [
      {
        heading: "Partnership formats",
        text: "We collaborate on training, internationalization, exchange, curriculum support, and campus-wide awareness initiatives."
      },
      {
        heading: "Added value",
        text: "Partners benefit from UCOS expertise, practical methods, and networks that help students and teams connect local action to global issues."
      },
      {
        heading: "First step",
        text: "We start with a scoping conversation to align objectives, audience, and timeline, then shape a realistic partnership plan together."
      }
    ],
    primaryCta: "Plan an intake call",
    secondaryCta: "Back to homepage"
  },
  fr: {
    title: "Devenir partenaire",
    intro:
      "Vous representez une universite, une haute ecole, une ONG ou une organisation sociale? Construisons ensemble des parcours reliant enseignement et impact societe.",
    blocks: [
      {
        heading: "Types de collaboration",
        text: "Nous co-construisons des actions de formation, internationalisation, echange, soutien curriculaire et sensibilisation sur campus."
      },
      {
        heading: "Valeur ajoutee",
        text: "Vous profitez de l'expertise UCOS, de methodes concretes et d'un reseau qui relie engagement local et enjeux mondiaux."
      },
      {
        heading: "Premiere etape",
        text: "Un entretien exploratoire nous permet de cadrer objectifs, publics et calendrier pour definir une collaboration realiste."
      }
    ],
    primaryCta: "Planifier un echange",
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

export default async function PartnerPage({ params }: PageProps) {
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
