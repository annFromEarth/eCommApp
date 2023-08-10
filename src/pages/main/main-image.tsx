import { Box } from '@mui/material';

export default function MainImage() {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100vw',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          width: document.body.clientWidth / 1.4,
          height: '100%',
          background: 'url(plants-main.jpg) ',
          backgroundSize: 'cover',
        }}
      ></Box>
    </Box>
  );
}
