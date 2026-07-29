import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ContactForm } from "@/components/landing/contact-form";

export const metadata: Metadata = {
  title: "Contact Us – MESOB Center | Get in Touch",
  description:
    "Have a question, feedback, or need assistance? Get in touch with MESOB Center and our team will get back to you within 1–2 business days.",
  openGraph: {
    title: "Contact Us – MESOB Center | Get in Touch",
    description:
      "Get in touch with MESOB Center for questions, feedback, or assistance.",
  },
};

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
