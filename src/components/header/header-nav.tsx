import { Typography, createTheme } from '@mui/material';

import { themeOptions } from '../../assets/theme1';
import { PagesHeaderMenu } from '../../data/pages';
import { Link } from 'react-router-dom';
import { PATH } from '../../data/PATH';

const plantsTheme = createTheme(themeOptions);

export default function HeaderNavPages() {
  return (
    <>
      <Typography
        variant="h6"
        noWrap
        component="a"
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
          {PagesHeaderMenu.plants}
        </Link>
        <Link className="link" to={PATH.workshops}>
          {PagesHeaderMenu.workshops}
        </Link>
        <Link className="link" to={PATH.about}>
          {PagesHeaderMenu.about}
        </Link>
      </Typography>
    </>
  );
}
