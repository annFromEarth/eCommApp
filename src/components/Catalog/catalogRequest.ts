export async function getProducts() {
  const authorizationToken: string = window.sessionStorage.getItem('authorization-token')!;

  const response = await fetch(
    `${import.meta.env.VITE_CLIENT_CTP_API_URL}/${
      import.meta.env.VITE_CLIENT_CTP_PROJECT_KEY
    }/product-projections`,
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
