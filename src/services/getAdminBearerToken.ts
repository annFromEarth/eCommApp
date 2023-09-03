export async function getAdminBearerToken() {
  try {
    const response = await fetch(
      `${process.env.VITE_ADMIN_CTP_AUTH_URL}/oauth/token?grant_type=client_credentials&scope=${process.env.VITE_ADMIN_CTP_SCOPES}`,
      {
        headers: {
          Authorization:
            'Basic ' +
            btoa(
              `${process.env.VITE_ADMIN_CTP_CLIENT_ID}:${process.env.VITE_ADMIN_CTP_CLIENT_SECRET}`
            ),
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        method: 'POST',
      }
    );
    const responseData = await response.json();
    return responseData.access_token;
  } catch (e) {
    //TODO: error handling}
  }
}
