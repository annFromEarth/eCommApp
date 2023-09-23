import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { getFilteredProducts } from '../Catalog/catalogRequest';
import { addProducts, setSorting, setTotal } from '../../features/productsSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';

export default function CatalogSorting() {
  const dispatch = useAppDispatch();
  const offset = useAppSelector((state) => state.products.offset);
  const currentCategoryId = useAppSelector((state) => state.categories.currentCategoryId);
  const priceFrom = useAppSelector((state) => state.products.priceFromFilter);
  const priceTo = useAppSelector((state) => state.products.priceToFilter);
  const size = useAppSelector((state) => state.products.sizeFilter);

  const handleChange = (event: SelectChangeEvent) => {
    sortingProducts(event.target.value as string);
  };

  const sortingProducts = (sort: string) => {
    dispatch(setSorting(sort));
    getFilteredProducts(currentCategoryId, priceFrom, priceTo, size, sort, offset).then(
      (response) => {
        dispatch(addProducts(response.results));
        dispatch(setTotal(response.total));
      }
    );
  };

  return (
    <Box sx={{ minWidth: 200 }}>
      <FormControl fullWidth>
        <InputLabel>Sort by:</InputLabel>
        <Select defaultValue="" label="Sort by:" onChange={handleChange}>
          <MenuItem value={'price desc'}>price(from high to low)</MenuItem>
          <MenuItem value={'price asc'}>price(from low to high)</MenuItem>
          <MenuItem value={'name.en-GB asc'}>name(A-Z)</MenuItem>
          <MenuItem value={'name.en-GB desc'}>name(Z-A)</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
