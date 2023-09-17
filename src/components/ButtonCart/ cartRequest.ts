import { VersionLineListProductCartType } from './type';

export async function createNewCart() {
  const authorizationToken: string | null = window.sessionStorage.getItem('authorization-token');

  const options = {
    currency: 'GBP',
  };

  const response = await fetch(
    `${import.meta.env.VITE_CLIENT_CTP_API_URL}/${
      import.meta.env.VITE_CLIENT_CTP_PROJECT_KEY
    }/me/carts`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${authorizationToken}`,
      },
      body: JSON.stringify(options),
    }
  );
  const data = await response.json();

  return data;
}

export async function addProductCart(idProduct: string | undefined, idCart: string) {
  const authorizationToken: string | null = window.sessionStorage.getItem('authorization-token');

  const sessionVersion = sessionStorage.getItem('versionCart');
  const versionCart = sessionVersion !== 'undefined' ? Number(sessionVersion) : 1;
  // console.log('versionCart ', versionCart);

  const options = {
    version: versionCart,
    actions: [
      {
        action: 'addLineItem',
        productId: idProduct,
        variantId: 1,
        quantity: 1,
      },
    ],
  };

  const response = await fetch(
    `${import.meta.env.VITE_CLIENT_CTP_API_URL}/${
      import.meta.env.VITE_CLIENT_CTP_PROJECT_KEY
    }/me/carts/${idCart}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${authorizationToken}`,
      },
      body: JSON.stringify(options),
    }
  );
  const data = await response.json();

  return data;
}

export async function getActiveCart() {
  const authorizationToken: string | null = window.sessionStorage.getItem('authorization-token');

  const response = await fetch(
    `${import.meta.env.VITE_CLIENT_CTP_API_URL}/${
      import.meta.env.VITE_CLIENT_CTP_PROJECT_KEY
    }/me/active-cart`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authorizationToken}`,
      },
    }
  );
  const data = await response.json();

  return data;
}

export async function removeProductCart(
  versionLineListProductCart: VersionLineListProductCartType,
  idCart: string
) {
  const authorizationToken: string | null = window.sessionStorage.getItem('authorization-token');

  const options = {
    version: versionLineListProductCart.version,
    actions: [
      {
        action: 'removeLineItem',
        lineItemId: versionLineListProductCart.idLine,
        variantId: 1,
        quantity: 1,
      },
    ],
  };

  const response = await fetch(
    `${import.meta.env.VITE_CLIENT_CTP_API_URL}/${
      import.meta.env.VITE_CLIENT_CTP_PROJECT_KEY
    }/me/carts/${idCart}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${authorizationToken}`,
      },
      body: JSON.stringify(options),
    }
  );
  const data = await response.json();

  return data;
}
