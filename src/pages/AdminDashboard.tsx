import React, { useState } from "react";
import { Grid, Tab, Tabs, Typography, Box } from "@mui/material";
import { Offers } from "./Offers";

// Tab panel component
function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

// Main Dashboard component
const AdminDashboard = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="dashboard">
      <Grid container>
        <Grid item className="left-panel">
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            className="vertical-tabs"
          >
            <Tab label="Customers" />
            <Tab label="Users" />
            <Tab label="Offers" />
            <Tab label="Services" />
            <Tab label="Rooms" />
            <Tab label="Menu" />
          </Tabs>
        </Grid>
        <Grid item className="right-panel">
          <TabPanel value={value} index={0}>
            Customers Content
          </TabPanel>
          <TabPanel value={value} index={1}>
            Users Content
          </TabPanel>
          <TabPanel value={value} index={2} className="full-screen-parent-box">
            <Offers />
          </TabPanel>
          <TabPanel value={value} index={3}>
            Services Content
          </TabPanel>
          <TabPanel value={value} index={4}>
            Rooms Content
          </TabPanel>
          <TabPanel value={value} index={5}>
            Menu Content
          </TabPanel>
        </Grid>
      </Grid>
    </div>
  );
};

export default AdminDashboard;
