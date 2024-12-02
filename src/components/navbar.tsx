'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const { data: session } = useSession();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut();
      router.replace('/');
    } catch (error: any) {
      console.error('Logout failed:', error);
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
