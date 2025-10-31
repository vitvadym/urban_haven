/* eslint-disable react/no-unescaped-entities */
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from 'react-router-dom';
import axios from '../../config/axios.js';
import { useEffect, useState } from 'react';
import { ListingCart } from '../../components/ListingCart/ListingCart';
import { slides } from '../../assets/assets';

export const Home = () => {
  // SwiperCore.use([Autoplay]);
  const [rentListings, setRentListings] = useState([]);
  const [sellListings, setSellListings] = useState([]);
  
  useEffect(() => {
    const fetchRentListing = async () => {
      try {
        const { data } = await axios.get('/api/listing/get?type=rent&limit=6');
        setRentListings(data);
      } catch (error) {
        console.log(error.response.data.message);
      }
    };
    fetchRentListing();

    const fetchSellListing = async () => {
      try {
        const { data } = await axios.get('/api/listing/get?type=sell&limit=6');
        setSellListings(data);
      } catch (error) {
        console.log(error.response.data.message);
      }
    };

    fetchSellListing();
  }, []);

  const settings = {
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    adaptiveHeight: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  }
  return (
    <>
      <div className='mx-auto flex max-w-6xl flex-col gap-6 p-28 px-3'>
        <h1 className='text-3xl font-bold text-slate-700 lg:text-6xl'>
          Find your next <span className='text-slate-500'>perfect</span>
          <br />
          place with ease
        </h1>
        <div className='text-xs text-gray-400 sm:text-sm'>
          Elite Homes is the best place to find your next perfect place to live.
          <br />
          We have a wide range of properties for you to choose from.
        </div>
        <Link
          to={'/search'}
          className='text-xs font-bold text-blue-800 hover:underline sm:text-sm'
        >
          Let's get started...
        </Link>
      </div>
      <div className="slider-container overflow-hidden">
        <Slider {...settings}>
          {slides.map((slide, index) => (
            <div key={index}>
              <img
                src={slide}
                alt={slide}
                className=' max-h-[700px] w-full  object-cover'
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* <Swiper
        autoplay
        loop={true}
        spaceBetween={10}
        slidesPerView={1}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <img
              src={slide}
              alt={slide}
              className=' max-h-[700px] w-full  object-cover'
            />
          </SwiperSlide>
        ))} */}
      <div className='mx-auto my-10 flex max-w-6xl flex-col gap-6 '>
        {rentListings && rentListings.length > 0 && (
          <>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>
                Recent places for rent
              </h2>
              <Link
                className='text-sm text-blue-800 hover:underline'
                to={'/search?type=rent'}
              >
                Show more places for rent
              </Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {rentListings.map((listing) => (
                <ListingCart
                  listing={listing}
                  key={listing._id}
                />
              ))}
            </div>
          </>
        )}
        {sellListings && sellListings.length > 0 && (
          <>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>
                Recent places for sale
              </h2>
              <Link
                className='text-sm text-blue-800 hover:underline'
                to={'/search?type=sale'}
              >
                Show more places for sale
              </Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {sellListings.map((listing) => (
                <ListingCart
                  listing={listing}
                  key={listing._id}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};
