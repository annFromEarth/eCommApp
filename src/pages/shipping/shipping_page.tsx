import { Box, useTheme, Typography } from '@mui/material';
import { PAGES_TITLES } from '../../data/TITLES';
import ShippingImage from './shipping-img';
import { TEXT_SHIPPING } from './dataShipping';

export function ShippingPage() {
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
        <Typography variant="h4" gutterBottom>
          {PAGES_TITLES.shipping}
        </Typography>
        <ShippingContent />
      </Box>
    </>
  );
}

function ShippingContent() {
  const plantsTheme = useTheme();
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: '15px',
          color: plantsTheme.palette.text.primary,
        }}
      >
        <ShippingImage />
        <TextGuarantee />
      </Box>
    </>
  );
}

function TextGuarantee() {
  const text = TEXT_SHIPPING.map((item, index) => (
    <Box key={index + 'text-shipping'} sx={{ maxWidth: '700px' }}>
      <Typography variant="body2" color="text.secondary" gutterBottom sx={{ textAlign: 'justify' }}>
        <span>{item.first}</span>
        {item.strong && <span className="strong-text">{item.strong}</span>}
        <span>{item.second}</span>
      </Typography>
    </Box>
  ));

  return <Box sx={{ margin: '0 40px' }}>{text}</Box>;
}
