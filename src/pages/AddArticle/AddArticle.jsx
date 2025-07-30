import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useQuery, useMutation } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';

const TAG_OPTIONS = [
  { value: 'Politics', label: 'Politics' },
  { value: 'Sports', label: 'Sports' },
  { value: 'Technology', label: 'Technology' },
  { value: 'Health', label: 'Health' },
  { value: 'Entertainment', label: 'Entertainment' }
];

const AddArticle = () => {
  const { register, handleSubmit, control, reset } = useForm();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // Fetch publishers using React Query
  const { data: publishers = [], isLoading: isPublishersLoading } = useQuery({
    queryKey: ['publishers'],
    queryFn: async () => {
      const res = await axiosSecure.get('/publishers');
      return res.data;
    }
  });

  // Mutation for submitting article
  const mutation = useMutation({
    mutationFn: (articleData) => axiosSecure.post('/articles', articleData),
    onSuccess: () => {
      Swal.fire('Success', 'Article submitted for review.', 'success');
      reset();
    },
    onError: () => {
      Swal.fire('Error', 'Something went wrong.', 'error');
    }
  });

  const onSubmit = async (data) => {
    try {
      // 1. Upload image to imgbb
      const imageFile = data.image[0];
      const formData = new FormData();
      formData.append('image', imageFile);
      const imgbbRes = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`, formData);
      const imageUrl = imgbbRes.data.data.url;

      // 2. Prepare article data
      const articleData = {
        title: data.title,
        image: imageUrl,
        publisher: data.publisher,
        tags: data.tags.map((tag) => tag.value),
        description: data.description,
        authorEmail: user?.email || 'unknown',
        authorName: user?.displayName || 'unknown',
        authorPhoto: user?.photoURL || 'unknown',
        isPremium: false, // default value
        status: 'pending', // default status
        created_at: new Date(),
        updated_at: new Date()
      };

      // 3. Submit using mutation
      mutation.mutate(articleData);
    } catch (err) {
      console.error('❌ Error submitting article:', err);
      Swal.fire('Error', 'Failed to submit article', 'error');
    }
  };

  if (isPublishersLoading) {
    return <span className="loading loading-bars loading-sm"></span>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow mt-10">
      <h2 className="text-2xl font-semibold mb-6">Add New Article</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Author Info (Read-only fields) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="label">
              <span className="label-text">Author Name</span>
            </label>
            <input type="text" value={user?.displayName || 'Unknown'} readOnly className="input input-bordered w-full bg-base-200" />
          </div>

          <div>
            <label className="label">
              <span className="label-text">Author Email</span>
            </label>
            <input type="text" value={user?.email || 'Unknown'} readOnly className="input input-bordered w-full bg-base-200" />
          </div>
        </div>

        <div>
          <label className="block font-medium mb-1">Title</label>
          <input {...register('title', { required: true })} type="text" className="input input-bordered w-full" />
        </div>

        <div>
          <label className="block font-medium mb-1">Image</label>
          <input {...register('image', { required: true })} type="file" accept="image/*" className="file-input file-input-bordered w-full" />
        </div>

        <div>
          <label className="block font-medium mb-1">Publisher</label>
          <select {...register('publisher', { required: true })} className="select select-bordered w-full">
            <option value="">Select Publisher</option>
            {publishers.map((pub) => (
              <option key={pub._id} value={pub.name}>
                {pub.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Tags</label>
          <Controller
            name="tags"
            control={control}
            rules={{ required: true }}
            render={({ field }) => <Select {...field} isMulti options={TAG_OPTIONS} classNamePrefix="react-select" />}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea {...register('description', { required: true })} className="textarea textarea-bordered w-full" rows="5"></textarea>
        </div>

        <button type="submit" className="btn btn-primary w-full" disabled={mutation.isLoading}>
          {mutation.isLoading ? 'Submitting...' : 'Submit Article'}
        </button>
      </form>
    </div>
  );
};

export default AddArticle;
