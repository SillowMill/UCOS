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
    title: "Vrijwillig meewerken",
    intro:
      "Wil je je engageren voor actief wereldburgerschap? Als vrijwilliger bij UCOS help je mee aan vormingen, events en campagnemomenten op en rond de campus.",
    blocks: [
      {
        heading: "Wat je doet",
        text: "Je ondersteunt workshops, logistiek, publiekswerking en communicatie. Zo help je studenten en partners sneller de juiste info en activiteiten te vinden."
      },
      {
        heading: "Wat je leert",
        text: "Je versterkt je vaardigheden in samenwerking, organisatie, interculturele dialoog en maatschappelijke communicatie in een teamcontext."
      },
      {
        heading: "Hoe je start",
        text: "We plannen eerst een kort kennismakingsgesprek. Daarna bekijken we welke rol en timing best passen bij jouw profiel en beschikbaarheid."
      }
    ],
    primaryCta: "Contacteer UCOS",
    secondaryCta: "Terug naar homepagina"
  },
  en: {
    title: "Volunteer with UCOS",
    intro:
      "Want to contribute to active global citizenship? As a UCOS volunteer, you support trainings, events, and outreach moments on and around campus.",
    blocks: [
      {
        heading: "What you do",
        text: "You help with workshops, logistics, audience engagement, and communication so students and partners can access the right opportunities faster."
      },
      {
        heading: "What you gain",
        text: "You build practical skills in collaboration, organization, intercultural dialogue, and social communication within a supportive team setting."
      },
      {
        heading: "How to start",
        text: "We begin with a short introduction meeting and then match your role and schedule with ongoing UCOS activities."
      }
    ],
    primaryCta: "Contact UCOS",
    secondaryCta: "Back to homepage"
  },
  fr: {
    title: "Devenir benevole",
    intro:
      "Vous souhaitez agir pour la citoyennete mondiale active? En tant que benevole UCOS, vous soutenez formations, evenements et actions sur et autour du campus.",
    blocks: [
      {
        heading: "Votre role",
        text: "Vous appuyez des ateliers, la logistique, la mobilisation et la communication pour faciliter l'acces des etudiants et partenaires aux activites."
      },
      {
        heading: "Ce que vous developpez",
        text: "Vous renforcez vos competences en collaboration, organisation, dialogue interculturel et communication citoyenne au sein d'une equipe."
      },
      {
        heading: "Comment commencer",
        text: "Nous organisons d'abord un court entretien de contact puis nous definissons un role adapte a votre profil et a vos disponibilites."
      }
    ],
    primaryCta: "Contacter UCOS",
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

export default async function VolunteerPage({ params }: PageProps) {
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
