import { useState, useEffect } from 'react';
import { getProducts } from './catalogRequest';
import { IProducts } from './catalog.types';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Stack, Box } from '@mui/material';

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
        <Stack
          display="flex"
          justifyContent="center"
          alignItems="center"
          mb="35px"
          direction="row"
          spacing={4}
        >
          {data.results.map((plant, index) => (
            <Card
              key={index}
              sx={{
                maxWidth: 345,
                minHeight: 493,
                cursor: 'pointer',
                background: '#C5DDBB',

                width: '100%',
                ':hover': {
                  boxShadow: 20,
                  transform: 'scale3d(1.02, 1.02, 1)',
                  transition: 'all 0.50s ease-in-out',
                  backgroundColor: '#e4fbd9',
                },
              }}
            >
              <CardMedia
                sx={{ height: 300 }}
                title="plant img"
                image={
                  plant.masterVariant &&
                  plant.masterVariant.images &&
                  plant.masterVariant.images[0].url
                }
              ></CardMedia>
              <CardContent
                sx={{
                  minHeigh: 570,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '5px',
                }}
              >
                <Typography gutterBottom variant="h5" sx={{ marginBottom: '0' }}>
                  {plant.name['en-GB']}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    height: '40px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {plant.description && plant.description['en-GB']}
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '10px',
                  }}
                >
                  <Typography
                    variant="h5"
                    color="text.secondary"
                    sx={{
                      textDecoration: 'line-through',
                    }}
                  >
                    {plant.masterVariant &&
                      plant.masterVariant.prices &&
                      (plant.masterVariant.prices[0].value.centAmount / 100).toFixed(2)}{' '}
                    £
                  </Typography>
                  <Typography variant="h5" color="red">
                    {plant.masterVariant &&
                      plant.masterVariant.prices &&
                      (plant.masterVariant.prices[0].discounted.value.centAmount / 100).toFixed(
                        2
                      )}{' '}
                    £
                  </Typography>
                </Box>
              </CardContent>
              <CardActions sx={{ justifyContent: 'center' }}>
                <Button variant="contained" size="small" fullWidth>
                  Learn More
                </Button>
              </CardActions>
            </Card>
          ))}
        </Stack>
      )}
    </>
  );
}
