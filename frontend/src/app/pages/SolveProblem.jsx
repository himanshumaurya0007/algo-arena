import { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { problemService } from '../../shared/services/problemService';
import { submissionService } from '../../shared/services/submissionService';
import useAuthStore from '../../shared/store/authStore';
import Loader from '../../shared/ui/Loader';
import toast from 'react-hot-toast';

const LANGUAGE_IDS = {
  c: 50,
  cpp: 54,
  java: 62,
  python: 71,
};

const SUPPORTED_LANGUAGES = [
  { id: 'python', label: 'Python', defaultCode: 'def solution():\n    # Write your code here\n    pass\n' },
  { id: 'cpp', label: 'C++', defaultCode: '#include <iostream>\nusing namespace std;\n\nint main() {\n    // Write your code here\n    return 0;\n}\n' },
  { id: 'java', label: 'Java', defaultCode: 'public class Solution {\n    public static void main(String[] args) {\n        // Write your code here\n    }\n}\n' },
  { id: 'c', label: 'C', defaultCode: '#include <stdio.h>\n\nint main() {\n    // Write your code here\n    return 0;\n}\n' },
];

function SolveProblem() {
  const { slug } = useParams();
  const { user } = useAuthStore();
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState('python');
  const [code, setCode] = useState(SUPPORTED_LANGUAGES[0].defaultCode);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [showEditorial, setShowEditorial] = useState(false);

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

  const handleLanguageChange = (langId) => {
    setLanguage(langId);
    const lang = SUPPORTED_LANGUAGES.find((l) => l.id === langId);
    if (lang) {
      setCode(lang.defaultCode);
    }
  };

  const handleSubmit = async () => {
    if (!code.trim()) {
      toast.error('Please write some code before submitting');
      return;
    }
    try {
      setSubmitting(true);
      setResult(null);
      const response = await submissionService.create({
        problemId: problem.id,
        code,
        language,
      });
      setResult(response.data);
      toast.success('Submission received');
    } catch (error) {
      toast.error('Submission failed');
      setResult({ status: 'Error', message: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditorMount = useCallback((editor) => {
    editor.focus();
  }, []);

  if (loading) return <Loader className="min-h-[80vh]" />;
  if (!problem) return <div className="text-center py-20 text-text-muted">Problem not found</div>;

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Top Bar */}
      <div className="bg-surface border-b border-border px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to={`/problems/${slug}`} className="text-primary hover:text-primary/80 text-sm">
            &larr; Back
          </Link>
          <h2 className="text-text font-medium">{problem.title}</h2>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={language}
            onChange={(e) => handleLanguageChange(e.target.value)}
            className="bg-background border border-border rounded-md px-3 py-1.5 text-sm text-text outline-none"
          >
            {SUPPORTED_LANGUAGES.map((lang) => (
              <option key={lang.id} value={lang.id}>
                {lang.label}
              </option>
            ))}
          </select>
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="bg-primary text-white px-6 py-1.5 rounded-md text-sm hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {submitting ? 'Submitting...' : 'Submit'}
          </button>
          {problem.editorial && (
            <button
              onClick={() => setShowEditorial(!showEditorial)}
              className="text-primary hover:text-primary/80 text-sm"
            >
              {showEditorial ? 'Hide Editorial' : 'View Editorial'}
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Problem Description Panel */}
        <div className="w-1/2 overflow-y-auto border-r border-border bg-surface p-6">
          <div className="text-text leading-relaxed whitespace-pre-wrap">
            {problem.description}
          </div>

          {problem.examples?.map((example, idx) => (
            <div key={idx} className="mt-4 bg-background rounded-lg p-4">
              <p className="text-sm font-medium text-text-muted mb-2">Example {idx + 1}:</p>
              <div className="text-sm">
                <div><span className="text-text">Input: </span><code className="text-primary">{example.input}</code></div>
                <div className="mt-1"><span className="text-text">Output: </span><code className="text-primary">{example.output}</code></div>
                {example.explanation && <div className="mt-1 text-text-muted">{example.explanation}</div>}
              </div>
            </div>
          ))}

          {showEditorial && problem.editorial && (
            <div className="mt-6 bg-primary/5 rounded-lg p-4 border border-primary/20">
              <h3 className="text-text font-medium mb-2">Editorial</h3>
              <div className="text-sm text-text-muted whitespace-pre-wrap">{problem.editorial.content}</div>
            </div>
          )}
        </div>

        {/* Code Editor + Results Panel */}
        <div className="w-1/2 flex flex-col">
          <div className="flex-1">
            <Editor
              height="100%"
              language={language}
              value={code}
              onChange={(value) => setCode(value || '')}
              onMount={handleEditorMount}
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: 'on',
                scrollBeyondLastLine: false,
                automaticLayout: true,
                padding: { top: 16 },
              }}
            />
          </div>

          {/* Results Panel */}
          {result && (
            <div className={`border-t p-4 ${
              result.status === 'Accepted' ? 'border-green-500/30 bg-green-500/5' : 'border-red-500/30 bg-red-500/5'
            }`}>
              <div className="flex items-center gap-2">
                <span className={`font-medium ${
                  result.status === 'Accepted' ? 'text-green-500' : 'text-red-500'
                }`}>
                  {result.status === 'Accepted' ? 'Accepted' : result.status}
                </span>
                {result.executionTime && (
                  <span className="text-sm text-text-muted">
                    • {result.executionTime.toFixed(2)}s
                  </span>
                )}
                {result.memoryUsed && (
                  <span className="text-sm text-text-muted">
                    • {result.memoryUsed} KB
                  </span>
                )}
              </div>
              {result.message && (
                <p className="text-sm text-text-muted mt-1">{result.message}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SolveProblem;

