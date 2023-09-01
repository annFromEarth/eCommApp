import { useState, useEffect } from 'react';
import getCategories from './catalogNavigationRequests';
import { ListItem, ListItemButton, ListItemText, List, Box } from '@mui/material';
import { ICategoryNavigation } from './catalogNavigation.types';
import { getProductsByCategory } from '../Catalog/catalogRequest';
import { addProducts } from '../../features/productsSlice';
import { useAppDispatch } from '../../hooks';

export default function GetCatalogNavigation() {
  const [categories, setCategories] = useState<ICategoryNavigation>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    getCategories().then((response) => {
      setCategories(response);
    });
  }, []);

  const handleCategory = (categoryId: string) => {
    getProductsByCategory(categoryId).then((response) => {
      dispatch(addProducts(response.results));
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
            <ListItemButton>
              <ListItemText primary={'All Plants'} />
            </ListItemButton>
          </ListItem>
          {categories.results.map((category, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton onClick={() => handleCategory(category.id)}>
                <ListItemText primary={category.name['en-GB']} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
}
