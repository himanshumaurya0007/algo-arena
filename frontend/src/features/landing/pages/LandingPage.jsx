import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Badge from '../../../shared/ui/Badge';
import Button from '../../../shared/ui/Button';
import Card from '../../../shared/ui/Card';

const features = [
  {
    title: 'Practice Problems',
    description:
      'Solve DSA problems by difficulty, topic, and interview pattern.',
  },
  {
    title: 'Learn Concepts',
    description:
      'Read articles and learning notes connected with each problem topic.',
  },
  {
    title: 'Track Progress',
    description:
      'Review solved problems, recent submissions, streaks, and topic coverage.',
  },
];

const steps = [
  'Login to your account',
  'Choose a topic or problem',
  'Write and submit code',
  'Improve with feedback',
];

const topics = [
  'Arrays',
  'Strings',
  'Hashing',
  'Linked List',
  'Trees',
  'Graphs',
  'Dynamic Programming',
  'SQL',
];

const submissions = [
  { problem: 'Two Sum', status: 'Accepted', language: 'JavaScript' },
  { problem: 'Binary Search', status: 'Accepted', language: 'Java' },
  { problem: 'Graph Paths', status: 'Wrong Answer', language: 'C++' },
];

function LandingPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:py-12">
      <motion.section
        animate={{ opacity: 1, y: 0 }}
        className="border-border bg-surface shadow-card grid gap-8 rounded-lg border px-4 py-8 sm:px-6 sm:py-10 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:gap-10 lg:px-10"
        initial={{ opacity: 0, y: 24 }}
        transition={{ duration: 0.5 }}
      >
        <div className="space-y-6">
          <Badge>For students and early professionals</Badge>

          <div className="space-y-4">
            <h1 className="font-heading text-primary text-3xl leading-tight font-extrabold sm:text-4xl lg:text-6xl">
              Sharpen your coding skills with structured DSA practice.
            </h1>

            <p className="body text-text-muted max-w-2xl">
              Solve topic-wise problems, learn concepts through articles, and
              track every submission from one focused coding practice platform.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            <Link className="sm:w-auto" to="/login">
              <Button className="w-full sm:w-auto">Start Practicing</Button>
            </Link>

            <Link className="sm:w-auto" to="/about">
              <Button className="w-full sm:w-auto" variant="outline">
                Explore Platform
              </Button>
            </Link>
          </div>

          <div className="grid max-w-xl grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <p className="font-heading text-secondary text-2xl font-extrabold">
                120+
              </p>
              <p className="caption">Practice problems</p>
            </div>

            <div>
              <p className="font-heading text-secondary text-2xl font-extrabold">
                25+
              </p>
              <p className="caption">DSA topics</p>
            </div>

            <div>
              <p className="font-heading text-secondary text-2xl font-extrabold">
                24/7
              </p>
              <p className="caption">Progress tracking</p>
            </div>
          </div>
        </div>

        <motion.div
          className="border-border bg-text text-surface shadow-card min-w-0 rounded-lg border p-4 sm:p-5"
          transition={{ type: 'spring', stiffness: 220 }}
          whileHover={{ y: -6 }}
        >
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-white/60">Today&apos;s challenge</p>
              <h2 className="font-heading text-2xl font-bold text-white">
                Two Sum
              </h2>
            </div>

            <Badge variant="success">Easy</Badge>
          </div>

          <div className="mb-4 flex flex-wrap gap-2">
            <span className="rounded bg-white/10 px-3 py-1 text-xs">Array</span>
            <span className="rounded bg-white/10 px-3 py-1 text-xs">
              Hash Map
            </span>
            <span className="rounded bg-white/10 px-3 py-1 text-xs">
              Interview
            </span>
          </div>

          <pre className="code max-w-full overflow-x-auto rounded-md bg-black/30 p-3 text-xs text-white sm:p-4 sm:text-sm">
            {`function twoSum(nums, target) {
  const seen = new Map();

  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];

    if (seen.has(need)) {
      return [seen.get(need), i];
    }

    seen.set(nums[i], i);
  }
}`}
          </pre>

          <div className="mt-4 grid grid-cols-1 gap-3 text-center text-sm sm:grid-cols-3">
            <div className="rounded-md bg-white/10 p-3">
              <p className="font-bold text-white">78%</p>
              <p className="text-white/60">Acceptance</p>
            </div>

            <div className="rounded-md bg-white/10 p-3">
              <p className="font-bold text-white">12k</p>
              <p className="text-white/60">Solves</p>
            </div>

            <div className="rounded-md bg-white/10 p-3">
              <p className="font-bold text-white">15m</p>
              <p className="text-white/60">Average</p>
            </div>
          </div>
        </motion.div>
      </motion.section>

      <section className="mt-10 grid gap-4 sm:mt-14 md:grid-cols-3">
        {features.map((feature) => (
          <Card className="space-y-3" key={feature.title}>
            <h2 className="heading-sm">{feature.title}</h2>
            <p className="body text-text-muted">{feature.description}</p>
          </Card>
        ))}
      </section>

      <section className="mt-10 sm:mt-14">
        <div className="mb-6">
          <h2 className="heading-md">How AlgoArena works</h2>
          <p className="body text-text-muted mt-2">
            A simple practice flow designed to help you build consistency.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <Card className="space-y-3" key={step}>
              <span className="bg-primary font-heading flex size-10 items-center justify-center rounded-md font-bold text-white">
                {index + 1}
              </span>
              <p className="font-semibold">{step}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-10 sm:mt-14">
        <div className="mb-6">
          <h2 className="heading-md">Practice by topic</h2>
          <p className="body text-text-muted mt-2">
            Build confidence across the most important coding interview areas.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {topics.map((topic) => (
            <motion.div
              key={topic}
              transition={{ type: 'spring', stiffness: 300 }}
              whileHover={{ y: -4 }}
            >
              <Badge className="px-4 py-2" variant="muted">
                {topic}
              </Badge>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mt-10 grid gap-6 sm:mt-14 lg:grid-cols-[0.9fr_1.1fr]">
        <Card className="space-y-5">
          <div>
            <p className="caption">Progress preview</p>
            <h2 className="heading-md mt-1">Know where you stand</h2>
          </div>

          <div className="space-y-4">
            <div>
              <div className="mb-2 flex justify-between text-sm font-semibold">
                <span>Arrays</span>
                <span>72%</span>
              </div>
              <div className="bg-border h-3 rounded-full">
                <div className="bg-primary h-3 w-[72%] rounded-full" />
              </div>
            </div>

            <div>
              <div className="mb-2 flex justify-between text-sm font-semibold">
                <span>Dynamic Programming</span>
                <span>38%</span>
              </div>
              <div className="bg-border h-3 rounded-full">
                <div className="bg-secondary h-3 w-[38%] rounded-full" />
              </div>
            </div>

            <div>
              <div className="mb-2 flex justify-between text-sm font-semibold">
                <span>Graphs</span>
                <span>54%</span>
              </div>
              <div className="bg-border h-3 rounded-full">
                <div className="bg-info h-3 w-[54%] rounded-full" />
              </div>
            </div>
          </div>
        </Card>

        <Card className="space-y-5">
          <div>
            <p className="caption">Recent submissions</p>
            <h2 className="heading-md mt-1">Review every attempt</h2>
          </div>

          <div className="space-y-3">
            {submissions.map((submission) => (
              <div
                className="border-border flex flex-col gap-3 rounded-md border px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
                key={submission.problem}
              >
                <div>
                  <p className="font-semibold">{submission.problem}</p>
                  <p className="caption">{submission.language}</p>
                </div>

                <Badge
                  variant={
                    submission.status === 'Accepted' ? 'success' : 'danger'
                  }
                >
                  {submission.status}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section className="bg-primary mt-10 rounded-lg px-4 py-8 text-center text-white sm:mt-14 sm:px-6 sm:py-10">
        <h2 className="font-heading text-2xl font-extrabold sm:text-3xl">
          Ready to enter the arena?
        </h2>

        <p className="body mx-auto mt-3 max-w-2xl text-white/85">
          Start with a topic, solve your first problem, and let every submission
          show your progress.
        </p>

        <div className="mt-6">
          <Link to="/login">
            <Button variant="secondary">Start Practicing</Button>
          </Link>
        </div>
      </section>
    </main>
  );
}

export default LandingPage;
