import { Container, Typography, Box, createTheme, alpha } from '@mui/material';

import MainImage from './main-image';

import { themeOptions } from '../../assets/theme1';
import { PagesTitles } from '../../data/titles';

const plantsTheme = createTheme(themeOptions);

export default function Main() {
  return (
    <Container
      component="main"
      sx={{
        display: 'flex',
        flex: '2',
        paddingRight: '0px',
        paddingLeft: '0px',
        position: 'relative',
        minHeight: '90vh',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          width: '100vw',
          height: '100%',
          display: 'flex',
          left: '50%',
          transform: 'translate(-50%, 0)',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            color: plantsTheme.palette.text.primary,
            background: alpha(plantsTheme.palette.background.paper, 0.3),
          }}
        >
          <Typography variant="h2" component="h1" gutterBottom>
            {PagesTitles.main}
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
            {'Hot deals to celebrate ☀the summer☀'}
          </Typography>
          <Typography sx={{ pt: '40px' }}>
            <q>To plant a garden is to believe in tomorrow.</q> – Audrey Hepburn
          </Typography>
        </Box>

        <MainImage />
      </Box>
    </Container>
  );
}
