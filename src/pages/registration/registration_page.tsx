import { Box, createTheme, Typography } from '@mui/material';
import { themeOptions } from '../../assets/theme1';
import { Link } from 'react-router-dom';

const plantsTheme = createTheme(themeOptions);

export function RegistrationPage() {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: '15px',
          color: plantsTheme.palette.text.primary,
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom>
          Registration Page
        </Typography>
        <LoginLink />
      </Box>
    </>
  );
}

function LoginLink() {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          gap: '8px',
        }}
      >
        Already have an account?
        <Box
          sx={{
            textDecoration: 'underline',
          }}
        >
          <Link to="/login"> Log in</Link>
        </Box>
      </Box>
    </>
  );
}
