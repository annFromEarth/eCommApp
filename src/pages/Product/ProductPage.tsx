import { Box, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProduct } from '../../services/productDetailRequest';
import { IProduct } from './productType';
import SwiperProduct from './SwiperProduct/SwiperProduct';
import { EmptyDataProduct } from './EmtyDataProduct';
import { MainContentProduct } from './MainContentProduct';

import { Bars } from 'react-loader-spinner';
import { BasicBreadcrumbs } from '../../components/CatalogBreadcrumbs/catalogBreadcrumbs';
import { setCurrentProduct } from '../../features/productsSlice';
import { useAppDispatch } from '../../hooks';
import { generateToken } from '../../utils/token';

export function ProductPage() {
  const plantsTheme = useTheme();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<IProduct>(EmptyDataProduct);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!window.sessionStorage.getItem('token')) {
      generateToken().then((response) => {
        window.sessionStorage.setItem('token', response.access_token);
        if (id) {
          getProduct(id.slice(1)).then((data: IProduct) => {
            setLoading(false);
            setProduct(data);
            dispatch(setCurrentProduct(data.name['en-GB']));
          });
        }
      });
    } else {
      if (id) {
        getProduct(id.slice(1)).then((data: IProduct) => {
          setLoading(false);
          setProduct(data);
          dispatch(setCurrentProduct(data.name['en-GB']));
        });
      }
    }
  }, [dispatch, id]); // id added to dependencies []

  return (
    <>
      <Box
        sx={{
          height: '111px',
          display: 'flex',
          width: '100%',
          position: 'relative',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '15px 0 0',
          boxSizing: 'border-box',
          color: plantsTheme.palette.text.primary,
        }}
      >
        <Box sx={{ position: 'absolute', left: '25px' }}>
          <BasicBreadcrumbs />
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'stretch',
          width: '100%',
          margin: '0 auto',
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
            {/* next line id gets ':' in front */}
            <MainContentProduct product={product} id={id} />
          </Box>
        )}
      </Box>
    </>
  );
}
