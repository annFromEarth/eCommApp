import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import RoutingApp from './services/routing/routing';
import { Box, ThemeProvider, createTheme } from '@mui/material';
import { themeOptions } from './assets/theme';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

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
