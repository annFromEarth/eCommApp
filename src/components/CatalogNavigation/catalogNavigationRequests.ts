export default async function getCategories() {
  const authorizationToken: string = window.sessionStorage.getItem('authorization-token')!;

  const response = await fetch(
    `${process.env.VITE_CLIENT_CTP_API_URL}/${process.env.VITE_CLIENT_CTP_PROJECT_KEY}/categories`,
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
