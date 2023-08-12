import { Box, createTheme, Typography } from '@mui/material';
import { themeOptions } from '../../assets/theme1';
import { PagesTitles } from '../../data/titles';

const plantsTheme = createTheme(themeOptions);

export function GuaranteePage() {
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
          {PagesTitles.guarantee}
        </Typography>
      </Box>
    </>
  );
}
