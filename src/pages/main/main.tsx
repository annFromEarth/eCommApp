import { Typography, Box, useTheme, alpha, Button } from '@mui/material';
import { PAGES_TITLES } from '../../data/TITLES';
import { Link } from 'react-router-dom';
import { PATH } from '../../data/PATH';

export default function Main() {
  const plantsTheme = useTheme();
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
          <Typography sx={{ marginBottom: '40px' }} variant="h5" component="h2" gutterBottom>
            {'Hot deals to celebrate ☀the summer☀'}
          </Typography>
          <Button variant="contained" href="#contained-buttons">
            <Link to={PATH.plants}>browse plants</Link>
          </Button>
          <Typography variant="h6" sx={{ pt: '40px' }}>
            <q>To plant a garden is to believe in tomorrow.</q> – Audrey Hepburn
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
