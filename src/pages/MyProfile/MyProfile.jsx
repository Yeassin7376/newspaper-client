import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { FaCrown } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../shared/Loading/Loading';
import { GrUserAdmin } from 'react-icons/gr';

const MyProfile = () => {
  const { user, updataUserProfile } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm();


  const { data: userFromDB, isLoading } = useQuery({
    queryKey: ['userProfile', user?.email],
    queryFn: async () => {
      if (!user?.email) return null;
      const res = await axiosSecure.get(`/user?email=${user.email}`);
      return res.data;
    }
  });
  //   console.log(userFromDB);

  // Pre-fill form with user data
  useEffect(() => {
    if (user) {
      setValue('name', user.displayName || '');
      setValue('email', user.email || '');
    }
  }, [user, setValue]);

  const handleUpdateClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const onSubmit = async (data) => {
    try {
      let photoURL = user?.photoURL;

      // Upload new image if provided
      const imageFile = data.photo[0];
      if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);
        const uploadRes = await fetch(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`, {
          method: 'POST',
          body: formData
        });
        const uploadData = await uploadRes.json();
        photoURL = uploadData.data.url;
      }

      const profileInfo = {
        displayName: data.name,
        photoURL: photoURL
      };
      // Update Firebase displayName and photoURL
      await updataUserProfile(profileInfo);

      // Update backend user record
      await axiosSecure.patch(`/users/${user.email}`, {
        name: data.name,
        photoURL
      });

      Swal.fire('Success', 'Profile updated successfully', 'success');
      handleCloseModal();
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Failed to update profile', 'error');
    }
  };
  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="max-w-xl mx-auto mt-10">
      {/* Profile Card */}
      <div className="bg-base-200 shadow-md rounded-md p-6 md:py-20 text-center">
        <img src={user?.photoURL} alt="User" className="w-28 h-28 p-1 bg-blue-300 rounded-full mx-auto mb-4 object-cover" />
        <h2 className="text-xl font-semibold flex justify-center items-center gap-2.5">
          {userFromDB?.premiumExpiresAt && <FaCrown className="text-4xl text-yellow-600 " />}
          {userFromDB?.role === 'admin' && <GrUserAdmin />}
          {user?.displayName}
        </h2>
        <p className="text-gray-500 dark:text-gray-300">{user?.email}</p>
        <button onClick={handleUpdateClick} className="mt-4 btn btn-outline btn-primary">
          Update Profile
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-opacity-40 z-50 flex items-center justify-center">
          <div className="bg-base-100 rounded-lg p-6 w-full max-w-md shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Update Profile</h3>
              <button className="text-gray-500" onClick={handleCloseModal}>
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Name */}
              <div>
                <label className="label">Name</label>
                <input {...register('name', { required: true })} className="input input-bordered w-full" />
                {errors.name && <p className="text-sm text-red-500">Name is required</p>}
              </div>

              {/* Email (readonly) */}
              <div>
                <label className="label">Email</label>
                <input {...register('email')} readOnly className="input input-bordered w-full" />
              </div>

              {/* Image File */}
              <div>
                <label className="label">New Photo</label>
                <input {...register('photo')} type="file" accept="image/*" className="file-input file-input-bordered w-full" />
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-2">
                <button type="button" className="btn btn-ghost" onClick={handleCloseModal}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProfile;
