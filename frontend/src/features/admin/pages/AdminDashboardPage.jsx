import { motion } from 'framer-motion';
import Badge from '../../../shared/ui/Badge';
import Card from '../../../shared/ui/Card';
import { Link } from 'react-router-dom';

const stats = [
  {
    label: 'Total Problems',
    value: '128',
    helper: 'Across 14 topics',
    accent: 'from-sky-500/25',
  },
  {
    label: 'Active Users',
    value: '1,842',
    helper: 'Practiced this month',
    accent: 'from-emerald-500/25',
  },
  {
    label: 'Submissions',
    value: '24.6k',
    helper: 'Total code attempts',
    accent: 'from-violet-500/25',
  },
  {
    label: 'Pending Reviews',
    value: '18',
    helper: 'Content checks needed',
    accent: 'from-amber-500/25',
  },
];

const recentSubmissions = [
  {
    user: 'Aarav Sharma',
    problem: 'Target Strike',
    language: 'Java',
    result: 'Accepted',
    time: '2 min ago',
  },
  {
    user: 'Neha Patil',
    problem: 'Water Wall Collector',
    language: 'C++',
    result: 'Wrong Answer',
    time: '9 min ago',
  },
  {
    user: 'Rohan Verma',
    problem: 'Product Trail',
    language: 'JavaScript',
    result: 'Accepted',
    time: '14 min ago',
  },
  {
    user: 'Isha Mehta',
    problem: 'Longest Clean Segment',
    language: 'Python',
    result: 'Runtime Error',
    time: '22 min ago',
  },
];

const contentQueue = [
  {
    title: 'Graph Paths',
    type: 'Problem',
    status: 'Draft',
    owner: 'Content Team',
  },
  {
    title: 'Sliding Window Basics',
    type: 'Article',
    status: 'Review',
    owner: 'Learning Team',
  },
  {
    title: 'Binary Search Explained',
    type: 'Video',
    status: 'Published',
    owner: 'Media Team',
  },
];

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

const statusVariant = {
  Accepted: 'success',
  'Wrong Answer': 'danger',
  'Runtime Error': 'warning',
  Draft: 'muted',
  Review: 'warning',
  Published: 'success',
};

function AdminDashboardPage() {
  return (
    <motion.div
      animate="visible"
      className="mx-auto max-w-7xl space-y-6"
      initial="hidden"
      variants={staggerContainer}
    >
      <motion.section
        className="rounded-lg border border-white/10 bg-[#172033] p-6"
        transition={{ duration: 0.2 }}
        variants={fadeUp}
        whileHover={{ y: -3, borderColor: 'rgba(56,189,248,0.35)' }}
      >
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
          <div>
            <p className="text-sm font-semibold text-sky-300">Admin Overview</p>

            <h1 className="mt-2 text-3xl font-extrabold text-white">
              Manage platform content and activity.
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
              Track users, monitor submissions, review learning resources, and
              keep AlgoArena&apos;s problem library ready for learners.
            </p>
          </div>

          <Link
            className="rounded-md bg-sky-400 px-5 py-3 text-sm font-bold text-[#111827] transition hover:bg-sky-300"
            to="/admin/problems/new"
          >
            Add Problem
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
              className={`relative overflow-hidden border-white/10 bg-gradient-to-br ${stat.accent} to-[#172033] text-white`}
            >
              <p className="text-sm text-slate-400">{stat.label}</p>

              <p className="mt-3 text-3xl font-extrabold text-white">
                {stat.value}
              </p>

              <p className="mt-2 text-sm text-slate-500">{stat.helper}</p>
            </Card>
          </motion.div>
        ))}
      </motion.section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <motion.section
          className="rounded-lg border border-white/10 bg-[#172033]"
          transition={{ duration: 0.35 }}
          variants={fadeUp}
        >
          <div className="border-b border-white/10 px-5 py-4">
            <h2 className="text-xl font-bold text-white">Recent Submissions</h2>

            <p className="mt-1 text-sm text-slate-400">
              Monitor latest coding activity across the platform.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left">
              <thead className="border-b border-white/10 text-sm text-slate-400">
                <tr>
                  <th className="px-5 py-4 font-semibold">User</th>
                  <th className="px-5 py-4 font-semibold">Problem</th>
                  <th className="px-5 py-4 font-semibold">Language</th>
                  <th className="px-5 py-4 font-semibold">Result</th>
                  <th className="px-5 py-4 font-semibold">Time</th>
                </tr>
              </thead>

              <tbody>
                {recentSubmissions.map((submission) => (
                  <motion.tr
                    className="border-b border-white/10 transition last:border-b-0 hover:bg-white/5"
                    key={`${submission.user}-${submission.problem}`}
                    transition={{ duration: 0.18 }}
                    variants={fadeUp}
                    whileHover={{ x: 4 }}
                  >
                    <td className="px-5 py-4 font-semibold text-white">
                      {submission.user}
                    </td>
                    <td className="px-5 py-4 text-slate-300">
                      {submission.problem}
                    </td>
                    <td className="px-5 py-4 text-slate-400">
                      {submission.language}
                    </td>
                    <td className="px-5 py-4">
                      <Badge variant={statusVariant[submission.result]}>
                        {submission.result}
                      </Badge>
                    </td>
                    <td className="px-5 py-4 text-slate-400">
                      {submission.time}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.section>

        <motion.section
          className="rounded-lg border border-white/10 bg-[#172033]"
          transition={{ duration: 0.35 }}
          variants={fadeUp}
        >
          <div className="border-b border-white/10 px-5 py-4">
            <h2 className="text-xl font-bold text-white">Content Queue</h2>

            <p className="mt-1 text-sm text-slate-400">
              Review drafts, learning resources, and published content.
            </p>
          </div>

          <div className="divide-y divide-white/10">
            {contentQueue.map((item) => (
              <motion.div
                className="p-5 transition hover:bg-white/5"
                key={item.title}
                transition={{ duration: 0.18 }}
                variants={fadeUp}
                whileHover={{ x: 4 }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-white">{item.title}</p>
                    <p className="mt-1 text-sm text-slate-400">
                      {item.type} • {item.owner}
                    </p>
                  </div>

                  <Badge variant={statusVariant[item.status]}>
                    {item.status}
                  </Badge>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </section>
    </motion.div>
  );
}

export default AdminDashboardPage;
