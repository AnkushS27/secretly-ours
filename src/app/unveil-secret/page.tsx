'use client';

import { useState } from 'react';

import SecretCard from '../components/secret';

const UnveilSecretPage: React.FC = () => {
  const [secret, setSecret] = useState('');

  const secrets = [
    { content: 'This is the first secret.', author: 'Author 1' },
    { content: 'This is the first secret.', author: 'Author 1' },
    { content: 'This is the first secret.', author: 'Author 1' },
    { content: 'This is the first secret.', author: 'Author 1' },
    { content: 'This is the second secret.', author: 'Author 2' },
    // Add more secrets here
  ];

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSecret(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle unveiling secret logic here
    console.log('Secret unveiled:', secret);
  };

  return (
    <div className='flex min-h-screen flex-col items-center gap-10 bg-gray-100 p-10'>
      <div className='w-full max-w-md rounded-lg bg-white p-8 shadow-md'>
        <h2 className='mb-6 text-center text-2xl font-bold'>Unveil Secret</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label
              className='mb-2 block text-sm font-bold text-gray-700'
              htmlFor='secret'
            >
              Enter your secret
            </label>
            <textarea
              name='secret'
              id='secret'
              value={secret}
              onChange={handleChange}
              className='w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
              rows={5}
              required
            />
          </div>
          <div className='flex items-center justify-between'>
            <button
              type='submit'
              className='rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              Unveil
            </button>
          </div>
        </form>
      </div>

      <div className='flex flex-col items-center justify-center'>
        <h1 className='text-2xl font-semibold'>Unveiled Secrets</h1>
        <div className='flex flex-wrap justify-center'>
          {secrets.map((secret, index) => (
            <SecretCard
              key={index}
              content={secret.content}
              author={secret.author}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UnveilSecretPage;
