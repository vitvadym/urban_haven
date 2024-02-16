import { useState } from 'react';
import { TiDeleteOutline } from 'react-icons/ti';

// eslint-disable-next-line react/prop-types
export const ListingPreviewImage = ({ imageUrl, onDelete }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoading = () => {
    setImageLoaded(true);
  };
  return (
    <div className='relative'>
      <img
        className='w-30 h-20 rounded-lg shadow-md'
        src={imageUrl}
        alt='listing image'
        onLoad={handleImageLoading}
      />
      {imageLoaded && (
        <span
          onClick={onDelete}
          title='delete image'
          className='absolute right-1 top-1 cursor-pointer rounded-full'
        >
          <TiDeleteOutline />
        </span>
      )}
    </div>
  );
};
