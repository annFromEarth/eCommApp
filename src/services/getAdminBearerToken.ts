const CLIENT_ID_ADMIN = 'vbWTQUWV93wkxP9xT_rIpvQf';
const CLIENT_SECRET_ADMIN = 'fMH8UHOh0kKfgaD8NAeH1M08kp4rULa_';

export async function getAdminBearerToken() {
  try {
    const response = await fetch(
      'https://auth.europe-west1.gcp.commercetools.com/oauth/token?grant_type=client_credentials&scope=manage_project:ecommerceapp_951',
      {
        headers: {
          Authorization: 'Basic ' + btoa(`${CLIENT_ID_ADMIN}:${CLIENT_SECRET_ADMIN}`),
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
