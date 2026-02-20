type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
  centered?: boolean;
  light?: boolean;
};

export default function SectionHeader({ eyebrow, title, description, centered, light }: SectionHeaderProps) {
  return (
    <header className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className={`mb-3 text-sm font-semibold uppercase tracking-[0.2em] ${light ? "text-accent-300" : "text-brand-700"}`}>{eyebrow}</p>
      <h2 className={`text-3xl font-bold leading-tight sm:text-4xl ${light ? "text-white" : "text-slate-900"}`}>{title}</h2>
      <p className={`mt-4 text-lg leading-relaxed ${light ? "text-slate-200" : "text-slate-600"}`}>{description}</p>
    </header>
  );
}
