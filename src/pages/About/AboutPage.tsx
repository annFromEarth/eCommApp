import { Container, Typography, Box, useTheme } from '@mui/material';

export default function About() {
  const plantsTheme = useTheme();
  return (
    <Container component="main" sx={{ display: 'flex', flex: '2' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          p: '60px',
          color: plantsTheme.palette.text.primary,
          background: plantsTheme.palette.background.paper,
          minHeight: '90vh',
          width: '100%',
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome plant lovers!
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          {'☀ Learn more about us ☀'}
        </Typography>
      </Box>
    </Container>
  );
}
