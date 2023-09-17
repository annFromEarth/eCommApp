import { useEffect, useState } from 'react';
import { getFilteredProducts } from './catalogRequest';

import { useNavigate } from 'react-router-dom';
import { PATH } from '../../services/routing/paths';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Stack, Box } from '@mui/material';
import { useAppDispatch, useAppSelector, useQuery } from '../../hooks';
import {
  addProducts,
  setOffset,
  setPriceFromFilter,
  setPriceToFilter,
  setSizeFilter,
  setSorting,
  setTotal,
} from '../../features/productsSlice';
import { Bars } from 'react-loader-spinner';
import { setCurrentCategory, setCurrentCategoryId } from '../../features/categoriesSlice';
import { generateToken } from '../../utils/token';
import CatalogPagination from '../CatalogPagination/catalogPagination';
import { ButtonCart } from '../ButtonCart/ButtonCart';

export default function GetCatalog() {
  const query = useQuery();
  const products = useAppSelector((state) => state.products.data);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(setOffset(0));
    dispatch(setCurrentCategoryId(''));
    dispatch(setCurrentCategory('All Plants'));
    dispatch(setPriceFromFilter(''));
    dispatch(setPriceToFilter(''));
    dispatch(setSorting(''));
    dispatch(setSizeFilter(''));
    if (!window.sessionStorage.getItem('token')) {
      generateToken().then((response) => {
        window.sessionStorage.setItem('token', response.access_token);
        if (query.get('category') && query.get('category') !== null) {
          dispatch(setCurrentCategoryId(query.get('category')));
          getFilteredProducts(query.get('category'), '', '', '', '', 0).then((response) => {
            dispatch(addProducts(response.results));
            dispatch(setTotal(response.total));
            setLoading(false);
          });
        } else {
          getFilteredProducts('', '', '', '', '', 0).then((response) => {
            dispatch(addProducts(response.results));
            dispatch(setTotal(response.total));
            dispatch(setCurrentCategory('All Plants'));
            setLoading(false);
          });
        }
      });
    } else {
      if (query.get('category') && query.get('category') !== null) {
        dispatch(setCurrentCategoryId(query.get('category')));
        getFilteredProducts(query.get('category'), '', '', '', '', 0).then((response) => {
          dispatch(addProducts(response.results));
          dispatch(setTotal(response.total));
          setLoading(false);
        });
      } else {
        getFilteredProducts('', '', '', '', '', 0).then((response) => {
          dispatch(addProducts(response.results));
          dispatch(setTotal(response.total));
          dispatch(setCurrentCategory('All Plants'));
          setLoading(false);
        });
      }
    }
  }, [dispatch, query]);

  const navigate = useNavigate();

  const openDetailPage = (element: EventTarget, id: string) => {
    if (element instanceof HTMLElement) {
      if (!element.className.includes('button-cart')) {
        navigate(PATH.product + '/:' + id);
      }
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        margin: 'auto',
        paddingBottom: '30px',
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
      {products && !loading && (
        <Stack
          display="flex"
          flexWrap="wrap"
          justifyContent="center"
          alignItems="center"
          mb="35px"
          direction="row"
          gap="20px"
        >
          {products.map((plant, index) => (
            <Card
              key={index}
              onClick={(e) => openDetailPage(e.target, plant.id)}
              sx={{
                maxWidth: 345,
                minHeight: 493,
                cursor: 'pointer',
                background: '#C5DDBB',

                width: '100%',
                ':hover': {
                  boxShadow: 20,
                  transform: 'scale3d(1.02, 1.02, 1)',
                  transition: 'all 0.50s ease-in-out',
                  backgroundColor: '#e4fbd9',
                },
              }}
            >
              <CardMedia
                sx={{ height: 300 }}
                title="plant img"
                image={
                  plant.masterVariant &&
                  plant.masterVariant.images &&
                  plant.masterVariant.images[0].url
                }
              />
              <CardContent
                sx={{
                  minHeigh: 570,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '5px',
                }}
              >
                <Typography gutterBottom variant="h5" sx={{ marginBottom: '0' }}>
                  {plant.name['en-GB']}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    height: '40px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {plant.description && plant.description['en-GB']}
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '10px',
                  }}
                >
                  <Typography
                    variant="h5"
                    color="text.secondary"
                    sx={{
                      textDecoration: 'line-through',
                    }}
                  >
                    {plant.masterVariant &&
                      plant.masterVariant.prices &&
                      (plant.masterVariant.prices[0].value.centAmount / 100).toFixed(2)}{' '}
                    £
                  </Typography>
                  <Typography variant="h5" color="red">
                    {plant.masterVariant &&
                      plant.masterVariant.prices &&
                      (plant.masterVariant.prices[0].discounted.value.centAmount / 100).toFixed(
                        2
                      )}{' '}
                    £
                  </Typography>
                </Box>
              </CardContent>
              <CardActions>
                <ButtonCart id={plant.id} />
              </CardActions>
              <CardActions sx={{ justifyContent: 'center' }}>
                <Button variant="contained" size="small" fullWidth>
                  Learn More
                </Button>
              </CardActions>
            </Card>
          ))}
        </Stack>
      )}
      {products && products.length === 0 && !loading && (
        <Typography sx={{ fontSize: '24px' }}>No plants found.</Typography>
      )}

      {products && products.length > 0 && !loading && <CatalogPagination />}
    </Box>
  );
}
