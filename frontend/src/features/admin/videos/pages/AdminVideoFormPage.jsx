import { motion } from 'framer-motion';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Button from '../../../../shared/ui/Button';
import Card from '../../../../shared/ui/Card';
import { getAdminProblems } from '../../problems/api/adminProblemsApi';
import {
  createAdminVideo,
  getAdminVideoById,
  updateAdminVideo,
} from '../api/adminVideosApi';

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

const initialFormData = {
  problemId: '',
  title: '',
  videoUrl: '',
  displayOrder: 1,
  isPrimary: false,
};

function AdminVideoFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState(initialFormData);
  const [problems, setProblems] = useState([]);
  const [isLoading, setIsLoading] = useState(isEditMode);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const pageTitle = isEditMode ? 'Edit Video' : 'Add Video';

  const selectedProblem = useMemo(() => {
    return problems.find((problem) => problem.id === formData.problemId);
  }, [formData.problemId, problems]);

  const loadFormData = useCallback(async () => {
    try {
      setIsLoading(true);
      setErrorMessage('');

      const problemList = await getAdminProblems();

      setProblems(problemList);

      if (isEditMode) {
        const video = await getAdminVideoById(id);

        setFormData({
          problemId: video.problemId,
          title: video.title,
          videoUrl: video.videoUrl,
          displayOrder: video.displayOrder,
          isPrimary: video.isPrimary,
        });
      }
    } catch (error) {
      setErrorMessage(error.message || 'Unable to load video form.');
    } finally {
      setIsLoading(false);
    }
  }, [id, isEditMode]);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadFormData();
    }, 0);

    return () => clearTimeout(timer);
  }, [loadFormData]);

  function handleChange(event) {
    const { checked, name, type, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]:
        type === 'checkbox'
          ? checked
          : name === 'displayOrder'
            ? Number(value)
            : value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (
      !formData.problemId ||
      !formData.title.trim() ||
      !formData.videoUrl.trim()
    ) {
      setErrorMessage('Problem, title, and video URL are required.');
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMessage('');

      const payload = {
        problemId: formData.problemId,
        title: formData.title.trim(),
        videoUrl: formData.videoUrl.trim(),
        displayOrder: Number(formData.displayOrder),
        isPrimary: formData.isPrimary,
      };

      if (isEditMode) {
        await updateAdminVideo(id, {
          id,
          ...payload,
        });
      } else {
        await createAdminVideo(payload);
      }

      navigate('/admin/videos');
    } catch (error) {
      setErrorMessage(error.message || 'Unable to save video right now.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <motion.section
      animate="visible"
      className="space-y-6"
      initial="hidden"
      variants={fadeUp}
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="caption">Admin videos</p>
          <h1 className="heading-lg mt-1">{pageTitle}</h1>
          <p className="body text-text-muted mt-2 max-w-2xl">
            Attach YouTube learning videos directly to AlgoArena problems.
          </p>
        </div>

        <Link to="/admin/videos">
          <Button variant="outline">Back to Videos</Button>
        </Link>
      </div>

      <Card>
        {isLoading ? (
          <p className="text-text-muted py-8 text-center">Loading form...</p>
        ) : (
          <form className="space-y-5" onSubmit={handleSubmit}>
            {errorMessage && (
              <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {errorMessage}
              </div>
            )}

            <label className="block space-y-2">
              <span className="text-sm font-semibold">Problem</span>
              <select
                className="border-border bg-background focus:border-primary min-h-11 w-full rounded-md border px-4 outline-none"
                name="problemId"
                onChange={handleChange}
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

            {selectedProblem && (
              <div className="bg-background rounded-md px-4 py-3 text-sm">
                <span className="text-text-muted">Selected slug: </span>
                <span className="font-semibold">{selectedProblem.slug}</span>
              </div>
            )}

            <label className="block space-y-2">
              <span className="text-sm font-semibold">Video Title</span>
              <input
                className="border-border bg-background focus:border-primary min-h-11 w-full rounded-md border px-4 outline-none"
                name="title"
                onChange={handleChange}
                placeholder="Example: Sliding Window Walkthrough"
                value={formData.title}
              />
            </label>

            <label className="block space-y-2">
              <span className="text-sm font-semibold">YouTube Embed URL</span>
              <input
                className="border-border bg-background focus:border-primary min-h-11 w-full rounded-md border px-4 outline-none"
                name="videoUrl"
                onChange={handleChange}
                placeholder="https://www.youtube.com/embed/video-id"
                value={formData.videoUrl}
              />
              <p className="caption">
                Use embed URLs so videos play inside AlgoArena.
              </p>
            </label>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="block space-y-2">
                <span className="text-sm font-semibold">Display Order</span>
                <input
                  className="border-border bg-background focus:border-primary min-h-11 w-full rounded-md border px-4 outline-none"
                  min="1"
                  name="displayOrder"
                  onChange={handleChange}
                  type="number"
                  value={formData.displayOrder}
                />
              </label>

              <label className="border-border bg-background flex min-h-11 items-center gap-3 rounded-md border px-4 py-3">
                <input
                  checked={formData.isPrimary}
                  name="isPrimary"
                  onChange={handleChange}
                  type="checkbox"
                />
                <span className="text-sm font-semibold">
                  Mark as primary video
                </span>
              </label>
            </div>

            {formData.videoUrl && (
              <div className="space-y-2">
                <p className="text-sm font-semibold">Preview</p>
                <iframe
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="aspect-video w-full rounded-lg border"
                  src={formData.videoUrl}
                  title={formData.title || 'Video preview'}
                />
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              <Button disabled={isSubmitting} type="submit">
                {isSubmitting ? 'Saving...' : 'Save Video'}
              </Button>

              <Link to="/admin/videos">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </Link>
            </div>
          </form>
        )}
      </Card>
    </motion.section>
  );
}

export default AdminVideoFormPage;
