import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Badge from '../../../../shared/ui/Badge';
import Card from '../../../../shared/ui/Card';
import { getPublishedProblems } from '../../../../features/problems/api/problemsApi';

const difficultyVariant = {
  Easy: 'success',
  Medium: 'warning',
  Hard: 'danger',
};

function ArticlesPage() {
  const [problems, setProblems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadProblems() {
      setIsLoading(true);
      setError('');

      try {
        const data = await getPublishedProblems();
        setProblems(data);
      } catch {
        setError('Unable to load articles right now.');
      } finally {
        setIsLoading(false);
      }
    }

    loadProblems();
  }, []);

  const articleProblems = problems.filter((problem) => problem.isPublished);

  if (isLoading) {
    return (
      <div className="border-border bg-surface text-text-muted rounded-lg border p-6">
        Loading articles...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-red-600">
        {error}
      </div>
    );
  }

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-7xl space-y-6"
      initial={{ opacity: 0, y: 18 }}
      transition={{ duration: 0.3 }}
    >
      <section className="border-border bg-surface rounded-lg border p-6 shadow-sm">
        <p className="text-primary text-sm font-semibold">Learning Library</p>

        <h1 className="text-text mt-2 text-3xl font-extrabold">
          Articles for stronger problem solving.
        </h1>

        <p className="text-text-muted mt-3 max-w-2xl text-sm leading-6">
          Read concise explanations connected to coding problems, then return
          to the editor with a clearer approach.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {articleProblems.map((problem) => (
          <motion.div
            key={problem.id}
            transition={{ duration: 0.2 }}
            whileHover={{ y: -4 }}
          >
            <Card className="h-full">
              <div className="flex h-full flex-col justify-between gap-5">
                <div>
                  <div className="mb-4 flex flex-wrap items-center gap-2">
                    <Badge
                      variant={difficultyVariant[problem.difficultyLevelName]}
                    >
                      {problem.difficultyLevelName}
                    </Badge>

                    <span className="bg-background text-text-muted rounded-full px-3 py-1 text-xs font-semibold">
                      {problem.programmingDomainName}
                    </span>
                  </div>

                  <h2 className="text-text text-xl font-bold">
                    {problem.title}
                  </h2>

                  <p className="text-text-muted mt-3 text-sm leading-6">
                    Learn the core idea behind this problem and understand the
                    approach before solving it.
                  </p>
                </div>

                <Link
                  className="text-primary text-sm font-bold hover:underline"
                  state={{
                    backLabel: 'Back to articles',
                    backTo: '/user/articles',
                  }}
                  to={`/user/articles/${problem.slug}`}
                >
                  Read Article
                </Link>
              </div>
            </Card>
          </motion.div>
        ))}
      </section>
    </motion.div>
  );
}

export default ArticlesPage;
