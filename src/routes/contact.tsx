import { createFileRoute } from "@tanstack/react-router";
import { BriefcaseBusiness, Mail, MapPin, Phone } from "lucide-react";

import { SiteFooter, SiteHeader } from "@/components/SiteHeader";
import contactBackground from "@/assets/hassan-mageye-coming-soon.avif.asset.json";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact | Mageye" },
      {
        name: "description",
        content:
          "Get in touch with Mageye to plan a wedding film, brand video, event coverage or documentary.",
      },
      { property: "og:title", content: "Contact | Mageye" },
      {
        property: "og:description",
        content: "Have a story to tell? Let’s create something that matters.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

const details = [
  { icon: Mail, label: "Email", value: "mageyeglobalworks@gmail.com", href: "mailto:mageyeglobalworks@gmail.com" },
  { icon: Phone, label: "Phone", value: "+61 400 000 000", href: "tel:+61400000000" },
  { icon: MapPin, label: "Based in", value: "California, USA · Available worldwide" },
];

function ContactPage() {
  return (
    <main>
      <SiteHeader />

      <section
        className="contact-section"
        id="contact"
        style={{ "--contact-bg": `url(${contactBackground.url})` } as React.CSSProperties}
      >
        <BriefcaseBusiness size={28} strokeWidth={1.3} aria-hidden="true" />
        <p className="eyebrow">Contact us</p>
        <h1>Let’s create something<br />that matters.</h1>
        <a className="button button-light-on-dark" href="mailto:mageyeglobalworks@gmail.com">Send an email</a>
      </section>

      <section className="awards-section" aria-labelledby="contact-details-title">
        <p className="eyebrow">Get in touch</p>
        <h2 id="contact-details-title">Contact details</h2>
        <div className="awards-grid">
          {details.map(({ icon: Icon, label, value, href }) => (
            <article className="award" key={label}>
              <Icon size={26} strokeWidth={1.3} aria-hidden="true" />
              <strong>{label}</strong>
              {href ? <a href={href}>{value}</a> : <span>{value}</span>}
            </article>
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
