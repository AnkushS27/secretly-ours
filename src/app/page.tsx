'use client';

import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast'; // Import toast and Toaster

import Loading from '@/components/loading';
import { SecretCardProps } from '@/types/ApiResponse';

import SecretCard from '../components/secret'; // Import SecretCard component for display

const Home = () => {
  const [secrets, setSecrets] = useState<SecretCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState('user');
  const [username, setUserName] = useState<string | null>(null);

  const { data: session } = useSession();

  // Fetch secrets
  const fetchSecrets = async () => {
    try {
      const response = await axios.get('/api/secret/getAll'); // API endpoint to get all secrets
      if (response.status === 200) {
        setSecrets(response.data);
      }
    } catch (err: any) {
      // Check if the error is a 404 due to no secrets found
      if (err.response?.status !== 404) {
        toast.error('An error occurred while fetching secrets. Error: ' + err); // Error toast
      }
    } finally {
      setLoading(false);
    }
  };

  // Fetch role (e.g., from context or API)
  const fetchRole = async () => {
    try {
      if (session) {
        setRole(session.user.role);
        setUserName(session.user.username); // Save user ID for authorization checks
      }
    } catch (err) {
      toast.error('Failed to fetch user role'); // Error toast in case of failure
    }
  };

  useEffect(() => {
    fetchRole();
    fetchSecrets();
  }, [session]);

  // Handle editing a secret
  const handleEdit = (secretId: string) => {
    const secretToEdit = secrets.find((secret) => secret._id === secretId);
    if (secretToEdit && secretToEdit.user) {
      // Ensure the current user is the owner of the secret
      if (
        role === 'admin' ||
        role === 'moderator' ||
        secretToEdit.user.username === username
      ) {
        window.location.href = `/secret/${secretId}`; // Redirect to edit page
        toast.loading('Redirecting to edit secret'); // Info toast
      } else {
        toast.error('You are not authorized to edit this secret'); // Error toast
      }
    }
  };

  // Handle deleting a secret
  const handleDelete = async (secretId: string) => {
    const secretToDelete = secrets.find((secret) => secret._id === secretId);
    if (secretToDelete && secretToDelete.user) {
      // Ensure the current user is the owner of the secret
      if (
        role === 'admin' ||
        role === 'moderator' ||
        secretToDelete.user.username === username
      ) {
        try {
          const response = await axios.delete(`/api/secret/delete`, {
            data: { secretId },
          });
          if (response.status === 200) {
            setSecrets(secrets.filter((secret) => secret._id !== secretId));
            toast.success('Secret deleted successfully'); // Success toast
          } else {
            toast.error('Failed to delete secret'); // Error toast
          }
        } catch (err) {
          toast.error('An error occurred while deleting secret'); // Error toast
        }
      } else {
        toast.error('You are not authorized to delete this secret'); // Error toast
      }
    }
  };

  if (loading) return <Loading text='secrets' />;

  return (
    <main className='flex min-h-[90vh] flex-col justify-between font-[family-name:var(--font-geist-sans)]'>
      <div className='flex flex-wrap justify-center'>
        {secrets.length === 0 ? (
          // Show message when there are no secrets
          <p className='text-gray-500'>No secrets to display.</p>
        ) : (
          secrets.map((secret) => (
            <SecretCard
              key={secret._id}
              _id={secret._id}
              content={secret.content}
              user={secret.user}
              role={role}
              onEdit={() => secret._id && handleEdit(secret._id)} // Handle edit
              onDelete={() => secret._id && handleDelete(secret._id)} // Handle delete
            />
          ))
        )}
      </div>
    </main>
  );
};

export default Home;
