import { Customer } from '../pages/Profile/types';
import { API_URL, PROJECT_KEY } from '../constants';
import { getAdminBearerToken } from './getAdminBearerToken';
import { submitCustomer } from '../components/registrationForm/types';
import { Action, Cart, CartAction, CartPagedQueryResponse } from './types';
import { IErrorObject, ISessionToken } from '../types/types.ts';

export class CustomerService {
  static async getMe(authorizationToken: string): Promise<Customer> {
    const response = await fetch(`${API_URL}/${PROJECT_KEY}/me`, {
      headers: {
        Authorization: 'Bearer ' + authorizationToken,
      },
    });
    const customer: Customer = await response.json();
    return customer;
  }

  static async create(data: submitCustomer) {
    const ADMIN_BEARER_TOKEN = await getAdminBearerToken();
    const response = await fetch(`${API_URL}/${PROJECT_KEY}/customers`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${ADMIN_BEARER_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    return result;
  }

  static async updateMe(
    authorizationToken: string,
    version: number,
    actions: Action[]
  ): Promise<Customer> {
    const response = await fetch(`${API_URL}/${PROJECT_KEY}/me`, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + authorizationToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ version: version, actions: actions }),
    });
    const customer: Customer = await response.json();
    return customer;
  }

  static async changePasswordMe(
    authorizationToken: string,
    version: number,
    currentPassword: string,
    newPassword: string
  ) {
    const response = await fetch(`${API_URL}/${PROJECT_KEY}/me/password`, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + authorizationToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        version: version,
        currentPassword: currentPassword,
        newPassword: newPassword,
      }),
    });
    const customer: Customer = await response.json();
    return customer;
  }

  static async requestCarts(authorizationToken: string) {
    const response = await fetch(`${API_URL}/${PROJECT_KEY}/me/carts`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + authorizationToken,
      },
    });
    const carts: CartPagedQueryResponse = await response.json();
    return carts;
  }

  static async getMyCart(authorizationToken: string, id: string) {
    const response = await fetch(`${API_URL}/${PROJECT_KEY}/me/carts/${id}`, {
      headers: {
        Authorization: 'Bearer ' + authorizationToken,
      },
    });
    const cart: Cart = await response.json();
    return cart;
  }

  static async getActiveCart(authorizationToken: string) {
    const response = await fetch(`${API_URL}/${PROJECT_KEY}/me/active-cart`, {
      headers: {
        Authorization: 'Bearer ' + authorizationToken,
      },
    });

    const cart: Cart = await response.json();
    return cart;
  }

  static async updateMyCart(
    authorizationToken: string,
    id: string,
    version: number,
    actions: CartAction[]
  ): Promise<Cart> {
    const response = await fetch(`${API_URL}/${PROJECT_KEY}/me/carts/${id}`, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + authorizationToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ version: version, actions: actions }),
    });
    const cart: Cart = await response.json();
    return cart;
  }

  static async clearCartById(
    authorizationToken: string,
    id: string,
    version: number
  ): Promise<Cart> {
    const response = await fetch(`${API_URL}/${PROJECT_KEY}/me/carts/${id}?version=${version}`, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + authorizationToken,
      },
    });
    const cart: Cart = await response.json();
    return cart;
  }

  static async createAnonymousSession(uniqId: string): Promise<ISessionToken | IErrorObject> {
    const response = await fetch(
      `${import.meta.env.VITE_ADMIN_CTP_AUTH_URL}/oauth/${PROJECT_KEY}/anonymous/token`,
      {
        body: `grant_type=client_credentials&anonymous_id=${uniqId}`,
        headers: {
          Authorization:
            'Basic ' +
            btoa(
              `${import.meta.env.VITE_ADMIN_CTP_CLIENT_ID}:${
                import.meta.env.VITE_ADMIN_CTP_CLIENT_SECRET
              }`
            ),
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        method: 'POST',
      }
    );
    return await response.json();
  }

  static async createAnonymousCart(sessionToken: ISessionToken, anonymousId: string) {
    const response = await fetch(`${API_URL}/${PROJECT_KEY}/me/carts`, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + sessionToken.access_token,
      },
      body: JSON.stringify({
        currency: 'GBP',
        anonymousId,
      }),
    });
    return await response.json();
  }
}
