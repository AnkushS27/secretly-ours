'use client';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import Loading from '@/components/loading';

const Dashboard = () => {
  const { data: session, status } = useSession();
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return; // Avoid redirect on initial loading

    // If no session or user is not admin, redirect to home
    if (!session || session.user.role !== 'admin') {
      router.replace('/');
    } else {
      setIsAdmin(true); // Only allow if admin
    }
  }, [session, status, router]);

  if (status === 'loading') {
    return <Loading text='page' />;
  }

  if (!isAdmin) {
    return <div>You do not have permission to access this page.</div>;
  }

  return (
    <div className='min-h-[90vh] p-10'>
      <h1 className='text-3xl'>Admin Dashboard</h1>

      {/* Links to manage users, roles, and secrets */}
      <div className='mt-6 flex gap-10'>
        <button
          onClick={() => router.push('/dashboard/manage-users')}
          className='rounded-md bg-blue-600 p-3 font-semibold text-white hover:bg-opacity-80'
        >
          Manage Users
        </button>
        <button
          onClick={() => router.push('/dashboard/manage-secrets')}
          className='rounded-md bg-blue-600 p-3 font-semibold text-white hover:bg-opacity-80'
        >
          Manage Secrets
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
