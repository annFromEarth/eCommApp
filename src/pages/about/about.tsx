import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { Container, Typography, Box, createTheme, ThemeProvider } from '@mui/material';
import { themeOptions } from '../../assets/theme1';

const plantsTheme = createTheme(themeOptions);

function ContentAbout() {
  return (
    <Container component="main" sx={{ display: 'flex', flex: '2' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          p: '60px',
          color: plantsTheme.palette.text.primary,
          background: plantsTheme.palette.background.paper,
          minHeight: '90vh',
          width: '100%',
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome plant lovers!
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          {'☀ Learn more about us ☀'}
        </Typography>
      </Box>
    </Container>
  );
}

export default function About() {
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
          <ContentAbout />
          <Footer />
        </Box>
      </ThemeProvider>
    </>
  );
}
