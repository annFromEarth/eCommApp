import { Box, useTheme, Typography, Button, Tooltip } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../services/routing/paths';
import { PAGES_TITLES } from '../../data/titles';
import { CustomerService } from '../../services/customerService';
import { Cart } from '../../services/types';
import { CartRow } from '../../components/Cart/cartRow';
// import '../../../public/img/emptyCart/emptyBag.svg';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

export function CartPage() {
  const plantsTheme = useTheme();
  const navigate = useNavigate();

  const [cartData, setCartData] = useState<Cart | null>(null);
  const [cartErrorUpdate, setCartErrorUpdate] = useState<string>('');
  const [cartDataAvailable, setCartDataAvailable] = useState<boolean>(true);

  const fetchCartData = async (token: string) => {
    try {
      const cartQuery = await CustomerService.getActiveCart(token);
      //   const cartQuery = await CustomerService.requestCarts(token);

      if (!cartQuery.message) {
        setCartData(cartQuery);
        setCartDataAvailable(true);
        // console.log(cartQuery.results[2].lineItems);
        // setCartData(cartQuery.results[2]);
      } else {
        setCartErrorUpdate(cartQuery.message);
        setCartDataAvailable(false);
      }
    } catch (err) {
      const error = err as Error;
      setCartErrorUpdate(error.message);
      setCartDataAvailable(false);
    }
  };

  useEffect(() => {
    const authorizationToken: string = sessionStorage.getItem('authorization-token')!;
    if (!authorizationToken) {
      navigate(PATH.login);
    }
    fetchCartData(authorizationToken);
  }, [navigate]);

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
          {PAGES_TITLES.cart}
        </Typography>
        <Box sx={{ color: 'red', alignSelf: 'center', margin: '20px', fontSize: '1em' }}>
          {cartErrorUpdate}
        </Box>

        {!cartDataAvailable && (
          <>
            <Box
              sx={{
                color: 'rgba(78,8,8,0.7)',
                alignSelf: 'center',
                margin: '20px',
                fontSize: '1.5em',
              }}
            >
              Seems like your cart is empty!
            </Box>
            <Box
              sx={{
                alignSelf: 'center',
                margin: '20px',
                height: '15vw',
                width: '20vw',
                background: 'url(../../../public/img/emptyCart/emptyBag.svg)',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
              }}
            />
            <Button variant="contained" href={PATH.plants} sx={{ margin: '20px' }}>
              {' '}
              browse plants{' '}
            </Button>
          </>
        )}

        {cartDataAvailable && (
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 320, maxWidth: '98%', margin: '0 auto' }}
              aria-label="customized table"
            >
              <TableHead>
                <TableRow sx={{ background: `#ccff90` }}>
                  <TableCell>#</TableCell>
                  <TableCell align="left">Name</TableCell>
                  <TableCell align="center">Image</TableCell>
                  <TableCell align="center">Price</TableCell>
                  <TableCell align="left">Quantity</TableCell>
                  <TableCell align="center">Total</TableCell>
                  <TableCell align="center"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cartData?.lineItems.map((item, index) => (
                  <CartRow
                    key={item.id}
                    itemProp={item}
                    indexProp={index}
                    cartProp={cartData}
                    setCartDataProp={setCartData}
                  />
                ))}
                <TableRow
                  key="total-sum-row-130923"
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    background: `#ccff90`,
                  }}
                >
                  <TableCell component="th" scope="row">
                    Total Sum
                  </TableCell>
                  <TableCell align="center"></TableCell>
                  <TableCell align="center"></TableCell>
                  <TableCell align="center"></TableCell>
                  <TableCell align="center"> </TableCell>
                  <TableCell align="center">
                    {cartData &&
                      (
                        cartData?.totalPrice.centAmount /
                        Math.pow(10, cartData?.totalPrice.fractionDigits)
                      ).toFixed(2)}{' '}
                    {cartData?.totalPrice.currencyCode}
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="Remove all items">
                      <Button
                        size="small"
                        variant="outlined"
                        color="error"
                        onClick={() => {
                          alert('clicked');
                        }}
                      >
                        Clear all
                      </Button>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </>
  );
}
