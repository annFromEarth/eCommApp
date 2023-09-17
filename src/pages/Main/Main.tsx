import { Typography, Box, createTheme, alpha, Button } from '@mui/material';
import PromoComponent from '../../components/Promo/PromoComponent';

import { themeOptions } from '../../assets/theme';
import { PAGES_TITLES } from '../../data/titles';
import { PATH } from '../../services/routing/paths';

const plantsTheme = createTheme(themeOptions);

export default function Main() {
  return (
    <Box
      component="main"
      sx={{
        display: 'flex',
        flex: '1 1 auto',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'url(./img/plants-main.jpg) 50% / cover no-repeat',
      }}
    >
      <Box sx={{ flex: '1 1 auto' }}>
        <Box
          sx={{
            display: 'flex',
            flex: '1 1 auto',
            flexDirection: 'column',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '40px 0',
            color: plantsTheme.palette.text.primary,
            background: alpha(plantsTheme.palette.background.paper, 0.3),
          }}
        >
          <Typography variant="h2" component="h1" gutterBottom>
            {PAGES_TITLES.main}
          </Typography>
          <Box sx={{ marginBottom: '40px', textAlign: 'center' }}>
            {' '}
            <Typography variant="h5" component="h2" gutterBottom>
              {'Hot deals to celebrate ☀the autumn☀'}
            </Typography>
            <PromoComponent />
          </Box>
          <Button variant="contained" href={PATH.plants}>
            {' '}
            browse plants{' '}
          </Button>
          <Typography variant="h6" sx={{ pt: '40px' }}>
            <q>To plant a garden is to believe in tomorrow.</q> – Audrey Hepburn
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
