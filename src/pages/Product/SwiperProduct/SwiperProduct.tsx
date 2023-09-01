import { Box } from '@mui/material';
import { useState } from 'react';
import { IImagesProduct } from '../productType';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import Modal from '@mui/material/Modal';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import './swiperProduct.css';

export default function SwiperProduct(props: { images: Array<IImagesProduct> }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const arrImages = props.images;

  const slidersImg = arrImages.map((image, index) => (
    <SwiperSlide key={index + 'img-slider-product'}>
      <img src={image.url} style={{ maxHeight: '320px' }} />
    </SwiperSlide>
  ));

  return (
    <>
      <Box
        sx={{
          maxHeight: '500px',
          maxWidth: '500px',
          background: 'black',
          backgroundSize: 'cover',
        }}
      >
        <Swiper
          spaceBetween={10}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper2"
          onClick={handleOpen}
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
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box className="modal-prodact">
          <SwiperModal images={slidersImg} />
        </Box>
      </Modal>
    </>
  );
}

function SwiperModal(props: { images: JSX.Element[] }) {
  return (
    <Swiper
      spaceBetween={10}
      navigation={true}
      modules={[FreeMode, Navigation, Thumbs]}
      className="mySwiper2"
    >
      {props.images}
    </Swiper>
  );
}
