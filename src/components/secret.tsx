import { SecretCardProps } from '@/types/ApiResponse';

const SecretCard = ({
  content,
  user,
  role,
  onEdit,
  onDelete,
  _id,
}: SecretCardProps) => {
  return (
    <div className='m-4 min-w-60 max-w-sm rounded bg-white p-4 shadow-lg'>
      <p className='text-base text-gray-700'>{content}</p>
      <div className='mt-4 text-right'>
        <span className='text-sm text-gray-600'>- {user.username}</span>
      </div>

      {/* Conditionally render the edit and delete buttons based on user role */}
      {(role === 'user' && user.username === user.username) ||
      role === 'moderator' ||
      role === 'admin' ? (
        <div className='mt-4 flex justify-end space-x-2'>
          {/* Edit Button */}
          <button
            onClick={() => onEdit && onEdit()}
            className='text-sm text-blue-500 hover:underline'
          >
            Edit
          </button>
          {/* Delete Button */}
          <button
            onClick={() => onDelete && onDelete()}
            className='text-sm text-red-500 hover:underline'
          >
            Delete
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default SecretCard;
