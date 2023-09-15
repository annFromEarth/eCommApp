import { useState, useEffect } from 'react';
import getCategories from './catalogNavigationRequests';
import { ListItem, ListItemButton, ListItemText, List, Box } from '@mui/material';
import { ICategoryNavigation } from './catalogNavigation.types';
import { getFilteredProducts, getProducts } from '../Catalog/catalogRequest';
import { addProducts } from '../../features/productsSlice';
import { useAppDispatch } from '../../hooks';
import { setCurrentCategory, setCurrentCategoryId } from '../../features/categoriesSlice';
import { generateToken } from '../../utils/token';

export default function GetCatalogNavigation() {
  const [categories, setCategories] = useState<ICategoryNavigation>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!window.sessionStorage.getItem('token')) {
      generateToken().then((response) => {
        window.sessionStorage.setItem('token', response.access_token);
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
    getFilteredProducts(categoryId).then((response) => {
      dispatch(addProducts(response.results));
      dispatch(setCurrentCategory(categoryName));
      dispatch(setCurrentCategoryId(categoryId));
    });
  };

  const handleAllCategory = () => {
    getProducts().then((response) => {
      dispatch(addProducts(response.results));
      dispatch(setCurrentCategory('All Plants'));
      dispatch(setCurrentCategoryId(''));
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
