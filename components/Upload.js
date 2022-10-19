import * as React from 'react';
import Button from '@mui/material/Button';
import MovieIcon from "@mui/icons-material/Movie";
import LinearProgress from "@mui/material/LinearProgress";
export default function UploadButtons() {
  return (
    <div className='upload-button'>
      <Button variant="outlined" color='secondary' component="label">
        <MovieIcon />
        Upload Media
        <input hidden accept="image/*" multiple type="file" />
      </Button>
      <LinearProgress color="secondary" variant="determinate" value={80} sx={{ mt: '0.5rem', mb: '0.5rem' }} />
    </div>
  );
}
