'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast'; // Import toast for notifications

const Navbar = () => {
  const { data: session } = useSession();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut();
      router.replace('/');
      toast.success('Successfully logged out'); // Success toast on successful logout
    } catch (error: any) {
      toast.error('Logout failed. Please try again'); // Error toast on logout failure
    }
  };

  useEffect(() => {
    if (session) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [session]);

  return (
    <nav className='flex items-center justify-between bg-gray-800 p-4 text-white'>
      <Link href='/' className='text-2xl font-bold'>
        secretlyOurs
      </Link>

      <div className='space-x-4'>
        <Link href='/unveil-secret' className='hover:text-gray-400'>
          Unveil Secret
        </Link>
        {isLoggedIn ? (
          <>
            <Link href='/profile' className='hover:text-gray-400'>
              Profile
            </Link>
            <button onClick={handleLogout} className='hover:text-gray-400'>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href='/sign-in' className='hover:text-gray-400'>
              Login
            </Link>
            <Link href='/sign-up' className='hover:text-gray-400'>
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
