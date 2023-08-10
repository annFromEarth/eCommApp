import { Container, Typography, Box, createTheme, alpha } from '@mui/material';

import MainImage from './main-image';

import { themeOptions } from '../../assets/theme1';

const plantsTheme = createTheme(themeOptions);

export default function Main() {
  return (
    <Container
      component="main"
      sx={{
        display: 'flex',
        flex: '2',
        paddingRight: '0px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          p: '60px',
          color: plantsTheme.palette.text.primary,
          background: alpha(plantsTheme.palette.background.paper, 0.3),
          minHeight: '90vh',
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome plant lovers!
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          {'Hot deals to celebrate ☀the summer☀'}
        </Typography>
        <Typography sx={{ pt: '40px' }}>
          <q>To plant a garden is to believe in tomorrow.</q> – Audrey Hepburn
        </Typography>
      </Box>

      <MainImage />
    </Container>
  );
}
