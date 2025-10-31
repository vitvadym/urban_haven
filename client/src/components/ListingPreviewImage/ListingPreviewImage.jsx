import { TiDeleteOutline } from 'react-icons/ti';

// eslint-disable-next-line react/prop-types
export const ListingPreviewImage = ({ imageUrl, onDelete }) => {
  return (
    <div className='group relative transition-all duration-200 ease-in-out hover:scale-105'>
      <img
        className='w-30 h-20 rounded-lg shadow-md'
        src={imageUrl}
        alt='listing image'
      />
      <span
        onClick={onDelete}
        title='delete image'
        className='absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 cursor-pointer group-hover:block'
      >
        <TiDeleteOutline className='h-10 w-10 text-white drop-shadow-md' />
      </span>
    </div>
  );
};
