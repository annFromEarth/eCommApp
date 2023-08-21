import Form1 from '../../components/registration-form/registration-form';
import { Box, createTheme, ThemeProvider } from '@mui/material';
import { themeOptions } from '../../assets/theme1';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { PATH } from '../../data/PATH';
// import { PAGES_TITLES } from '../../data/TITLES';

const plantsTheme = createTheme(themeOptions);

export function RegistrationPage() {
  return (
    <ThemeProvider theme={plantsTheme}>
      {/* <Typography variant="h2" component="h1" gutterBottom>
        {PAGES_TITLES.register}
      </Typography> */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',

          minHeight: '100vh',
          background: plantsTheme.palette.background.paper,
          backgroundSize: 'cover',
        }}
      >
        <Form1 />
      </Box>
      {/* </ThemeProvider> */}
      <Box
        sx={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '15px',
          color: plantsTheme.palette.text.primary,
        }}
      >
        <LoginLink />
      </Box>
    </ThemeProvider>
  );
}

function LoginLink() {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '8px',
          fontSize: '24px',
        }}
      >
        Already have an account?
        <Box
          sx={{
            textDecoration: 'underline',
          }}
        >
          <Button variant="outlined">
            <Link to={PATH.login}>
              Login <span style={{ marginLeft: '15px' }}>&#128273;</span>
            </Link>
          </Button>
        </Box>
      </Box>
    </>
  );
}
