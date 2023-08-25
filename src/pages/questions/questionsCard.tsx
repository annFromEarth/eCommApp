import { Typography, Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { IQuestions } from '../../types/types';

export function AccordionQuestionsCard(props: IQuestions) {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>{props.title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography variant="body2" color="text.secondary">
          {props.answer}
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
}
