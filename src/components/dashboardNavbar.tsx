'use client';

import { useRouter } from 'next/navigation';

const DashboardNavbar: React.FC = () => {
  const router = useRouter();

  const navigateTo = (path: string) => {
    router.push(path);
  };

  return (
    <nav className='mb-10 flex justify-evenly gap-10 bg-white p-4'>
      <button
        onClick={() => navigateTo('/dashboard/manage-users')}
        className='font-semibold hover:text-gray-400 hover:underline'
      >
        Manage Users
      </button>
      <button
        onClick={() => navigateTo('/dashboard/manage-secrets')}
        className='font-semibold hover:text-gray-400 hover:underline'
      >
        Manage Secrets
      </button>
    </nav>
  );
};

export default DashboardNavbar;
