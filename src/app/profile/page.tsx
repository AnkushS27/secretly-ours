'use client';

import { useSession } from 'next-auth/react'; // Assuming you're using next-auth
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast'; // Import toast for notifications

const ProfilePage: React.FC = () => {
  const { data: session } = useSession(); // Get session data (user info)
  const [profileData, setProfileData] = useState({
    username: '',
    email: '',
  });

  useEffect(() => {
    if (session) {
      // Populate the profile data if session is available
      setProfileData({
        username: session.user.username || '',
        email: session.user.email || '',
      });
    }
  }, [session]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session) {
      toast.error('Please log in to update your profile');
      return;
    }

    try {
      // You can send a PUT or POST request here to update the profile.
      const response = await fetch('/api/user/updateInfo', {
        method: 'POST',
        body: JSON.stringify(profileData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Profile updated successfully');
      } else {
        toast.error('Failed to update profile');
      }
    } catch (error) {
      toast.error('An error occurred while updating your profile');
    }
  };

  return (
    <div className='flex h-screen items-center justify-center bg-gray-100 text-black'>
      <div className='w-full max-w-md rounded-lg bg-white p-8 shadow-md'>
        <h2 className='mb-6 text-center text-2xl font-bold'>Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label
              className='mb-2 block text-sm font-bold text-gray-700'
              htmlFor='username'
            >
              Username
            </label>
            <input
              type='text'
              name='username'
              id='username'
              value={profileData.username}
              onChange={handleChange}
              className='w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            />
          </div>
          <div className='mb-4'>
            <label
              className='mb-2 block text-sm font-bold text-gray-700'
              htmlFor='email'
            >
              Email
            </label>
            <input
              type='email'
              name='email'
              id='email'
              value={profileData.email}
              onChange={handleChange}
              readOnly
              className='w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            />
          </div>
          <div className='flex items-center justify-between'>
            <button
              type='submit'
              className='rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
