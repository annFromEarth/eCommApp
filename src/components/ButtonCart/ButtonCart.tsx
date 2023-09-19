import { Button } from '@mui/material';
import { useState } from 'react';
import { ILineItem, VersionLineListProductCartType } from './type';
import { useAppDispatch } from '../../hooks';
import { CustomerService } from '../../services/customerService';
import { setCurrentVersion } from '../../features/myCartSlice';

const BUTTON_CART = {
  add: 'Add to Cart',
  remove: 'Remove from Cart',
};

async function getListItemsId(idProduct: string | undefined) {
  let token;
  if (sessionStorage.getItem('authorization-token')) {
    token = sessionStorage.getItem('authorization-token');
  } else {
    token = sessionStorage.getItem('anonymousToken');
  }
  const listProductsCart = await CustomerService.getActiveCart(token!);
  const versionLineCart: VersionLineListProductCartType = {
    version: listProductsCart.version,
    idLine: '',
  };
  // console.log('listProductsCart', listProductsCart);
  listProductsCart.lineItems.map((lineProduct: ILineItem) => {
    if (lineProduct.productId === idProduct) {
      versionLineCart.idLine = lineProduct.id;
    }
  });
  return versionLineCart;
}

export function ButtonCart(props: { id: string | undefined }) {
  const [nameButton, setNameButton] = useState<string>(BUTTON_CART.add);
  const [clickedButton, setClickedButton] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  // const navigate = useNavigate();

  async function handleButtonCart() {
    let token;
    let cartVersion;
    let cartId;
    let isAnonymous;
    if (sessionStorage.getItem('authorization-token')) {
      token = sessionStorage.getItem('authorization-token');
      cartVersion = sessionStorage.getItem('cartVersion');
      cartId = sessionStorage.getItem('cartId');
      isAnonymous = false;
    } else {
      token = sessionStorage.getItem('anonymousToken');
      cartVersion = sessionStorage.getItem('anonymCartVersion');
      cartId = sessionStorage.getItem('anonymCartId');
      isAnonymous = true;
    }

    if (!clickedButton) {
      setNameButton(BUTTON_CART.remove);
      setClickedButton(true);
      //if (isNewCart) {
      //const cart: IActiveCart = await createNewCart();
      //sessionStorage.setItem('cartId', cart.id);
      //const cartMy: Cart = await CustomerService.getActiveCart(authorizationToken); //
      // console.log(cartMy);
      //sessionStorage.setItem('cartVersion', String(cartMy.version));
      const result = await CustomerService.updateMyCart(token!, cartId!, Number(cartVersion), [
        {
          action: 'addLineItem',
          productId: props.id,
          variantId: 1,
          quantity: 1,
        },
      ]);
      if (isAnonymous) {
        sessionStorage.setItem('anonymCartVersion', result.version.toString());
      } else {
        sessionStorage.setItem('cartVersion', result.version.toString());
      }
      //const cartMy: Cart = await CustomerService.updateMyCart(authorizationToken, props.id, cart.id);
      //versionCart = response.version;
      //isNewCart = false;
      //   } else {
      //     if (idActiveCart) {
      //       const cartMy: Cart = await CustomerService.getActiveCart(authorizationToken); //
      //       // console.log(cartMy);
      //       sessionStorage.setItem('cartVersion', String(cartMy.version));
      //       const response = await addProductCart(props.id, idActiveCart);
      //       versionCart = response.version;
      //     }
      //   }
    } else {
      setNameButton(BUTTON_CART.add);
      setClickedButton(false);
      const versionLineListProductCart = await getListItemsId(props.id);
      const result = await CustomerService.updateMyCart(token!, cartId!, Number(cartVersion), [
        {
          action: 'removeLineItem',
          lineItemId: versionLineListProductCart.idLine,
          variantId: 1,
          quantity: 1,
        },
      ]);
      if (isAnonymous) {
        sessionStorage.setItem('anonymCartVersion', result.version.toString());
      } else {
        sessionStorage.setItem('cartVersion', result.version.toString());
      }
      dispatch(setCurrentVersion(result.version));
      //versionCart = response.version;
    }
    // sessionStorage.setItem('cartVersion', String(versionCart));
    // getActiveCart().then((cart: IActiveCart) => {
    //   dispatch(setCurrentVersion(cart.version));
    // });
  }

  //   useEffect(() => {
  //     if (!authorizationToken) {
  //       navigate(PATH.login);
  //     }
  //   }, [navigate, authorizationToken]);

  return (
    <Button
      className="button-cart"
      variant="contained"
      sx={{ width: '100%' }}
      onClick={handleButtonCart}
    >
      {nameButton} <span style={{ marginLeft: '15px' }}>&#128722;</span>
    </Button>
  );
}
