import React from 'react';
import { useNavigate } from 'react-router-dom';
import { List, ListItem, ListItemText, Typography, Container, ListItemButton, Paper } from '@mui/material';

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
  const navigate = useNavigate();
  if (isLoading) return <p>Loading spaces...</p>;
  if (error) return <p>Error loading spaces</p>;

  return (
    <Container>
      <Typography variant="h5" gutterBottom sx={{
        color: '#1D1D1F',
        fontWeight: 500,
      }}>Your Spaces</Typography>
      <List>
        {spaces.length > 0 ? spaces?.map((space: { id: number; title: string; spaceId: string }) => (
          <ListItem key={space.spaceId} component={Paper} sx={{ marginBottom: 1 }} disablePadding >
            <ListItemButton onClick={() => navigate(`/spaces/${space.spaceId}`)}>
              <ListItemText primary={space.title} secondary={`ID: ${space.spaceId}`} />
            </ListItemButton>
          </ListItem>
        )) : <p>No spaces found</p>}
      </List>
    </Container>
  );
};

export default SpacesList;
