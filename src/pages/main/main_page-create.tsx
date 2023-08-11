import { Box, ThemeProvider, createTheme } from '@mui/material';
import { themeOptions } from '../../assets/theme1';

import Header from '../../components/header/header';
import Main from './main';
import Footer from '../../components/footer/footer';

const plantsTheme = createTheme(themeOptions);

function MainPage() {
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
        <Main />
      </Box>
    </ThemeProvider>
  );
}

export default MainPage;
