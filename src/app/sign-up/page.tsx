'use client';

import { useState } from 'react';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'user',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-100'>
      <div className='w-full max-w-md rounded-lg bg-white p-8 shadow-md'>
        <h2 className='mb-6 text-center text-2xl font-bold'>Signup</h2>

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
              value={formData.username}
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
              value={formData.email}
              onChange={handleChange}
              className='w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            />
          </div>
          <div className='mb-4'>
            <label
              className='mb-2 block text-sm font-bold text-gray-700'
              htmlFor='password'
            >
              Password
            </label>
            <input
              type='password'
              name='password'
              id='password'
              value={formData.password}
              onChange={handleChange}
              className='w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            />
          </div>
          <div className='mb-6'>
            <label
              className='mb-2 block text-sm font-bold text-gray-700'
              htmlFor='role'
            >
              Role
            </label>
            <select
              name='role'
              id='role'
              value={formData.role}
              onChange={handleChange}
              className='w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              <option value='user'>User</option>
              <option value='admin'>Admin</option>
              <option value='moderator'>Moderator</option>
            </select>
          </div>
          <div className='flex items-center justify-between'>
            <button
              type='submit'
              className='w-full rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              Signup
            </button>
          </div>
        </form>

        <div className='mt-4 text-center'>
          <p className='text-gray-600'>
            Already have an account?{' '}
            <a href='/sign-in' className='text-blue-500 hover:underline'>
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
