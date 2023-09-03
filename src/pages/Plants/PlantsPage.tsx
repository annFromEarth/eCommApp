import { Box, useTheme, Container, Grid, Divider } from '@mui/material';
import GetCatalog from '../../components/Catalog/catalog';
import GetCatalogNavigation from '../../components/CatalogNavigation/catalogNavigation';
import GetCatalogPageName from '../../components/CatalogPageName/catalogpageName';
import CatalogFilter from '../../components/CatalogFiltration/catalogFiltration';

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
        <GetCatalogPageName />
      </Box>
      <Container maxWidth={false}>
        <Grid container>
          <Grid item xs={12} sm={2}>
            <GetCatalogNavigation />
            <Divider sx={{ marginBottom: '20px' }} />
            <CatalogFilter />
          </Grid>

          <Grid item xs={12} sm={10}>
            <GetCatalog />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
