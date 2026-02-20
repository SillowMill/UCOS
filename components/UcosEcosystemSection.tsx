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
  "https://www.ucos.be/wp-content/uploads/2024/04/Ontwerp-zonder-titel-10-300x300.png",
  "https://www.ucos.be/wp-content/uploads/2020/10/WeDecolonizeVUB-LOGO-1030x1030.jpg",
  "https://www.ucos.be/wp-content/uploads/2020/10/ezgif.com-video-to-gif.gif",
  "https://www.ucos.be/wp-content/uploads/2023/11/Campagnebeeld-zonder-sponsors-705x705.png",
  "https://www.ucos.be/wp-content/uploads/2025/12/ines-495x400.jpg",
  "https://www.ucos.be/wp-content/uploads/2025/12/WhatsApp-Image-2025-12-16-at-20.03.05-1-495x400.jpeg",
  "https://www.ucos.be/wp-content/uploads/2025/01/Bio-photo.jpg",
  "https://www.ucos.be/wp-content/uploads/2025/12/WhatsApp-Image-2025-12-16-at-20.20.59-495x400.jpeg"
];

export default function UcosEcosystemSection({ content, locale }: UcosEcosystemSectionProps) {
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
        {content.items.map((item, index) => (
          <motion.article
            key={item.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, delay: index * 0.06 }}
            className="group overflow-hidden rounded-2xl border border-accent-100 bg-white/95 shadow-soft"
          >
            <div className="relative h-52 overflow-hidden">
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
            </div>
            <div className="p-5">
              <h3 className="text-xl font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.summary}</p>
              <Link
                href={`/${locale}/ecosystem/${item.slug}`}
                className="mt-4 inline-flex items-center text-sm font-semibold text-accent-700 transition hover:text-brand-600"
              >
                Open pagina -&gt;
              </Link>
            </div>
          </motion.article>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.65, delay: 0.2 }}
        className="mt-10 overflow-hidden rounded-2xl border border-accent-100 bg-white/80 p-3"
      >
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
          className="flex w-[200%] gap-3"
        >
          {[...highlightImages, ...highlightImages].map((image, index) => (
            <div key={`${image}-${index}`} className="relative h-24 min-w-32 overflow-hidden rounded-brand sm:h-28 sm:min-w-40">
              <Image src={image} alt="UCOS visual" fill className="object-contain bg-white p-1" sizes="160px" />
            </div>
          ))}
        </motion.div>
      </motion.div>
    </SectionContainer>
  );
}
