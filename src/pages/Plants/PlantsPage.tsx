import { Box, useTheme, Typography, Container, Grid } from '@mui/material';
import { PAGES_TITLES } from '../../data/titles';
import GetCatalog from '../../components/Catalog/catalog';
import GetCatalogNavigation from '../../components/CatalogNavigation/catalogNavigation';

export function PlantsPage() {
  const plantsTheme = useTheme();

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
        <Typography variant="h2" component="h1" gutterBottom>
          {PAGES_TITLES.plants}
        </Typography>
      </Box>
      <Container maxWidth={false}>
        <Grid container>
          <Grid item xs={12} sm={2}>
            <GetCatalogNavigation />
          </Grid>
          <Grid item xs={12} sm={10}>
            <GetCatalog />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
