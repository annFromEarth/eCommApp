import { Customer } from '../pages/Profile/types';
import { API_URL, PROJECT_KEY } from '../constants';
import { getAdminBearerToken } from './getAdminBearerToken';
import { submitCustomer } from '../components/registrationForm/types';
import { Action } from './types';

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
    return result; //TODO add types
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
}