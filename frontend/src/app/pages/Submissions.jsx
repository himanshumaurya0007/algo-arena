import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { submissionService } from '../../shared/services/submissionService';
import Loader from '../../shared/ui/Loader';

const statusColors = {
  Accepted: 'text-green-500 bg-green-500/10',
  WrongAnswer: 'text-red-500 bg-red-500/10',
  TimeLimitExceeded: 'text-amber-500 bg-amber-500/10',
  RuntimeError: 'text-red-500 bg-red-500/10',
  CompilationError: 'text-orange-500 bg-orange-500/10',
  Pending: 'text-yellow-500 bg-yellow-500/10',
};

function Submissions() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSubmissions();
  }, []);

  const loadSubmissions = async () => {
    try {
      setLoading(true);
      const response = await submissionService.getMine();
      setSubmissions(response.data || []);
    } catch (error) {
      console.error('Failed to load submissions:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div>
      <h1 className="text-2xl font-bold text-text font-heading mb-6">
        My Submissions
      </h1>

      {submissions.length === 0 ? (
        <div className="text-center py-12 text-text-muted">
          No submissions yet.{' '}
          <Link to="/problems" className="text-primary hover:text-primary/80">
            Solve a problem
          </Link>
        </div>
      ) : (
        <div className="bg-surface rounded-lg border border-border overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-6 py-4 text-sm font-medium text-text-muted">
                  Problem
                </th>
                <th className="text-left px-6 py-4 text-sm font-medium text-text-muted">
                  Language
                </th>
                <th className="text-left px-6 py-4 text-sm font-medium text-text-muted">
                  Status
                </th>
                <th className="text-right px-6 py-4 text-sm font-medium text-text-muted">
                  Time
                </th>
                <th className="text-right px-6 py-4 text-sm font-medium text-text-muted">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((sub) => (
                <tr
                  key={sub.id}
                  className="border-b border-border last:border-0 hover:bg-background/50"
                >
                  <td className="px-6 py-4">
                    <Link
                      to={`/problems/${sub.problemSlug}`}
                      className="text-primary hover:text-primary/80 text-sm"
                    >
                      {sub.problemTitle}
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-sm text-text-muted">
                    {sub.language}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        statusColors[sub.status] || ''
                      }`}
                    >
                      {sub.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-sm text-text-muted">
                    {sub.executionTime ? `${sub.executionTime.toFixed(2)}s` : '-'}
                  </td>
                  <td className="px-6 py-4 text-right text-sm text-text-muted">
                    {new Date(sub.submittedAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Submissions;

