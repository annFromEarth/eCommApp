import { Box, useTheme, Typography, Button } from '@mui/material';

import LoginForm from '../../components/loginForm/LoginForm';
import { Link } from 'react-router-dom';
import { PAGES_TITLES } from '../../data/titles';
import { PATH } from '../../data/path';

export function LoginPage() {
  const plantsTheme = useTheme();
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
          {PAGES_TITLES.login}
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
