interface SecretCardProps {
  content: string;
  author: string;
}

const SecretCard = ({ content, author }: SecretCardProps) => {
  return (
    <div className='m-4 max-w-sm overflow-hidden rounded bg-white p-4 shadow-lg'>
      <p className='text-base text-gray-700'>{content}</p>
      <div className='mt-4 text-right'>
        <span className='text-sm text-gray-600'>- {author}</span>
      </div>
    </div>
  );
};

export default SecretCard;
