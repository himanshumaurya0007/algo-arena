import { useParams } from 'react-router-dom';

function ArticleDetail() {
  const { slug } = useParams();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <p className="text-text-muted">Article details coming soon.</p>
    </div>
  );
}

export default ArticleDetail;

