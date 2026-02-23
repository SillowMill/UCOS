import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { getHomeContent } from "@/lib/content";
import { Locale, isLocale } from "@/lib/i18n";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type PageProps = {
  params: {
    locale: string;
  };
};

type IntegrityContent = {
  title: string;
  intro: string;
  complaintTitle: string;
  complaintText: string;
  adviceTitle: string;
  adviceText: string;
  centralTitle: string;
  centralText: string;
  docsTitle: string;
  docs: Array<{ label: string; href: string }>;
  contactBack: string;
};

const integrityByLocale: Record<Locale, IntegrityContent> = {
  nl: {
    title: "Integriteit bij UCOS",
    intro:
      "UCOS hecht groot belang aan integriteit in handelingen en relaties. Meldingen en klachten worden vertrouwelijk, onafhankelijk en met zorg voor alle betrokkenen behandeld.",
    complaintTitle: "Integriteitsklacht indienen",
    complaintText:
      "Voor klachten over UCOS kan je mailen naar klachtenmanager Esther Philippen via integriteit@ucos.be of telefonisch contact opnemen via 02 614 82 65. Klachten over de klachtenmanager kunnen gemeld worden bij Bram Cleys (bram.cleys@ucos.be).",
    adviceTitle: "Advies over mogelijke schendingen",
    adviceText:
      "Voor vragen over integriteit kan je terecht bij raadgever integriteit Fien Portier (fien.portier@ucos.be, 02 614 81 64). Meldingen over de raadgever of bij afwezigheid kunnen naar Loes Verhaeghe (loes.verhaeghe@ucos.be).",
    centralTitle: "Centraal meldpunt op sectorniveau",
    centralText:
      "Naast het UCOS-meldpunt bestaat een federaal meldpunt voor misbruik op sectorniveau (seksuele uitbuiting, misbruik en intimidatie).",
    docsTitle: "Beleid en documenten",
    docs: [
      { label: "Integriteitsbeleid UCOS", href: "https://www.ucos.be/wp-content/uploads/2024/12/UCOS-Integriteitsbeleid-2024_website-1-1.pdf" },
      { label: "Ondertekend charter", href: "https://www.ucos.be/wp-content/uploads/2020/11/20180613-UCOS-Charter-Integriteit.pdf" },
      { label: "Klachtenprocedure UCOS", href: "https://www.ucos.be/wp-content/uploads/2024/12/UCOS-klachtenprocedure-2024-website.pdf" },
      { label: "Ethische code UCOS", href: "https://www.ucos.be/wp-content/uploads/2024/12/UCOS-ethische-code-2024_website.pdf" },
      { label: "Federaal centraal meldpunt", href: "https://diplomatie.belgium.be/nl/integriteit" }
    ],
    contactBack: "Terug naar contact"
  },
  en: {
    title: "Integrity at UCOS",
    intro:
      "UCOS attaches high importance to integrity in all actions and relationships. Reports and complaints are handled confidentially and independently.",
    complaintTitle: "Submit an integrity complaint",
    complaintText:
      "For complaints related to UCOS, contact complaint manager Esther Philippen via integriteit@ucos.be or by phone at 02 614 82 65. Complaints about the complaint manager can be sent to Bram Cleys (bram.cleys@ucos.be).",
    adviceTitle: "Advice on possible breaches",
    adviceText:
      "For integrity guidance, contact integrity advisor Fien Portier (fien.portier@ucos.be, 02 614 81 64). Reports about the advisor can be addressed to Loes Verhaeghe (loes.verhaeghe@ucos.be).",
    centralTitle: "Central sector-level reporting channel",
    centralText:
      "Alongside UCOS channels, a federal reporting channel exists for abuse at sector level (sexual exploitation, abuse, and harassment).",
    docsTitle: "Policies and documents",
    docs: [
      { label: "UCOS Integrity Policy", href: "https://www.ucos.be/wp-content/uploads/2024/12/UCOS-Integriteitsbeleid-2024_website-1-1.pdf" },
      { label: "Signed charter", href: "https://www.ucos.be/wp-content/uploads/2020/11/20180613-UCOS-Charter-Integriteit.pdf" },
      { label: "UCOS Complaints Procedure", href: "https://www.ucos.be/wp-content/uploads/2024/12/UCOS-klachtenprocedure-2024-website.pdf" },
      { label: "UCOS Code of Ethics", href: "https://www.ucos.be/wp-content/uploads/2024/12/UCOS-ethische-code-2024_website.pdf" },
      { label: "Federal reporting channel", href: "https://diplomatie.belgium.be/nl/integriteit" }
    ],
    contactBack: "Back to contact"
  },
  fr: {
    title: "Integrite chez UCOS",
    intro:
      "UCOS accorde une grande importance a l'integrite dans ses actions et ses relations. Les signalements sont traites de maniere confidentielle et independante.",
    complaintTitle: "Deposer une plainte",
    complaintText:
      "Pour une plainte concernant UCOS, contactez Esther Philippen via integriteit@ucos.be ou par telephone au 02 614 82 65. Les plaintes concernant la gestionnaire peuvent etre adressees a Bram Cleys (bram.cleys@ucos.be).",
    adviceTitle: "Conseil en integrite",
    adviceText:
      "Pour un avis, contactez la conseillere integrite Fien Portier (fien.portier@ucos.be, 02 614 81 64). Les signalements concernant la conseillere peuvent etre transmis a Loes Verhaeghe (loes.verhaeghe@ucos.be).",
    centralTitle: "Point de signalement central",
    centralText:
      "En parallele des canaux UCOS, un point federal de signalement existe pour les abus au niveau sectoriel.",
    docsTitle: "Politique et documents",
    docs: [
      { label: "Politique d'integrite UCOS", href: "https://www.ucos.be/wp-content/uploads/2024/12/UCOS-Integriteitsbeleid-2024_website-1-1.pdf" },
      { label: "Charte signee", href: "https://www.ucos.be/wp-content/uploads/2020/11/20180613-UCOS-Charter-Integriteit.pdf" },
      { label: "Procedure de plainte UCOS", href: "https://www.ucos.be/wp-content/uploads/2024/12/UCOS-klachtenprocedure-2024-website.pdf" },
      { label: "Code ethique UCOS", href: "https://www.ucos.be/wp-content/uploads/2024/12/UCOS-ethische-code-2024_website.pdf" },
      { label: "Point federal", href: "https://diplomatie.belgium.be/nl/integriteit" }
    ],
    contactBack: "Retour au contact"
  }
};

