import { DetailsType } from './login.types';

function encodeLoginRequestBody(emailString: string, passwordString: string) {
  const details: DetailsType = {
    grant_type: 'password',
    username: emailString,
    password: passwordString,
  };

  const formBody: string[] = [];
  for (let property in details) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(details[property as keyof typeof details]);
    formBody.push(encodedKey + '=' + encodedValue);
  }
  return formBody.join('&');
}

export async function loginUser(emailString: string, passwordString: string) {
  const response = await fetch(
    'https://auth.europe-west1.gcp.commercetools.com/oauth/ecommerceapp_951/customers/token',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization:
          'Basic N29zbFJYLVN3dUVPWWsycERSeHdTSS1wOmRXX0Q1eGNRU004WC1lbHRxUXFyMHp1bVRQUGo4QVlt',
      },
      body: encodeLoginRequestBody(emailString, passwordString),
    }
  );
  const data = await response.json();
  return data;
}
