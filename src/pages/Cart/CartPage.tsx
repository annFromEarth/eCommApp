import { Box, useTheme, Typography } from '@mui/material';
import { PAGES_TITLES } from '../../data/titlesTemp';

export function CartPage() {
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
          {PAGES_TITLES.cart}
        </Typography>
      </Box>
    </>
  );
}
