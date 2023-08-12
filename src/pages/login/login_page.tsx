import { Box, createTheme, Typography } from '@mui/material';
import { themeOptions } from '../../assets/theme1';
import { Link } from 'react-router-dom';
import { PagesTitles } from '../../data/titles';
import { PATH } from '../../data/path';

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
          alignItems: 'flex-start',
          padding: '15px',
          color: plantsTheme.palette.text.primary,
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom>
          {PagesTitles.login}
        </Typography>
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
          gap: '8px',
        }}
      >
        New here?
        <Box
          sx={{
            textDecoration: 'underline',
          }}
        >
          <Link to={PATH.register}> Create an account</Link>
        </Box>
      </Box>
    </>
  );
}
