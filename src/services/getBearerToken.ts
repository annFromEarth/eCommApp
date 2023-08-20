export async function getBearerToken() {
  try {
    const response = await fetch(
      'https://auth.europe-west1.gcp.commercetools.com/oauth/token?grant_type=client_credentials&scope=manage_project:ecommerceapp_951',
      {
        headers: {
          Authorization:
            'Basic dmJXVFFVV1Y5M3dreFA5eFRfcklwdlFmOmZNSDhVSE9oMGtLZmdhRDhOQWVIMU0wOGtwNHJVTGFf',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        method: 'POST',
      }
    );
    const responseData = await response.json();
    return responseData.access_token;
  } catch (e) {}
}
