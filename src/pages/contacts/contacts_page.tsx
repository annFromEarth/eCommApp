import { Box, Button, useTheme, Typography, Fab } from '@mui/material';
import { Navigation, Call, Email, Instagram } from '@mui/icons-material';
import { PAGES_TITLES } from '../../data/TITLES';
import { CONTACTS_INFO, CONTACTS_TEXT } from './dataContacts';
import ContactsImage from './contacts-img';

export function ContactsPage() {
  const plantsTheme = useTheme();
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '15px',
          color: plantsTheme.palette.text.primary,
        }}
      >
        <Typography variant="h4" gutterBottom>
          {PAGES_TITLES.contacts}
        </Typography>
        <Typography variant="h6" gutterBottom>
          {CONTACTS_TEXT}
        </Typography>
        <ContactsContent />
        <ContactsImage />
      </Box>
    </>
  );
}

function ContactsContent() {
  const plantsTheme = useTheme();
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: '15px',
          color: plantsTheme.palette.text.primary,
        }}
      >
        <ContactsInfo />
      </Box>
    </>
  );
}

function ContactsInfo() {
  const text = CONTACTS_INFO.map((item, index) => (
    <Button href={item.link} key={index + 'contacts-info'} sx={{ '& > :not(style)': { m: 1 } }}>
      <Fab variant="extended" color="primary">
        {item.address && <Navigation sx={{ mr: 1 }} />}
        {item.phone && <Call sx={{ mr: 1 }} />}
        {item.mail && <Email sx={{ mr: 1 }} />}
        {item.instagram && <Instagram sx={{ mr: 1 }} />}
        {item.title}
      </Fab>
    </Button>
  ));

  return <Box sx={{ margin: '0 40px' }}>{text}</Box>;
}
