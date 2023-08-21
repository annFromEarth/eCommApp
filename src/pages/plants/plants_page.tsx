import { Box, createTheme, Typography } from '@mui/material';
import { themeOptions } from '../../assets/theme1';
import { PAGES_TITLES } from '../../data/TITLES';

const plantsTheme = createTheme(themeOptions);

export function PlantsPage() {
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
          {PAGES_TITLES.plants}
        </Typography>
      </Box>
    </>
  );
}