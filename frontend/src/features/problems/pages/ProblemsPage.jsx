import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Badge from '../../../shared/ui/Badge';
import Card from '../../../shared/ui/Card';
import { getPublishedProblems } from '../api/problemsApi';

const difficultyVariant = {
  Easy: 'success',
  Medium: 'warning',
  Hard: 'danger',
};

function ProblemsPage() {
  const [problems, setProblems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('All');

  async function loadProblems() {
    try {
      setIsLoading(true);
      setError('');

      const data = await getPublishedProblems();

      setProblems(data);
    } catch {
      setError('Unable to load problems right now.');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      loadProblems();
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const filteredProblems = useMemo(() => {
    return problems.filter((problem) => {
      const matchesSearch =
        problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        problem.programmingDomainName
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesDifficulty =
        difficultyFilter === 'All' ||
        problem.difficultyLevelName === difficultyFilter;

      return matchesSearch && matchesDifficulty;
    });
  }, [difficultyFilter, problems, searchTerm]);

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
      initial={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.3 }}
    >
      <section className="border-border bg-surface rounded-lg border p-6 shadow-sm">
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
          <div>
            <p className="text-primary text-sm font-semibold">
              Problem Library
            </p>

            <h1 className="text-text mt-2 text-3xl font-extrabold">
              Practice every problem in one place.
            </h1>

            <p className="text-text-muted mt-3 max-w-2xl text-sm leading-6">
              Filter by difficulty, search by topic or title, and open any
              problem directly in the editor.
            </p>
          </div>

          <Card className="min-w-48 text-center">
            <p className="text-text text-3xl font-extrabold">
              {problems.length}
            </p>
            <p className="text-text-muted mt-1 text-sm">Published Problems</p>
          </Card>
        </div>
      </section>

      <section className="border-border bg-surface rounded-lg border p-5 shadow-sm">
        <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
          <input
            className="border-border bg-background focus:border-primary min-h-11 w-full rounded-md border px-4 text-sm outline-none"
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search by problem or topic..."
            type="search"
            value={searchTerm}
          />

          <div className="flex flex-wrap gap-2">
            {['All', 'Easy', 'Medium', 'Hard'].map((difficulty) => (
              <button
                className={`rounded-md px-4 py-2 text-sm font-semibold transition ${
                  difficultyFilter === difficulty
                    ? 'bg-primary text-white'
                    : 'bg-background text-text-muted hover:text-primary'
                }`}
                key={difficulty}
                onClick={() => setDifficultyFilter(difficulty)}
                type="button"
              >
                {difficulty}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="border-border bg-surface rounded-lg border shadow-sm">
        <div className="border-border border-b px-5 py-4">
          <h2 className="text-text text-xl font-bold">All Problems</h2>

          <p className="text-text-muted mt-1 text-sm">
            Showing {filteredProblems.length} of {problems.length} problems.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left">
            <thead className="border-border text-text-muted border-b text-sm">
              <tr>
                <th className="px-5 py-4 font-semibold">Problem</th>
                <th className="px-5 py-4 font-semibold">Difficulty</th>
                <th className="px-5 py-4 font-semibold">Topic</th>
                <th className="px-5 py-4 font-semibold">Article</th>
                <th className="px-5 py-4 font-semibold">Video</th>
              </tr>
            </thead>

            <tbody>
              {isLoading && (
                <tr>
                  <td
                    className="text-text-muted px-5 py-6 text-center"
                    colSpan="5"
                  >
                    Loading problems...
                  </td>
                </tr>
              )}

              {!isLoading && error && (
                <tr>
                  <td
                    className="px-5 py-6 text-center text-red-500"
                    colSpan="5"
                  >
                    {error}
                  </td>
                </tr>
              )}

              {!isLoading && !error && filteredProblems.length === 0 && (
                <tr>
                  <td
                    className="text-text-muted px-5 py-6 text-center"
                    colSpan="5"
                  >
                    No problems match your filters.
                  </td>
                </tr>
              )}

              {!isLoading &&
                !error &&
                filteredProblems.map((problem) => (
                  <tr
                    className="border-border hover:bg-background border-b transition last:border-b-0"
                    key={problem.id}
                  >
                    <td className="px-5 py-4">
                      <Link
                        className="text-text hover:text-primary font-semibold transition"
                        to={`/user/problems/${problem.slug}`}
                      >
                        {problem.title}
                      </Link>
                    </td>

                    <td className="px-5 py-4">
                      <Badge
                        variant={difficultyVariant[problem.difficultyLevelName]}
                      >
                        {problem.difficultyLevelName}
                      </Badge>
                    </td>

                    <td className="text-text-muted px-5 py-4">
                      {problem.programmingDomainName}
                    </td>

                    <td className="px-5 py-4">
                      <Link
                        className="text-primary text-sm font-semibold hover:underline"
                        state={{
                          backLabel: 'Back to problems',
                          backTo: '/user/problems',
                        }}
                        to={`/user/articles/${problem.slug}`}
                      >
                        Read Article
                      </Link>
                    </td>

                    <td className="px-5 py-4">
                      <Link
                        className="text-secondary text-sm font-semibold hover:underline"
                        state={{
                          from: '/user/problems',
                        }}
                        to={`/user/videos/${problem.slug}`}
                      >
                        Watch Video
                      </Link>
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

export default ProblemsPage;
