import { Box, createTheme, Typography, Button } from '@mui/material';

import LoginForm from '../../components/login-form/login-form';
import { themeOptions } from '../../assets/theme1';
import { Link } from 'react-router-dom';
import { PagesTitles } from '../../data/TITLES';
import { PATH } from '../../data/PATH';

const plantsTheme = createTheme(themeOptions);

export function LoginPage() {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '15px',
          color: plantsTheme.palette.text.primary,
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom>
          {PagesTitles.login}
        </Typography>
        <LoginForm />
        <RegisterLink />
      </Box>
    </>
  );
}

function RegisterLink() {
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
        New here?
        <Box
          sx={{
            textDecoration: 'underline',
          }}
        >
          <Button variant="outlined">
            <Link to={PATH.register}>
              Create an account <span style={{ marginLeft: '15px' }}>&#10133;</span>
            </Link>
          </Button>
        </Box>
      </Box>
    </>
  );
}
