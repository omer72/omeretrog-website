import ContactForm from "../components/contact/ContactForm";
import CalendlyEmbed from "../components/contact/CalendlyEmbed";

export default function ContactPage() {
  return (
    <section
      aria-labelledby="contact-heading"
      className="mx-auto max-w-6xl px-4 py-16 md:px-8"
    >
      <title>Contact | Get Your Site Modernized Today</title>
      <meta
        name="description"
        content="Ready to transform your outdated website? Contact Omer Etrog for a free consultation. Full migration in under an hour."
      />
      <link rel="canonical" href="https://omeretrog.com/contact" />

      <h1
        id="contact-heading"
        className="text-4xl font-bold md:text-5xl"
      >
        Get Started
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-text-muted">
        Ready to modernize your website? Reach out for a free consultation and
        see how fast the transformation can be.
      </p>

      <div className="mt-12 grid gap-12 lg:grid-cols-2">
        <div className="glass rounded-2xl p-6 md:p-8">
          <h2 className="mb-6 text-2xl font-semibold text-accent">Send a Message</h2>
          <ContactForm />
        </div>

        <div className="glass rounded-2xl p-6 md:p-8">
          <h2 className="mb-6 text-2xl font-semibold text-accent">Book a Call</h2>
          <CalendlyEmbed url="https://calendly.com/omer72/30min" />
        </div>
      </div>
    </section>
  );
}
