import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Badge from '../../../../shared/ui/Badge';
import Card from '../../../../shared/ui/Card';
import { deleteAdminArticle, getAdminArticles } from '../api/adminArticlesApi';

function AdminArticlesPage() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  async function loadArticles() {
    setIsLoading(true);
    setError('');

    try {
      const data = await getAdminArticles();
      setArticles(data);
    } catch {
      setError('Unable to load articles right now.');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    queueMicrotask(() => {
      loadArticles();
    });
  }, []);

  async function handleDelete(id) {
    const shouldDelete = window.confirm(
      'Are you sure you want to delete this article?'
    );

    if (!shouldDelete) {
      return;
    }

    try {
      await deleteAdminArticle(id);
      await loadArticles();
    } catch {
      setError('Unable to delete article right now.');
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
              Learning Content
            </p>

            <h1 className="mt-2 text-3xl font-extrabold text-white">
              Manage articles.
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
              Create, update, and maintain problem-linked learning articles.
            </p>
          </div>

          <Link
            className="rounded-md bg-sky-400 px-5 py-3 text-sm font-bold text-[#111827] transition hover:bg-sky-300"
            to="/admin/articles/new"
          >
            Add Article
          </Link>
        </div>
      </section>

      <Card className="border-white/10 bg-[#172033] text-white">
        <div className="border-b border-white/10 px-5 py-4">
          <h2 className="text-xl font-bold text-white">All Articles</h2>
          <p className="mt-1 text-sm text-slate-400">
            Review article status and linked problems.
          </p>
        </div>

        {isLoading && (
          <p className="p-5 text-sm text-slate-400">Loading articles...</p>
        )}

        {error && <p className="p-5 text-sm text-red-400">{error}</p>}

        {!isLoading && !error && (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px] text-left">
              <thead className="border-b border-white/10 text-sm text-slate-400">
                <tr>
                  <th className="px-5 py-4 font-semibold">Article</th>
                  <th className="px-5 py-4 font-semibold">Problem</th>
                  <th className="px-5 py-4 font-semibold">Primary</th>
                  <th className="px-5 py-4 font-semibold">Created</th>
                  <th className="px-5 py-4 font-semibold">Actions</th>
                </tr>
              </thead>

              <tbody>
                {articles.map((article) => (
                  <tr
                    className="border-b border-white/10 transition last:border-b-0 hover:bg-white/5"
                    key={article.id}
                  >
                    <td className="px-5 py-4 font-semibold text-white">
                      {article.title}
                    </td>

                    <td className="px-5 py-4 text-slate-400">
                      {article.problemTitle}
                    </td>

                    <td className="px-5 py-4">
                      <Badge variant={article.isPrimary ? 'success' : 'muted'}>
                        {article.isPrimary ? 'Primary' : 'Secondary'}
                      </Badge>
                    </td>

                    <td className="px-5 py-4 text-slate-400">
                      {new Date(article.createdAt).toLocaleDateString()}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex gap-3">
                        <Link
                          className="text-sm font-semibold text-sky-300 hover:underline"
                          to={`/admin/articles/${article.id}/edit`}
                        >
                          Edit
                        </Link>

                        <button
                          className="text-sm font-semibold text-red-300 hover:underline"
                          onClick={() => handleDelete(article.id)}
                          type="button"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {articles.length === 0 && (
              <p className="p-5 text-sm text-slate-400">No articles found.</p>
            )}
          </div>
        )}
      </Card>
    </motion.div>
  );
}

export default AdminArticlesPage;
