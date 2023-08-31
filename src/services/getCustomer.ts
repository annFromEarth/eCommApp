import { Customer } from '../pages/Profile/types';

const BASE_URL = import.meta.env.VITE_CLIENT_CTP_API_URL;
const API_KEY = import.meta.env.VITE_CLIENT_CTP_PROJECT_KEY;

export default async function getCustomer(authorizationToken: string): Promise<Customer> {
  const response = await fetch(`${BASE_URL}/${API_KEY}/me`, {
    headers: {
      Authorization: 'Bearer ' + authorizationToken,
    },
  });
  const customer: Customer = await response.json();
  return customer;
}
