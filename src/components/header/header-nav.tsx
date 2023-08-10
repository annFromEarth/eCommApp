import { Typography, createTheme } from '@mui/material';

import { themeOptions } from '../../assets/theme1';
import { PagesHeaderMenu } from '../../data/pages';

const plantsTheme = createTheme(themeOptions);

export default function HeaderNav() {
  return (
    <>
      {PagesHeaderMenu.map((page) => (
        <Typography
          key={page.id}
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
            ':hover': {
              color: plantsTheme.palette.primary.dark,
              transition: '0.2s ease-out',
            },
          }}
        >
          {page.name}
        </Typography>
      ))}
    </>
  );
}
