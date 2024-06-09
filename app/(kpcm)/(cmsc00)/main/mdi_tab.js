import React, { useEffect,useState } from 'react';
import axios from 'axios';
import { Tabs, Tab, Typography, Box } from '@mui/material';

function TabPanel(props) {
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

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


export default function MDITabs() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="문서 1" {...a11yProps(0)} />
            <Tab label="문서 2" {...a11yProps(1)} />
            <Tab label="문서 3" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
         문서 1의 내용
        </TabPanel>
        <TabPanel value={value} index={1}>
          문서 2의 내용
        </TabPanel>
        <TabPanel value={value} index={2}>
          문서 3의 내용
        </TabPanel>
      </Box>
  );
}