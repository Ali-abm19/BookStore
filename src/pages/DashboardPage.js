import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'

import AdminProducts from '../components/Dashboard/AdminProducts'
import { Box, Tab, Tabs } from '@mui/material';
import AdminUsers from '../components/Dashboard/AdminUsers';

export default function DashboardPage({user}) {

  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }


  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    return (
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Books" {...a11yProps(0)} />
            <Tab label="Users" {...a11yProps(1)} />
            <Tab label="Item Three" {...a11yProps(2)} />
          </Tabs>
        </Box>

        <CustomTabPanel value={value} index={0}>
          <AdminProducts /> 
        </CustomTabPanel>

        <CustomTabPanel value={value} index={1}>
          <AdminUsers/>
        </CustomTabPanel>

        <CustomTabPanel value={value} index={2}>
          Orders
        </CustomTabPanel>
      </Box>
    );
  }
  




//   return (
//     <div>
//       {/* <Link to="/dashboard/books">Books</Link>
//       <Outlet /> */}
//       <AdminProducts user={user} />

      
//     </div>
    
//   )
// }
