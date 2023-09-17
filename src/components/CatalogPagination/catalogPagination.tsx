import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { ChangeEvent } from 'react';
import { getFilteredProducts } from '../Catalog/catalogRequest';
import { addProducts, setOffset, setTotal } from '../../features/productsSlice';

export default function CatalogPagination() {
  const total = useAppSelector((state) => state.products.total);
  const currentCategoryId = useAppSelector((state) => state.categories.currentCategoryId);
  const priceFrom = useAppSelector((state) => state.products.priceFromFilter);
  const priceTo = useAppSelector((state) => state.products.priceToFilter);
  const size = useAppSelector((state) => state.products.sizeFilter);
  const sort = useAppSelector((state) => state.products.sorting);
  const dispatch = useAppDispatch();

  const handleChange = (_event: ChangeEvent<unknown>, page: number) => {
    const offset = (page - 1) * 8;
    dispatch(setOffset(offset));

    getFilteredProducts(currentCategoryId, priceFrom, priceTo, size, sort, offset).then(
      (response) => {
        dispatch(addProducts(response.results));
        dispatch(setTotal(response.total));
      }
    );
  };

  return (
    <Stack spacing={2}>
      <Pagination count={Math.ceil(total / 8)} onChange={handleChange} color="primary" />
    </Stack>
  );
}
