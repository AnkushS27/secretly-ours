'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast'; // Import toast for notifications

const Navbar = () => {
  const { data: session } = useSession(); // Get session data from next-auth
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // New state to check if the user is admin

  const router = useRouter();

  // Handle user logout
  const handleLogout = async () => {
    try {
      await signOut();
      router.replace('/');
      toast.success('Successfully logged out'); // Success toast on successful logout
    } catch (error) {
      toast.error('Logout failed. Error:' + error); // Error toast on logout failure
    }
  };

  // Check if the session has a valid user and role
  useEffect(() => {
    if (session) {
      setIsLoggedIn(true);
      if (session.user?.role === 'admin') {
        setIsAdmin(true); // If the role is admin, show the dashboard link
      } else {
        setIsAdmin(false); // Otherwise, hide the dashboard link
      }
    } else {
      setIsLoggedIn(false);
      setIsAdmin(false);
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

        {/* Show Dashboard link only if the user is logged in and is an admin */}
        {isLoggedIn && isAdmin && (
          <Link href='/dashboard' className='hover:text-gray-400'>
            Dashboard
          </Link>
        )}

        {/* Conditionally render links based on login status */}
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
