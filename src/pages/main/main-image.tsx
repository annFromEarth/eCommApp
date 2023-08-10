import { Box } from '@mui/material';

export default function MainImage() {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        background: 'url(plants-main.jpg) ',
        backgroundSize: 'cover',
      }}
    ></Box>
  );
}
