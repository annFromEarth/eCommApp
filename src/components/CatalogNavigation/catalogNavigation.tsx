import { useState, useEffect } from 'react';
import getCategories from './catalogNavigationRequests';
import { ListItem, ListItemButton, ListItemText, List, Box } from '@mui/material';
import { ICategoryNavigation } from './catalogNavigation.types';
import { getProducts, getProductsByCategory } from '../Catalog/catalogRequest';
import { addProducts } from '../../features/productsSlice';
import { useAppDispatch } from '../../hooks';
import { setCurrentCategory } from '../../features/categoriesSlice';

export default function GetCatalogNavigation() {
  const [categories, setCategories] = useState<ICategoryNavigation>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    getCategories().then((response) => {
      setCategories(response);
      dispatch(setCurrentCategory('All Plants'));
    });
  }, []);

  const handleCategory = (categoryId: string, categoryName: string) => {
    getProductsByCategory(categoryId).then((response) => {
      dispatch(addProducts(response.results));
      dispatch(setCurrentCategory(categoryName));
    });
  };

  const handleAllCategory = () => {
    getProducts().then((response) => {
      dispatch(addProducts(response.results));
      dispatch(setCurrentCategory('All Plants'));
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
