import { Box, ThemeProvider, createTheme } from '@mui/material';
import { themeOptions } from '../../assets/theme1';
import Main from './main';

const plantsTheme = createTheme(themeOptions);

function MainPage() {
  return (
    <ThemeProvider theme={plantsTheme}>
      <Box
        sx={{
          flex: '1 1 auto',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100%',
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
