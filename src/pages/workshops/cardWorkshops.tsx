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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { IDescription, IWorkshopCard } from '../../types/types';

export default function CardWorkshops(props: IWorkshopCard) {
  return (
    <Card sx={{ maxWidth: 345, minWidth: 300 }}>
      <CardMedia component="img" alt="green iguana" height="140" image={props.img} />
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <Typography gutterBottom variant="h6">
          {props.title}
        </Typography>
        <Typography variant="subtitle2" color="red">
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
