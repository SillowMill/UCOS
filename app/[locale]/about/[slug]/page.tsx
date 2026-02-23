import { Locale, isLocale } from "@/lib/i18n";
import AboutStoryVisual from "@/components/AboutStoryVisual";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { getHomeContent } from "@/lib/content";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type PageProps = {
  params: {
    locale: string;
    slug: string;
  };
};

type AboutDetail = {
  title: string;
  eyebrow: string;
  intro: string;
  highlights: Array<{ title: string; text: string }>;
  backLabel: string;
  ctaLabel: string;
};

const aboutDetails: Record<Locale, Record<string, AboutDetail>> = {
  nl: {
    missie: {
      title: "Onze missie",
      eyebrow: "Wie zijn we",
      intro:
        "UCOS versterkt actief wereldburgerschap in het hoger onderwijs. We helpen studenten en teams om globale uitdagingen kritisch te begrijpen en om te zetten in concrete, lokale actie.",
      highlights: [
        {
          title: "Onderwijs als hefboom",
          text: "We verbinden vorming en praktijk zodat kennis over rechtvaardigheid, duurzaamheid en solidariteit zichtbaar wordt in gedrag, projecten en beleid."
        },
        {
          title: "Studenten centraal",
          text: "Studenten zijn voor ons actieve mede-makers: we begeleiden hen in trajecten die kritisch denken, samenwerking en maatschappelijke verantwoordelijkheid versterken."
        },
        {
          title: "Van reflectie naar actie",
          text: "Onze missie is pas geslaagd wanneer inzichten landen in concrete stappen op campus, in stages en in samenwerking met partners."
        }
      ],
      backLabel: "Terug naar wie zijn we",
      ctaLabel: "Contacteer ons"
    },
    visie: {
      title: "Onze visie",
      eyebrow: "Wie zijn we",
      intro:
        "Wij geloven in een inclusieve samenleving waarin jongeren en onderwijsinstellingen samen bouwen aan rechtvaardige antwoorden op mondiale uitdagingen.",
      highlights: [
        {
          title: "Gelijkwaardige samenwerking",
          text: "Internationale samenwerking werkt pas duurzaam wanneer partners, studenten en gemeenschappen elkaar als gelijken benaderen."
        },
        {
          title: "Dekoloniale blik",
          text: "Onze visie vertrekt vanuit kritische zelfreflectie: welke stemmen ontbreken, welke machtsdynamieken spelen, en hoe maken we ruimte voor andere perspectieven?"
        },
        {
          title: "Toekomstgericht onderwijs",
          text: "We zien hoger onderwijs als motor voor maatschappelijke transitie, met jonge mensen als drijvende kracht van verandering."
        }
      ],
      backLabel: "Terug naar wie zijn we",
      ctaLabel: "Plan een gesprek"
    },
    impact: {
      title: "Onze impact",
      eyebrow: "Wie zijn we",
      intro:
        "Impact voor UCOS betekent dat studenten, docenten en partners blijvend sterker worden in hun engagement voor solidariteit en duurzame ontwikkeling.",
      highlights: [
        {
          title: "Sterkere competenties",
          text: "Deelnemers bouwen vaardigheden op in kritisch denken, contextanalyse, interculturele dialoog en samenwerking over grenzen heen."
        },
        {
          title: "Duurzame netwerken",
          text: "We verbinden onderwijsinstellingen, studentenorganisaties en maatschappelijke partners in netwerken die kennis en praktijk blijven uitwisselen."
        },
        {
          title: "Concrete verandering",
          text: "Onze impact is zichtbaar in campusinitiatieven, aangepaste onderwijspraktijken en projecten die lokale actie aan globale verantwoordelijkheid koppelen."
        }
      ],
      backLabel: "Terug naar wie zijn we",
      ctaLabel: "Bekijk contact"
    }
  },
  en: {
    missie: {
      title: "Our mission",
      eyebrow: "About us",
      intro:
        "UCOS strengthens active global citizenship in higher education by helping students and institutions turn critical learning into meaningful social action.",
      highlights: [
        {
          title: "Education as leverage",
          text: "We connect learning and practice so knowledge on justice, sustainability, and solidarity translates into concrete behavior and initiatives."
        },
        {
          title: "Students at the center",
          text: "Students are co-creators in our approach. We support pathways that build critical thinking, collaboration, and civic responsibility."
        },
        {
          title: "From insight to action",
          text: "Our mission is fulfilled when reflection leads to tangible change on campus, in exchanges, and in partner collaboration."
        }
      ],
      backLabel: "Back to about section",
      ctaLabel: "Contact us"
    },
    visie: {
      title: "Our vision",
      eyebrow: "About us",
      intro:
        "We believe in an inclusive society where young people and institutions co-create fair responses to global challenges.",
      highlights: [
        {
          title: "Equitable partnerships",
          text: "Sustainable international collaboration requires mutual respect and shared ownership between students, institutions, and communities."
        },
        {
          title: "Decolonial lens",
          text: "Our vision includes critical reflection on power, representation, and whose voices are amplified in education and cooperation."
        },
        {
          title: "Future-oriented education",
          text: "We see higher education as a key driver for social transition, with youth leadership at the core."
        }
      ],
      backLabel: "Back to about section",
      ctaLabel: "Start a conversation"
    },
    impact: {
      title: "Our impact",
      eyebrow: "About us",
      intro:
        "For UCOS, impact means strengthening long-term commitment among students, staff, and partners toward solidarity and sustainable development.",
      highlights: [
        {
          title: "Stronger competencies",
          text: "Participants build practical skills in critical thinking, context analysis, intercultural dialogue, and collaborative action."
        },
        {
          title: "Durable networks",
          text: "We connect institutions and organizations in networks that continue sharing methods, resources, and practice beyond one project cycle."
        },
        {
          title: "Visible change",
          text: "Impact shows in campus initiatives, educational approaches, and projects linking local engagement to global responsibility."
        }
      ],
      backLabel: "Back to about section",
      ctaLabel: "See contact options"
    }
  },
  fr: {
    missie: {
      title: "Notre mission",
      eyebrow: "Qui sommes-nous",
      intro:
        "UCOS renforce la citoyennete mondiale active dans l'enseignement superieur en reliant apprentissage critique et action concrete.",
      highlights: [
        {
          title: "L'education comme levier",
          text: "Nous articulons formation et pratique pour transformer les apprentissages sur la justice, la durabilite et la solidarite en actions visibles."
        },
        {
          title: "Les etudiants au centre",
          text: "Les etudiants sont des acteurs a part entiere de nos demarches, avec un accompagnement vers plus d'analyse critique et de responsabilite collective."
        },
        {
          title: "De la reflexion a l'action",
          text: "Notre mission se concretise quand les acquis se traduisent en initiatives sur le campus, en mobilite et en partenariat."
        }
      ],
      backLabel: "Retour a la section qui sommes-nous",
      ctaLabel: "Nous contacter"
    },
    visie: {
      title: "Notre vision",
      eyebrow: "Qui sommes-nous",
      intro:
        "Nous defendons une societe inclusive ou jeunes et institutions co-construisent des reponses justes aux enjeux mondiaux.",
      highlights: [
        {
          title: "Cooperation equitable",
          text: "Une cooperation durable suppose des relations d'egal a egal entre partenaires, etudiants et communautes."
        },
        {
          title: "Approche decoloniale",
          text: "Notre vision integre une lecture critique des rapports de pouvoir et de la representation des voix dans l'enseignement et la solidarite internationale."
        },
        {
          title: "Enseignement tourne vers l'avenir",
          text: "Nous considerons l'enseignement superieur comme un moteur de transition, avec les jeunes comme force de transformation."
        }
      ],
      backLabel: "Retour a la section qui sommes-nous",
      ctaLabel: "Planifier un echange"
    },
    impact: {
      title: "Notre impact",
      eyebrow: "Qui sommes-nous",
      intro:
        "Pour UCOS, l'impact consiste a renforcer durablement l'engagement des etudiants, du personnel et des partenaires pour la solidarite et le developpement durable.",
      highlights: [
        {
          title: "Competences renforcees",
          text: "Les participants developpent l'analyse critique, la lecture de contexte, le dialogue interculturel et la cooperation."
        },
        {
          title: "Reseaux durables",
          text: "Nous consolidons des reseaux entre institutions et organisations pour prolonger l'echange de pratiques et de ressources."
        },
        {
          title: "Changements concrets",
          text: "L'impact est visible dans les initiatives de campus, les pratiques pedagogiques et les projets reliant action locale et responsabilite globale."
        }
      ],
      backLabel: "Retour a la section qui sommes-nous",
      ctaLabel: "Voir les contacts"
    }
  }
};

