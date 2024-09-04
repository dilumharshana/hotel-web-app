import React, { useState } from "react";
import { Grid, Tab, Tabs, Typography, Box } from "@mui/material";
import { Offers } from "./Offers";
import { Services } from "./Services";
import Dashboard from "./Dashboard";
import { Customers } from "./Customers";
import { Inquiries } from "./Inquiries";

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
            <Tab label="Dashboard" />
            <Tab label="Customers" />
            <Tab label="Offers" />
            <Tab label="Services" />
            <Tab label="Rooms" />
            <Tab label="Inquires" />
          </Tabs>
        </Grid>
        <Grid item className="right-panel">
          <TabPanel value={value} index={0}>
            <Dashboard />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Customers />
          </TabPanel>
          <TabPanel value={value} index={2} className="full-screen-parent-box">
            <Offers />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <Services />
          </TabPanel>
          <TabPanel value={value} index={4} disabled>
            Rooms Content
          </TabPanel>
          <TabPanel value={value} index={5}>
            <Inquiries />
          </TabPanel>
        </Grid>
      </Grid>
    </div>
  );
};

export default AdminDashboard;