function resolveLocale(localeParam: string): Locale {
  if (!isLocale(localeParam)) notFound();
  return localeParam;
}

export function generateMetadata({ params }: PageProps): Metadata {
  const locale = resolveLocale(params.locale);
  return {
    title: `${integrityByLocale[locale].title} | UCOS`,
    description: integrityByLocale[locale].intro
  };
}

export default async function IntegrityPage({ params }: PageProps) {
  const locale = resolveLocale(params.locale);
  const home = await getHomeContent(locale);
  const content = integrityByLocale[locale];

  return (
    <>
      <Navbar locale={locale} content={home} />
      <main lang={locale} className="relative overflow-hidden pb-24 pt-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.88), rgba(255,255,255,0.92)), url('https://www.ucos.be/wp-content/uploads/2020/04/syd-wachs-slItfWbhijc-unsplash-1500x430.jpg')"
          }}
        />

        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
          <Link href={`/${locale}/ecosystem/contact`} className="text-sm font-semibold text-brand-700 hover:text-brand-800">
            {content.contactBack}
          </Link>

          <article className="mt-6 overflow-hidden rounded-2xl border border-brand-200 bg-white/90 shadow-soft backdrop-blur-sm">
            <div className="relative h-56 sm:h-72">
              <Image
                src="https://www.ucos.be/wp-content/uploads/2020/04/syd-wachs-slItfWbhijc-unsplash-1500x430.jpg"
                alt={content.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute bottom-5 left-5 right-5">
                <div className="inline-block rounded-lg bg-slate-900/35 px-4 py-3 backdrop-blur-sm">
                  <h1 className="text-3xl font-bold text-white sm:text-4xl">{content.title}</h1>
                </div>
              </div>
            </div>

            <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-2">
              <section className="rounded-xl border border-brand-200 bg-white p-4">
                <h2 className="text-lg font-semibold text-brand-900">{content.complaintTitle}</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">{content.complaintText}</p>
              </section>

              <section className="rounded-xl border border-brand-200 bg-white p-4">
                <h2 className="text-lg font-semibold text-brand-900">{content.adviceTitle}</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">{content.adviceText}</p>
              </section>

              <section className="rounded-xl border border-brand-200 bg-white p-4 lg:col-span-2">
                <h2 className="text-lg font-semibold text-brand-900">{content.centralTitle}</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">{content.centralText}</p>
              </section>

              <section className="rounded-xl border border-brand-200 bg-brand-50/60 p-4 lg:col-span-2">
                <h2 className="text-lg font-semibold text-brand-900">{content.docsTitle}</h2>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700">
                  {content.docs.map((doc) => (
                    <li key={doc.href}>
                      <a href={doc.href} target="_blank" rel="noreferrer" className="font-medium text-brand-700 hover:text-brand-800">
                        {doc.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </article>
        </div>
      </main>
      <Footer locale={locale} content={home.footer} branding={home.branding} />
    </>
  );
}
