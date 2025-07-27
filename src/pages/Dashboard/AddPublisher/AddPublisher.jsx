import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import Swal from 'sweetalert2';
import useAxios from '../../../hooks/useAxios';

const AddPublisher = () => {
  const [name, setName] = useState('');
  const [logoFile, setLogoFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const axiosInstant = useAxios();

  const imgbbApiKey = import.meta.env.VITE_image_upload_key; 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !logoFile) {
      toast.error('Please provide both name and logo');
      return;
    }

    setIsLoading(true);

    try {
      // Upload image to imgbb
      const formData = new FormData();
      formData.append('image', logoFile);

      const imgbbRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
        formData
      );

      const logoUrl = imgbbRes.data.data.url;

      // Submit to your backend
      const response = await axiosInstant.post('/publishers', {
        name,
        logoUrl,
      });
      if (response.status == 200 || response.data.inserted == false) {
        Swal.fire('Error', 'Publisher already exists!', 'error');
        return;
      }

      if (response.data.insertedId) {
        Swal.fire('Success', 'Publisher added successfully!', 'success');
        setName('');
        setLogoFile(null);
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong. Try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-semibold mb-6">Add a New Publisher</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="label font-medium">Publisher Name</label>
          <input
            type="text"
            placeholder="e.g., The Daily Star"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label className="label font-medium">Publisher Logo</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setLogoFile(e.target.files[0])}
            className="file-input file-input-bordered w-full"
          />
        </div>
        <button type="submit" className="btn btn-primary w-full" disabled={isLoading}>
          {isLoading ? 'Uploading...' : 'Add Publisher'}
        </button>
      </form>
      <ToastContainer position='top-center'></ToastContainer>
    </div>
  );
};

export default AddPublisher;
