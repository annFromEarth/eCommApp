import { Typography, createTheme } from '@mui/material';

import { themeOptions } from '../../assets/theme1';
import { PagesHeaderMenu } from '../../data/pages';
import { Link } from 'react-router-dom';
import { PATH } from '../../data/path';

const plantsTheme = createTheme(themeOptions);

export default function HeaderNav() {
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
        <Link to={PATH.plants}> {PagesHeaderMenu.plants}</Link>
        <Link to={PATH.workshops}> {PagesHeaderMenu.workshops}</Link>
        <Link to={PATH.about}> {PagesHeaderMenu.about}</Link>
      </Typography>
    </>
  );
}
