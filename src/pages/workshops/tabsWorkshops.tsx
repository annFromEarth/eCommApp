import { Box, Typography } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { INCOMING_WORKSHOPS, MAIN_CONTENT, PAST_WORKSHOPS } from './dataWorkshops';
import React from 'react';
import CardWorkshops from './cardWorkshops';
import { TabPanelProps } from '../../types/types';

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export function TabsWorkshops() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    if (event) {
      setValue(newValue);
    }
  };

  return (
    <Box sx={{ width: '100%', margin: ' 0 60px' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label={MAIN_CONTENT.buttons[0]} {...a11yProps(0)} />
          <Tab label={MAIN_CONTENT.buttons[1]} {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <IncomingWorkshops />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <PastWorkshops />
      </CustomTabPanel>
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
