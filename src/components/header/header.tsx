import { Box, AppBar, Toolbar, Typography, createTheme, Container } from '@mui/material';
import Button from '@mui/material/Button';
import { themeOptions } from '../../assets/theme1';
import HeaderNavPages from './header-nav';

import { Link } from 'react-router-dom';
import { PATH } from '../../data/PATH';
import { PAGES_HEADER_MENU } from '../../data/pages';
import { HEADER_TITLES } from '../../data/TITLES';

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
            py: '10px',
          }}
        >
          <HeaderTitle />
          <HeaderNavLinks />
        </Toolbar>

        <Toolbar sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
          <Container sx={{ maxWidth: '70%', display: 'flex', justifyContent: 'space-evenly' }}>
            <HeaderNavPages />
          </Container>
        </Toolbar>
      </AppBar>

      <HeaderTitleAdditional />
    </>
  );
}

function HeaderTitle() {
  return (
    <Box sx={{ display: 'flex' }}>
      <Typography
        variant="h6"
        noWrap
        component="a"
        href={PATH.main}
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
        {HEADER_TITLES.main}
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
  );
}

function HeaderNavLinks() {
  return (
    <Box>
      <Typography
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: '10px',
        }}
      >
        <Button variant="contained" href="#contained-buttons">
          <Link to={PATH.login}>
            {PAGES_HEADER_MENU.login} <span style={{ marginLeft: '15px' }}>&#128273;</span>
          </Link>
        </Button>
        <Button variant="contained" href="#contained-buttons">
          <Link to={PATH.register}>
            {PAGES_HEADER_MENU.register} <span style={{ marginLeft: '15px' }}>&#10133;</span>
          </Link>
        </Button>
        <Button variant="contained" href="#contained-buttons">
          <Link to={PATH.basket}>
            {PAGES_HEADER_MENU.basket} <span style={{ marginLeft: '15px' }}>&#128722;</span>
          </Link>
        </Button>
      </Typography>
    </Box>
  );
}

function HeaderTitleAdditional() {
  return (
    <Box
      sx={{
        textAlign: 'center',
        bgcolor: '#c0f77e',
        py: '10px',
        color: plantsTheme.palette.text.primary,
      }}
    >
      {HEADER_TITLES.additional}
    </Box>
  );
}
