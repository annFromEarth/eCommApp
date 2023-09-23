import Breadcrumbs from '@mui/material/Breadcrumbs';
import { useLocation, Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks';

export function BasicBreadcrumbs() {
  const location = useLocation();
  const currentCategory = useAppSelector((state) => state.categories.currentCategory);
  const currentCategoryId = useAppSelector((state) => state.categories.currentCategoryId);
  const currentProduct = useAppSelector((state) => state.products.currentProduct);

  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" to="/plants">
          PLANTS
        </Link>
        <Link
          color="inherit"
          to={`/plants${currentCategoryId !== '' ? `?category=${currentCategoryId}` : ''}`}
        >
          {currentCategory}
        </Link>
        {location.pathname.includes('/product') && (
          <Link color="inherit" to="/material-ui/getting-started/installation/">
            {currentProduct}
          </Link>
        )}
      </Breadcrumbs>
    </div>
  );
}
