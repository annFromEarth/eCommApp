// import * as React from 'react';
import { createTheme, ThemeProvider, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { themeOptions } from '../../assets/theme1';
import { Link } from 'react-router-dom';

const plantsTheme = createTheme(themeOptions);

function Copyright() {
  return (
    <ThemeProvider theme={plantsTheme}>
      <Typography variant="body2" color={plantsTheme.palette.background.paper}>
        {' © '}
        <Link to="/" color={plantsTheme.palette.background.paper}>
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
          <Box>
            <Link className="link" to="/questions">
              ✿ FAQ ✿
            </Link>
          </Box>
          <Box>
            <Link className="link" to="/shipping">
              ✿ Shipping ✿
            </Link>
          </Box>
          <Box>
            <Link className="link" to="/guarantee">
              ✿ Guarantee ✿
            </Link>
          </Box>
          <Box>
            <Link className="link" to="/contacts">
              ✿ Contact us ✿
            </Link>
          </Box>
        </Box>
        <Container sx={{ display: 'flex', justifyContent: 'center', py: '10px' }}>
          <Copyright />
        </Container>
      </Box>
    </ThemeProvider>
  );
}
