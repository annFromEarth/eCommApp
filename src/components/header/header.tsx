import { Box, AppBar, Toolbar, Typography, createTheme, Container } from '@mui/material';

import { themeOptions } from '../../assets/theme1';
import HeaderNav from './header-nav';

import { Link } from 'react-router-dom';
import { PATH } from '../../data/path';
import { PagesHeaderMenu } from '../../data/pages';
import { HeaderTitles } from '../../data/titles';

const plantsTheme = createTheme(themeOptions);

export default function Header() {
  return (
    <>
      <Box sx={{ textAlign: 'center', bgcolor: '#EFFD5F', py: '10px' }}>
        Free Shipping + 30-day Guarantee
      </Box>

      <AppBar position="static">
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            borderBottom: `1px ${plantsTheme.palette.background.paper} solid`,
            py: '30px',
          }}
        >
          <Box sx={{ display: 'flex' }}>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: plantsTheme.palette.background.paper,
                textDecoration: 'none',
              }}
            >
              {HeaderTitles.main}
            </Typography>

            <Box
              sx={{
                width: '100px',
                height: '40px',
                background: 'url(leaf.svg)',
                backgroundSize: 'contain',
              }}
            ></Box>
          </Box>

          <Box>
            <Typography
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: '10px',
              }}
            >
              <Link to={PATH.login}>{PagesHeaderMenu.login}</Link>
              <Link to={PATH.basket}>{PagesHeaderMenu.basket}</Link>
            </Typography>
          </Box>
        </Toolbar>

        <Toolbar sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
          <Container sx={{ maxWidth: '70%', display: 'flex', justifyContent: 'space-evenly' }}>
            <HeaderNav />
          </Container>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          textAlign: 'center',
          bgcolor: '#c0f77e',
          py: '10px',
          color: plantsTheme.palette.text.primary,
        }}
      >
        {HeaderTitles.additional}
      </Box>
    </>
  );
}
