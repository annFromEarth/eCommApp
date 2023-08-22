import { Typography, createTheme } from '@mui/material';

import { themeOptions } from '../../assets/theme1';
import { PAGES_HEADER_MENU } from '../../data/pages';
import { Link } from 'react-router-dom';
import { PATH } from '../../data/PATH';

const plantsTheme = createTheme(themeOptions);

export default function HeaderNavPages() {
  return (
    <>
      <Typography
        variant="h6"
        noWrap
        sx={{
          mr: 2,
          display: { xs: 'none', md: 'flex' },
          width: '800px',
          justifyContent: 'space-between',
          fontFamily: 'monospace',
          fontWeight: 700,
          letterSpacing: '.3rem',
          color: plantsTheme.palette.background.paper,
          textDecoration: 'none',
        }}
      >
        <Link className="link" to={PATH.plants}>
          {PAGES_HEADER_MENU.plants}
        </Link>
        <Link className="link" to={PATH.workshops}>
          {PAGES_HEADER_MENU.workshops}
        </Link>
        <Link className="link" to={PATH.about}>
          {PAGES_HEADER_MENU.about}
        </Link>
      </Typography>
    </>
  );
}
