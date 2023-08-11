import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { Box, ThemeProvider, createTheme } from '@mui/material';
import { themeOptions } from '../../assets/theme1';

const plantsTheme = createTheme(themeOptions);

export function ContactsPage() {
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
          <ContentContactsPage />
          <Footer />
        </Box>
      </ThemeProvider>
    </>
  );
}

function ContentContactsPage() {
  return <div>I am ContactsPage</div>;
}
