import { Box, createTheme, Typography } from '@mui/material';
import { themeOptions } from '../../assets/theme1';
import { Link } from 'react-router-dom';
import { PATH } from '../../data/path';
import { PagesTitles } from '../../data/titles';

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
          {PagesTitles.register}
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
          <Link to={PATH.login}> Log in</Link>
        </Box>
      </Box>
    </>
  );
}
