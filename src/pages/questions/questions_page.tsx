import { Box, createTheme, Typography } from '@mui/material';
import { themeOptions } from '../../assets/theme1';
import { PAGES_TITLES } from '../../data/TITLES';
import QuestionsImage from './questions-img';
import { QUESTIONS } from './dataQuestions';
import { AccordionQuestionsCard } from './questionsCard';

const plantsTheme = createTheme(themeOptions);

export function QuestionsPage() {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: '15px',
          color: plantsTheme.palette.text.primary,
        }}
      >
        <Typography variant="h4" gutterBottom>
          {PAGES_TITLES.questions}
        </Typography>
        <QuestionsContent />
      </Box>
    </>
  );
}

function QuestionsContent() {
  return (
    <Box sx={{ display: 'flex' }}>
      <QuestionsImage />
      <QuestionsList />
    </Box>
  );
}

function QuestionsList() {
  const TITLE = 'Common Questions';
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', paddingX: '15px' }}>
      <Typography variant="h5" gutterBottom>
        {TITLE}
      </Typography>
      <QuestionsCards />
    </Box>
  );
}

function QuestionsCards() {
  const cards = QUESTIONS.map((info, index) => (
    <AccordionQuestionsCard key={index + 'question'} title={info.title} answer={info.answer} />
  ));
  return <Box>{cards}</Box>;
}