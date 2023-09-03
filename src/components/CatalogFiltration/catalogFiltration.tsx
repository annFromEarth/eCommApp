import { Box, TextField, Stack, Typography, Button } from '@mui/material';
import { useState } from 'react';
import { getFilteredProducts } from './catalogFiltrationRequest';

export default function CatalogFilter() {
  const [priceFrom, setPriceFrom] = useState<string>('0');
  const [priceTo, setPriceTo] = useState<string>('0');

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
          Price
        </Typography>
        <Stack direction="row" spacing={1}>
          <TextField
            label="From"
            variant="outlined"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setPriceFrom(event.target.value);
            }}
          />
          <TextField
            label="To"
            variant="outlined"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setPriceTo(event.target.value);
            }}
          />
        </Stack>
      </Stack>
      <Button
        variant="contained"
        fullWidth
        onClick={() => getFilteredProducts({ priceFrom, priceTo })}
      >
        Apply
      </Button>
    </Box>
  );
}
