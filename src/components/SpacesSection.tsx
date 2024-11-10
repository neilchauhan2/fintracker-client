import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { createSpace, getSpaces } from '../api';
import { Container, Grid2 as Grid } from '@mui/material';
import SpacesList from './SpacesList';
import SpacesForm from './SpacesForm';

const SpacesSection: React.FC = () => {
  const [title, setTitle] = useState('');
  const { data: spaces, isLoading, error: spacesListError, refetch } = useQuery({ queryKey: ['spaces'], queryFn: getSpaces });

  const { mutate, isPending, isSuccess: isSpaceCreated, error: createSpaceError } = useMutation({
    mutationFn: createSpace,
    onSuccess: (data) => {
      console.log("Space created successfully:", data);
    },
    onError: (error) => {
      console.error("Error creating space:", error);
    }
  });

  useEffect(() => {
    if (isSpaceCreated) {
      refetch();
    }
  }, [isSpaceCreated]);


  function handleSubmit() {
    mutate(title);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value);
  }


  return (
    <Container maxWidth="xl" style={{ marginTop: '2rem' }}>
      <Grid container spacing={2}>
        <Grid size={6}>
          <SpacesForm title={title} handleSubmit={handleSubmit} handleChange={handleChange} isPending={isPending} error={createSpaceError} />
        </Grid>
        <Grid size={6}>
          <SpacesList spaces={spaces} isLoading={isLoading} error={spacesListError} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default SpacesSection;
