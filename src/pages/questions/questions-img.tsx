import { Box } from '@mui/material';

export default function QuestionsImage() {
  return (
    <Box
      sx={{
        minHeight: '320px',
        maxHeight: '320px',
        minWidth: '500px',
        background: 'url(./img/questions/plants-home.webp)',
        backgroundSize: 'cover',
      }}
    ></Box>
  );
}
