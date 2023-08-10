// import * as React from 'react';
import { createTheme, ThemeProvider, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { themeOptions } from '../../assets/theme1';

const plantsTheme = createTheme(themeOptions);

function Copyright() {
  return (
    <ThemeProvider theme={plantsTheme}>
      <Typography variant="body2" color={plantsTheme.palette.background.paper}>
        {' © '}
        <Link href="/" color={plantsTheme.palette.background.paper}>
          FLORAPHILIE
        </Link>{' '}
        {new Date().getFullYear()}
      </Typography>
    </ThemeProvider>
  );
}

export default function Footer() {
  return (
    <ThemeProvider theme={plantsTheme}>
      <Box
        component="footer"
        sx={{
          mt: 'auto',
          backgroundColor: plantsTheme.palette.primary.main,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-evenly',
            py: '10px',
            color: plantsTheme.palette.text.primary,
            background: alpha(plantsTheme.palette.background.paper, 0.3),
          }}
        >
          <Box>✿ FAQ ✿</Box>
          <Box>✿ Shipping ✿</Box>
          <Box>✿ Guarantee ✿</Box>
          <Box>✿ Contact us ✿</Box>
        </Box>
        <Container sx={{ display: 'flex', justifyContent: 'center', py: '10px' }}>
          <Copyright />
        </Container>
      </Box>
    </ThemeProvider>
  );
}
