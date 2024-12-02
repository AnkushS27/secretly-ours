'use client';

import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import { SecretCardProps } from '@/types/ApiResponse';

import SecretCard from '../components/secret'; // Import SecretCard component for display

const Home = () => {
  const [secrets, setSecrets] = useState<SecretCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [role, setRole] = useState('');

  const { data: session } = useSession();

  // Fetch secrets
  const fetchSecrets = async () => {
    try {
      const response = await axios.get('/api/secret/getAll'); // API endpoint to get all secrets
      if (response.status === 200) {
        setSecrets(response.data);
      } else {
        setError('Failed to load secrets');
      }
    } catch (err) {
      setError('An error occurred while fetching secrets');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch role (e.g., from context or API)
  const fetchRole = async () => {
    try {
      // Fetch user role (context)
      if (session) {
        setRole(session.user.role);
      }
    } catch (err) {
      console.error('Failed to fetch user role:', err);
    }
  };

  useEffect(() => {
    fetchRole();
    fetchSecrets();
  }, [session]);

  // Handle editing a secret
  const handleEdit = (secretId: string) => {
    // Redirect to edit page with secretId and content
    const secretToEdit = secrets.find((secret) => secret._id === secretId);
    if (secretToEdit) {
      window.location.href = `/secret/${secretId}`;
    }
    // Implement edit functionality (e.g., show a modal or navigate to an edit page)
  };

  // Handle deleting a secret
  const handleDelete = async (secretId: string) => {
    try {
      const response = await axios.delete(`/api/secret/delete`, {
        data: { secretId },
      });
      if (response.status === 200) {
        // Remove deleted secret from state
        setSecrets(secrets.filter((secret: any) => secret._id !== secretId));
      } else {
        console.error('Failed to delete secret');
      }
    } catch (err) {
      console.error('An error occurred while deleting secret:', err);
    }
  };

  if (loading) return <p>Loading secrets...</p>;

  return (
    <main className='flex min-h-screen flex-col justify-between font-[family-name:var(--font-geist-sans)]'>
      <div className='flex flex-wrap justify-center'>
        {error ? (
          <p className='text-red-500'>{error}</p>
        ) : (
          secrets.map((secret: any) => (
            <SecretCard
              key={secret._id}
              _id={secret._id} // Secret ID
              content={secret.content}
              user={secret.user} // User who posted the secret
              role={role} // User's role (user, moderator, admin)
              onEdit={() => handleEdit(secret._id)} // Handle edit
              onDelete={() => handleDelete(secret._id)} // Handle delete
            />
          ))
        )}
      </div>
    </main>
  );
};

export default Home;
