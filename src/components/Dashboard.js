import React, { useEffect, useState } from 'react';
import { firestore } from '../firebase';
import MapContainer from './MapContainer';
import { Drawer, List, ListItem, ListItemText, Button } from '@mui/material'; // Import Button from MUI
import { doc, getDoc } from 'firebase/firestore';
import './Dashboard.css'; // Import the custom CSS file

const drawerWidth = 280;

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [location, setLocation] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check if the phone number exists in the 'disaster' collection
        const disasterDocRef = doc(firestore, 'disaster', '123456789');
        const disasterDocSnap = await getDoc(disasterDocRef);

        if (disasterDocSnap.exists()) {
          // If the phone number exists in the 'disaster' collection, fetch the user details from the 'user' collection
          const userDocRef = doc(firestore, 'user', '123456789');
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const data = userDocSnap.data();
            setUserData(data);
            setLocation(data.location);
          } else {
            console.log('No such user document!');
          }
        } else {
          console.log('No such disaster document!');
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
    setUserData(null); // Optionally, clear the user data on reject
  };

  if (loading) {
    return <div>Loading...</div>; // Display a loading indicator while fetching data
  }

  return (
    <div className="dashboard-container">
      <Drawer
        className="drawer"
        variant="permanent"
        anchor="left"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <List className="drawer-list">
          <ListItem>
            <ListItemText primary="SoS Alert Locator" />
          </ListItem>
          {userData && (
            <div className="user-info-box">
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
              <ListItem className="button-group">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAccept}
                >
                  Accept
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleReject}
                >
                  Reject
                </Button>
              </ListItem>
            </div>
          )}
        </List>
      </Drawer>
      <div className="map-container">
        {showMap && location && ( // Ensure location is available before showing MapContainer
          <MapContainer location={location} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
