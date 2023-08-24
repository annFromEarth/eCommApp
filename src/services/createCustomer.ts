import { getAdminBearerToken } from './getAdminBearerToken';

export async function createCustomer(data = {}) {
  try {
    const ADMIN_BEARER_TOKEN = await getAdminBearerToken();
    const response = await fetch(
      'https://api.europe-west1.gcp.commercetools.com/ecommerceapp_951/customers',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${ADMIN_BEARER_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );
    const result = await response.json();
    if (response.status === 201) {
      return `Customer created. Welcome ${result.customer.firstName}!`;
    } else {
      return result;
    }
  } catch (e) {
    //TODO: error handling
  }
}
