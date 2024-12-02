// pages/secret/edit/[id].tsx
'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { use } from 'react';

const EditSecretPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const [secretContent, setSecretContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { id } = use(params); // Get the secret ID from the query params

  // Fetch the existing secret content on page load
  useEffect(() => {
    if (id) {
      const fetchSecret = async () => {
        try {
          const secretId = id[0];
          const response = await axios.get(`/api/secret/getOne?id=${id}`);
          if (response.status === 200) {
            setSecretContent(response.data.content); // Pre-fill with current content
          } else {
            setError('Secret not found');
          }
        } catch (err) {
          setError('Error fetching secret');
        }
      };

      fetchSecret();
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSecretContent(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!secretContent) {
      setError('Secret content cannot be empty');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const response = await axios.put('/api/secret/edit', {
        secretId: id,
        content: secretContent,
      });

      if (response.status === 200) {
        router.push('/'); // Redirect after successful update
      } else {
        setError('Failed to update secret');
      }
    } catch (err) {
      setError('An error occurred while updating the secret');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='flex w-full flex-col items-center justify-center'>
      <div className='max-w-md rounded-lg bg-white p-8 text-black shadow-md'>
        <h2 className='mb-6 text-center text-2xl font-bold'>Edit Secret</h2>

        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label
              className='mb-2 block text-sm font-bold text-gray-700'
              htmlFor='secret'
            >
              Edit your secret
            </label>
            <textarea
              name='secret'
              id='secret'
              value={secretContent}
              onChange={handleChange}
              className='w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
              rows={5}
              required
            />
          </div>
          {error && <p className='mb-4 text-sm text-red-500'>{error}</p>}
          <div className='flex items-center justify-between'>
            <button
              type='submit'
              className='w-full rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Updating...' : 'Update Secret'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSecretPage;
