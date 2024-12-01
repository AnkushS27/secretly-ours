'use client';

import Link from 'next/link';
import { useState } from 'react';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

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
            <button
              onClick={() => setIsLoggedIn(false)}
              className='hover:text-gray-400'
            >
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
