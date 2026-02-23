"use client";

import { motion } from "framer-motion";
import { PhoneCall } from "lucide-react";
import Image from "next/image";

export default function ContactHeroVisual() {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <Image
        src="https://www.ucos.be/wp-content/uploads/2024/06/UCOS_CHANGE_MIETTE-63-1500x430.jpg"
        alt="UCOS contact"
        fill
        className="object-cover"
        priority
      />

      <motion.div
        className="absolute left-6 top-6 rounded-full border border-white/30 bg-white/10 p-3 text-white"
        animate={{ y: [0, 6, 0], opacity: [0.65, 1, 0.65] }}
        transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut" }}
      >
        <PhoneCall size={18} aria-hidden="true" />
      </motion.div>

    </div>
  );
}
