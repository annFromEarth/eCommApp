import { Box, useTheme, Typography } from '@mui/material';
import { PAGES_TITLES } from '../../data/titles';

export function ProfilePage() {
  const plantsTheme = useTheme();
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '15px',
          color: plantsTheme.palette.text.primary,
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom>
          {PAGES_TITLES.profile}
        </Typography>
      </Box>
    </>
  );
}
