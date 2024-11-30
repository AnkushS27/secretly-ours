'use client';

import { useState } from 'react';

const ProfilePage: React.FC = () => {
  const [profileData, setProfileData] = useState({
    username: 'JohnDoe',
    email: 'johndoe@example.com',
    bio: 'This is a short bio about John Doe.',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle profile update logic here
    console.log('Profile updated:', profileData);
  };

  return (
    <div className='flex h-screen items-center justify-center bg-gray-100'>
      <div className='w-full max-w-md rounded-lg bg-white p-8 shadow-md'>
        <h2 className='mb-6 text-center text-2xl font-bold'>Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label
              className='mb-2 block text-sm font-bold text-gray-700'
              htmlFor='username'
            >
              Anonymous Username
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
