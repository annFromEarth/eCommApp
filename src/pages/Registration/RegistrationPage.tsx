import Form1 from '../../components/registrationForm/RegistrationForm';
import { Box, useTheme, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { PATH } from '../../data/pathsTemp';
import { PAGES_TITLES } from '../../data/titlesTemp';

export function RegistrationPage() {
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
          {PAGES_TITLES.register}
        </Typography>
        <Form1 />
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
