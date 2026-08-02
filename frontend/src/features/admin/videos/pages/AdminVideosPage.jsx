import { motion } from 'framer-motion';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Badge from '../../../../shared/ui/Badge';
import Button from '../../../../shared/ui/Button';
import Card from '../../../../shared/ui/Card';
import {
  deleteAdminVideo,
  getAdminVideos,
} from '../api/adminVideosApi';

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

function AdminVideosPage() {
  const [videos, setVideos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const loadVideos = useCallback(async () => {
    try {
      setIsLoading(true);
      setErrorMessage('');

      const data = await getAdminVideos();

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

    if (!normalizedSearch) {
      return videos;
    }

    return videos.filter((video) => {
      return (
        video.title.toLowerCase().includes(normalizedSearch) ||
        video.problemTitle.toLowerCase().includes(normalizedSearch) ||
        video.problemSlug.toLowerCase().includes(normalizedSearch)
      );
    });
  }, [searchTerm, videos]);

  async function handleDelete(id) {
    const confirmed = window.confirm(
      'Are you sure you want to delete this video?',
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteAdminVideo(id);

      setVideos((currentVideos) =>
        currentVideos.filter((video) => video.id !== id),
      );
    } catch (error) {
      setErrorMessage(error.message || 'Unable to delete video right now.');
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
          <h1 className="heading-lg mt-1">Manage Videos</h1>
          <p className="body text-text-muted mt-2 max-w-2xl">
            Add YouTube walkthroughs and connect them with coding problems.
          </p>
        </div>

        <Link to="/admin/videos/new">
          <Button>Add Video</Button>
        </Link>
      </div>

      <Card className="space-y-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <input
            className="border-border bg-background focus:border-primary min-h-11 w-full rounded-md border px-4 outline-none lg:max-w-md"
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search by video, problem, or slug"
            type="search"
            value={searchTerm}
          />

          <p className="text-text-muted text-sm">
            {filteredVideos.length} videos
          </p>
        </div>

        {errorMessage && (
          <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {errorMessage}
          </div>
        )}

        {isLoading ? (
          <p className="text-text-muted py-8 text-center">Loading videos...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-border text-text-muted border-b">
                  <th className="px-4 py-3 font-semibold">Video</th>
                  <th className="px-4 py-3 font-semibold">Problem</th>
                  <th className="px-4 py-3 font-semibold">Order</th>
                  <th className="px-4 py-3 font-semibold">Primary</th>
                  <th className="px-4 py-3 font-semibold">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredVideos.map((video) => (
                  <tr
                    className="border-border hover:bg-background border-b transition"
                    key={video.id}
                  >
                    <td className="px-4 py-4">
                      <div>
                        <p className="font-semibold">{video.title}</p>
                        <a
                          className="text-primary mt-1 block text-xs font-semibold"
                          href={video.videoUrl}
                          rel="noreferrer"
                          target="_blank"
                        >
                          Open source
                        </a>
                      </div>
                    </td>

                    <td className="px-4 py-4">
                      <p className="font-semibold">{video.problemTitle}</p>
                      <p className="caption">{video.problemSlug}</p>
                    </td>

                    <td className="px-4 py-4">{video.displayOrder}</td>

                    <td className="px-4 py-4">
                      <Badge variant={video.isPrimary ? 'success' : 'muted'}>
                        {video.isPrimary ? 'Primary' : 'Secondary'}
                      </Badge>
                    </td>

                    <td className="px-4 py-4">
                      <div className="flex flex-wrap gap-2">
                        <Link to={`/admin/videos/${video.id}/edit`}>
                          <Button size="sm" variant="outline">
                            Edit
                          </Button>
                        </Link>

                        <Button
                          onClick={() => handleDelete(video.id)}
                          size="sm"
                          variant="ghost"
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredVideos.length === 0 && (
              <p className="text-text-muted py-8 text-center">
                No videos found.
              </p>
            )}
          </div>
        )}
      </Card>
    </motion.section>
  );
}

export default AdminVideosPage;
