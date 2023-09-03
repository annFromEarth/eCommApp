import { IFiltrationRequest } from './catalogFiltration.types';

export async function getFilteredProducts({ priceFrom, priceTo }: IFiltrationRequest) {
  const authorizationToken: string = window.sessionStorage.getItem('authorization-token')!;

  const makeSearchString = (): string => {
    return `variants.scopedPrice.value.centAmount:range (${priceFrom} to ${priceTo})`;
  };

  const response = await fetch(
    `${process.env.VITE_CLIENT_CTP_API_URL}/${
      process.env.VITE_CLIENT_CTP_PROJECT_KEY
    }/product-projections/search?filter=${makeSearchString()}`,
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
