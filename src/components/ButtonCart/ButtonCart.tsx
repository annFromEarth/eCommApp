import { Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { CustomerService } from '../../services/customerService';
import { selectAnonymousId, selectSessionToken } from '../../features/appSlice.ts';
import {
  selectMyCartData,
  selectMyCartLineItemsProductId,
  updateCart as updateCartAction,
} from '../../features/myCartSlice.ts';

const BUTTON_CART = {
  add: 'Add to Cart',
  remove: 'Remove from Cart',
};

export function ButtonCart(props: { id: string | undefined }) {
  const dispatch = useAppDispatch();
  const sessionToken = useAppSelector(selectSessionToken);
  const anonymousId = useAppSelector(selectAnonymousId);
  const myCartData = useAppSelector(selectMyCartData);
  const myCartLineItemsId = useAppSelector(selectMyCartLineItemsProductId);
  const inCart = myCartLineItemsId.includes(props.id);

  async function createCartAndUpdate() {
    if (!sessionToken) {
      return;
    }
    const newCart = await CustomerService.createAnonymousCart(sessionToken, anonymousId);

    const newCartData = await CustomerService.updateMyCart(
      sessionToken.access_token,
      newCart.id,
      newCart.version,
      [
        {
          action: inCart ? 'removeLineItem' : 'addLineItem',
          productId: props.id,
          variantId: 1,
          quantity: 1,
        },
      ]
    );

    dispatch(updateCartAction(newCartData));
  }

  async function updateCart() {
    if (!sessionToken) {
      return;
    }
    const newCartData = await CustomerService.updateMyCart(
      sessionToken.access_token,
      myCartData.id,
      myCartData.version,
      [
        {
          action: inCart ? 'removeLineItem' : 'addLineItem',
          productId: props.id,
          variantId: 1,
          quantity: 1,
        },
      ]
    );
    dispatch(updateCartAction(newCartData));
  }

  function handleButtonCart() {
    myCartData ? updateCart() : createCartAndUpdate();
  }

  return (
    <Button
      className="button-cart"
      variant="contained"
      sx={{ width: '100%' }}
      onClick={handleButtonCart}
    >
      {inCart ? BUTTON_CART.remove : BUTTON_CART.add}
      <span style={{ marginLeft: '15px' }}>&#128722;</span>
    </Button>
  );
}
