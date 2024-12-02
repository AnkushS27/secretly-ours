'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import SecretCard from '@/components/secret'; // Import SecretCard component for display
import { ApiResponse, SecretCardProps } from '@/types/ApiResponse';

const UnveilSecretPage: React.FC = () => {
  const [secret, setSecret] = useState('');
  const [secrets, setSecrets] = useState<SecretCardProps[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSecret(e.target.value);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!secret) {
      setError('Secret cannot be empty');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      // Send the secret to the API using axios
      const response = await axios.post<ApiResponse>('/api/secret/unveil', {
        content: secret,
      });

      if (response.status !== 201) {
        throw new Error('Failed to unveil secret');
      }

      const newSecret = response.data;

      // Optionally, you can navigate to another page after unveiling the secret
      router.replace('/'); // Adjust the route as needed
    } catch (error: any) {
      setError(error.message || 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<ApiResponse>(
          '/api/secret/user-secrets'
        );

        if (response.status !== 200) {
          throw new Error('Failed to fetch secrets');
        }

        const userSecrets = response.data;

        setSecrets(userSecrets as any);
      } catch (error: any) {
        console.error('Error fetching secrets:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='flex min-h-screen w-full flex-col items-center justify-center gap-12 bg-gray-100 p-10 text-black'>
      <div className='w-full max-w-md rounded-lg bg-white p-8 shadow-md'>
        <h2 className='mb-6 text-center text-2xl font-bold'>Unveil Secret</h2>

        <form onSubmit={onSubmit}>
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
          {error && <p className='mb-4 text-sm text-red-500'>{error}</p>}
          <div className='flex items-center justify-between'>
            <button
              type='submit'
              className='w-full rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Unveil Secret'}
            </button>
          </div>
        </form>
      </div>
      {secrets && secrets.length > 0 && (
        <div className='mt-6 w-[90%]'>
          <h3 className='text-center text-lg font-semibold'>
            Unveiled Secrets
          </h3>
          <div className='flex flex-wrap items-center justify-center'>
            {secrets.map((secretItem) => (
              <SecretCard
                key={secretItem._id}
                content={secretItem.content}
                user={secretItem.user}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UnveilSecretPage;
