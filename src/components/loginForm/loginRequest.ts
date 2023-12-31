import { DetailsType } from './login.types';

function encodeLoginRequestBody(emailString: string, passwordString: string) {
  const details: DetailsType = {
    grant_type: 'password',
    username: emailString,
    password: passwordString,
  };

  const formBody: string[] = [];
  for (const property in details) {
    const encodedKey = encodeURIComponent(property);
    const encodedValue = encodeURIComponent(details[property as keyof typeof details]);
    formBody.push(encodedKey + '=' + encodedValue);
  }
  return formBody.join('&');
}

export async function loginUser(emailString: string, passwordString: string) {
  const response = await fetch(
    `${import.meta.env.VITE_CLIENT_CTP_AUTH_URL}/oauth/${
      import.meta.env.VITE_CLIENT_CTP_PROJECT_KEY
    }/customers/token`,
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
