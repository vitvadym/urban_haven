/* eslint-disable react/prop-types */
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Autoplay, Thumbs, Navigation, Mousewheel } from 'swiper/modules';
import 'swiper/css/bundle';

export const TopSlider = ({ images, thumbsSwiper }) => {
  SwiperCore.use([Autoplay, Thumbs, Navigation, Mousewheel]);
  return (
    <>
      <Swiper
        autoplay
        mousewheel={true}
        spaceBetween={10}
        slidesPerView={1}
        thumbs={{
          swiper: thumbsSwiper,
        }}
      >
        {images?.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image}
              alt={image}
              className='max-h-[60vh] w-full rounded-md object-contain'
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
