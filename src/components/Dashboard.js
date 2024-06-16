import React, { useEffect, useState } from 'react';
import { firestore } from '../firebase';
import MapContainer from './MapContainer';
import { Drawer, List, ListItem, ListItemText, Button } from '@mui/material';
import { doc, getDoc } from 'firebase/firestore';
import './Dashboard.css';

const drawerWidth = 280;

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [defaultLocation, setDefaultLocation] = useState({ latitude: 22.8226195, longitude: 75.9432751 });
  const [markerLocation, setMarkerLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const disasterDocRef = doc(firestore, 'disaster', '123456789');
        const disasterDocSnap = await getDoc(disasterDocRef);

        if (disasterDocSnap.exists()) {
          const userDocRef = doc(firestore, 'user', '123456789');
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const data = userDocSnap.data();
            setUserData(data);
          } else {
            console.log('No such user document!');
          }
        } else {
          console.log('No such disaster document!');
        }
      } catch (error) {
        console.error('Error fetching document:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAccept = () => {
    if (userData && userData.location) {
      setMarkerLocation(userData.location);
      setDefaultLocation(userData.location);
    }
  };

  const handleReject = () => {
    setMarkerLocation(null);
    setUserData(null);
  };

  if (loading) {
    return <div>Loading...</div>;
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
                <ListItemText primary={`Latitude: ${userData.location?.latitude}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Longitude: ${userData.location?.longitude}`} />
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
        <MapContainer location={defaultLocation} markerLocation={markerLocation} />
      </div>
    </div>
  );
};

export default Dashboard;
