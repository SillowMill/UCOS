"use client";

import { motion } from "framer-motion";
import { Globe2, Handshake, Sparkles, Target } from "lucide-react";

type AboutStoryVisualProps = {
  slug: string;
};

const visualBySlug = {
  missie: {
    label: "Missie",
    Icon: Globe2,
    chipColor: "bg-white/95 text-brand-900"
  },
  visie: {
    label: "Visie",
    Icon: Handshake,
    chipColor: "bg-white/95 text-brand-900"
  },
  impact: {
    label: "Impact",
    Icon: Sparkles,
    chipColor: "bg-white/95 text-brand-900"
  }
} as const;

function MissionVisual() {
  return (
    <>
      <div className="absolute left-5 top-5 z-20 rounded-full bg-white/90 p-2.5 text-brand-800 shadow-lg">
        <Globe2 size={22} strokeWidth={2.1} aria-hidden="true" />
      </div>

      <motion.div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20"
        animate={{ rotate: -360 }}
        transition={{ duration: 44, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/75"
        animate={{ rotate: 360 }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full bg-white/90" />
        <div className="absolute -bottom-2 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-white/80" />
      </motion.div>
      <motion.div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/35"
        animate={{ rotate: -360 }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      />
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
          animate={{
            x: [0, Math.cos((i * Math.PI * 2) / 3) * 120, 0],
            y: [0, Math.sin((i * Math.PI * 2) / 3) * 120, 0],
            opacity: [0.2, 1, 0.2]
          }}
          transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
        />
      ))}
    </>
  );
}

function VisionVisual() {
  return (
    <div className="absolute inset-0">
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          aria-hidden="true"
          className="absolute left-1/2 h-px w-[135%] -translate-x-1/2 bg-gradient-to-r from-transparent via-white/90 to-transparent"
          style={{ top: `${24 + i * 15}%` }}
          animate={{ x: ["-12%", "12%", "-12%"] }}
          transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
      <motion.div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/75"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
      />
      {[0, 1].map((i) => (
        <motion.div
          key={i}
          aria-hidden="true"
          className="absolute top-1/2 h-24 w-24 -translate-y-1/2 rounded-full border border-white/40"
          style={{ left: i === 0 ? "18%" : "72%" }}
          animate={{ y: [0, -14, 0], opacity: [0.35, 0.9, 0.35] }}
          transition={{ duration: 4.5 + i, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

function ImpactVisual() {
  return (
    <>
      <motion.div
        className="absolute left-5 top-5 z-20 h-16 w-16 overflow-hidden rounded-full bg-white/90 p-2 shadow-lg sm:h-20 sm:w-20"
        animate={{ y: [0, -4, 0], rotate: [0, 6, 0] }}
        transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="flex h-full w-full items-center justify-center text-brand-800">
          <Target size={30} strokeWidth={2.2} aria-hidden="true" />
        </div>
      </motion.div>

      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/80"
          animate={{ scale: [1, 4.8, 1], opacity: [0.14, 0.22, 0.14] }}
          transition={{ duration: 9.5, repeat: Infinity, ease: "easeInOut", delay: i * 1.8 }}
        />
      ))}
      <motion.div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
        animate={{ scale: [1, 1.12, 1], opacity: [0.78, 0.9, 0.78] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
      />
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          aria-hidden="true"
          className="absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-white"
          animate={{
            x: [0, i % 2 === 0 ? 140 : -140, 0],
            y: [0, (i - 1.5) * 20, 0],
            opacity: [0.12, 0.22, 0.12]
          }}
          transition={{ duration: 7.2, repeat: Infinity, ease: "easeInOut", delay: i * 1 }}
          style={{ left: "50%" }}
        />
      ))}
    </>
  );
}

export default function AboutStoryVisual({ slug }: AboutStoryVisualProps) {
  const visual = visualBySlug[slug as keyof typeof visualBySlug] ?? visualBySlug.missie;
  const Icon = visual.Icon;
  const isVision = slug === "visie";
  const isImpact = slug === "impact";

  return (
    <div className="relative h-56 overflow-hidden sm:h-72">
      <div className="absolute inset-0 bg-brand-700" />

      {!isVision && !isImpact && <MissionVisual />}
      {isVision && <VisionVisual />}
      {isImpact && <ImpactVisual />}

      <motion.div className="absolute inset-0 z-30 flex items-center justify-center" animate={{ y: [0, -8, 0] }} transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}>
        <div className={`inline-flex items-center gap-2 rounded-full ${visual.chipColor} px-5 py-2 text-sm font-semibold shadow-lg`}>
          <Icon size={16} aria-hidden="true" />
          {visual.label}
        </div>
      </motion.div>
    </div>
  );
}
