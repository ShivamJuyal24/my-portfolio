import { Navbar } from "./navbar";
import { Footer } from "./footer";
export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto min-h-screen max-w-[1000px] px-6 md:px-12">
      <Navbar />
      <main className="space-y-[var(--section-spacing)] pb-[var(--section-spacing)]">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export function SectionHeader({
  number,
  title,
}: {
  number: string;
  title: string;
}) {
  return (
    <header className="mb-6 md:mb-8">
      <p className="type-meta uppercase tracking-[0.08em]">
        {number} / {title}
      </p>
      <h2 className="type-section mt-2">{title}</h2>
    </header>
  );
}

export function Section({
  title,
  number,
  children,
  id,
}: {
  title: string;
  number: string;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <SectionHeader number={number} title={title} />
      {children}
    </section>
  );
}
