import { getBearerToken } from './getBearerToken';

export async function createCustomer(data = {}) {
  try {
    const BEARER_TOKEN = await getBearerToken();
    const response = await fetch(
      'https://api.europe-west1.gcp.commercetools.com/ecommerceapp_951/customers',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`, //admin
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );
    return response.json();
  } catch (e) {}
}

// ***Commersetools sample request
// curl https://api.{region}.commercetools.com/{projectKey}/customers -i \
// --header 'Authorization: Bearer ${BEARER_TOKEN}' \
// --header 'Content-Type: application/json' \
// --data-binary @- << DATA
// {
//   "email" : "johndoe@example.com",
//   "firstName" : "John",
//   "lastName" : "Doe",
//   "password" : "secret123",

// }
// DATA
