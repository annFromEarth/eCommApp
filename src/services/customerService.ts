import { Customer } from '../pages/Profile/types';
import { API_URL, PROJECT_KEY } from '../constants';
import { getAdminBearerToken } from './getAdminBearerToken';
import { submitCustomer } from '../components/registrationForm/types';

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
}
