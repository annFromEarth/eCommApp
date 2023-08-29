export default async function getCustomer() {
  const request = fetch(
    `${import.meta.env.VITE_CLIENT_CTP_API_URL}/${import.meta.env.VITE_CLIENT_CTP_PROJECT_KEY}/me`,
    {
      headers: {
        Authorization:
          'Bearer ' +
          btoa(
            `${import.meta.env.VITE_CLIENT_CTP_CLIENT_ID}:${
              import.meta.env.VITE_CLIENT_CTP_CLIENT_SECRET
            }`
          ),
      },
    }
  );

  const response = await request;
  return response;
}
