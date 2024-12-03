'use client';

interface LoadingProps {
  text: string;
}

const Loading: React.FC<LoadingProps> = ({ text }: LoadingProps) => {
  return (
    <div className='flex min-h-[90vh] flex-col items-center justify-center space-y-2'>
      <p className='text-xl font-semibold'>Loading {text}</p>
      <p className='text-sm text-gray-500'>Please wait...</p>
    </div>
  );
};

export default Loading;
