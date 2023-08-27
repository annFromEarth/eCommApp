import { Box, useTheme, Typography } from '@mui/material';
import { PAGES_TITLES } from '../../data/titles';
import { PATH } from '../../data/paths';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function ProfilePage() {
  const plantsTheme = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem('authorization-token')) {
      navigate(PATH.login);
    }
  }, [navigate]);

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
          {PAGES_TITLES.profile}
        </Typography>
      </Box>
    </>
  );
}
