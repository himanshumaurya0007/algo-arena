import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Badge from '../../../../shared/ui/Badge';

const problems = [
  {
    title: 'Target Strike',
    difficulty: 'Easy',
    topics: ['Array', 'Hash Map'],
    status: 'Published',
    submissions: 1240,
  },
  {
    title: 'Longest Clean Segment',
    difficulty: 'Medium',
    topics: ['Sliding Window', 'Hash Set'],
    status: 'Draft',
    submissions: 428,
  },
  {
    title: 'Water Wall Collector',
    difficulty: 'Hard',
    topics: ['Two Pointers', 'Greedy'],
    status: 'Review',
    submissions: 112,
  },
];

const statusVariant = {
  Published: 'success',
  Draft: 'muted',
  Review: 'warning',
};

const difficultyVariant = {
  Easy: 'success',
  Medium: 'warning',
  Hard: 'danger',
};

function AdminProblemsPage() {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-7xl space-y-6"
      initial={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.3 }}
    >
      <section className="rounded-lg border border-white/10 bg-[#172033] p-6">
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
          <div>
            <p className="text-sm font-semibold text-sky-300">
              Problem Library
            </p>

            <h1 className="mt-2 text-3xl font-extrabold text-white">
              Manage coding problems.
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
              Add, review, publish, and maintain DSA problems for AlgoArena
              learners.
            </p>
          </div>

          <Link
            className="rounded-md bg-sky-400 px-5 py-3 text-sm font-bold text-[#111827] transition hover:bg-sky-300"
            to="/admin/problems/new"
          >
            Add Problem
          </Link>
        </div>
      </section>

      <section className="rounded-lg border border-white/10 bg-[#172033]">
        <div className="border-b border-white/10 px-5 py-4">
          <h2 className="text-xl font-bold text-white">All Problems</h2>
          <p className="mt-1 text-sm text-slate-400">
            Review currently available and draft problem entries.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-left">
            <thead className="border-b border-white/10 text-sm text-slate-400">
              <tr>
                <th className="px-5 py-4 font-semibold">Problem</th>
                <th className="px-5 py-4 font-semibold">Difficulty</th>
                <th className="px-5 py-4 font-semibold">Topics</th>
                <th className="px-5 py-4 font-semibold">Status</th>
                <th className="px-5 py-4 font-semibold">Submissions</th>
                <th className="px-5 py-4 font-semibold">Action</th>
              </tr>
            </thead>

            <tbody>
              {problems.map((problem) => (
                <tr
                  className="border-b border-white/10 transition last:border-b-0 hover:bg-white/5"
                  key={problem.title}
                >
                  <td className="px-5 py-4 font-semibold text-white">
                    {problem.title}
                  </td>

                  <td className="px-5 py-4">
                    <Badge variant={difficultyVariant[problem.difficulty]}>
                      {problem.difficulty}
                    </Badge>
                  </td>

                  <td className="px-5 py-4 text-slate-400">
                    {problem.topics.join(', ')}
                  </td>

                  <td className="px-5 py-4">
                    <Badge variant={statusVariant[problem.status]}>
                      {problem.status}
                    </Badge>
                  </td>

                  <td className="px-5 py-4 text-slate-400">
                    {problem.submissions}
                  </td>

                  <td className="px-5 py-4">
                    <button
                      className="text-sm font-semibold text-sky-300 hover:underline"
                      type="button"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </motion.div>
  );
}

export default AdminProblemsPage;
