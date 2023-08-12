import { Box, createTheme, Typography } from '@mui/material';
import { themeOptions } from '../../assets/theme1';
import { Link } from 'react-router-dom';
import NotFoundImage from './not-found-img';
import { PATH } from '../../data/path';

const plantsTheme = createTheme(themeOptions);

export function NotFoundPage() {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: '20px',
          color: plantsTheme.palette.text.primary,
          textAlign: 'center',
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom>
          <p>Oops!</p>
          <p>The page you requested was not found.</p>
        </Typography>
        <NotFoundImage />
        <Box
          sx={{
            fontSize: '24px',
            my: '40px',
            py: '10px',
            px: '10px',
            background: plantsTheme.palette.background.default,
            borderRadius: '10%',
            color: plantsTheme.palette.text.primary,
          }}
        >
          <Link to={PATH.main}>Home</Link>
        </Box>
      </Box>
    </>
  );
}
