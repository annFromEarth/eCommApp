import { Box } from '@mui/material';
import { Cart, LineItem } from '../../services/types';
import { TableCell, TableRow, Button, Tooltip } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useState } from 'react';
import QuantityForm from './quantityForm';
import { CustomerService } from '../../services/customerService';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setCurrentVersion } from '../../features/myCartSlice';

export function CartRowSmallScreen({
  itemProp,
  indexProp,
  cartProp,
  setCartDataProp,
}: {
  itemProp: LineItem;
  indexProp: number;
  cartProp: Cart;
  setCartDataProp: React.Dispatch<React.SetStateAction<Cart | null>>;
}) {
  const [editQuantity, setEditQuantity] = useState<boolean>(false);
  const funcEditQuantityClick = () => {
    setEditQuantity((editQuantity) => !editQuantity);
  };

  const [ErrorUpdate, setErrorUpdate] = useState<string>('');
  let token;

  const dispatch = useAppDispatch();
  const cartVersion = useAppSelector((state) => state.myCart.currentVersion);

  const funcRemoveItem = async () => {
    if (sessionStorage.getItem('authorization-token')) {
      token = sessionStorage.getItem('authorization-token');
    } else {
      token = sessionStorage.getItem('anonymousToken');
    }
    if (token) {
      try {
        const result = await CustomerService.updateMyCart(token, cartProp.id, cartVersion, [
          {
            action: 'removeLineItem',
            lineItemId: itemProp.id,
          },
        ]);
        setCartDataProp(result);
        dispatch(setCurrentVersion(result.version));
        if (sessionStorage.getItem('authorization-token')) {
          sessionStorage.setItem('cartVersion', result.version.toString());
        } else {
          sessionStorage.setItem('anonymCartVersion', result.version.toString());
        }
      } catch (err) {
        const error = err as Error;
        setErrorUpdate(error.message);
      }
    }
  };

  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell component="th" scope="row">
        {indexProp + 1}
      </TableCell>
      <TableCell align="center">
        <Box
          className="itemImage"
          sx={{
            background: `url(${itemProp.variant.images[0].url})`,
            width: '40px',
            height: '40px',
            backgroundSize: 'cover',
          }}
        ></Box>
      </TableCell>
      <TableCell align="left">
        <Box>{itemProp.name['en-GB']}</Box>
        <Box sx={{ fontWeight: '700' }}>Price per Item:</Box>
        <Box>
          {(itemProp.price.discounted.value.centAmount / Math.pow(10, 2)).toFixed(2)}{' '}
          {itemProp.price.value.currencyCode}
        </Box>
        <Box sx={{ fontWeight: '700' }}>Quantity:</Box>
        <Box>
          {!editQuantity && (
            <>
              {itemProp.quantity}{' '}
              <Button size="small" onClick={funcEditQuantityClick}>
                <EditOutlinedIcon />
              </Button>
            </>
          )}
          {editQuantity && (
            <>
              <QuantityForm
                itemProp={itemProp}
                cartProp={cartProp}
                funcEditQuantityClick={funcEditQuantityClick}
                setCartDataProp={setCartDataProp}
              />
            </>
          )}
        </Box>
        <Box sx={{ fontWeight: '700' }}>Total:</Box>
        <Box>
          {(itemProp.totalPrice.centAmount / Math.pow(10, 2)).toFixed(2)}{' '}
          {itemProp.price.value.currencyCode}
        </Box>
        <Box>
          <Tooltip title="Remove item from cart">
            <Button size="small" onClick={funcRemoveItem}>
              ❌
            </Button>
          </Tooltip>
          {ErrorUpdate}
        </Box>
      </TableCell>
    </TableRow>
  );
}
