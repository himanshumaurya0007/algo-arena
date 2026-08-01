import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Badge from '../../../../shared/ui/Badge';
import {
  deleteAdminProblem,
  getAdminProblems,
  publishAdminProblem,
  unpublishAdminProblem,
} from '../api/adminProblemsApi';

const statusVariant = {
  Published: 'success',
  Draft: 'muted',
};

const difficultyVariant = {
  Easy: 'success',
  Medium: 'warning',
  Hard: 'danger',
};

function AdminProblemsPage() {
  const [problems, setProblems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionMessage, setActionMessage] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      loadProblems();
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  async function loadProblems() {
    try {
      setIsLoading(true);
      setError('');

      const data = await getAdminProblems();

      setProblems(data);
    } catch (err) {
      setError(err.message || 'Unable to load problems.');
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDelete(problem) {
    const shouldDelete = window.confirm(
      `Delete "${problem.title}"? This will remove it from user-facing pages.`
    );

    if (!shouldDelete) {
      return;
    }

    try {
      await deleteAdminProblem(problem.id);
      setActionMessage('Problem deleted successfully.');
      await loadProblems();
    } catch (err) {
      setActionMessage(err.message || 'Unable to delete problem.');
    }
  }

  async function handlePublishToggle(problem) {
    try {
      if (problem.isPublished) {
        await unpublishAdminProblem(problem.id);
        setActionMessage('Problem moved to draft.');
      } else {
        await publishAdminProblem(problem.id);
        setActionMessage('Problem published successfully.');
      }

      await loadProblems();
    } catch (err) {
      setActionMessage(err.message || 'Unable to update problem status.');
    }
  }

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

      {actionMessage && (
        <div className="rounded-md border border-sky-400/20 bg-sky-400/10 px-4 py-3 text-sm font-semibold text-sky-200">
          {actionMessage}
        </div>
      )}

      <section className="rounded-lg border border-white/10 bg-[#172033]">
        <div className="border-b border-white/10 px-5 py-4">
          <h2 className="text-xl font-bold text-white">All Problems</h2>
          <p className="mt-1 text-sm text-slate-400">
            Review currently available and draft problem entries.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left">
            <thead className="border-b border-white/10 text-sm text-slate-400">
              <tr>
                <th className="px-5 py-4 font-semibold">Problem</th>
                <th className="px-5 py-4 font-semibold">Difficulty</th>
                <th className="px-5 py-4 font-semibold">Domain</th>
                <th className="px-5 py-4 font-semibold">Status</th>
                <th className="px-5 py-4 font-semibold">Solved</th>
                <th className="px-5 py-4 font-semibold">Attempts</th>
                <th className="px-5 py-4 font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody>
              {isLoading && (
                <tr>
                  <td
                    className="px-5 py-6 text-center text-slate-400"
                    colSpan="7"
                  >
                    Loading problems...
                  </td>
                </tr>
              )}

              {!isLoading && error && (
                <tr>
                  <td
                    className="px-5 py-6 text-center text-red-300"
                    colSpan="7"
                  >
                    {error}
                  </td>
                </tr>
              )}

              {!isLoading && !error && problems.length === 0 && (
                <tr>
                  <td
                    className="px-5 py-6 text-center text-slate-400"
                    colSpan="7"
                  >
                    No problems found.
                  </td>
                </tr>
              )}

              {!isLoading &&
                !error &&
                problems.map((problem) => {
                  const status = problem.isPublished ? 'Published' : 'Draft';

                  return (
                    <tr
                      className="border-b border-white/10 transition last:border-b-0 hover:bg-white/5"
                      key={problem.id}
                    >
                      <td className="px-5 py-4">
                        <p className="font-semibold text-white">
                          {problem.title}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          /{problem.slug}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <Badge
                          variant={
                            difficultyVariant[problem.difficultyLevelName] ||
                            'muted'
                          }
                        >
                          {problem.difficultyLevelName}
                        </Badge>
                      </td>

                      <td className="px-5 py-4 text-slate-400">
                        {problem.programmingDomainName}
                      </td>

                      <td className="px-5 py-4">
                        <Badge variant={statusVariant[status]}>{status}</Badge>
                      </td>

                      <td className="px-5 py-4 text-slate-400">
                        {problem.solvedCount}
                      </td>

                      <td className="px-5 py-4 text-slate-400">
                        {problem.attemptCount}
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex flex-wrap gap-3">
                          <Link
                            className="text-sm font-semibold text-sky-300 hover:underline"
                            to={`/admin/problems/${problem.id}/edit`}
                          >
                            Edit
                          </Link>

                          <button
                            className="text-sm font-semibold text-emerald-300 hover:underline"
                            onClick={() => handlePublishToggle(problem)}
                            type="button"
                          >
                            {problem.isPublished ? 'Unpublish' : 'Publish'}
                          </button>

                          <button
                            className="text-sm font-semibold text-red-300 hover:underline"
                            onClick={() => handleDelete(problem)}
                            type="button"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </section>
    </motion.div>
  );
}

export default AdminProblemsPage;
