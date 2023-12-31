import { Box, useTheme, Typography } from '@mui/material';
import { PAGES_TITLES } from '../../data/titles';
import { MAIN_CONTENT } from './dataWorkshops';
import TabsWorkshops from './TabsWorkshops';

export function WorkshopsPage() {
  const plantsTheme = useTheme();
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          alignItems: 'center',
          padding: '15px',
          color: plantsTheme.palette.text.primary,
        }}
      >
        <Typography variant="body2" sx={{ fontSize: '2.125rem' }} gutterBottom>
          {PAGES_TITLES.workshops}
        </Typography>
        <WorkshopsContent />
      </Box>
    </>
  );
}

function WorkshopsContent() {
  return (
    <>
      <Box sx={{ marginBottom: '10px' }}>{MAIN_CONTENT.text}</Box>
      <TabsWorkshops />
    </>
  );
}
