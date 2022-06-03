import React from 'react';
import { Box, Card, Typography } from '@mui/material';

export default function DetailCard({ value, text }) {
  return (
    <Box sx={{ minWidth: 200 }}>
      <Card variant="outlined" sx={{ borderRadius: 2, backgroundColor: '#1f363d' }}>
        <Typography variant="h5" component="div" sx={{ marginLeft: 1, marginTop: '7px', color: '#cfe0c3' }}>
          {value}
        </Typography>
        <Typography sx={{ mb: 1.5, marginLeft: 1, color: '#9ec1a3' }} color="text.secondary" >
          {text}
        </Typography>
      </Card>
    </Box>
  );
}
