import { Box, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProduct } from '../../services/productDetailRequest';
import { IProduct } from './productType';
import SwiperProduct from './SwiperProduct/SwiperProduct';
import { EmptyDataProduct } from './EmtyDataProduct';
import { MainContentProduct } from './MainContentProduct';

import { Bars } from 'react-loader-spinner';

export function ProductPage() {
  const plantsTheme = useTheme();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  const [product, setProduct] = useState<IProduct>(EmptyDataProduct);

  useEffect(() => {
    if (id) {
      getProduct(id.slice(1)).then((data: IProduct) => {
        setLoading(false);
        setProduct(data);
      });
    }
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'strench',
        width: '100%',
        margin: 'auto',
      }}
    >
      {loading && (
        <Bars
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="bars-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      )}
      {!loading && (
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
      )}
    </Box>
  );
}
