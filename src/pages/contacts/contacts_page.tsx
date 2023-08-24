import { Box, Button, createTheme, Typography } from '@mui/material';
import Fab from '@mui/material/Fab';
import NavigationIcon from '@mui/icons-material/Navigation';
import Link from '@mui/material/Link';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import InstagramIcon from '@mui/icons-material/Instagram';

import { themeOptions } from '../../assets/theme1';
import { PAGES_TITLES } from '../../data/TITLES';
import { CONTACTS_INFO, CONTACTS_TEXT } from './dataContacts';
import ContactsImage from './contacts-img';

const plantsTheme = createTheme(themeOptions);

export function ContactsPage() {
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
        {item.address && <NavigationIcon sx={{ mr: 1 }} />}
        {item.phone && <CallIcon sx={{ mr: 1 }} />}
        {item.mail && <EmailIcon sx={{ mr: 1 }} />}
        {item.instagram && <InstagramIcon sx={{ mr: 1 }} />}
        {item.title}
      </Fab>
    </Button>
  ));

  return <Box sx={{ margin: '0 40px' }}>{text}</Box>;
}
