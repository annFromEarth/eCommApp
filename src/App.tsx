import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import RoutingApp from './services/routing/routing';
import { Box, createTheme, ThemeProvider } from '@mui/material';
import { themeOptions } from './assets/theme';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './hooks';
import { selectAnonymousId, selectSessionToken, updateSessionToken } from './features/appSlice.ts';
import { CustomerService } from './services/customerService.ts';
import { isErrorResponse } from './utils/isErrorResponse.ts';

const plantsTheme = createTheme(themeOptions);

function App() {
  const sessionToken = useAppSelector(selectSessionToken);
  const anonymousId = useAppSelector(selectAnonymousId);
  const dispatch = useAppDispatch();

  useEffect(() => {
    let lastTimeOutId: NodeJS.Timeout | null = null;

    if (sessionToken && !isErrorResponse(sessionToken)) {
      lastTimeOutId = setTimeout(() => {
        dispatch(updateSessionToken(null));
      }, sessionToken.expires_in);
      return;
    }
    CustomerService.createAnonymousSession(anonymousId).then((response) => {
      if (isErrorResponse(response)) {
        return;
      }

      if (response) dispatch(updateSessionToken(response));

      window.sessionStorage.setItem('sessionToken', JSON.stringify(response));

      lastTimeOutId = setTimeout(() => {
        dispatch(updateSessionToken(null));
      }, response.expires_in);
    });

    return () => {
      if (!lastTimeOutId) {
        return;
      }
      clearTimeout(lastTimeOutId);
    };
  }, [dispatch, sessionToken, anonymousId]);

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
