import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useParams } from 'react-router';

const ArticleDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  // Fetch article by ID
  const { data: article, isLoading } = useQuery({
    queryKey: ['article', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/articles/${id}`);
      return res.data;
    }
  });

  if (isLoading || !article) return <span className="loading loading-bars loading-sm"></span>;

  const { title, image, publisher, description, tags, authorName, authorEmail, authorPhoto, created_at, views, isPremium } = article;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">{title}</h2>

      {isPremium && <span className="badge badge-accent mb-3">Premium Article</span>}

      <img src={image} alt={title} className="w-full rounded-lg mb-6" />

      <div className="flex items-center gap-4 mb-4">
        <img src={authorPhoto || '/default-avatar.png'} alt={authorName} className="w-12 h-12 rounded-full" />
        <div>
          <p className="font-medium">{authorName}</p>
          <p className="text-sm text-gray-500">{authorEmail}</p>
        </div>
      </div>

      <div className="mb-4 text-sm text-gray-600 flex items-center gap-2">
        <strong>Publisher:</strong>
        {article.publisherLogo && <img src={article.publisherLogo} alt={publisher} className="w-10 h-10 p-0.5 bg-emerald-300 rounded-lg object-cover" />}
        <span>{publisher}</span>
        <span className="mx-2">|</span>
        <strong>Posted:</strong> {new Date(created_at).toLocaleDateString()}
      </div>

      <div className="mb-4">
        <strong>Tags:</strong>{' '}
        {tags?.map((tag) => (
          <span key={tag} className="badge badge-outline mr-2">
            {tag}
          </span>
        ))}
      </div>

      <div className="prose mb-6">
        <p>{description}</p>
      </div>

      <p className="text-gray-500 text-sm">👁️ Views: {views}</p>
    </div>
  );
};

export default ArticleDetails;
