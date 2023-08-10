// import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
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
        <Link href="#" color={plantsTheme.palette.background.paper}>
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
        sx={{
          display: 'flex',
          justifyContent: 'space-evenly',
          py: '10px',
          color: plantsTheme.palette.text.primary,
        }}
      >
        <Box>✿ FAQ ✿</Box>
        <Box>✿ Shipping ✿</Box>
        <Box>✿ Guarantee ✿</Box>
        <Box>✿ Contact us ✿</Box>
      </Box>
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: plantsTheme.palette.primary.main,
        }}
      >
        <Container sx={{ display: 'flex', justifyContent: 'center' }}>
          <Copyright />
        </Container>
      </Box>
    </ThemeProvider>
  );
}
