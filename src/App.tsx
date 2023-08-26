import Footer from './components/footer/footer';
import Header from './components/header/header';
import RoutingApp from './services/routing';
import { Box, ThemeProvider, createTheme } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { themeOptions } from './assets/theme1';

const plantsTheme = createTheme(themeOptions);

function App() {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
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
            <RoutingApp />
            <Footer />
          </Box>
        </ThemeProvider>
      </LocalizationProvider>
    </>
  );
}

export default App;
