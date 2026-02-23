"use client";

import { useState } from "react";

type CopyableInfoListProps = {
  items: Array<{ label: string; value: string }>;
  copyLabel: string;
  copiedLabel: string;
};

export default function CopyableInfoList({ items, copyLabel, copiedLabel }: CopyableInfoListProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = async (value: string, index: number) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedIndex(index);
      window.setTimeout(() => setCopiedIndex((current) => (current === index ? null : current)), 1200);
    } catch {
      setCopiedIndex(null);
    }
  };

  return (
    <div className="mt-3 grid gap-3 sm:grid-cols-2">
      {items.map((item, index) => (
        <div key={item.label} className="rounded-md bg-white px-3 py-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">{item.label}</p>
          <div className="mt-1 flex items-center justify-between gap-2">
            <p className="text-sm font-medium text-slate-800">{item.value}</p>
            <button
              type="button"
              onClick={() => handleCopy(item.value, index)}
              className="shrink-0 rounded-full border border-brand-300 px-2.5 py-1 text-xs font-semibold text-brand-800 transition hover:bg-brand-50"
            >
              {copiedIndex === index ? copiedLabel : copyLabel}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
