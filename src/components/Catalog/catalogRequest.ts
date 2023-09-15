import axios from 'axios';

export async function getProducts() {
  if (window.sessionStorage.getItem('token')) {
    const authorizationToken: string = window.sessionStorage.getItem('token')!;

    const response = await axios.get(
      `${import.meta.env.VITE_CLIENT_CTP_API_URL}/${
        import.meta.env.VITE_CLIENT_CTP_PROJECT_KEY
      }/product-projections`,
      {
        headers: {
          Authorization: `Bearer ${authorizationToken}`,
        },
      }
    );

    const data = await response.data;
    return data;
  }
}

export async function getFilteredProducts(
  currentCategoryId?: string | null,
  priceFrom?: string,
  priceTo?: string,
  size?: string
) {
  if (window.sessionStorage.getItem('token')) {
    const authorizationToken: string = window.sessionStorage.getItem('token')!;
    const params = new URLSearchParams();
    let priceFromFinal: string | number = Number(priceFrom) * 100;
    let priceToFinal: string | number = Number(priceTo) * 100;

    if (!!currentCategoryId) {
      params.append('filter', `categories.id:"${currentCategoryId}"`);
    }

    if (!!priceFrom || !!priceTo) {
      console.log(!!priceFrom, !!priceTo);
      if (priceTo === '0' || priceTo === '') {
        priceToFinal = '*';
      }
      if (priceFrom === '') {
        priceFromFinal = '0';
      }
      params.append(
        'filter',
        `variants.price.centAmount:range (${priceFromFinal} to ${priceToFinal})`
      );
    }
    if (!!size) {
      params.append('filter', `variants.attributes.size:"${size}"`);
    }

    const response = await axios.get(
      `${import.meta.env.VITE_CLIENT_CTP_API_URL}/${
        import.meta.env.VITE_CLIENT_CTP_PROJECT_KEY
      }/product-projections/search`,
      {
        params: params,
        headers: {
          Authorization: `Bearer ${authorizationToken}`,
        },
      }
    );
    const data = await response.data;
    return data;
  }
}
