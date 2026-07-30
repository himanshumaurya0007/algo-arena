import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProblemBySlug } from '../../api/problemsApi';
import SplitLayout from '../components/SplitLayout';

const CodeEditorPage = () => {
  const { slug } = useParams();
  const [problem, setProblem] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!slug) {
      return;
    }

    async function loadProblem() {
      setIsLoading(true);
      setError('');

      try {
        const data = await getProblemBySlug(slug);
        setProblem(data);
      } catch {
        setError('Unable to load this problem right now.');
      } finally {
        setIsLoading(false);
      }
    }

    loadProblem();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="bg-background min-h-screen p-6">
        <div className="border-border bg-surface text-text-muted rounded-md border p-6">
          Loading problem...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-background min-h-screen p-6">
        <div className="rounded-md border border-red-200 bg-red-50 p-6 text-red-600">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      <SplitLayout problem={problem} />
    </div>
  );
};

export default CodeEditorPage;
