"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { HomeContent } from "@/lib/content";
import { Locale } from "@/lib/i18n";
import SectionContainer from "./SectionContainer";
import SectionHeader from "./SectionHeader";

type UcosEcosystemSectionProps = {
  content: HomeContent["ecosystem"];
  locale: Locale;
};

const highlightImages = [
  "https://www.ucos.be/wp-content/uploads/2026/01/WhatsApp-Image-2026-01-13-at-09.33.45-495x400.jpeg",
  "https://www.ucos.be/wp-content/uploads/2025/01/Bio-photo.jpg",
  "https://www.ucos.be/wp-content/uploads/2025/12/WhatsApp-Image-2025-12-16-at-20.20.59-495x400.jpeg",
  "https://www.ucos.be/wp-content/uploads/2020/10/WeDecolonizeVUB-LOGO-1030x1030.jpg",
  "https://www.ucos.be/wp-content/uploads/2025/12/ines-495x400.jpg",
  "https://www.ucos.be/wp-content/uploads/2025/12/WhatsApp-Image-2025-12-16-at-20.03.05-1-495x400.jpeg"
];

const linkLabels: Record<Locale, { openPage: string }> = {
  nl: {
    openPage: "Open pagina →"
  },
  en: {
    openPage: "Open page →"
  },
  fr: {
    openPage: "Ouvrir la page →"
  }
};

export default function UcosEcosystemSection({ content, locale }: UcosEcosystemSectionProps) {
  const labels = linkLabels[locale];

  return (
    <SectionContainer id="ecosystem" className="relative py-24" ariaLabel="UCOS ecosystem">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-white/80 via-accent-50/50 to-white/75" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.65 }}
      >
        <SectionHeader
          eyebrow={content.eyebrow}
          title={content.title}
          description={content.description}
          centered
        />
      </motion.div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {content.items.map((item, index) => {
          const itemHref = `/${locale}/ecosystem/${item.slug}`;

          return (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, delay: index * 0.06 }}
              className="group overflow-hidden rounded-2xl border border-brand-200 bg-white/95 shadow-soft"
            >
              <Link href={itemHref} className="block relative h-52 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="object-cover transition duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-accent-900/65 via-accent-900/20 to-transparent" />
                <div className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-accent-700">
                  UCOS
                </div>
              </Link>
              <div className="p-5">
                <h3 className="text-xl font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.summary}</p>
                <Link
                  href={itemHref}
                  className="mt-4 inline-flex items-center text-sm font-semibold text-brand-700 transition hover:text-brand-800"
                >
                  {labels.openPage}
                </Link>
              </div>
            </motion.article>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.65, delay: 0.2 }}
        className="mt-10 overflow-hidden rounded-2xl border border-brand-200 bg-white/80 p-3"
      >
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 36, repeat: Infinity, repeatType: "loop", ease: "linear" }}
          className="flex w-max will-change-transform"
        >
          {[...highlightImages, ...highlightImages].map((image, index) => {
            return (
              <div
                key={`${image}-${index}`}
                className="relative mr-3 h-20 min-w-28 shrink-0 overflow-hidden rounded-lg sm:h-24 sm:min-w-36"
              >
                <Image src={image} alt="UCOS banner image" fill className="object-contain bg-white p-1" sizes="160px" />
              </div>
            );
          })}
        </motion.div>
      </motion.div>
    </SectionContainer>
  );
}
