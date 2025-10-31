/* eslint-disable react-hooks/exhaustive-deps */
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { ListingCart } from '../../components/ListingCart/ListingCart';
import Loader from '../../components/Loader';
import { useEffect, useState } from 'react';
import axios from '../../config/axios.js';
export const SearchResults = () => {
  const [initialSearchComplete, setInitialSearchComplete] = useState(false);
  const [isShowMore, setIsShowMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [searchData, setSearchData] = useState({
    query: '',
    parking: false,
    furnished: true,
    type: 'all',
    sort: 'createdAt',
    order: 'desc',
    limit: 9,
  });

  const navigate = useNavigate();

  const { parking, furnished, type, sort, order, query, limit } = searchData;

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);

    const searchTermFromUrl = urlParams.get('query');
    const parkingFromUrl = urlParams.get('parking');
    const furnishedFromUrl = urlParams.get('furnished');
    const typeFromUrl = urlParams.get('type');
    const sortFromUrl = urlParams.get('sort');
    const orderFromUrl = urlParams.get('order');

    if (
      searchTermFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      typeFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSearchData({
        ...searchData,
        query: searchTermFromUrl || '',
        parking: parkingFromUrl === 'true',
        furnished: furnishedFromUrl === 'true',
        type: typeFromUrl || 'all',
        sort: sortFromUrl || 'createdAt',
        order: orderFromUrl || 'desc',
      });
    }
    const fetchListings = async () => {
      setIsLoading(true);
      try {
        const search = urlParams.toString();
        const { data } = await axios.get(`api/listing/get?${search}`);
        if (data.length <= limit) {
          setIsShowMore(false);
        } else {
          setIsShowMore(true);
        }
        setListings(data);
        setInitialSearchComplete(true);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    fetchListings();
  }, [location.search]);

  const handleChangeSearch = (event) => {
    const { id, value, checked } = event.target;

    setSearchData({
      ...searchData,
      [id]: id === 'parking' || id === 'furnished' ? checked : value,
    });

    if (id === 'sort') {
      const [sort, order] = value.split('_');
      setSearchData({
        ...searchData,
        sort: sort || 'createdAt',
        order: order || 'desc',
      });
    }
    if (id === 'query') {
      setSearchData({
        ...searchData,
        query: value,
      });
    }
  };

  const handleShowMore = async () => {
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('skip', listings.length);
    setIsLoading(true);
    const { data } = await axios.get(`api/listing/get?${urlParams.toString()}`);
    if (data.length < limit) {
      setIsShowMore(false);
      setIsLoading(false);
    }
    setListings([...listings, ...data]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('query', query);
    urlParams.set('parking', parking);
    urlParams.set('furnished', furnished);
    urlParams.set('type', type);
    urlParams.set('sort', sort);
    urlParams.set('order', order);

    navigate(`${location.pathname}?${urlParams.toString()}`);
  };
  return (
    <div className='mx-auto flex max-w-6xl flex-col p-3'>
      <form
        onSubmit={handleSubmit}
        className='flex flex-wrap items-center justify-start gap-4 text-sm'
      >
        <input
          type='text'
          className=' w-40 rounded-lg border px-2 py-1 outline-none duration-200 focus:shadow-sm'
          placeholder='Search'
          id='query'
          value={searchData.query}
          onChange={handleChangeSearch}
        />
        <span>
          type:
          <select
            className='ml-2 cursor-pointer rounded-lg px-2 py-1 outline-none'
            id='type'
            onChange={handleChangeSearch}
            defaultValue={searchData.type}
          >
            <option value='all'>All</option>
            <option value='rent'>Rent</option>
            <option value='sell'>Sell</option>
          </select>
        </span>

        <span>
          sort by:
          <select
            className='ml-2 cursor-pointer rounded-lg px-2 py-1 outline-none'
            id='sort'
            onChange={handleChangeSearch}
            defaultValue={'regularPrice_asc'}
          >
            <option value='regularPrice_asc'>Price low to high</option>
            <option value='regularPrice_desc'>Price high to low</option>
            <option value='createdAt_desc'>Latest</option>
            <option value='createdAt_asc'>Oldest</option>
          </select>
        </span>
        <span className='flex items-center gap-3'>
          Amenities:
          <label
            className='cursor-pointer'
            htmlFor='parking'
          >
            Parking
            <input
              className='ml-2'
              type='checkbox'
              id='parking'
              checked={searchData.parking}
              onChange={handleChangeSearch}
            />
          </label>
          <label
            className='cursor-pointer'
            htmlFor='furnished'
          >
            Furnished
            <input
              className='ml-2'
              type='checkbox'
              id='furnished'
              checked={searchData.furnished}
              onChange={handleChangeSearch}
            />
          </label>
        </span>
        <button className='flex items-center gap-2 rounded-lg border p-2 text-sm duration-200 hover:border-slate-600'>
          Submit
          <FaSearch />
        </button>
      </form>
      <div className='flex flex-wrap gap-4 pt-5 sm:justify-center md:justify-center lg:justify-normal'>
        {initialSearchComplete && !isLoading && listings.length === 0 && (
          <p className='text-3xl font-bold'>No results found</p>
        )}
        {isLoading && (
          <div className='fixed bottom-0 left-0 right-0 top-0 flex items-center justify-center'>
            <Loader />
          </div>
        )}

        {!isLoading &&
          listings &&
          listings.map((listing) => (
            <ListingCart
              listing={listing}
              key={listing._id}
            />
          ))}
        {/* {error && <p className='text-red mt-2 text-2xl font-bold'> {error}</p>} */}
      </div>
      {listings.length > 0 && isShowMore && (
        <div className='mt-2 flex justify-center'>
          <button
            onClick={handleShowMore}
            className='w-32 rounded-lg border px-3 py-2  duration-200 hover:border-slate-600'
          >
            {isLoading ? <Loader /> : 'Show more'}
          </button>
        </div>
      )}
    </div>
  );
};
