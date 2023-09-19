import { PROJECT_KEY } from '../constants';

export async function generateToken() {
  const response = await fetch(`${import.meta.env.VITE_CLIENT_CTP_AUTH_URL}/oauth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization:
        'Basic N29zbFJYLVN3dUVPWWsycERSeHdTSS1wOmRXX0Q1eGNRU004WC1lbHRxUXFyMHp1bVRQUGo4QVlt',
    },
    body: 'grant_type=client_credentials',
  });
  const data = await response.json();
  return data;
}

export async function generateAnonymousToken() {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_CLIENT_CTP_AUTH_URL}/oauth/${PROJECT_KEY}/anonymous/token`,
      {
        body: `grant_type=client_credentials&scope=view_published_products:${PROJECT_KEY} view_categories:${PROJECT_KEY} manage_my_orders:${PROJECT_KEY} manage_my_profile:${PROJECT_KEY} manage_my_quotes:${PROJECT_KEY} manage_my_quote_requests:${PROJECT_KEY}`,
        headers: {
          Authorization:
            'Basic N29zbFJYLVN3dUVPWWsycERSeHdTSS1wOmRXX0Q1eGNRU004WC1lbHRxUXFyMHp1bVRQUGo4QVlt',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        method: 'POST',
      }
    );

    const token = await response.json();
    return token;
  } catch (err) {}
}
