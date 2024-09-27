import React, { useState } from "react";
import { Grid, Tab, Tabs, Typography, Box, Button } from "@mui/material";
import { Offers } from "./Offers";
import { Services } from "./Services";
import Dashboard from "./Dashboard";
import { Customers } from "./Customers";
import { Inquiries } from "./Inquiries";
import { useNavigate } from "react-router-dom";

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
  const isSuperAdmin = JSON.parse(localStorage.getItem('customer_data'))?.role == "super_admin"

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
            {isSuperAdmin && <Tab label="Dashboard" />}
            <Tab label="Offers" />
            <Tab label="Services" />
            {/* <Tab label="Rooms" /> */}
            {isSuperAdmin && <Tab label="Inquires" />}
            <Tab label="Customers" />
          </Tabs>

        </Grid>
        <Grid item className="right-panel">
          {isSuperAdmin && <TabPanel value={value} index={0}>
            <Dashboard />
          </TabPanel>}
          <TabPanel value={value} index={isSuperAdmin ? 1 : 0} className="full-screen-parent-box">
            <Offers />
          </TabPanel>
          <TabPanel value={value} index={isSuperAdmin ? 2 : 1}>
            <Services />
          </TabPanel>

          {isSuperAdmin && <TabPanel value={value} index={isSuperAdmin ? 3 : 2}>
            <Inquiries />
          </TabPanel>}

          <TabPanel value={value} index={isSuperAdmin ? 4 : 3}>
            <Customers />
          </TabPanel>
        </Grid>
      </Grid>
    </div>
  );
};

export default AdminDashboard;
