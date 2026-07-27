import Card from '../../../shared/ui/Card';

const highlights = [
  {
    title: 'Practice with purpose',
    description:
      'Solve coding problems by topic, difficulty, and interview pattern so every session has a clear direction.',
  },
  {
    title: 'Learn while solving',
    description:
      'Use articles, blogs, and video resources to understand the concepts behind each problem.',
  },
  {
    title: 'Track real progress',
    description:
      'Follow solved problems, submissions, streaks, and topic coverage from a focused user dashboard.',
  },
];

const modules = [
  'Coding problems',
  'Topic-wise practice',
  'Articles and blogs',
  'Video resources',
  'Submission history',
  'Progress dashboard',
];

function AboutPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <section className="grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-start">
        <div className="space-y-5">
          <p className="caption font-semibold uppercase">About AlgoArena</p>

          <h1 className="heading-lg">
            A coding practice platform built for consistent DSA preparation.
          </h1>

          <p className="body text-text-muted max-w-3xl">
            AlgoArena is designed for students and early professionals who want
            a structured place to practice coding, strengthen problem-solving
            skills, and prepare for technical interviews. The platform combines
            problems, learning resources, blogs, and progress tracking into one
            developer-friendly workspace.
          </p>

          <p className="body text-text-muted max-w-3xl">
            The goal is simple: help learners move from random practice to
            focused improvement. Users can choose topics, solve problems, read
            related explanations, submit code, and monitor their growth over
            time.
          </p>
        </div>

        <Card className="space-y-4">
          <h2 className="heading-sm">Platform Modules</h2>

          <div className="grid gap-3 sm:grid-cols-2">
            {modules.map((module) => (
              <div
                className="border-border rounded-md border px-4 py-3 text-sm font-semibold"
                key={module}
              >
                {module}
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section className="mt-14 grid gap-4 md:grid-cols-3">
        {highlights.map((item) => (
          <Card className="space-y-3" key={item.title}>
            <h2 className="heading-sm">{item.title}</h2>
            <p className="body text-text-muted">{item.description}</p>
          </Card>
        ))}
      </section>
    </main>
  );
}

export default AboutPage;
