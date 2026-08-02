import { motion } from 'framer-motion';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Badge from '../../../../shared/ui/Badge';
import Button from '../../../../shared/ui/Button';
import Card from '../../../../shared/ui/Card';
import { getPublishedVideos } from '../../api/problemsApi';

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

function VideosPage() {
  const [videos, setVideos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isPrimaryOnly, setIsPrimaryOnly] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const loadVideos = useCallback(async () => {
    try {
      setIsLoading(true);
      setErrorMessage('');

      const data = await getPublishedVideos();

      setVideos(data);
    } catch (error) {
      setErrorMessage(error.message || 'Unable to load videos right now.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadVideos();
    }, 0);

    return () => clearTimeout(timer);
  }, [loadVideos]);

  const filteredVideos = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return videos.filter((video) => {
      const matchesSearch =
        !normalizedSearch ||
        video.title.toLowerCase().includes(normalizedSearch) ||
        video.problemTitle.toLowerCase().includes(normalizedSearch) ||
        video.problemSlug.toLowerCase().includes(normalizedSearch);

      const matchesPrimary = !isPrimaryOnly || video.isPrimary;

      return matchesSearch && matchesPrimary;
    });
  }, [isPrimaryOnly, searchTerm, videos]);

  return (
    <motion.section
      animate="visible"
      className="space-y-6"
      initial="hidden"
      variants={fadeUp}
    >
      <section className="border-border bg-surface rounded-lg border p-6 shadow-sm">
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
          <div>
            <p className="text-primary text-sm font-semibold">Video Library</p>

            <h1 className="text-text mt-2 text-3xl font-extrabold">
              Learn with focused walkthroughs.
            </h1>

            <p className="text-text-muted mt-3 max-w-2xl text-sm leading-6">
              Watch problem explanations, pattern breakdowns, and guided
              approaches inside AlgoArena.
            </p>
          </div>

          <Card className="min-w-48 text-center">
            <p className="text-text text-3xl font-extrabold">{videos.length}</p>
            <p className="text-text-muted mt-1 text-sm">Available Videos</p>
          </Card>
        </div>
      </section>

      <section className="border-border bg-surface rounded-lg border p-5 shadow-sm">
        <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
          <input
            className="border-border bg-background focus:border-primary min-h-11 w-full rounded-md border px-4 text-sm outline-none"
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search by video, problem, or slug..."
            type="search"
            value={searchTerm}
          />

          <label className="bg-background flex min-h-11 items-center gap-3 rounded-md px-4 text-sm font-semibold">
            <input
              checked={isPrimaryOnly}
              onChange={(event) => setIsPrimaryOnly(event.target.checked)}
              type="checkbox"
            />
            Primary only
          </label>
        </div>
      </section>

      {errorMessage && (
        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {errorMessage}
        </div>
      )}

      {isLoading ? (
        <Card>
          <p className="text-text-muted py-8 text-center">Loading videos...</p>
        </Card>
      ) : filteredVideos.length === 0 ? (
        <Card className="space-y-4 text-center">
          <h2 className="heading-md">No videos found</h2>
          <p className="body text-text-muted mx-auto max-w-xl">
            Try changing your search or removing the primary-only filter.
          </p>
        </Card>
      ) : (
        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredVideos.map((video) => (
            <motion.article
              key={video.id}
              transition={{ duration: 0.2 }}
              variants={fadeUp}
              whileHover={{ y: -4 }}
            >
              <Card className="flex h-full flex-col overflow-hidden p-0">
                <iframe
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="aspect-video w-full border-0"
                  src={video.videoUrl}
                  title={video.title}
                />

                <div className="flex flex-1 flex-col gap-4 p-5">
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-2">
                      {video.isPrimary && (
                        <Badge variant="success">Primary</Badge>
                      )}
                      <Badge variant="muted">{video.problemSlug}</Badge>
                    </div>

                    <h2 className="text-text text-lg font-bold">
                      {video.title}
                    </h2>

                    <p className="text-text-muted text-sm">
                      {video.problemTitle}
                    </p>
                  </div>

                  <div className="mt-auto flex flex-wrap gap-3">
                    <Link
                      state={{ from: '/user/videos' }}
                      to={`/user/videos/${video.problemSlug}`}
                    >
                      <Button size="sm">Watch</Button>
                    </Link>

                    <Link to={`/user/problems/${video.problemSlug}`}>
                      <Button size="sm" variant="outline">
                        Solve
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            </motion.article>
          ))}
        </section>
      )}
    </motion.section>
  );
}

export default VideosPage;
