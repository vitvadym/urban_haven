/* eslint-disable react/prop-types */
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Thumbs } from 'swiper/modules';

export const ThumbSlider = ({ images, setThumbsSwiper }) => {
  SwiperCore.use([Thumbs]);
  return (
    <>
      <Swiper
        className='thumb-swiper'
        onSwiper={setThumbsSwiper}
        slidesPerView={4}
        spaceBetween={10}
        slideToClickedSlide
      >
        {images?.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image}
              alt={image}
              className='cursor-pointer rounded-md'
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
