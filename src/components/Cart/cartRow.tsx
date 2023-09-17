import { Box } from '@mui/material';
import { Cart, LineItem } from '../../services/types';
import { TableCell, TableRow, Button, Tooltip } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useState } from 'react';
import QuantityForm from './quantityForm';
import { CustomerService } from '../../services/customerService';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setCurrentVersion } from '../../features/myCartSlice';

export function CartRow({
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
  const authorizationToken = sessionStorage?.getItem('authorization-token');

  const dispatch = useAppDispatch();
  const cartVersion = useAppSelector((state) => state.myCart.currentVersion);

  const funcRemoveItem = async () => {
    if (authorizationToken) {
      try {
        const result = await CustomerService.updateMyCart(
          authorizationToken,
          cartProp.id,
          cartVersion,
          [
            {
              action: 'removeLineItem',
              lineItemId: itemProp.id,
            },
          ]
        );
        setCartDataProp(result);
        dispatch(setCurrentVersion(result.version));
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
      <TableCell align="left">{itemProp.name['en-GB']}</TableCell>
      <TableCell align="center" sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box
          className="itemImage"
          sx={{
            background: `url(${itemProp.variant.images[0].url})`,
            width: '60px',
            height: '60px',
            backgroundSize: 'cover',
          }}
        ></Box>
      </TableCell>
      <TableCell align="center">
        {(itemProp.price.discounted.value.centAmount / Math.pow(10, 2)).toFixed(2)}{' '}
        {itemProp.price.value.currencyCode}
      </TableCell>
      <TableCell align="left">
        {' '}
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
        )}{' '}
      </TableCell>
      <TableCell align="center">
        {(itemProp.totalPrice.centAmount / Math.pow(10, 2)).toFixed(2)}{' '}
        {itemProp.price.value.currencyCode}
      </TableCell>
      <TableCell align="center">
        <Tooltip title="Remove item from cart">
          <Button size="small" onClick={funcRemoveItem}>
            ❌
          </Button>
        </Tooltip>
        {ErrorUpdate}
      </TableCell>
    </TableRow>
  );
}
