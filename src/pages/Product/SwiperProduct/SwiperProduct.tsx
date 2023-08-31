import { Box } from '@mui/material';
import { useState } from 'react';
import { IImagesProduct } from '../productType';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import './swiperProduct.css';

export default function SwiperProduct(props: { images: Array<IImagesProduct> }) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const arrImages = props.images;

  const slidersImg = arrImages.map((image, index) => (
    <SwiperSlide key={index + 'img-slider-product'}>
      <img src={image.url} style={{ maxHeight: '320px' }} />
    </SwiperSlide>
  ));

  return (
    <Box
      sx={{
        maxHeight: '500px',
        maxWidth: '500px',
        background: 'black',
        backgroundSize: 'cover',
        //overflow: 'hidden',
      }}
    >
      <Swiper
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {slidersImg}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {slidersImg}
      </Swiper>
    </Box>
  );
}
