import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { Box, ThemeProvider, createTheme, Typography } from '@mui/material';
import { themeOptions } from '../../assets/theme1';
import { Link } from 'react-router-dom';
import NotFoundImage from './not-found-img';

const plantsTheme = createTheme(themeOptions);

export function NotFoundPage() {
  return (
    <>
      <ThemeProvider theme={plantsTheme}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            background: plantsTheme.palette.background.paper,
            backgroundSize: 'cover',
          }}
        >
          <Header />
          <ContentNotFoundPage />
          <Footer />
        </Box>
      </ThemeProvider>
    </>
  );
}

function ContentNotFoundPage() {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          color: plantsTheme.palette.text.primary,
          textAlign: 'center',
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom>
          <p>Oops!</p>
          <p>The page you requested was not found.</p>
        </Typography>
        <NotFoundImage />
        <Box
          sx={{
            fontSize: '24px',
            marginTop: '40px',
            py: '10px',
            px: '10px',
            background: plantsTheme.palette.background.default,
            borderRadius: '10%',
            color: plantsTheme.palette.text.primary,
          }}
        >
          <Link to="/">Home</Link>
        </Box>
      </Box>
    </>
  );
}
