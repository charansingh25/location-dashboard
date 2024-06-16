// Dashboard.js

import React, { useEffect, useState } from 'react';
import { firestore } from '../firebase';
import MapContainer from './MapContainer';
import { Drawer, List, ListItem, ListItemText, Button } from '@mui/material'; // Import Button from MUI
import { useSpring } from 'react-spring';
import { doc, getDoc } from 'firebase/firestore';

const drawerWidth = 240;

const Dashboard = () => {
    const [userData, setUserData] = useState(null);
    const [location, setLocation] = useState(null);
    const [showMap, setShowMap] = useState(false);
    const [loading, setLoading] = useState(false); // Add loading state
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const docRef = doc(firestore, 'user', '123456789');
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setUserData(data);
            setLocation(data.location);
          } else {
            console.log('No such document!');
          }
        } catch (error) {
          console.error('Error fetching document:', error);
        } finally {
          setLoading(false); // Set loading to false after fetching
        }
      };
  
      fetchData();
    }, []);
  
    const handleAccept = () => {
      setShowMap(true); // Show map block when "Accept" is clicked
    };
  
    const handleReject = () => {
      setShowMap(false); // Hide map block when "Reject" is clicked
      // Implement logic to remove user data or handle rejection
    };
  
    if (loading) {
      return <div>Loading...</div>; // Display a loading indicator while fetching data
    }
  
    return (
      <div className="flex">
        <Drawer
          className="bg-gray-100"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <List className="p-4">
            <ListItem>
              <ListItemText primary="SoS Alert Locator" />
            </ListItem>
            {userData && (
              <>
                <ListItem>
                  <ListItemText primary={`Name: ${userData.name}`} />
                </ListItem>
                <ListItem>
                  <ListItemText primary={`Dad's Phone: ${userData.phone.dad}`} />
                </ListItem>
                <ListItem>
                  <ListItemText primary={`Latitude: ${location?.latitude}`} />
                </ListItem>
                <ListItem>
                  <ListItemText primary={`Longitude: ${location?.longitude}`} />
                </ListItem>
                <ListItem className="flex space-x-4">
                  <Button
                    variant="contained"
                    className="bg-blue-500 text-white hover:bg-blue-600"
                    onClick={handleAccept}
                  >
                    Accept
                  </Button>
                  <Button
                    variant="contained"
                    className="bg-emerald-500 text-white hover:bg-red-600"
                    onClick={handleReject}
                  >
                    Reject
                  </Button>
                </ListItem>
              </>
            )}
          </List>
        </Drawer>
        <div className="flex-grow p-4">
          {showMap && location && ( // Ensure location is available before showing MapContainer
            <MapContainer location={location} />
          )}
        </div>
      </div>
    );
  };
  
  export default Dashboard;
  