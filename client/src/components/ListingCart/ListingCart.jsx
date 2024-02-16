/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';

export const ListingCart = ({ listing }) => {
  return (
    <div className='relative w-full overflow-hidden rounded-lg bg-white shadow-md duration-300 hover:shadow-lg sm:w-[330px]'>
      <Link to={`/listing-item/${listing._id}`}>
        <img
          src={listing.images[0] || 'https://shorturl.at/gpLY8'}
          alt='listing cover'
          className='h-[320px] w-full object-cover duration-300 hover:scale-105 sm:h-[220px]'
        />

        <div className='flex w-full flex-col gap-2 p-3'>
          <p className='truncate text-lg font-semibold text-slate-700'>
            {listing.name}
          </p>
          <div className='flex items-center gap-1'>
            <MdLocationOn className='h-4 w-4 text-green-700' />
            <p className='w-full truncate text-sm text-gray-600'>
              {listing?.address}
            </p>
          </div>
          <p className='line-clamp-2 text-sm text-gray-600'>
            {listing.description}
          </p>
          <p className='mt-2 font-semibold text-slate-500 '>
            $
            {listing.offer
              ? listing.discountPrice.toLocaleString('en-US')
              : listing.regularPrice.toLocaleString('en-US')}
            {listing.type === 'rent' && ' / month'}
          </p>
          <div className='flex gap-4 text-slate-700'>
            <div className='text-xs font-bold'>
              {listing.bedrooms > 1
                ? `${listing.bedrooms} beds `
                : `${listing.bedrooms} bed `}
            </div>
            <div className='text-xs font-bold'>
              {listing.bathrooms > 1
                ? `${listing.bathrooms} baths `
                : `${listing.bathrooms} bath `}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
