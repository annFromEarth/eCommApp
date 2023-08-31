import { Box, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProduct } from '../../services/productDetailRequest';
import { IProduct } from './productType';
import SwiperProduct from './SwiperProduct/SwiperProduct';
import { EmptyDataProduct } from './EmtyDataProduct';
import { MainContentProduct } from './MainContentProduct';

export function ProductPage() {
  const plantsTheme = useTheme();
  const { id } = useParams();

  const [product, setProduct] = useState<IProduct>(EmptyDataProduct);

  useEffect(() => {
    if (id) {
      getProduct(id.slice(1)).then((data: IProduct) => {
        setProduct(data);
      });
    }
  }, []);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: '15px',
          color: plantsTheme.palette.text.primary,
        }}
      >
        <SwiperProduct images={product.masterVariant.images} />
        <MainContentProduct product={product} />
      </Box>
    </>
  );
}
