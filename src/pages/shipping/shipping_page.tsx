import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { Box, ThemeProvider, createTheme, Typography } from '@mui/material';
import { themeOptions } from '../../assets/theme1';

const plantsTheme = createTheme(themeOptions);

export function ShippingPage() {
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
          <ContentShippingPage />
          <Footer />
        </Box>
      </ThemeProvider>
    </>
  );
}

function ContentShippingPage() {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'flex-start',
          color: plantsTheme.palette.text.primary,
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom>
          Shipping
        </Typography>
      </Box>
    </>
  );
}
