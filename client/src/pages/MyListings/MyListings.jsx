import { useSelector } from 'react-redux';
import {
  selectListings,
  selectError,
  selectIsLoading,
} from '../../redux/slices/listingSlice';
import { getMyListings } from '../../redux/slices/listingSlice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { ListingCart } from '../../components/ListingCart/ListingCart';
import { EmptyData } from '../../components/EmptyData/EmptyData';

export const MyListings = () => {
  const listings = useSelector(selectListings);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyListings());
  }, [dispatch]);

  return (
    <main className='mx-auto flex max-w-6xl flex-auto flex-wrap gap-4 p-5'>
      {listings.length > 0
        ? listings.map((listing) => (
            <ListingCart
              listing={listing}
              key={listing._id}
            />
          ))
        : !isLoading && <EmptyData />}

      {error && (
        <p className='mt-2 text-2xl font-bold text-red-500'> {error}</p>
      )}
    </main>
  );
};
