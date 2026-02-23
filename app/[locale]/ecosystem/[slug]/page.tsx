import { getHomeContent, getUcosPageBySlug, getUcosPageSlugs } from "@/lib/content";
import ContactEmailComposer from "@/components/ContactEmailComposer";
import CopyableInfoList from "@/components/CopyableInfoList";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
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
  const isContactPage = params.slug === "contact";
  const otherSections = page.frontmatter.sections.slice(1);

  const contactCopy = {
    nl: {
      teamLabel: "Team UCOS",
      galleryLabel: "Ons team in beeld",
      fallbackCaption: "Functiebeschrijving volgt",
      fallbackRole: "Functie volgt",
      phoneLabel: "Tel.",
      emailLabel: "E-mail",
      mapTitle: "Bezoek ons op locatie",
      infoTitle: "Praktische info",
      mapLinkLabel: "Open in Google Maps",
      coreInfoTitle: "Hoofdgegevens",
      copyLabel: "Kopieer",
      copiedLabel: "Gekopieerd",
      coreInfo: [
        { label: "Adres", value: "Pleinlaan 5, 1050 Brussel" },
        { label: "Telefoon", value: "+32 2 614 81 65" },
        { label: "KBO", value: "0420.790.948" },
        { label: "IBAN", value: "BE20 0689 4833 3156" }
      ],
      integrityWidgetTitle: "Integriteit & meldpunt",
      integrityWidgetText:
        "Heb je een klacht of vraag over integriteit? Meldingen worden vertrouwelijk behandeld via de klachtenmanager of raadgever integriteit.",
      integrityWidgetPrimary: "integriteit@ucos.be",
      integrityWidgetSecondary: "raadgever: fien.portier@ucos.be",
      integrityReadMore: "Lees meer",
      widgets: [
        {
          heading: "Postadres",
          text: "UCOS vzw, Pleinlaan 2, 1050 Brussel"
        },
        {
          heading: "Bereikbaarheid",
          text: "Station Etterbeek (NMBS), bus 95, tram 7/25 en Villo! liggen op wandelafstand van het kantoor."
        }
      ]
    },
    en: {
      teamLabel: "UCOS Team",
      galleryLabel: "Meet the team",
      fallbackCaption: "Role description coming soon",
      fallbackRole: "Role to be confirmed",
      phoneLabel: "Phone",
      emailLabel: "Email",
      mapTitle: "Visit our office",
      infoTitle: "Practical info",
      mapLinkLabel: "Open in Google Maps",
      coreInfoTitle: "Core details",
      copyLabel: "Copy",
      copiedLabel: "Copied",
      coreInfo: [
        { label: "Address", value: "Pleinlaan 5, 1050 Brussels" },
        { label: "Phone", value: "+32 2 614 81 65" },
        { label: "Company ID", value: "0420.790.948" },
        { label: "IBAN", value: "BE20 0689 4833 3156" }
      ],
      integrityWidgetTitle: "Integrity & reporting",
      integrityWidgetText:
        "Do you have a complaint or a question about integrity? Reports are handled confidentially by the complaint manager or integrity advisor.",
      integrityWidgetPrimary: "integriteit@ucos.be",
      integrityWidgetSecondary: "advisor: fien.portier@ucos.be",
      integrityReadMore: "Read more",
      widgets: [
        {
          heading: "Postal address",
          text: "UCOS vzw, Pleinlaan 2, 1050 Brussels"
        },
        {
          heading: "How to get there",
          text: "Etterbeek station, bus 95, tram 7/25, and Villo! bike points are all within walking distance."
        }
      ]
    },
    fr: {
      teamLabel: "Equipe UCOS",
      galleryLabel: "Notre equipe",
      fallbackCaption: "Description du role a venir",
      fallbackRole: "Role a confirmer",
      phoneLabel: "Tel.",
      emailLabel: "E-mail",
      mapTitle: "Nous trouver",
      infoTitle: "Infos pratiques",
      mapLinkLabel: "Ouvrir dans Google Maps",
      coreInfoTitle: "Coordonnees principales",
      copyLabel: "Copier",
      copiedLabel: "Copie",
      coreInfo: [
        { label: "Adresse", value: "Pleinlaan 5, 1050 Bruxelles" },
        { label: "Telephone", value: "+32 2 614 81 65" },
        { label: "Numero BCE", value: "0420.790.948" },
        { label: "IBAN", value: "BE20 0689 4833 3156" }
      ],
      integrityWidgetTitle: "Integrite & signalement",
      integrityWidgetText:
        "Vous avez une plainte ou une question sur l'integrite? Les signalements sont traites en toute confidentialite par la gestionnaire des plaintes ou la conseillere integrite.",
      integrityWidgetPrimary: "integriteit@ucos.be",
      integrityWidgetSecondary: "conseillere: fien.portier@ucos.be",
      integrityReadMore: "En savoir plus",
      widgets: [
        {
          heading: "Adresse postale",
          text: "UCOS vzw, Pleinlaan 2, 1050 Bruxelles"
        },
        {
          heading: "Accessibilite",
          text: "La gare d'Etterbeek, le bus 95, les trams 7/25 et les stations Villo! sont a proximite immediate."
        }
      ]
    }
  }[locale];

  return (
    <>
      <Navbar locale={locale} content={home} />
      <main lang={locale} className="relative overflow-hidden pb-24 pt-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.86), rgba(255,255,255,0.92)), url('https://www.ucos.be/wp-content/uploads/2024/06/UCOS_CHANGE_MIETTE-63-1500x430.jpg')"
        }}
      />

      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
        <article className="mt-6 overflow-hidden rounded-2xl border border-brand-200 bg-white/80 shadow-soft backdrop-blur-md">
          <div className="relative h-56 sm:h-72">
            {isContactPage ? (
              <iframe
                title="UCOS Google Maps"
                src="https://www.google.com/maps?q=Pleinlaan+5,+1050+Brussel&output=embed"
                className="h-full w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              <Image
                src={page.frontmatter.heroImage}
                alt={page.frontmatter.title}
                fill
                className="object-contain bg-white p-2"
                priority
              />
            )}
            <div className="absolute bottom-5 left-5 right-5">
              <div className={`inline-block rounded-lg px-4 py-3 backdrop-blur-sm ${isContactPage ? "bg-white/50" : "bg-slate-900/35"}`}>
                <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${isContactPage ? "text-brand-800" : "text-white/90"}`}>
                  {isContactPage ? contactCopy.teamLabel : page.frontmatter.eyebrow}
                </p>
                <h1 className={`mt-2 text-3xl font-bold sm:text-4xl ${isContactPage ? "text-brand-900" : "text-white"}`}>{page.frontmatter.title}</h1>
              </div>
            </div>
          </div>

          {isContactPage ? (
            <div className="p-6 sm:p-8">
              <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
                <div>
                  <section className="mt-4 rounded-brand border border-brand-200 bg-brand-50/60 p-4">
                    <h2 className="text-lg font-semibold text-brand-900">{contactCopy.coreInfoTitle}</h2>
                    <CopyableInfoList items={contactCopy.coreInfo} copyLabel={contactCopy.copyLabel} copiedLabel={contactCopy.copiedLabel} />
                  </section>

                  <ContactEmailComposer locale={locale} />

                  <div className="mt-6 rounded-xl border border-brand-200 bg-white p-4">
                    <p className="text-base font-semibold text-brand-900">{contactCopy.integrityWidgetTitle}</p>
                    <p className="mt-2 text-sm leading-relaxed text-slate-700">{contactCopy.integrityWidgetText}</p>
                    <p className="mt-3 text-sm font-semibold text-brand-800">{contactCopy.integrityWidgetPrimary}</p>
                    <p className="mt-1 text-sm text-slate-700">{contactCopy.integrityWidgetSecondary}</p>
                    <Link
                      href={`/${locale}/integriteit`}
                      className="mt-4 inline-flex rounded-full border border-brand-300 bg-white px-4 py-2 text-sm font-semibold text-brand-800 transition hover:bg-brand-50"
                    >
                      {contactCopy.integrityReadMore}
                    </Link>
                  </div>

                  <div className="mt-6 space-y-4">
                    {otherSections.map((section) => (
                      <section key={section.heading} className="rounded-brand border border-brand-200 bg-white/90 p-4 transition hover:shadow-soft">
                        <h2 className="text-xl font-semibold text-brand-800">{section.heading}</h2>
                        <p className="mt-2 leading-relaxed text-slate-700">{section.text}</p>
                      </section>
                    ))}
                  </div>

                  <div className="mt-8 text-base leading-relaxed text-slate-700">{page.content}</div>
                </div>

                <aside>
                  <div className="grid grid-cols-2 gap-6">
                    {page.frontmatter.gallery.map((image, index) => {
                      const isEunique = (page.frontmatter.galleryCaptions?.[index] ?? "").toLowerCase().includes("eunique");

                      return (
                        <div key={`${image}-${index}`} className="flex flex-col items-center text-center">
                          <div className={isEunique ? "relative h-44 w-32 sm:h-48 sm:w-36" : "relative h-36 w-full sm:h-40"}>
                            <Image
                              src={image}
                              alt={`${page.frontmatter.title} visual ${index + 1}`}
                              fill
                              className={isEunique ? "rounded-lg object-cover object-top" : "object-contain"}
                            />
                          </div>
                        <p className="mt-2 text-xs font-medium text-slate-700">
                          {page.frontmatter.galleryCaptions?.[index] ?? contactCopy.fallbackCaption}
                        </p>
                        <p className="mt-1 text-xs font-bold text-brand-900">
                          {page.frontmatter.galleryRoles?.[index] ?? contactCopy.fallbackRole}
                        </p>
                        {page.frontmatter.galleryPhones?.[index] && (
                          <p className="mt-1 text-xs text-slate-700">
                            {contactCopy.phoneLabel}: {page.frontmatter.galleryPhones[index]}
                          </p>
                        )}
                        {page.frontmatter.galleryEmails?.[index] && (
                          <p className="mt-1 text-xs text-slate-700">
                            {contactCopy.emailLabel}:{" "}
                            <a
                              href={`mailto:${page.frontmatter.galleryEmails[index]}`}
                              className="font-medium text-brand-700 hover:text-brand-800"
                            >
                              {page.frontmatter.galleryEmails[index]}
                            </a>
                          </p>
                        )}
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-6 rounded-xl border border-brand-200 bg-white/90 p-4">
                    <p className="text-sm font-semibold text-brand-800">{contactCopy.infoTitle}</p>
                    <div className="mt-3 space-y-3">
                      {contactCopy.widgets.map((widget) => (
                        <section key={widget.heading} className="rounded-md bg-brand-50/60 p-3">
                          <h3 className="text-sm font-semibold text-brand-800">{widget.heading}</h3>
                          <p className="mt-1 text-sm text-slate-700">{widget.text}</p>
                        </section>
                      ))}
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          ) : (
            <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_0.9fr]">
              <div>
                <p className="text-lg leading-relaxed text-slate-700">{page.frontmatter.summary}</p>

                <div className="mt-6 space-y-5">
                  {page.frontmatter.sections.map((section) => (
                    <section key={section.heading} className="rounded-brand border border-brand-200 bg-white/85 p-4">
                      <h2 className="text-xl font-semibold text-brand-800">{section.heading}</h2>
                      <p className="mt-2 leading-relaxed text-slate-700">{section.text}</p>
                    </section>
                  ))}
                </div>

                <div className="mt-8 text-base leading-relaxed text-slate-700">{page.content}</div>
              </div>

              <aside className="space-y-6">
                <div className="grid grid-cols-2 gap-3">
                  {page.frontmatter.gallery.map((image, index) => (
                    <div key={`${image}-${index}`} className="relative h-28 overflow-hidden rounded-brand border border-brand-200">
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
          )}
        </article>
      </div>
      </main>
      <Footer locale={locale} content={home.footer} branding={home.branding} />
    </>
  );
}
