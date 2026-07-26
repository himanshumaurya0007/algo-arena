import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { problemService } from '../../shared/services/problemService';
import Loader from '../../shared/ui/Loader';
import useAuthStore from '../../shared/store/authStore';

const difficultyColors = {
  Easy: 'text-green-500 bg-green-500/10',
  Medium: 'text-amber-500 bg-amber-500/10',
  Hard: 'text-red-500 bg-red-500/10',
};

function ProblemDetail() {
  const { slug } = useParams();
  const { user } = useAuthStore();
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showHints, setShowHints] = useState(false);

  useEffect(() => {
    loadProblem();
  }, [slug]);

  const loadProblem = async () => {
    try {
      setLoading(true);
      const response = await problemService.getBySlug(slug);
      setProblem(response.data);
    } catch (error) {
      console.error('Failed to load problem:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader className="min-h-[60vh]" />;
  if (!problem) return <div className="text-center py-20 text-text-muted">Problem not found</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold text-text font-heading">
            {problem.title}
          </h1>
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              difficultyColors[problem.difficulty] || ''
            }`}
          >
            {problem.difficulty}
          </span>
        </div>
        <div className="flex items-center gap-4 text-sm text-text-muted">
          <span>{problem.categoryName}</span>
          <span>•</span>
          <span>{problem.topicName}</span>
        </div>
      </div>

      {/* Description */}
      <div className="prose prose-invert max-w-none mb-8">
        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="text-text leading-relaxed whitespace-pre-wrap">
            {problem.description}
          </div>
        </div>
      </div>

      {/* Examples */}
      {problem.examples?.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-text mb-4">Examples</h2>
          {problem.examples.map((example, index) => (
            <div
              key={index}
              className="bg-surface rounded-lg border border-border p-4 mb-4"
            >
              <p className="text-sm font-medium text-text-muted mb-2">
                Example {index + 1}:
              </p>
              <div className="space-y-2">
                <div>
                  <span className="text-sm font-medium text-text">Input: </span>
                  <code className="text-sm bg-background px-2 py-1 rounded text-primary">
                    {example.input}
                  </code>
                </div>
                <div>
                  <span className="text-sm font-medium text-text">Output: </span>
                  <code className="text-sm bg-background px-2 py-1 rounded text-primary">
                    {example.output}
                  </code>
                </div>
                {example.explanation && (
                  <div>
                    <span className="text-sm font-medium text-text">
                      Explanation:{' '}
                    </span>
                    <span className="text-sm text-text-muted">
                      {example.explanation}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Constraints */}
      {problem.constraints?.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-text mb-4">Constraints</h2>
          <ul className="bg-surface rounded-lg border border-border p-6 space-y-2">
            {problem.constraints.map((constraint, index) => (
              <li key={index} className="text-sm text-text-muted">
                • {constraint.description}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Hints */}
      {problem.hints?.length > 0 && (
        <div className="mb-8">
          <button
            onClick={() => setShowHints(!showHints)}
            className="text-primary hover:text-primary/80 font-medium mb-4"
          >
            {showHints ? 'Hide Hints' : 'Show Hints'}
          </button>
          {showHints && (
            <div className="bg-surface rounded-lg border border-border p-6 space-y-3">
              {problem.hints.map((hint, index) => (
                <div key={index} className="text-sm text-text-muted">
                  <span className="font-medium text-text">Hint {index + 1}:</span>{' '}
                  {hint.description}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Editorial */}
      {problem.editorial && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-text mb-4">Editorial</h2>
          <div className="bg-surface rounded-lg border border-border p-6">
            <div className="text-text leading-relaxed whitespace-pre-wrap">
              {problem.editorial.content}
            </div>
            {problem.editorial.videoUrl && (
              <a
                href={problem.editorial.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 text-primary hover:text-primary/80"
              >
                Watch Video Solution →
              </a>
            )}
          </div>
        </div>
      )}

      {/* Solve / Login CTA */}
      <div className="bg-surface rounded-lg border border-border p-6 text-center">
        {user ? (
          <Link
            to={`/solve/${problem.slug}`}
            className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Solve Problem
          </Link>
        ) : (
          <div>
            <p className="text-text-muted mb-4">
              Login to submit your solution
            </p>
            <Link
              to="/login"
              className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Login to Solve
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProblemDetail;

