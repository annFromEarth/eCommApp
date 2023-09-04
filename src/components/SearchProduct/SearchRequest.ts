export async function getSearchProducts(valueSearch: string) {
  const authorizationToken: string = window.sessionStorage.getItem('token')!;

  const response = await fetch(
    `${process.env.VITE_CLIENT_CTP_API_URL}/${process.env.VITE_CLIENT_CTP_PROJECT_KEY}/product-projections/search?&limit=10&text.en-GB=${valueSearch}`,
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
