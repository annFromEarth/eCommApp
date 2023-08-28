import { useState, useEffect } from 'react';
import { getProducts } from './catalogRequest';
import { IProducts } from './catalog.types';

export default function GetCatalog() {
  const [data, setData] = useState<IProducts>();

  useEffect(() => {
    getProducts().then((response) => {
      setData(response);
    });
  }, []);

  return (
    <>
      {data && data.results && (
        <div>
          {data &&
            data.results &&
            data.results.map((plant, index) => <p key={index}>{plant.name['en-GB']}</p>)}
        </div>
      )}
    </>
  );
}
