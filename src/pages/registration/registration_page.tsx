import { Box, createTheme, Typography } from '@mui/material';
import Button from '@mui/material/Button';

import { themeOptions } from '../../assets/theme1';
import { Link } from 'react-router-dom';
import { PATH } from '../../data/PATH';
import { PagesTitles } from '../../data/TITLES';

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
          alignItems: 'center',
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
