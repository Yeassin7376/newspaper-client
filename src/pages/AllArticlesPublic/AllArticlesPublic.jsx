import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Select from 'react-select';
import { Link } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useUserProfile from '../../hooks/useUserProfile';

const AllArticlesPublic = () => {
  const axiosSecure = useAxiosSecure();
  const { userFromDB } = useUserProfile();
  const queryClient = useQueryClient();

  const [search, setSearch] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedPublisher, setSelectedPublisher] = useState('');

  // Fetch all publishers for dropdown
  const { data: publishers = [] } = useQuery({
    queryKey: ['publishers'],
    queryFn: async () => {
      const res = await axiosSecure.get('/publishers');
      return res.data;
    }
  });

  const isPremium = userFromDB?.premiumExpiresAt && new Date(userFromDB?.premiumExpiresAt) > new Date();

  // console.log(isPremium)
  // Tag options (can also be dynamic if needed)
  const tagOptions = [
    { value: 'Politics', label: 'Politics' },
    { value: 'Sports', label: 'Sports' },
    { value: 'Technology', label: 'Technology' },
    { value: 'Health', label: 'Health' },
    { value: 'Entertainment', label: 'Entertainment' }
  ];

  // Fetch filtered articles
  const { data: articles = [], isLoading } = useQuery({
    queryKey: ['approved-articles', search, selectedPublisher, selectedTags],
    queryFn: async () => {
      const tagValues = selectedTags.map((tag) => tag.value).join(',');
      const res = await axiosSecure.get('/articles/approved', {
        params: {
          search,
          publisher: selectedPublisher,
          tags: tagValues
        }
      });
      return res.data;
    }
  });

  // Mutation to increment view count
  const viewMutation = useMutation({
    mutationFn: (id) => axiosSecure.patch(`/articles/views/${id}`),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries(['article', id]);
    }
  });

  // Increase view count on mount
  const handleViewCount = (id) => {
    if (!id) return;
    viewMutation.mutate(id);
  };

  const handleSearchChange = (e) => setSearch(e.target.value);
  const handleTagChange = (selected) => setSelectedTags(selected || []);
  const handlePublisherChange = (e) => setSelectedPublisher(e.target.value);

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-3xl font-bold">All Articles</h2>

      {/* Search + Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <input type="text" placeholder="Search by title" className="input input-bordered w-full md:w-1/3" value={search} onChange={handleSearchChange} />

        <select className="select select-bordered w-full md:w-1/4" value={selectedPublisher} onChange={handlePublisherChange}>
          <option value="">All Publishers</option>
          {publishers.map((p) => (
            <option key={p._id} value={p.name}>
              {p.name}
            </option>
          ))}
        </select>

        <div className="w-full md:w-1/3">
          <Select isMulti options={tagOptions} onChange={handleTagChange} placeholder="Filter by tags" />
        </div>
      </div>

      {/* Loading State */}
      {isLoading && <div className="text-center my-10">Loading...</div>}

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <div key={article._id} className={`card border shadow-md p-4 space-y-3 ${article.isPremium ? 'bg-yellow-50 border-yellow-400' : 'bg-white'}`}>
            <img src={article.image} alt={article.title} className="w-full h-48 object-cover rounded" />
            <h3 className="text-xl font-semibold">
              {article.title} {article.isPremium && <span className="badge badge-warning w-max">Premium</span>}
            </h3>
            <p className="text-sm text-gray-600">{article.publisher}</p>
            <p className="text-sm">{article.description.slice(0, 100)}...</p>

            {article.isPremium ? (
              !isPremium ? (
                <button className="btn btn-sm btn-disabled w-full">Premium - Subscribe</button>
              ) : (
                <Link to={`/articleDetails/${article._id}`} onClick={() => handleViewCount(article._id)} className="btn btn-sm btn-primary w-full text-center">
                  Details
                </Link>
              )
            ) : (
              <Link to={`/articleDetails/${article._id}`} onClick={() => handleViewCount(article._id)} className="btn btn-sm btn-primary w-full text-center">
                Details
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllArticlesPublic;
