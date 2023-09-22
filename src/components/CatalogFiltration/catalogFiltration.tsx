import { Box, TextField, Stack, Typography, Button, RadioGroup } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { useState } from 'react';
import { getFilteredProducts } from '../Catalog/catalogRequest';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  addProducts,
  setOffset,
  setPriceFromFilter,
  setPriceToFilter,
  setSizeFilter,
  setTotal,
} from '../../features/productsSlice';

export default function CatalogFilter() {
  const [priceFrom, setPriceFrom] = useState<string>('');
  const [priceTo, setPriceTo] = useState<string>('');
  const [size, setSize] = useState<string>('');
  const dispatch = useAppDispatch();
  const currentCategory = useAppSelector((state) => state.categories.currentCategoryId);
  const sort = useAppSelector((state) => state.products.sorting);

  const filterProducts = () => {
    if (priceFrom !== '') {
      dispatch(setPriceFromFilter(priceFrom));
    }
    if (priceTo !== '') {
      dispatch(setPriceToFilter(priceTo));
    }
    if (size !== '') {
      dispatch(setSizeFilter(size));
    }
    dispatch(setOffset(0));
    getFilteredProducts(currentCategory, priceFrom, priceTo, size, sort, 0).then((response) => {
      dispatch(addProducts(response.results));
      dispatch(setTotal(response.total));
    });
  };

  const resetFilters = () => {
    dispatch(setPriceFromFilter(''));
    dispatch(setPriceToFilter(''));
    dispatch(setSizeFilter(''));
    dispatch(setOffset(0));
    if (currentCategory && currentCategory !== '') {
      getFilteredProducts(currentCategory, '', '', '', sort, 0).then((response) => {
        dispatch(addProducts(response.results));
        dispatch(setTotal(response.total));
      });
    }
    setPriceFrom('');
    setPriceTo('');
    setSize('');
  };

  return (
    <Box display={'flex'} flexDirection={'column'} gap={2}>
      <Stack>
        <Typography
          component="div"
          variant="body1"
          fontWeight={700}
          color={'rgba(78, 8, 8, 0.7)'}
          gutterBottom
        >
          Price (£)
        </Typography>
        <Stack direction="row" spacing={1}>
          <TextField
            label="From"
            variant="outlined"
            type="number"
            value={priceFrom}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setPriceFrom(event.target.value);
            }}
          />
          <TextField
            label="To"
            variant="outlined"
            type="number"
            value={priceTo}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setPriceTo(event.target.value);
            }}
          />
        </Stack>
        <Stack marginTop={2}>
          <Typography
            component="div"
            variant="body1"
            fontWeight={700}
            color={'rgba(78, 8, 8, 0.7)'}
            gutterBottom
          >
            Size
          </Typography>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
            value={size}
            onChange={(event) => {
              setSize(event.target.value);
            }}
          >
            <FormControlLabel value="large" control={<Radio />} label="Large" />
            <FormControlLabel value="medium" control={<Radio />} label="Medium" />
            <FormControlLabel value="small" control={<Radio />} label="Small" />
          </RadioGroup>
        </Stack>
      </Stack>
      <Button variant="contained" fullWidth onClick={() => filterProducts()}>
        Apply
      </Button>
      <Button variant="text" fullWidth onClick={() => resetFilters()}>
        Reset filters
      </Button>
    </Box>
  );
}
