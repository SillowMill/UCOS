import { ReactNode } from "react";

type SectionContainerProps = {
  id: string;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
};

export default function SectionContainer({ id, children, className, ariaLabel }: SectionContainerProps) {
  return (
    <section id={id} aria-label={ariaLabel} className={className}>
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">{children}</div>
    </section>
  );
}
