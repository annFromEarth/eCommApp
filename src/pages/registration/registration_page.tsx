import Form1 from '../../components/registration-form/registration-form';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { Box, ThemeProvider, createTheme } from '@mui/material';
import { themeOptions } from '../../assets/theme1';

const plantsTheme = createTheme(themeOptions);

export function RegistrationPage() {
  return (
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
        <Form1 />
        <Footer />
      </Box>
    </ThemeProvider>
  );
}
