import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from '@mui/material';
import { IDescription, IWorkshopCard } from '../../types/types';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function CardWorkshops(props: IWorkshopCard) {
  return (
    <Card sx={{ maxWidth: 345, minWidth: 300 }}>
      <CardMedia component="img" alt="green iguana" height="140" image={props.img} />
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <Typography gutterBottom variant="body2" sx={{ fontSize: '1.25rem' }}>
          {props.title}
        </Typography>
        <Typography variant="body2" color="red">
          {props.date}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.place}
        </Typography>
        {props.description && <AccordionDescription description={props.description} />}
      </CardContent>
    </Card>
  );
}

function AccordionDescription(props: IDescription) {
  const TITLE = 'Learn more';
  return (
    <Box>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>{TITLE}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'justify' }}>
            {props.description}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
