import axios from 'axios';
import { CustomerService } from '../../services/customerService';

export async function getFilteredProducts(
  currentCategoryId?: string | null,
  priceFrom?: string,
  priceTo?: string,
  size?: string,
  sort?: string,
  offset?: number
) {
  if (window.sessionStorage.getItem('token')) {
    const authorizationToken: string = window.sessionStorage.getItem('token')!;
    const newCart = await CustomerService.createAnonymousCart(authorizationToken); //create anonymous cart
    window.sessionStorage.setItem('anonymCartId', newCart.id); //remember cart id
    window.sessionStorage.setItem('anonymCartVersion', String(newCart.version)); //remember cart version

    const params = new URLSearchParams();
    let priceFromFinal: string | number = Number(priceFrom) * 100;
    let priceToFinal: string | number = Number(priceTo) * 100;

    params.append('limit', '8');

    params.append('offset', `${offset}`);

    if (!!currentCategoryId) {
      params.append('filter', `categories.id:"${currentCategoryId}"`);
    }

    if (!!priceFrom || !!priceTo) {
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
    if (!!sort) {
      params.append('sort', `${sort}`);
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
