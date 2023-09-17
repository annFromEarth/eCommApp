import { Box, Typography } from '@mui/material';
export default function PromoComponent() {
  return (
    <Box sx={{ background: 'rgba(200, 150, 0, 0.3)', width: '100vW', padding: '5px 0' }}>
      <Typography variant="h5" component="h2" gutterBottom>
        With promo code <span style={{ fontWeight: 'bold' }}>SANTACACTUS</span> you get every second
        succulent for free!
      </Typography>
      <Box>* Promo code can be applied 3 times per cart *</Box>
    </Box>
  );
}
