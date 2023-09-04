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
