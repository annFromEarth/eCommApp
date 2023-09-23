import { useState, useEffect } from 'react';
import getCategories from './catalogNavigationRequests';
import { ListItem, ListItemButton, ListItemText, List, Box } from '@mui/material';
import { ICategoryNavigation } from './catalogNavigation.types';
import { getFilteredProducts } from '../Catalog/catalogRequest';
import { addProducts, setOffset, setTotal } from '../../features/productsSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setCurrentCategory, setCurrentCategoryId } from '../../features/categoriesSlice';
import { generateAnonymousToken } from '../../utils/token';

export default function GetCatalogNavigation() {
  const [categories, setCategories] = useState<ICategoryNavigation>();
  const priceFrom = useAppSelector((state) => state.products.priceFromFilter);
  const priceTo = useAppSelector((state) => state.products.priceToFilter);
  const size = useAppSelector((state) => state.products.sizeFilter);
  const sort = useAppSelector((state) => state.products.sorting);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!window.sessionStorage.getItem('anonymousToken')) {
      generateAnonymousToken().then((response) => {
        window.sessionStorage.setItem('anonymousToken', response.access_token);
        getCategories().then((response) => {
          setCategories(response);
        });
      });
    } else {
      getCategories().then((response) => {
        setCategories(response);
      });
    }
  }, [dispatch]);

  const handleCategory = (categoryId: string, categoryName: string) => {
    dispatch(setOffset(0));
    dispatch(setCurrentCategoryId(categoryId));
    dispatch(setCurrentCategory(categoryName));
    getFilteredProducts(categoryId, priceFrom, priceTo, size, sort, 0).then((response) => {
      dispatch(addProducts(response.results));
      dispatch(setTotal(response.total));
    });
  };

  const handleAllCategory = () => {
    dispatch(setOffset(0));
    dispatch(setCurrentCategory('All Plants'));
    dispatch(setCurrentCategoryId(''));
    getFilteredProducts('', priceFrom, priceTo, size, sort, 0).then((response) => {
      dispatch(addProducts(response.results));
      dispatch(setTotal(response.total));
    });
  };

  return (
    <Box
      sx={{
        minWidth: 200,
      }}
    >
      {categories && categories.results && (
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleAllCategory()}>
              <ListItemText primary={'All Plants'} />
            </ListItemButton>
          </ListItem>
          {categories.results.map((category, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton onClick={() => handleCategory(category.id, category.name['en-GB'])}>
                <ListItemText primary={category.name['en-GB']} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
}
