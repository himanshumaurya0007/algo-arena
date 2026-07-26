import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { problemService } from '../../shared/services/problemService';
import Badge from '../../shared/ui/Badge';
import Loader from '../../shared/ui/Loader';

const difficultyColors = {
  Easy: 'bg-green-500/10 text-green-500 border-green-500/20',
  Medium: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
  Hard: 'bg-red-500/10 text-red-500 border-red-500/20',
};

function ProblemsList() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [difficulty, setDifficulty] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadProblems();
  }, [difficulty]);

  const loadProblems = async () => {
    try {
      setLoading(true);
      const response = await problemService.getAll(
        difficulty ? { difficulty } : {}
      );
      setProblems(response.data || []);
    } catch (error) {
      console.error('Failed to load problems:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProblems = problems.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text font-heading">Problems</h1>
        <p className="text-text-muted mt-2">
          Practice coding problems and prepare for interviews
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search problems..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 rounded-md border border-border bg-surface px-4 py-2 text-text outline-none focus:border-primary"
        />
        <div className="flex gap-2">
          {['', 'Easy', 'Medium', 'Hard'].map((d) => (
            <button
              key={d}
              onClick={() => setDifficulty(d)}
              className={`px-4 py-2 rounded-md text-sm border transition-colors ${
                difficulty === d
                  ? 'bg-primary text-white border-primary'
                  : 'border-border text-text-muted hover:text-text'
              }`}
            >
              {d || 'All'}
            </button>
          ))}
        </div>
      </div>

      {/* Problems Table */}
      {loading ? (
        <Loader />
      ) : (
        <div className="bg-surface rounded-lg border border-border overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-6 py-4 text-sm font-medium text-text-muted">
                  Title
                </th>
                <th className="text-left px-6 py-4 text-sm font-medium text-text-muted">
                  Difficulty
                </th>
                <th className="text-left px-6 py-4 text-sm font-medium text-text-muted">
                  Category
                </th>
                <th className="text-left px-6 py-4 text-sm font-medium text-text-muted">
                  Topic
                </th>
                <th className="text-right px-6 py-4 text-sm font-medium text-text-muted">
                  Submissions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredProblems.map((problem) => (
                <tr
                  key={problem.id}
                  className="border-b border-border last:border-0 hover:bg-background/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <Link
                      to={`/problems/${problem.slug}`}
                      className="text-primary hover:text-primary/80 font-medium"
                    >
                      {problem.title}
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${
                        difficultyColors[problem.difficulty] || ''
                      }`}
                    >
                      {problem.difficulty}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-text-muted text-sm">
                    {problem.categoryName}
                  </td>
                  <td className="px-6 py-4 text-text-muted text-sm">
                    {problem.topicName}
                  </td>
                  <td className="px-6 py-4 text-right text-text-muted text-sm">
                    {problem.acceptedSubmissions}/{problem.totalSubmissions}
                  </td>
                </tr>
              ))}
              {filteredProblems.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-text-muted">
                    No problems found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ProblemsList;

