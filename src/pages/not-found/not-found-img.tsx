import { Box } from '@mui/material';

export default function NotFoundImage() {
  return (
    <Box
      sx={{
        minHeight: '320px',
        minWidth: '500px',
        background: 'url(not-found.png) ',
        backgroundSize: 'cover',
      }}
    ></Box>
  );
}
