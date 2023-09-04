import { Box, useTheme, Container, Grid, Divider } from '@mui/material';
import GetCatalog from '../../components/Catalog/catalog';
import GetCatalogNavigation from '../../components/CatalogNavigation/catalogNavigation';
import GetCatalogPageName from '../../components/CatalogPageName/catalogpageName';
import CatalogFilter from '../../components/CatalogFiltration/catalogFiltration';
import { BasicBreadcrumbs } from '../../components/CatalogBreadcrumbs/catalogBreadcrumbs';

export function PlantsPage() {
  const plantsTheme = useTheme();

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          position: 'relative',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '15px',
          color: plantsTheme.palette.text.primary,
        }}
      >
        <Box sx={{ position: 'absolute', left: '25px' }}>
          <BasicBreadcrumbs />
        </Box>
        <GetCatalogPageName />
      </Box>
      <Container maxWidth={false} sx={{ marginBottom: '20px' }}>
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
