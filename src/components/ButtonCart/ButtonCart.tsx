import { Button } from '@mui/material';
import { useState } from 'react';
import { addProductCart, createNewCart, getActiveCart, removeProductCart } from './ cartRequest';

const BUTTON_CART = {
  add: 'Add to Cart',
  remove: 'Remove from Cart',
};

let isNewCart = true;

async function getListItemsId(idProduct: string | undefined) {
  const listProductsCart = await getActiveCart();
  const versionLineCart = {
    version: listProductsCart.version,
    idLine: '',
  };
  listProductsCart.lineItems.map((lineProduct) => {
    if (lineProduct.productId === idProduct) {
      versionLineCart.idLine = lineProduct.id;
    }
  });
  return versionLineCart;
}

export function ButtonCart(props: { id: string | undefined }) {
  const [nameButton, setNameButton] = useState<string>(BUTTON_CART.add);
  const [clickedButton, setClickedButton] = useState<boolean>(false);

  async function handleButtonCart() {
    let versionCart;
    const idActiveCart = sessionStorage.getItem('CartID');
    if (idActiveCart === null) throw Error('idActiveCart === null');

    if (!clickedButton) {
      setNameButton(BUTTON_CART.remove);
      setClickedButton(true);
      if (isNewCart) {
        const cart = await createNewCart();
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
      const response = await removeProductCart(versionLineListProductCart, idActiveCart);
      versionCart = response.version;
    }
    sessionStorage.setItem('versionCart', String(versionCart));
    getActiveCart().then((cart) => {
     // versionCart = cart.version;
      console.log('I am active cart', cart);
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
