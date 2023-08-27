import { Box, Tab } from '@mui/material';
import { INCOMING_WORKSHOPS, MAIN_CONTENT, PAST_WORKSHOPS } from './dataWorkshops';
import React from 'react';
import CardWorkshops from './CardWorkshops';
import { TabPanel, TabContext, TabList } from '@mui/lab';

export default function TabsWorkshops() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    if (event) {
      setValue(newValue);
    }
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label={MAIN_CONTENT.buttons[0]} value="1" />
            <Tab label={MAIN_CONTENT.buttons[1]} value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <IncomingWorkshops />
        </TabPanel>
        <TabPanel value="2">
          <PastWorkshops />o
        </TabPanel>
      </TabContext>
    </Box>
  );
}

function IncomingWorkshops() {
  const cards = INCOMING_WORKSHOPS.map((info, index) => (
    <CardWorkshops
      key={index + 'incoming-workshop'}
      img={info.img}
      title={info.title}
      date={info.date}
      place={info.place}
      description={info.description}
    />
  ));
  return <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>{cards}</Box>;
}

function PastWorkshops() {
  const cards = PAST_WORKSHOPS.map((info, index) => (
    <CardWorkshops
      key={index + 'past-workshop'}
      img={info.img}
      title={info.title}
      date={info.date}
      place={info.place}
    />
  ));
  return <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>{cards}</Box>;
}
