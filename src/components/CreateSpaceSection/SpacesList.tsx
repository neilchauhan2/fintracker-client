import React from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemText, Typography, Container } from '@mui/material';

type SpaceList = {
  spaces: {
    id: number;
    title: string;
    spaceId: string;
  }[];
  isLoading: boolean;
  error: Error | null;
}

const SpacesList: React.FC<SpaceList> = ({ spaces, isLoading, error }) => {
  if (isLoading) return <p>Loading spaces...</p>;
  if (error) return <p>Error loading spaces</p>;

  return (
    <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
      <Typography variant="h5" gutterBottom>Your Spaces</Typography>
      <List>
        {spaces.length > 0 ? spaces?.map((space: { id: number; title: string; spaceId: string }) => (
          <ListItem key={space.spaceId} component={Link} to={`/spaces/${space.spaceId}`}>
            <ListItemText primary={space.title} secondary={`ID: ${space.spaceId}`} />
          </ListItem>
        )) : <p>No spaces found</p>}
      </List>
    </Container>
  );
};

export default SpacesList;
