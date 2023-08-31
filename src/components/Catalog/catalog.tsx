import { useState, useEffect } from 'react';
import { getProducts } from './catalogRequest';
import { IProducts } from './catalog.types';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../services/routing/paths';

export default function GetCatalog() {
  const [data, setData] = useState<IProducts>();

  useEffect(() => {
    getProducts().then((response) => {
      setData(response);
    });
  }, []);

  const navigate = useNavigate();

  const openDetailPage = (id: string) => {
    navigate(PATH.product + '/:' + id);
  };

  return (
    <>
      {data && data.results && (
        <div>
          {data &&
            data.results &&
            data.results.map((plant, index) => (
              <p className={plant.id} key={index} onClick={() => openDetailPage(plant.id)}>
                {plant.name['en-GB']}
              </p>
            ))}
        </div>
      )}
    </>
  );
}
