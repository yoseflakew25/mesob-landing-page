import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { GovernmentCatalogue } from "@/components/landing/government-catalogue";

export const metadata: Metadata = {
  title: "Services – MESOB Center | Government Service Catalogue",
  description:
    "Browse Ethiopian government organizations and agencies available at MESOB Center. Access ministries, authorities, commissions, and public services under one roof.",
  openGraph: {
    title: "Services – MESOB Center | Government Service Catalogue",
    description:
      "Browse Ethiopian government organizations and agencies at MESOB Center.",
  },
};

export default function ServicesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <GovernmentCatalogue />
      </main>
      <Footer />
    </div>
  );
}
