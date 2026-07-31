import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  createAdminArticle,
  getAdminArticleById,
  updateAdminArticle,
} from '../api/adminArticlesApi';
import { getPublishedProblems } from '../../../problems/api/problemsApi';

function AdminArticleFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [problems, setProblems] = useState([]);
  const [formData, setFormData] = useState({
    problemId: '',
    title: '',
    markdownContent: '',
    isPrimary: true,
  });
  const [isLoading, setIsLoading] = useState(isEditMode);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadFormData() {
      setIsLoading(true);
      setError('');

      try {
        const problemsData = await getPublishedProblems();
        setProblems(problemsData);

        if (isEditMode) {
          const article = await getAdminArticleById(id);
          setFormData({
            problemId: article.problemId,
            title: article.title,
            markdownContent: article.markdownContent,
            isPrimary: article.isPrimary,
          });
        }
      } catch {
        setError('Unable to load article form right now.');
      } finally {
        setIsLoading(false);
      }
    }

    loadFormData();
  }, [id, isEditMode]);

  function handleChange(event) {
    const { checked, name, type, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');

    const payload = {
      problemId: formData.problemId,
      title: formData.title,
      markdownContent: formData.markdownContent,
      isPrimary: formData.isPrimary,
    };

    try {
      if (isEditMode) {
        await updateAdminArticle(id, {
          id,
          ...payload,
        });
      } else {
        await createAdminArticle(payload);
      }

      navigate('/admin/articles');
    } catch {
      setError('Unable to save article right now.');
    }
  }

  if (isLoading) {
    return (
      <div className="rounded-lg border border-white/10 bg-[#172033] p-6 text-slate-400">
        Loading article form...
      </div>
    );
  }

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-5xl space-y-6"
      initial={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.3 }}
    >
      <div>
        <Link
          className="text-sm font-semibold text-sky-300 hover:underline"
          to="/admin/articles"
        >
          Back to articles
        </Link>

        <h1 className="mt-3 text-3xl font-extrabold text-white">
          {isEditMode ? 'Edit article' : 'Add article'}
        </h1>

        <p className="mt-2 text-sm text-slate-400">
          Link an article to a problem and write the learning content.
        </p>
      </div>

      {error && (
        <div className="rounded-lg border border-red-400/30 bg-red-500/10 p-4 text-sm text-red-300">
          {error}
        </div>
      )}

      <form className="space-y-6" onSubmit={handleSubmit}>
        <section className="rounded-lg border border-white/10 bg-[#172033] p-6">
          <h2 className="text-xl font-bold text-white">Article Details</h2>

          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-300">
                Problem
              </span>

              <select
                className="w-full rounded-md border border-white/10 bg-[#111827] px-4 py-3 text-sm text-white outline-none focus:border-sky-400"
                name="problemId"
                onChange={handleChange}
                required
                value={formData.problemId}
              >
                <option value="">Select problem</option>
                {problems.map((problem) => (
                  <option key={problem.id} value={problem.id}>
                    {problem.title}
                  </option>
                ))}
              </select>
            </label>

            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-300">
                Article Title
              </span>

              <input
                className="w-full rounded-md border border-white/10 bg-[#111827] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-sky-400"
                name="title"
                onChange={handleChange}
                placeholder="Using Hash Tables for Pair Sum Problems"
                required
                type="text"
                value={formData.title}
              />
            </label>
          </div>

          <label className="mt-5 flex items-center gap-3">
            <input
              checked={formData.isPrimary}
              name="isPrimary"
              onChange={handleChange}
              type="checkbox"
            />

            <span className="text-sm font-semibold text-slate-300">
              Mark as primary article
            </span>
          </label>
        </section>

        <section className="rounded-lg border border-white/10 bg-[#172033] p-6">
          <h2 className="text-xl font-bold text-white">Article Content</h2>

          <textarea
            className="mt-5 min-h-[420px] w-full resize-y rounded-md border border-white/10 bg-[#111827] px-4 py-3 font-mono text-sm leading-7 text-white outline-none placeholder:text-slate-500 focus:border-sky-400"
            name="markdownContent"
            onChange={handleChange}
            placeholder="Write article content here..."
            required
            value={formData.markdownContent}
          />
        </section>

        <div className="flex flex-wrap justify-end gap-3">
          <Link
            className="rounded-md bg-white/10 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/15"
            to="/admin/articles"
          >
            Cancel
          </Link>

          <button
            className="rounded-md bg-sky-400 px-5 py-3 text-sm font-bold text-[#111827] transition hover:bg-sky-300"
            type="submit"
          >
            {isEditMode ? 'Update Article' : 'Create Article'}
          </button>
        </div>
      </form>
    </motion.div>
  );
}

export default AdminArticleFormPage;
