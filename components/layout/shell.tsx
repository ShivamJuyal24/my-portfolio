import { Navbar } from "./navbar";
import { Footer } from "./footer";
export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto min-h-screen max-w-3xl border-x border-border">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}

export function Divider() {
  return <div aria-hidden className="h-6 border-y border-dashed border-border" />;
}

export function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="border-b border-border px-4 py-3 text-2xl font-medium">
        {title}
      </h2>
      <div className="p-4">{children}</div>
    </section>
  );
}