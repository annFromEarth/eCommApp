import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import RoutingApp from './services/routing/routing';
import { Box, ThemeProvider, createTheme } from '@mui/material';
import { themeOptions } from './assets/theme';

const plantsTheme = createTheme(themeOptions);

function App() {
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
          <RoutingApp />
          <Footer />
        </Box>
      </ThemeProvider>
    </>
  );
}

export default App;
