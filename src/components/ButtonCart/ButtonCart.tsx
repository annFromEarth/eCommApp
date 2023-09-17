import { Button } from '@mui/material';
import { useState } from 'react';
import { addProductCart, createNewCart, getActiveCart, removeProductCart } from './ cartRequest';
import { IActiveCart, ILineItem, VersionLineListProductCartType } from './type';
import { useAppDispatch } from '../../hooks';
import { setCurrentVersion } from '../../features/myCartSlice';

const BUTTON_CART = {
  add: 'Add to Cart',
  remove: 'Remove from Cart',
};

let isNewCart = true;

async function getListItemsId(idProduct: string | undefined) {
  const listProductsCart = await getActiveCart();
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

  async function handleButtonCart() {
    let versionCart;
    const idActiveCart = sessionStorage.getItem('CartID');

    if (!clickedButton) {
      setNameButton(BUTTON_CART.remove);
      setClickedButton(true);
      if (isNewCart) {
        const cart: IActiveCart = await createNewCart();
        sessionStorage.setItem('CartID', cart.id);
        const response = await addProductCart(props.id, cart.id);
        versionCart = response.version;
        isNewCart = false;
      } else {
        if (idActiveCart) {
          const response = await addProductCart(props.id, idActiveCart);
          versionCart = response.version;
        }
      }
    } else {
      setNameButton(BUTTON_CART.add);
      setClickedButton(false);
      const versionLineListProductCart = await getListItemsId(props.id);
      if (idActiveCart === null) throw Error('idActiveCart === null');
      const response = await removeProductCart(versionLineListProductCart, idActiveCart);
      versionCart = response.version;
    }
    sessionStorage.setItem('versionCart', String(versionCart));
    getActiveCart().then((cart: IActiveCart) => {
      dispatch(setCurrentVersion(cart.version));
    });
  }

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
