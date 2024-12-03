'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast'; // Import react-hot-toast

import DashboardNavbar from '@/components/dashboardNavbar';
import Loading from '@/components/loading';
import { Secret } from '@/types/ApiResponse';

const ManageSecretsPage = () => {
  const [secrets, setSecrets] = useState<Secret[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch secrets data from the API
  useEffect(() => {
    const fetchSecrets = async () => {
      try {
        const response = await axios.get('/api/admin/manage-secrets');
        setSecrets(response.data);
      } catch (error) {
        toast.error('Error fetching secrets. Error: ' + error);
      } finally {
        setLoading(false);
      }
    };
    fetchSecrets();
  }, []);

  // Handle secret deletion
  const handleDeleteSecret = async (secretId: string) => {
    try {
      await axios.delete(`/api/admin/manage-secret`, { data: { secretId } });
      setSecrets(secrets.filter((secret) => secret._id !== secretId));
      toast.success('Secret deleted successfully.');
    } catch (error) {
      toast.error('Error deleting secret.');
    }
  };

  // Loading state
  if (loading) {
    return <Loading text='secrets' />;
  }

  return (
    <div className='min-h-[90vh] p-10'>
      <DashboardNavbar />
      <h2 className='mb-10 text-center text-2xl font-semibold'>
        Manage Secrets
      </h2>
      <table className='mt-4 w-full text-left'>
        <thead>
          <tr>
            <th className='px-4 py-2'>Secret</th>
            <th className='px-4 py-2'>Created By (User id)</th>
            <th className='px-4 py-2'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {secrets.map((secret) => (
            <tr key={secret._id}>
              <td className='px-4 py-2'>{secret.content}</td>
              <td className='px-4 py-2'>{secret.user}</td>
              <td className='px-4 py-2'>
                <button
                  onClick={() => handleDeleteSecret(secret._id)}
                  className='text-red-500 hover:text-red-700'
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageSecretsPage;
