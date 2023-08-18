import { Box, createTheme, Typography } from '@mui/material';
import { themeOptions } from '../../assets/theme1';
import { PAGES_TITLES } from '../../data/TITLES';
import { TEXT_GUARANTEE } from './dataGuarantee';
import GuaranteeImage from './guarantee-img';

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
          alignItems: 'center',
          padding: '15px',
          color: plantsTheme.palette.text.primary,
        }}
      >
        <Typography variant="h4" gutterBottom>
          {PAGES_TITLES.guarantee}
        </Typography>
        <GuaranteeContent />
      </Box>
    </>
  );
}

function GuaranteeContent() {
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
        <GuaranteeImage />
        <TextGuarantee />
      </Box>
    </>
  );
}

function TextGuarantee() {
  const text = TEXT_GUARANTEE.map((item, index) => (
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
