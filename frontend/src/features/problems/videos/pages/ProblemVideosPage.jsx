import { motion } from 'framer-motion';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import Badge from '../../../../shared/ui/Badge';
import Button from '../../../../shared/ui/Button';
import Card from '../../../../shared/ui/Card';
import { getProblemVideosBySlug } from '../../api/problemsApi';

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

function ProblemVideosPage() {
  const { slug } = useParams();
  const location = useLocation();

  const [videos, setVideos] = useState([]);
  const [activeVideoId, setActiveVideoId] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const backTo = location.state?.from || '/user/problems';

  const activeVideo = useMemo(() => {
    return (
      videos.find((video) => video.id === activeVideoId) ||
      videos.find((video) => video.isPrimary) ||
      videos[0]
    );
  }, [activeVideoId, videos]);

  const loadVideos = useCallback(async () => {
    try {
      setIsLoading(true);
      setErrorMessage('');

      const data = await getProblemVideosBySlug(slug);

      setVideos(data);

      const primaryVideo = data.find((video) => video.isPrimary) || data[0];

      if (primaryVideo) {
        setActiveVideoId(primaryVideo.id);
      }
    } catch (error) {
      setErrorMessage(error.message || 'Unable to load videos right now.');
    } finally {
      setIsLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadVideos();
    }, 0);

    return () => clearTimeout(timer);
  }, [loadVideos]);

  return (
    <motion.section
      animate="visible"
      className="space-y-6"
      initial="hidden"
      variants={fadeUp}
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="caption">Video walkthrough</p>
          <h1 className="heading-lg mt-1">
            {activeVideo?.problemTitle || 'Problem Videos'}
          </h1>
          <p className="body text-text-muted mt-2 max-w-2xl">
            Watch problem-focused explanations without leaving AlgoArena.
          </p>
        </div>

        <Link to={backTo}>
          <Button variant="outline">Back</Button>
        </Link>
      </div>

      {errorMessage && (
        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {errorMessage}
        </div>
      )}

      {isLoading ? (
        <Card>
          <p className="text-text-muted py-8 text-center">Loading videos...</p>
        </Card>
      ) : videos.length === 0 ? (
        <Card className="space-y-4 text-center">
          <h2 className="heading-md">No videos added yet</h2>
          <p className="body text-text-muted mx-auto max-w-xl">
            This problem does not have a walkthrough video right now. You can
            still solve it or read its article while videos are added.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <Link to={`/user/problems/${slug}`}>
              <Button>Solve Problem</Button>
            </Link>

            <Link to={`/user/articles/${slug}`}>
              <Button variant="outline">Read Article</Button>
            </Link>
          </div>
        </Card>
      ) : (
        <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
          <Card className="space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="caption">{activeVideo.problemSlug}</p>
                <h2 className="heading-md mt-1">{activeVideo.title}</h2>
              </div>

              {activeVideo.isPrimary && <Badge variant="success">Primary</Badge>}
            </div>

            <iframe
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="aspect-video w-full rounded-lg border"
              src={activeVideo.videoUrl}
              title={activeVideo.title}
            />
          </Card>

          <Card className="space-y-4">
            <div>
              <p className="caption">Related videos</p>
              <h2 className="heading-sm mt-1">Choose walkthrough</h2>
            </div>

            <div className="space-y-3">
              {videos.map((video) => (
                <button
                  className={`border-border w-full rounded-md border px-4 py-3 text-left transition ${
                    video.id === activeVideo.id
                      ? 'bg-primary text-white'
                      : 'bg-background hover:border-primary'
                  }`}
                  key={video.id}
                  onClick={() => setActiveVideoId(video.id)}
                  type="button"
                >
                  <span className="block font-semibold">{video.title}</span>
                  <span
                    className={`mt-1 block text-xs ${
                      video.id === activeVideo.id
                        ? 'text-white/80'
                        : 'text-text-muted'
                    }`}
                  >
                    Order {video.displayOrder}
                    {video.isPrimary ? ' • Primary' : ''}
                  </span>
                </button>
              ))}
            </div>

            <div className="grid gap-3">
              <Link to={`/user/problems/${slug}`}>
                <Button className="w-full">Solve Problem</Button>
              </Link>

              <Link to={`/user/articles/${slug}`}>
                <Button className="w-full" variant="outline">
                  Read Article
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      )}
    </motion.section>
  );
}

export default ProblemVideosPage;
