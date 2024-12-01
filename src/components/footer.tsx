import React from 'react';

const Footer = () => {
  return (
    <footer className='flex items-center justify-between bg-gray-800 p-4 text-white'>
      <h2 className='text-xl font-bold'>secretlyOurs</h2>
      <div className='space-x-4'>
        <a href='#' className='hover:text-gray-400'>
          About
        </a>
        <a href='#' className='hover:text-gray-400'>
          Contact
        </a>
        <a href='#' className='hover:text-gray-400'>
          Privacy Policy
        </a>
        <a href='#' className='hover:text-gray-400'>
          Terms of Service
        </a>
      </div>
    </footer>
  );
};

export default Footer;
