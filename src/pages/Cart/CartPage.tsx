import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PAGES_TITLES } from '../../data/titles';
import { Cart } from '../../services/types';
import { PATH } from '../../services/routing/paths';
import { CustomerService } from '../../services/customerService';
import { CartRow } from '../../components/Cart/cartRow';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setCurrentVersion } from '../../features/myCartSlice';
import { Bars } from 'react-loader-spinner';
import { CartRowSmallScreen } from '../../components/Cart/cartRowSmall';

import {
  Box,
  useTheme,
  Typography,
  Button,
  Tooltip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useMediaQuery,
} from '@mui/material';
import PromoCodeForm from '../../components/Cart/promoCodeForm';

export function CartPage() {
  const plantsTheme = useTheme();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const matchesScreen = useMediaQuery('(min-width:800px)');

  const [cartData, setCartData] = useState<Cart | null>(null);
  const [cartErrorUpdate, setCartErrorUpdate] = useState<string>('');

  const priceBeforePromo =
    cartData && cartData.lineItems[0]
      ? (
          cartData.lineItems
            .map((item) => item.price.discounted.value.centAmount * item.quantity)
            .reduce((item, acc) => item + acc) / Math.pow(10, cartData?.totalPrice.fractionDigits)
        ).toFixed(2)
      : '';

  const priceAfterPromo = cartData
    ? (cartData.totalPrice.centAmount / Math.pow(10, cartData?.totalPrice.fractionDigits)).toFixed(
        2
      )
    : '';

  const discountAmount = (Number(priceAfterPromo) - Number(priceBeforePromo)).toFixed(2);

  const dispatch = useAppDispatch();
  const cartVersion = useAppSelector((state) => state.myCart.currentVersion);

  const funcClearCart = async () => {
    if (
      confirm('Irreversible action! Please confirm, if you want to clear all the goods from cart.')
    ) {
      let token;
      if (sessionStorage.getItem('authorization-token')) {
        token = sessionStorage.getItem('authorization-token');
      } else {
        token = sessionStorage.getItem('anonymousToken');
      }
      if (token && cartData) {
        try {
          const clearCart = await CustomerService.clearCartById(token, cartData?.id, cartVersion);
          if (!clearCart.message) {
            setCartData(null);
            if (sessionStorage.getItem('authorization-token')) {
              sessionStorage.removeItem('cartVersion');
              sessionStorage.removeItem('cartId');
            } else {
              sessionStorage.removeItem('anonymCartVersion');
              sessionStorage.removeItem('anonymCartId');
            }
          } else {
            setCartErrorUpdate(clearCart.message);
          }
        } catch (err) {
          const error = err as Error;
          setCartErrorUpdate(error.message);
        }
      }
    } else return;
  };

  useEffect(() => {
    let token: string | null;
    if (sessionStorage.getItem('authorization-token')) {
      token = sessionStorage.getItem('authorization-token');
    } else {
      token = sessionStorage.getItem('anonymousToken');
    }
    const fetchCartData = async () => {
      try {
        const cartQuery = await CustomerService.getActiveCart(token!);

        if (!cartQuery.message) {
          setCartData(cartQuery);
          dispatch(setCurrentVersion(cartQuery.version));
          setLoading(false);
        } else {
          setCartErrorUpdate(cartQuery.message);
          setLoading(false);
        }
      } catch (err) {
        const error = err as Error;
        setCartErrorUpdate(error.message);
        setLoading(false);
      }
    };
    // if (!authorizationToken) {
    //   navigate(PATH.login);
    // }
    if (token) fetchCartData();
  }, [navigate, dispatch]);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          //   width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '15px',
          color: plantsTheme.palette.text.primary,
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom sx={{ margin: '30px' }}>
          {PAGES_TITLES.cart}
        </Typography>

        {loading && (
          <Bars
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        )}

        {!loading && (!cartData || !cartData?.lineItems[0]) && (
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
                background: 'url(../../../img/emptyCart/emptyBag.svg)',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
              }}
            />
            <Link to={PATH.plants}>
              <Button variant="contained" sx={{ margin: '20px' }}>
                browse plants
              </Button>
            </Link>
          </>
        )}

        {!loading && matchesScreen && cartData && cartData?.lineItems[0] && (
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 100, maxWidth: '98%', margin: '0 auto' }}
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
                  key="promo-code-row-12345"
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    background: `#cccc81`,
                  }}
                >
                  <TableCell component="th" scope="row">
                    Do you have a promo code?
                  </TableCell>
                  <TableCell align="center">
                    <PromoCodeForm cartProp={cartData} setCartDataProp={setCartData} />
                  </TableCell>
                  <TableCell align="center"></TableCell>
                  <TableCell align="center" sx={{ color: '#36662a' }}>
                    {cartData.discountCodes[0] && `Promo code SANTACACTUS applied!`}
                  </TableCell>
                  <TableCell align="center"></TableCell>
                  <TableCell align="center" sx={{ color: '#36662a' }}>
                    {' '}
                    {cartData.discountCodes[0] &&
                      `${discountAmount} ${cartData?.totalPrice.currencyCode}`}
                  </TableCell>
                  <TableCell align="center" sx={{ color: '#36662a' }}>
                    {' '}
                    {cartData.discountCodes[0] && 'Your discount'}
                  </TableCell>
                </TableRow>

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
                    {cartData.discountCodes[0] && (
                      <Box sx={{ textDecoration: 'line-through' }}>
                        {' '}
                        {priceBeforePromo} {cartData?.totalPrice.currencyCode}
                      </Box>
                    )}
                    {cartData && (
                      <Box>
                        {priceAfterPromo} {cartData?.totalPrice.currencyCode}
                      </Box>
                    )}
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="Remove all items">
                      <Button size="small" variant="outlined" color="error" onClick={funcClearCart}>
                        Clear all
                      </Button>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {!loading && !matchesScreen && cartData && cartData?.lineItems[0] && (
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 100, maxWidth: '98%', margin: '0 auto' }}
              aria-label="customized table"
            >
              <TableHead>
                <TableRow sx={{ background: `#ccff90` }}>
                  <TableCell>#</TableCell>
                  <TableCell align="left">Image</TableCell>
                  <TableCell align="center">Info</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cartData?.lineItems.map((item, index) => (
                  <CartRowSmallScreen
                    key={item.id}
                    itemProp={item}
                    indexProp={index}
                    cartProp={cartData}
                    setCartDataProp={setCartData}
                  />
                ))}

                <TableRow
                  key="promo-code-question-row-12345"
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    background: `#cccc81`,
                  }}
                >
                  <TableCell component="th" scope="row">
                    <PromoCodeForm cartProp={cartData} setCartDataProp={setCartData} />
                  </TableCell>
                  <TableCell component="th" scope="row"></TableCell>
                  <TableCell align="center">Do you have a promo code?</TableCell>
                </TableRow>

                <TableRow
                  key="promo-code-info-row-12345"
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    background: `#cccc81`,
                  }}
                >
                  <TableCell component="th" scope="row">
                    {' '}
                  </TableCell>
                  <TableCell align="center" sx={{ color: '#36662a' }}>
                    {cartData.discountCodes[0] && `Promo code SANTACACTUS applied!`}
                  </TableCell>
                  <TableCell align="center" sx={{ color: '#36662a' }}>
                    {' '}
                    {cartData.discountCodes[0] &&
                      `Your discount: ${discountAmount} ${cartData?.totalPrice.currencyCode}`}
                  </TableCell>
                </TableRow>

                <TableRow
                  key="total-sum-small-row-130923"
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    background: `#ccff90`,
                  }}
                >
                  <TableCell component="th" scope="row"></TableCell>
                  <TableCell component="th" scope="row"></TableCell>
                  <TableCell align="center">
                    <Box>Total Sum:</Box>
                    {cartData.discountCodes[0] && (
                      <Box sx={{ textDecoration: 'line-through' }}>
                        {' '}
                        {priceBeforePromo} {cartData?.totalPrice.currencyCode}
                      </Box>
                    )}
                    {cartData && (
                      <Box>
                        {priceAfterPromo} {cartData?.totalPrice.currencyCode}
                      </Box>
                    )}
                    <Box>
                      <Tooltip title="Remove all items">
                        <Button
                          size="small"
                          variant="outlined"
                          color="error"
                          onClick={funcClearCart}
                        >
                          Clear all
                        </Button>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        )}
        <Box sx={{ color: 'red', alignSelf: 'center', margin: '20px', fontSize: '1em' }}>
          {cartErrorUpdate}
        </Box>
      </Box>
    </>
  );
}
