import { Box, useTheme, Typography } from '@mui/material';
import { PAGES_TITLES } from '../../data/TITLES';

export function BasketPage() {
  const plantsTheme = useTheme();
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: '15px',
          color: plantsTheme.palette.text.primary,
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom>
          {PAGES_TITLES.basket}
        </Typography>
      </Box>
    </>
  );
}
