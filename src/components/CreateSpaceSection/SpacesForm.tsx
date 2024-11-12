import React from 'react';
import { Button, Container, FormGroup, Paper, TextField, Typography } from '@mui/material';

type SpaceFormProps = {
  title: string;
  handleSubmit: () => void;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isPending: boolean;
  error: Error | null;
}

const SpacesForm: React.FC<SpaceFormProps> = ({ title, handleSubmit, handleChange, isPending, error }) => {
  if (isPending) return <p>Loading spaces...</p>;
  if (error) {
    console.error("Error creating space:", error);
  }

  return (
    <Container style={{ padding: '1rem 2rem 6rem 2rem', width: '100%' }} component={Paper}>
      <Typography variant="h5" fontWeight={600} gutterBottom marginBottom={1}>Create a Space</Typography>
      <FormGroup>
        <TextField id="outlined-basic" label="Space Title" variant="outlined" style={{ margin: '1rem 0' }} value={title} onChange={handleChange} />
        <Button disabled={isPending} size='medium' variant="contained" color="primary" onClick={handleSubmit}>
          Create Space
        </Button>
      </FormGroup>
    </Container>
  );
};

export default SpacesForm;