function resolveLocale(localeParam: string): Locale {
  if (!isLocale(localeParam)) notFound();
  return localeParam;
}

function getPageContent(locale: Locale, slug: string) {
  const page = aboutDetails[locale][slug];
  if (!page) notFound();
  return page;
}

export function generateMetadata({ params }: PageProps): Metadata {
  const locale = resolveLocale(params.locale);
  const page = getPageContent(locale, params.slug);
  return {
    title: `${page.title} | UCOS`,
    description: page.intro
  };
}

export default async function AboutDetailPage({ params }: PageProps) {
  const locale = resolveLocale(params.locale);
  const page = getPageContent(locale, params.slug);
  const home = await getHomeContent(locale);

  return (
    <>
      <Navbar locale={locale} content={home} />
      <main lang={locale} className="relative overflow-hidden pb-24 pt-24">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-20 scale-105 bg-cover bg-center bg-no-repeat blur-[6px]"
        style={{ backgroundImage: "url('https://www.ucos.be/wp-content/uploads/2024/06/UCOS_CHANGE_MIETTE-63-1500x430.jpg')" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.8),rgba(255,255,255,0.86))]"
      />

      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
        <article className="mt-6 overflow-hidden rounded-2xl border border-brand-200 bg-white/90 shadow-soft backdrop-blur-sm">
          <div className="relative h-56 sm:h-72">
            <AboutStoryVisual slug={params.slug} />
            <div className="absolute bottom-5 left-5 right-5">
              <div className="inline-block rounded-lg bg-slate-900/35 px-4 py-3 backdrop-blur-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/90">{page.eyebrow}</p>
                <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl">{page.title}</h1>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <p className="text-lg leading-relaxed text-slate-700">{page.intro}</p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {page.highlights.map((item) => (
                <section
                  key={item.title}
                  className="rounded-xl border border-brand-200 bg-white p-4 transition duration-300 hover:-translate-y-1 hover:border-brand-400 hover:shadow-soft"
                >
                  <h2 className="text-lg font-semibold text-brand-800">{item.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">{item.text}</p>
                </section>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={`/${locale}#about`}
                className="inline-flex items-center rounded-full border border-brand-300 bg-white px-5 py-2.5 text-sm font-semibold text-brand-800 transition hover:bg-brand-50"
              >
                {page.backLabel}
              </Link>
              <Link
                href={`/${locale}/ecosystem/contact`}
                className="inline-flex items-center rounded-full bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-800"
              >
                {page.ctaLabel}
              </Link>
            </div>
          </div>
        </article>
      </div>
      </main>
      <Footer locale={locale} content={home.footer} branding={home.branding} />
    </>
  );
}
