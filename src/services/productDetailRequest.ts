import { IProduct } from '../pages/Product/productType';

export async function getProduct(id: string) {
  const authorizationToken: string = window.sessionStorage.getItem('authorization-token')!;

  const response = await fetch(
    `${import.meta.env.VITE_CLIENT_CTP_API_URL}/${
      import.meta.env.VITE_CLIENT_CTP_PROJECT_KEY
    }/product-projections/${id}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authorizationToken}`,
      },
    }
  );
  const data: IProduct = await response.json();
  return data;
}
