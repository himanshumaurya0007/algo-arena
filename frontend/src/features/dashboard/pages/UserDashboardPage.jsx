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
      'border-emerald-500/20 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.22),transparent_32%),#1f1f1f]',
  },
  {
    label: 'Current Streak',
    value: '9',
    helper: 'Days of practice',
    icon: '🔥',
    className:
      'border-orange-500/25 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.28),transparent_34%),#1f1f1f]',
  },
  {
    label: 'Articles Read',
    value: '14',
    helper: 'Concepts reviewed',
    icon: 'A',
    className:
      'border-sky-500/20 bg-[radial-gradient(circle_at_top_right,rgba(14,165,233,0.22),transparent_32%),#1f1f1f]',
  },
  {
    label: 'Videos Watched',
    value: '7',
    helper: 'Guided lessons',
    icon: '▶',
    className:
      'border-violet-500/20 bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.24),transparent_32%),#1f1f1f]',
  },
];

const problems = [
  {
    title: 'Target Strike',
    slug: 'target-strike',
    difficulty: 'Easy',
  },
  {
    title: 'Mirror Word',
    slug: 'mirror-word',
    difficulty: 'Easy',
  },
  {
    title: 'Longest Clean Segment',
    slug: 'longest-clean-segment',
    difficulty: 'Medium',
  },
  {
    title: 'Product Trail',
    slug: 'product-trail',
    difficulty: 'Medium',
  },
  {
    title: 'Water Wall Collector',
    slug: 'water-wall-collector',
    difficulty: 'Hard',
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
  return (
    <motion.div
      animate="visible"
      className="mx-auto max-w-7xl space-y-6"
      initial="hidden"
      variants={staggerContainer}
    >
      <motion.section
        className="rounded-lg border border-[#2f2f2f] bg-[#1f1f1f] p-6"
        transition={{ duration: 0.2 }}
        variants={fadeUp}
        whileHover={{ y: -3, borderColor: '#3f3f3f' }}
      >
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
          <div>
            <p className="text-sm font-semibold text-[#ffa116]">Welcome back</p>

            <h1 className="mt-2 text-3xl font-extrabold text-white">
              Keep your coding streak alive.
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-400">
              Continue solving DSA problems, revise concepts through articles,
              and use video resources whenever you need a clearer explanation.
            </p>
          </div>

          <Link
            className="rounded-md bg-[#ffa116] px-5 py-3 text-sm font-bold text-[#141414] transition hover:bg-[#ffb84d]"
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
            <Card
              className={`relative overflow-hidden text-white ${stat.className}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-gray-400">{stat.label}</p>

                  <p className="mt-3 text-3xl font-extrabold text-white">
                    {stat.value}
                  </p>

                  <p className="mt-2 text-sm text-gray-500">{stat.helper}</p>
                </div>

                <span className="flex size-10 items-center justify-center rounded-md bg-white/10 text-lg font-bold text-white">
                  {stat.icon}
                </span>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.section>

      <motion.section
        className="rounded-lg border border-[#2f2f2f] bg-[#1f1f1f]"
        transition={{ duration: 0.35 }}
        variants={fadeUp}
      >
        <div className="border-b border-[#2f2f2f] px-5 py-4">
          <h2 className="text-xl font-bold text-white">Recommended Problems</h2>

          <p className="mt-1 text-sm text-gray-400">
            Pick a problem, open its learning material, then jump into solving.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left">
            <thead className="border-b border-[#2f2f2f] text-sm text-gray-400">
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
                  className="border-b border-[#2f2f2f] transition last:border-b-0 hover:bg-[#262626]"
                  key={problem.slug}
                  transition={{ duration: 0.18 }}
                  variants={fadeUp}
                  whileHover={{ x: 4 }}
                >
                  <td className="px-5 py-4">
                    <Link
                      className="font-semibold text-white transition hover:text-[#ffa116]"
                      to={`/user/problems/${problem.slug}`}
                    >
                      {problem.title}
                    </Link>
                  </td>

                  <td className="px-5 py-4">
                    <Badge variant={difficultyVariant[problem.difficulty]}>
                      {problem.difficulty}
                    </Badge>
                  </td>

                  <td className="px-5 py-4">
                    <Link
                      className="text-sm font-semibold text-[#ffa116] hover:underline"
                      to={`/user/articles/${problem.slug}`}
                    >
                      Read Article
                    </Link>
                  </td>

                  <td className="px-5 py-4">
                    <Link
                      className="text-sm font-semibold text-[#4ade80] hover:underline"
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
