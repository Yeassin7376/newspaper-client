import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import axios from 'axios';

const tagsOptions = [
  { value: 'Health', label: 'Health' },
  { value: 'Politics', label: 'Politics' },
  { value: 'Education', label: 'Education' },
  { value: 'Sports', label: 'Sports' },
  { value: 'Technology', label: 'Technology' }
];

const UpdateArticle = ({ article, onClose, refetch }) => {
  const { register, handleSubmit, control, setValue } = useForm();
  const axiosSecure = useAxiosSecure();

  // Load publisher list
  const { data: publishers = [] } = useQuery({
    queryKey: ['publishers'],
    queryFn: async () => {
      const res = await axiosSecure.get('/publishers');
      return res.data;
    }
  });

//   console.log(article.publisher);

  // Pre-fill values
  useEffect(() => {
    if (article && publishers.length) {
      setValue('title', article.title);
      setValue('publisher', article.publisher);
      setValue('description', article.description);
      setValue(
        'tags',
        article.tags.map((tag) => ({ value: tag, label: tag }))
      );
    }
  }, [article, publishers, setValue]);

  const onSubmit = async (data) => {
    try {
      let imageUrl = article.image;

      // If user selected a new image
      if (data.image[0]) {
        const formData = new FormData();
        formData.append('image', data.image[0]);

        const imgbbRes = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`, formData);

        imageUrl = imgbbRes.data.data.url;
      }

      const updatedData = {
        title: data.title,
        publisher: data.publisher,
        tags: data.tags.map((tag) => tag.value),
        description: data.description,
        image: imageUrl,
        updated_at: new Date()
      };

      await axiosSecure.patch(`/articles/${article._id}`, updatedData);
      Swal.fire('Success', 'Article updated successfully', 'success');
      refetch(); // refetch user's articles
      onClose(); // close modal
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'Failed to update article', 'error');
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow rounded-md">
      <h2 className="text-xl font-semibold mb-4">Update Article</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Title */}
        <input {...register('title', { required: true })} placeholder="Title" className="input input-bordered w-full" />

        {/* Publisher Dropdown */}
        <select {...register('publisher', { required: true })} className="select select-bordered w-full">
          <option value="">Select Publisher</option>
          {publishers.map((pub) => (
            <option key={pub._id} value={pub.name}>
              {pub.name}
            </option>
          ))}
        </select>

        {/* Tags Multi Select */}
        <Controller
          name="tags"
          control={control}
          render={({ field }) => <Select {...field} isMulti options={tagsOptions} className="react-select-container" classNamePrefix="react-select" />}
        />

        {/* Description */}
        <textarea {...register('description', { required: true })} placeholder="Description" rows="5" className="textarea textarea-bordered w-full" />

        {/* Image Upload */}
        <input {...register('image')} type="file" accept="image/*" className="file-input file-input-bordered w-full" />

        {/* Submit */}
        <div className="flex justify-end gap-2">
          <button type="button" className="btn btn-ghost" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Update Article
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateArticle;
