import { Box, Typography } from '@mui/material';
import { IPricesProduct, IProduct } from './productType';
import { ButtonCart } from '../../components/ButtonCart/ButtonCart';

export function MainContentProduct(props: { product: IProduct; id: string }) {
  const product = props.product;
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', margin: '0 20px', gap: '10px' }}>
      <TitleProduct name={product.name['en-GB']} />
      <Box
        className="options-product"
        sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <PriceProduct prices={product.masterVariant.prices} />
        <Box sx={{ maxWidth: '250px' }}>
          <ButtonCart id={props.id} />
        </Box>
      </Box>
      <DescriptionProduct description={product.description['en-GB']} />
    </Box>
  );
}

function TitleProduct(props: { name: string }) {
  return (
    <>
      <Typography variant="h2" sx={{ fontSize: '30px' }} gutterBottom>
        {props.name}
      </Typography>
    </>
  );
}

function PriceProduct(props: { prices: Array<IPricesProduct> }) {
  const prices = props.prices[0];
  const price = (prices.value.centAmount / 100).toFixed(2);
  const discont = prices?.discounted?.value?.centAmount
    ? (prices.discounted.value.centAmount / 100).toFixed(2)
    : undefined;
  if (discont) {
    return (
      <Box sx={{ display: 'flex', gap: '10px' }}>
        <Typography
          variant="body2"
          sx={{ margin: '5px 0', fontSize: '20px', textDecoration: 'line-through' }}
          gutterBottom
        >
          {price} &#163;
        </Typography>
        <Typography
          variant="body2"
          sx={{ margin: '5px 0', fontSize: '20px', color: 'red' }}
          gutterBottom
        >
          {discont} &#163;
        </Typography>
      </Box>
    );
  } else {
    return (
      <>
        <Typography variant="body2" sx={{ margin: '5px 0', fontSize: '20px' }} gutterBottom>
          {price} &#163;
        </Typography>
      </>
    );
  }
}

function DescriptionProduct(props: { description: string }) {
  const TITLE_DESCRIPTION = 'Description';
  return (
    <Box>
      <Typography variant="h2" sx={{ fontSize: '18px' }} gutterBottom>
        {TITLE_DESCRIPTION}
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom sx={{ textAlign: 'justify' }}>
        {props.description}
      </Typography>
    </Box>
  );
}
