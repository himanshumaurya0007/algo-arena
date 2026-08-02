import { Link } from 'react-router-dom';
import Badge from '../../../shared/ui/Badge';
import Card from '../../../shared/ui/Card';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { getPublishedProblems } from '../../problems/api/problemsApi';

const dashboardActions = [
  {
    label: 'Practice Problems',
    value: 'Start solving',
    helper: 'Browse the full problem library and open any challenge.',
    icon: '✓',
    path: '/user/problems',
    className:
      'border-emerald-500/20 bg-gradient-to-br from-emerald-500/25 to-[#1f1f1f]',
  },
  {
    label: 'Read Articles',
    value: 'Revise concepts',
    helper: 'Study explanations connected with each problem.',
    icon: 'A',
    path: '/user/articles',
    className:
      'border-sky-500/20 bg-gradient-to-br from-sky-500/25 to-[#1f1f1f]',
  },
  {
    label: 'Watch Videos',
    value: 'Learn visually',
    helper: 'Watch guided walkthroughs without leaving AlgoArena.',
    icon: '▶',
    path: '/user/videos',
    className:
      'border-violet-500/20 bg-gradient-to-br from-violet-500/25 to-[#1f1f1f]',
  },
  {
    label: 'Profile',
    value: 'Update details',
    helper: 'Keep your learning profile and links ready.',
    icon: 'U',
    path: '/user/profile',
    className:
      'border-orange-500/25 bg-gradient-to-br from-orange-500/30 to-[#1f1f1f]',
  },
];

const difficultyVariant = {
  Easy: 'success',
  Medium: 'warning',
  Hard: 'danger',
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};
function UserDashboardPage() {
  const [problems, setProblems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const recommendedProblems = problems.slice(0, 8);

  useEffect(() => {
    async function loadProblems() {
      try {
        const data = await getPublishedProblems();
        setProblems(data);
      } catch {
        setError('Unable to load problems right now.');
      } finally {
        setIsLoading(false);
      }
    }

    loadProblems();
  }, []);
  return (
    <motion.div
      animate="visible"
      className="mx-auto max-w-7xl space-y-6"
      initial="hidden"
      variants={staggerContainer}
    >
      <motion.section
        className="border-border bg-surface rounded-lg border p-6 shadow-sm"
        transition={{ duration: 0.2 }}
        variants={fadeUp}
        whileHover={{ y: -3 }}
      >
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
          <div>
            <p className="text-primary text-sm font-semibold">Welcome back</p>

            <h1 className="text-text mt-2 text-3xl font-extrabold">
              Keep your coding streak alive.
            </h1>

            <p className="text-text-muted mt-3 max-w-2xl text-sm leading-6">
              Continue solving DSA problems, revise concepts through articles,
              and use video resources whenever you need a clearer explanation.
            </p>
          </div>

          <Link
            className="bg-primary rounded-md px-5 py-3 text-sm font-bold text-white transition hover:opacity-90"
            to="/user/problems"
          >
            Start Practice
          </Link>
        </div>
      </motion.section>

      <motion.section
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
        variants={staggerContainer}
      >
        {dashboardActions.map((action) => (
          <motion.div
            key={action.label}
            transition={{ duration: 0.2 }}
            variants={fadeUp}
            whileHover={{ y: -5, scale: 1.02 }}
          >
            <Link to={action.path}>
              <Card
                className={`relative h-full overflow-hidden ${action.className}`}
              >
                <div className="flex h-full items-start justify-between gap-4">
                  <div>
                    <p className="text-text-muted text-sm">{action.label}</p>

                    <p className="text-text mt-3 text-2xl font-extrabold">
                      {action.value}
                    </p>

                    <p className="text-text-muted mt-2 text-sm">
                      {action.helper}
                    </p>
                  </div>

                  <span className="bg-primary/10 text-primary flex size-10 items-center justify-center rounded-md text-lg font-bold">
                    {action.icon}
                  </span>
                </div>
              </Card>
            </Link>
          </motion.div>
        ))}
      </motion.section>

      <motion.section
        className="border-border bg-surface rounded-lg border shadow-sm"
        transition={{ duration: 0.35 }}
        variants={fadeUp}
      >
        <div className="border-border border-b px-5 py-4">
          <h2 className="text-text text-xl font-bold">Recommended Problems</h2>

          <p className="text-text-muted mt-1 text-sm">
            Pick a problem, open its learning material, then jump into solving.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left">
            <thead className="border-border text-text-muted border-b text-sm">
              <tr>
                <th className="px-5 py-4 font-semibold">Problem</th>
                <th className="px-5 py-4 font-semibold">Difficulty</th>
                <th className="px-5 py-4 font-semibold">Article</th>
                <th className="px-5 py-4 font-semibold">Video</th>
              </tr>
            </thead>

            <tbody>
              {isLoading && (
                <tr>
                  <td
                    className="text-text-muted px-5 py-6 text-center"
                    colSpan="4"
                  >
                    Loading problems...
                  </td>
                </tr>
              )}

              {!isLoading && error && (
                <tr>
                  <td
                    className="px-5 py-6 text-center text-red-500"
                    colSpan="4"
                  >
                    {error}
                  </td>
                </tr>
              )}

              {!isLoading && !error && problems.length === 0 && (
                <tr>
                  <td
                    className="text-text-muted px-5 py-6 text-center"
                    colSpan="4"
                  >
                    No published problems found.
                  </td>
                </tr>
              )}

              {!isLoading &&
                !error &&
                recommendedProblems.map((problem) => (
                  <motion.tr
                    className="border-border hover:bg-background border-b transition last:border-b-0"
                    key={problem.id}
                    transition={{ duration: 0.18 }}
                    variants={fadeUp}
                    whileHover={{ x: 4 }}
                  >
                    <td className="px-5 py-4">
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <Link
                            className="text-text hover:text-primary font-semibold transition"
                            to={`/user/problems/${problem.slug}`}
                          >
                            {problem.title}
                          </Link>

                          <Badge variant="muted">
                            {problem.isPublished ? 'Published' : 'Draft'}
                          </Badge>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <span className="bg-background text-text-muted rounded-full px-2.5 py-1 text-xs font-medium">
                            {problem.programmingDomainName}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <Badge
                        variant={difficultyVariant[problem.difficultyLevelName]}
                      >
                        {problem.difficultyLevelName}
                      </Badge>
                    </td>

                    <td className="px-5 py-4">
                      <Link
                        className="text-primary text-sm font-semibold hover:underline"
                        state={{
                          backLabel: 'Back to dashboard',
                          backTo: '/user/dashboard',
                        }}
                        to={`/user/articles/${problem.slug}`}
                      >
                        Read Article
                      </Link>
                    </td>

                    <td className="px-5 py-4">
                      <Link
                        className="text-secondary text-sm font-semibold hover:underline"
                        state={{
                          from: '/user/dashboard',
                        }}
                        to={`/user/videos/${problem.slug}`}
                      >
                        Watch Video
                      </Link>
                    </td>
                  </motion.tr>
                ))}
            </tbody>
          </table>
        </div>
      </motion.section>
    </motion.div>
  );
}

export default UserDashboardPage;
