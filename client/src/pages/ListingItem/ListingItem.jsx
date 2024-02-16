import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader';
import { RiDeleteBin6Line, RiFileEditLine } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, selectIsAuth } from '../../redux/slices/userSlice';
import { TopSlider } from '../../components/TopSlider/TopSlider';
import { ThumbSlider } from '../../components/ThumbSlider/ThumbSlider';
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
} from 'react-icons/fa';
import styles from './styles.module.css';
import { deleteListing } from '../../redux/slices/listingSlice';

const ListingItem = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const { id: listingId } = useParams();

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [listing, setListing] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const isAuth = useSelector(selectIsAuth);

  const listingAdress = new URLSearchParams(listing?.address).toString();
  const preparedAddress = listingAdress.slice(1, listingAdress.length - 1);

  const GOOGLE_MAP = `https://www.google.com/maps/search/?api=1&query=${preparedAddress}`;

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setIsLoading(true);

        const { data } = await axios.get(`/api/listing/get/${listingId}`);
        setListing(data);
      } catch (error) {
        setError(error.response.data.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchListing();
  }, [listingId]);

  const {
    images,
    name,
    discountPrice,
    regularPrice,
    type,
    description,
    bedrooms,
    bathrooms,
    parking,
    furnished,
    address,
  } = listing ?? {};

  const handleDelete = async () => {
    try {
      setIsLoading(true);

      dispatch(deleteListing(listingId));
      navigate('/my-listings');
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className={styles.wrapper}>
      {isLoading && (
        <div className={styles.loader}>
          <Loader />
        </div>
      )}
      {error && <p className={styles.error}>{error}</p>}
      {listing && !isLoading && !error && (
        <>
          <div className='w-full'>
            <TopSlider
              images={images}
              thumbsSwiper={thumbsSwiper}
            />
            <ThumbSlider
              images={images}
              setThumbsSwiper={setThumbsSwiper}
            />
          </div>
          <div className={styles.content}>
            <h1 className={styles.contentHeader}>
              {name} - $
              <span className={`${discountPrice > 0 ? 'line-through' : ''}`}>
                {regularPrice}
              </span>
              {discountPrice > 0 && (
                <span className='text-red-800'> ${discountPrice}</span>
              )}
              {listing.type === 'rent' && ' / month'}
            </h1>
            <Link
              title='see on map'
              to={GOOGLE_MAP}
              target='_blank'
            >
              <p className={styles.contentAddress}>
                <FaMapMarkerAlt className='text-green-700' /> {address}
              </p>
            </Link>
            <div className='flex items-center gap-4'>
              <p className={styles.contentListingType}>
                {type === 'rent' ? 'For Rent' : 'For Sale'}
              </p>
              {user?._id === listing?.userRef && isAuth && (
                <>
                  <button
                    title='delete'
                    onClick={handleDelete}
                    className='flex  justify-center rounded-md border p-1 duration-200 hover:border-red-900'
                  >
                    <RiDeleteBin6Line />
                  </button>
                  <Link
                    title='edit'
                    to={`/update-listing/${listingId}`}
                  >
                    <button className='flex justify-center rounded-md border p-1 duration-200 hover:border-green-800'>
                      <RiFileEditLine />
                    </button>
                  </Link>
                </>
              )}
            </div>

            <p className={styles.contentDescription}>{description}</p>
            <ul className={styles.amenities}>
              <li className={styles.amenitiesItem}>
                <FaBed className='text-lg' />
                {bedrooms > 1 ? `${bedrooms} beds ` : `${bedrooms} bed `}
              </li>
              <li className={styles.amenitiesItem}>
                <FaBath className='text-lg' />
                {bathrooms > 1 ? `${bathrooms} baths ` : `${bathrooms} bath `}
              </li>
              <li className={styles.amenitiesItem}>
                <FaParking className='text-lg' />
                {parking ? 'Parking spot' : 'No Parking'}
              </li>
              <li className={styles.amenitiesItem}>
                <FaChair className='text-lg' />
                {furnished ? 'Furnished' : 'Unfurnished'}
              </li>
            </ul>
          </div>
        </>
      )}
      {error && <p className={styles.error}>{error}</p>}
    </main>
  );
};

export default ListingItem;
