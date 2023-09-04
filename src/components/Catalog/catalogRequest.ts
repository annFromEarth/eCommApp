import { IFiltrationRequest } from './catalog.types';

export async function getProducts() {
  const authorizationToken: string = window.sessionStorage.getItem('authorization-token')!;

  const response = await fetch(
    `${import.meta.env.VITE_CLIENT_CTP_API_URL}/${
      import.meta.env.VITE_CLIENT_CTP_PROJECT_KEY
    }/product-projections`,
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

export async function getProductsByCategory(category: string | null) {
  const authorizationToken: string = window.sessionStorage.getItem('authorization-token')!;

  const response = await fetch(
    `${import.meta.env.VITE_CLIENT_CTP_API_URL}/${
      import.meta.env.VITE_CLIENT_CTP_PROJECT_KEY
    }/product-projections/search?filter=categories.id:"${category}"`,
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

export async function getFilteredProducts({
  priceFrom,
  priceTo,
  size,
  currentCategoryId,
}: IFiltrationRequest) {
  const authorizationToken: string = window.sessionStorage.getItem('authorization-token')!;

  const makeSearchString = (): string => {
    let priceFromFinal: string | number = Number(priceFrom) * 100;
    let priceToFinal: string | number = Number(priceTo) * 100;

    if (priceTo === '0' || priceTo === '') {
      priceToFinal = '*';
    }

    if (priceFrom === '') {
      priceFromFinal = '0';
    }

    return `?filter=variants.price.centAmount:range (${priceFromFinal} to ${priceToFinal})${
      size && size !== '' && `&filter=variants.attributes.size:"${size}"`
    }${
      currentCategoryId &&
      currentCategoryId !== '' &&
      `&filter=categories.id:"${currentCategoryId}"`
    }`;
  };

  const response = await fetch(
    `${import.meta.env.VITE_CLIENT_CTP_API_URL}/${
      import.meta.env.VITE_CLIENT_CTP_PROJECT_KEY
    }/product-projections/search${makeSearchString()}`,
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
