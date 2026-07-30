import { Link } from 'react-router-dom';
import Badge from '../../../shared/ui/Badge';
import Card from '../../../shared/ui/Card';
import { motion } from 'framer-motion';

const stats = [
  {
    label: 'Problems Solved',
    value: '36',
    helper: 'Across all topics',
    icon: '✓',
    className:
      'border-emerald-500/20 bg-gradient-to-br from-emerald-500/25 to-[#1f1f1f]',
  },
  {
    label: 'Current Streak',
    value: '9',
    helper: 'Days of practice',
    icon: '🔥',
    className:
      'border-orange-500/25 bg-gradient-to-br from-orange-500/30 to-[#1f1f1f]',
  },
  {
    label: 'Articles Read',
    value: '14',
    helper: 'Concepts reviewed',
    icon: 'A',
    className:
      'border-sky-500/20 bg-gradient-to-br from-sky-500/25 to-[#1f1f1f]',
  },
  {
    label: 'Videos Watched',
    value: '7',
    helper: 'Guided lessons',
    icon: '▶',
    className:
      'border-violet-500/20 bg-gradient-to-br from-violet-500/25 to-[#1f1f1f]',
  },
];

const problems = [
  {
    title: 'Target Strike',
    slug: 'target-strike',
    difficulty: 'Easy',
    topics: ['Array', 'Hash Map'],
    status: 'Unsolved',
  },
  {
    title: 'Mirror Word',
    slug: 'mirror-word',
    difficulty: 'Easy',
    topics: ['String', 'Two Pointers'],
    status: 'Solved',
  },
  {
    title: 'Longest Clean Segment',
    slug: 'longest-clean-segment',
    difficulty: 'Medium',
    topics: ['Sliding Window', 'Hash Set'],
    status: 'Attempted',
  },
  {
    title: 'Product Trail',
    slug: 'product-trail',
    difficulty: 'Medium',
    topics: ['Array', 'Prefix Product'],
    status: 'Unsolved',
  },
  {
    title: 'Water Wall Collector',
    slug: 'water-wall-collector',
    difficulty: 'Hard',
    topics: ['Two Pointers', 'Greedy'],
    status: 'Unsolved',
  },
];

const difficultyVariant = {
  Easy: 'success',
  Medium: 'warning',
  Hard: 'danger',
};

const statusVariant = {
  Solved: 'success',
  Attempted: 'warning',
  Unsolved: 'muted',
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
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            transition={{ duration: 0.2 }}
            variants={fadeUp}
            whileHover={{ y: -5, scale: 1.02 }}
          >
            <Card className={`relative overflow-hidden ${stat.className}`}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-text-muted text-sm">{stat.label}</p>

                  <p className="text-text mt-3 text-3xl font-extrabold">
                    {stat.value}
                  </p>

                  <p className="text-text-muted mt-2 text-sm">{stat.helper}</p>
                </div>

                <span className="bg-primary/10 text-primary flex size-10 items-center justify-center rounded-md text-lg font-bold">
                  {stat.icon}
                </span>
              </div>
            </Card>
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
              {problems.map((problem) => (
                <motion.tr
                  className="border-border transition last:border-b-0 hover:bg-background border-b"
                  key={problem.slug}
                  transition={{ duration: 0.18 }}
                  variants={fadeUp}
                  whileHover={{ x: 4 }}
                >
                  <td className="px-5 py-4">
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <Link
                          className="text-text hover:text-primary font-semibold transition"
                          to="/editor"
                        >
                          {problem.title}
                        </Link>

                        <Badge variant={statusVariant[problem.status]}>
                          {problem.status}
                        </Badge>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {problem.topics.map((topic) => (
                          <span
                            className="bg-background text-text-muted rounded-full px-2.5 py-1 text-xs font-medium"
                            key={`${problem.slug}-${topic}`}
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <Badge variant={difficultyVariant[problem.difficulty]}>
                      {problem.difficulty}
                    </Badge>
                  </td>

                  <td className="px-5 py-4">
                    <Link
                      className="text-primary text-sm font-semibold hover:underline"
                      to={`/user/articles/${problem.slug}`}
                    >
                      Read Article
                    </Link>
                  </td>

                  <td className="px-5 py-4">
                    <Link
                      className="text-secondary text-sm font-semibold hover:underline"
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
