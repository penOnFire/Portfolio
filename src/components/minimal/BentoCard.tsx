import type { ReactNode } from "react";

type BentoCardProps = {
  children: ReactNode;
  className?: string;
  title?: string;
};

export default function BentoCard({ children, className = "", title }: BentoCardProps) {
  return (
    <section className={`rounded-2xl border border-neutral-200 bg-white p-5 md:p-6 dark:border-neutral-800 dark:bg-neutral-900/50 ${className}`}>
      {title && (
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
          {title}
        </h2>
      )}
      {children}
    </section>
  );
}
