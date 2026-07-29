import Button from '../../../shared/ui/Button';
import Card from '../../../shared/ui/Card';

const contactReasons = [
  {
    title: 'Project Feedback',
    description:
      'Share suggestions about platform features, usability, or learning flow.',
  },
  {
    title: 'Collaboration',
    description:
      'Connect with the team for academic collaboration or feature discussions.',
  },
  {
    title: 'Support',
    description:
      'Report issues related to login, dashboard, problems, or submissions.',
  },
];

function ContactPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <section className="mb-10 max-w-3xl space-y-4">
        <p className="caption font-semibold uppercase">Contact</p>

        <h1 className="heading-lg">Get in touch with the AlgoArena team.</h1>

        <p className="body text-text-muted">
          Have feedback, questions, or ideas for improving the platform? Use the
          contact form below and the team can review your message.
        </p>
      </section>

      <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="grid gap-4">
          {contactReasons.map((reason) => (
            <Card className="space-y-2" key={reason.title}>
              <h2 className="heading-sm">{reason.title}</h2>
              <p className="body text-text-muted">{reason.description}</p>
            </Card>
          ))}
        </div>

        <Card>
          <form className="space-y-4">
            <label className="block space-y-2">
              <span className="text-sm font-semibold">Name</span>
              <input
                className="border-border bg-background focus:border-primary min-h-11 w-full rounded-md border px-4 outline-none"
                placeholder="Enter your name"
                type="text"
              />
            </label>

            <label className="block space-y-2">
              <span className="text-sm font-semibold">Email</span>
              <input
                className="border-border bg-background focus:border-primary min-h-11 w-full rounded-md border px-4 outline-none"
                placeholder="you@example.com"
                type="email"
              />
            </label>

            <label className="block space-y-2">
              <span className="text-sm font-semibold">Message</span>
              <textarea
                className="border-border bg-background focus:border-primary min-h-32 w-full resize-none rounded-md border px-4 py-3 outline-none"
                placeholder="Write your message"
              />
            </label>

            <Button className="w-full" type="submit">
              Send Message
            </Button>
          </form>
        </Card>
      </section>
    </main>
  );
}

export default ContactPage;
