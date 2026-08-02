import { motion } from 'framer-motion';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Badge from '../../../shared/ui/Badge';
import Card from '../../../shared/ui/Card';
import { getAdminProblems } from '../problems/api/adminProblemsApi';

const dashboardActions = [
  {
    label: 'Problems',
    value: 'Manage library',
    helper: 'Create, edit, publish, or unpublish coding problems.',
    path: '/admin/problems',
    action: 'Open Problems',
    accent: 'from-sky-500/25',
  },
  {
    label: 'Articles',
    value: 'Learning content',
    helper: 'Attach explanations and notes to each problem.',
    path: '/admin/articles',
    action: 'Open Articles',
    accent: 'from-emerald-500/25',
  },
  {
    label: 'Videos',
    value: 'Walkthroughs',
    helper: 'Manage embedded videos for problem learning pages.',
    path: '/admin/videos',
    action: 'Open Videos',
    accent: 'from-violet-500/25',
  },
  {
    label: 'Create',
    value: 'Add problem',
    helper: 'Start a new problem with examples and test cases.',
    path: '/admin/problems/new',
    action: 'Add Problem',
    accent: 'from-amber-500/25',
  },
];

const difficultyVariant = {
  Easy: 'success',
  Medium: 'warning',
  Hard: 'danger',
};

const publishVariant = {
  true: 'success',
  false: 'muted',
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

function AdminDashboardPage() {
  const [problems, setProblems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const loadProblems = useCallback(async () => {
    try {
      setIsLoading(true);
      setErrorMessage('');

      const data = await getAdminProblems();

      setProblems(data);
    } catch (error) {
      setErrorMessage(error.message || 'Unable to load problems right now.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadProblems();
    }, 0);

    return () => clearTimeout(timer);
  }, [loadProblems]);

  const recentProblems = useMemo(() => {
    return problems.slice(0, 8);
  }, [problems]);

  const publishedCount = useMemo(() => {
    return problems.filter((problem) => problem.isPublished).length;
  }, [problems]);

  const draftCount = problems.length - publishedCount;

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
              Manage AlgoArena content.
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
              Keep problems, articles, and videos organized so learners can
              move smoothly from practice to explanation.
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
        {dashboardActions.map((item) => (
          <motion.div
            key={item.label}
            transition={{ duration: 0.2 }}
            variants={fadeUp}
            whileHover={{ y: -5, scale: 1.02 }}
          >
            <Link to={item.path}>
              <Card
                className={`relative h-full overflow-hidden border-white/10 bg-gradient-to-br ${item.accent} to-[#172033] text-white`}
              >
                <p className="text-sm text-slate-400">{item.label}</p>

                <p className="mt-3 text-2xl font-extrabold text-white">
                  {item.value}
                </p>

                <p className="mt-2 text-sm text-slate-500">{item.helper}</p>

                <p className="mt-5 text-sm font-bold text-sky-300">
                  {item.action}
                </p>
              </Card>
            </Link>
          </motion.div>
        ))}
      </motion.section>

      <section className="grid gap-6 lg:grid-cols-[1fr_280px]">
        <motion.section
          className="rounded-lg border border-white/10 bg-[#172033]"
          transition={{ duration: 0.35 }}
          variants={fadeUp}
        >
          <div className="flex flex-col gap-3 border-b border-white/10 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">Problem Library</h2>

              <p className="mt-1 text-sm text-slate-400">
                Latest admin view of published and draft problems.
              </p>
            </div>

            <Link
              className="text-sm font-bold text-sky-300 hover:text-sky-200"
              to="/admin/problems"
            >
              Manage all
            </Link>
          </div>

          {errorMessage && (
            <div className="m-5 rounded-md border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {errorMessage}
            </div>
          )}

          {isLoading ? (
            <p className="px-5 py-8 text-center text-slate-400">
              Loading problems...
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left">
                <thead className="border-b border-white/10 text-sm text-slate-400">
                  <tr>
                    <th className="px-5 py-4 font-semibold">Problem</th>
                    <th className="px-5 py-4 font-semibold">Difficulty</th>
                    <th className="px-5 py-4 font-semibold">Topic</th>
                    <th className="px-5 py-4 font-semibold">Status</th>
                    <th className="px-5 py-4 font-semibold">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {recentProblems.map((problem) => (
                    <motion.tr
                      className="border-b border-white/10 transition last:border-b-0 hover:bg-white/5"
                      key={problem.id}
                      transition={{ duration: 0.18 }}
                      variants={fadeUp}
                      whileHover={{ x: 4 }}
                    >
                      <td className="px-5 py-4">
                        <p className="font-semibold text-white">
                          {problem.title}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          {problem.slug}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <Badge
                          variant={
                            difficultyVariant[problem.difficultyLevelName]
                          }
                        >
                          {problem.difficultyLevelName}
                        </Badge>
                      </td>

                      <td className="px-5 py-4 text-slate-400">
                        {problem.programmingDomainName}
                      </td>

                      <td className="px-5 py-4">
                        <Badge variant={publishVariant[problem.isPublished]}>
                          {problem.isPublished ? 'Published' : 'Draft'}
                        </Badge>
                      </td>

                      <td className="px-5 py-4">
                        <Link
                          className="text-sm font-bold text-sky-300 hover:text-sky-200"
                          to={`/admin/problems/${problem.id}/edit`}
                        >
                          Edit
                        </Link>
                      </td>
                    </motion.tr>
                  ))}

                  {recentProblems.length === 0 && (
                    <tr>
                      <td
                        className="px-5 py-8 text-center text-slate-400"
                        colSpan="5"
                      >
                        No problems found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </motion.section>

        <motion.aside
          className="space-y-4"
          transition={{ duration: 0.35 }}
          variants={fadeUp}
        >
          <Card className="border-white/10 bg-[#172033] text-white">
            <p className="text-sm text-slate-400">Total Problems</p>
            <p className="mt-3 text-3xl font-extrabold">{problems.length}</p>
            <p className="mt-2 text-sm text-slate-500">
              Current admin problem records.
            </p>
          </Card>

          <Card className="border-white/10 bg-[#172033] text-white">
            <p className="text-sm text-slate-400">Published</p>
            <p className="mt-3 text-3xl font-extrabold">{publishedCount}</p>
            <p className="mt-2 text-sm text-slate-500">
              Visible to learners.
            </p>
          </Card>

          <Card className="border-white/10 bg-[#172033] text-white">
            <p className="text-sm text-slate-400">Drafts</p>
            <p className="mt-3 text-3xl font-extrabold">{draftCount}</p>
            <p className="mt-2 text-sm text-slate-500">
              Hidden from learner pages.
            </p>
          </Card>
        </motion.aside>
      </section>
    </motion.div>
  );
}

export default AdminDashboardPage;
