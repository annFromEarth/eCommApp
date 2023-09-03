import { Typography } from '@mui/material';
import { useAppSelector } from '../../hooks';

export default function GetCatalogPageName() {
  const currentCategory = useAppSelector((state) => state.categories.currentCategory);

  return (
    <Typography gutterBottom variant="h3" sx={{ marginBottom: '0' }}>
      {currentCategory}
    </Typography>
  );
}
