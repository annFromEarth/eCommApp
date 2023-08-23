import { Box, useTheme, Typography } from '@mui/material';
import { PAGES_TITLES } from '../../data/TITLES';
import { MAIN_CONTENT } from './dataWorkshops';
import { TabsWorkshops } from './tabsWorkshops';

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
        <Typography variant="h4" gutterBottom>
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
