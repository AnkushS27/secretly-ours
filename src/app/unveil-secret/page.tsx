'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react'; // Import useSession hook from next-auth
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast'; // Import toast and Toaster

import SecretCard from '@/components/secret'; // Import SecretCard component for display
import { ApiResponse, SecretCardProps } from '@/types/ApiResponse';

const UnveilSecretPage: React.FC = () => {
  const { data: session } = useSession();

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
      toast.error('Secret cannot be empty'); // Error toast
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

      toast.success('Secret unveiled successfully'); // Success toast
      router.replace('/'); // Adjust the route as needed
    } catch (error: any) {
      setError(error.message || 'An error occurred');
      toast.error(error.message || 'An error occurred'); // Error toast
    } finally {
      setIsSubmitting(false);
    }
  };

  // Fetch user's secrets
  const fetchSecrets = async () => {
    try {
      const response = await axios.get<ApiResponse>('/api/secret/user-secrets');
      if (response.status === 200) {
        const userSecrets = response.data as any;

        console.log(userSecrets);

        // Handle the case where there are no secrets
        if (!userSecrets || userSecrets.length === 0) {
          setSecrets([]); // Set empty array when no secrets are returned
        } else {
          setSecrets(userSecrets as any);
        }
      } else {
        throw new Error('Failed to fetch secrets');
      }
    } catch (error: any) {
      setError('An error occurred while fetching secrets');
      toast.error('An error occurred while fetching secrets'); // Error toast
    }
  };

  useEffect(() => {
    fetchSecrets();
  }, []);

  // Handle editing a secret
  const handleEdit = (secretId: string) => {
    const secretToEdit = secrets.find((secret) => secret._id === secretId);
    if (secretToEdit) {
      window.location.href = `/secret/${secretId}`; // Redirect to edit page
      toast.loading('Redirecting to edit secret'); // Info toast
    }
  };

  // Handle deleting a secret
  const handleDelete = async (secretId: string) => {
    try {
      const response = await axios.delete('/api/secret/delete', {
        data: { secretId },
      });

      if (response.status === 200) {
        setSecrets((prevSecrets) =>
          prevSecrets.filter((secret) => secret._id !== secretId)
        );
        toast.success('Secret deleted successfully');
      } else {
        toast.error('Failed to delete secret');
      }
    } catch (error) {
      toast.error('Failed to delete secret');
    }
  };

  return (
    <div className='flex min-h-[90vh] w-full flex-col items-center justify-center gap-12 bg-gray-100 p-10 text-black'>
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
                role={session?.user.role}
                onEdit={() => secretItem._id && handleEdit(secretItem._id)} // Handle edit
                onDelete={() => secretItem._id && handleDelete(secretItem._id)} // Handle delete
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UnveilSecretPage;
