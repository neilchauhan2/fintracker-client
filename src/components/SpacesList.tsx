// src/components/SpacesList.tsx

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getSpaces } from '../api';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemText, Typography, Container } from '@mui/material';

const SpacesList: React.FC = () => {
  const { data: spaces, isLoading, error } = useQuery({ queryKey: ['spaces'], queryFn: getSpaces });

  if (isLoading) return <p>Loading spaces...</p>;
  if (error) return <p>Error loading spaces</p>;

  return (
    <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
      <Typography variant="h5" gutterBottom>Your Spaces</Typography>
      <List>
        {spaces?.map((space: { id: number; title: string; spaceId: string }) => (
          <ListItem key={space.spaceId} component={Link} to={`/space/${space.spaceId}`}>
            <ListItemText primary={space.title} secondary={`ID: ${space.spaceId}`} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default SpacesList;
