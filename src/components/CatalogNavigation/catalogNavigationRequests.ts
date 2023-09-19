export default async function getCategories() {
  const authorizationToken: string = window.sessionStorage.getItem('anonymousToken')!;

  const response = await fetch(
    `${import.meta.env.VITE_CLIENT_CTP_API_URL}/${
      import.meta.env.VITE_CLIENT_CTP_PROJECT_KEY
    }/categories`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authorizationToken}`,
      },
    }
  );
  const data = await response.json();
  return data;
}
