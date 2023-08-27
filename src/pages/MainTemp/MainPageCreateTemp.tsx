import { Box, ThemeProvider, useTheme } from '@mui/material';
import Main from './MainTemp';

function MainPage() {
  const plantsTheme = useTheme();
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
