import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { getPrimaryArticleByProblemSlug } from '../../../../features/problems/api/problemsApi';

function ProblemArticlePage() {
  const { slug } = useParams();
  const location = useLocation();
  const backTo = location.state?.backTo ?? '/user/dashboard';
  const backLabel = location.state?.backLabel ?? 'Back to dashboard';
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadArticle() {
      setIsLoading(true);
      setError('');

      try {
        const data = await getPrimaryArticleByProblemSlug(slug);
        setArticle(data);
      } catch {
        setError('Unable to load this article right now.');
      } finally {
        setIsLoading(false);
      }
    }

    loadArticle();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-4xl">
        <div className="border-border bg-surface text-text-muted rounded-lg border p-6">
          Loading article...
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="mx-auto max-w-4xl">
        <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-red-600">
          {error || 'Article not found.'}
        </div>
      </div>
    );
  }

  return (
    <motion.article
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-4xl"
      initial={{ opacity: 0, y: 18 }}
      transition={{ duration: 0.3 }}
    >
      <div className="border-border bg-surface rounded-lg border p-6 shadow-sm">
        <Link
          className="text-primary text-sm font-semibold hover:underline"
          to={backTo}
        >
          {backLabel}
        </Link>

        <p className="text-text-muted mt-6 text-sm font-semibold">
          {article.problemTitle}
        </p>

        <h1 className="text-text mt-2 text-3xl font-extrabold">
          {article.title}
        </h1>

        <div className="border-border mt-6 border-t pt-6">
          <p className="text-text-muted leading-8 whitespace-pre-wrap">
            {article.markdownContent}
          </p>
        </div>
      </div>
    </motion.article>
  );
}

export default ProblemArticlePage;
