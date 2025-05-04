import React from 'react';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import { formatDistanceToNow } from 'date-fns';
import { Box } from '@mui/material';

export default function GrainCard({ grain, lang }) {
  const updatedDate = new Date(grain.lastUpdated);
  const relEn = formatDistanceToNow(updatedDate, { addSuffix: true });
  const relMr = formatDistanceToNow(updatedDate, { addSuffix: true });

  return (
    <Card sx={{
      height: 320,
      width: 500,
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '	#fef4e8',
      borderRadius: 2,
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      transition: 'transform 0.3s, box-shadow 0.3s',
      cursor: 'pointer',
      '&:hover': {
        transform: 'scale(1.03)',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
      }
    }}>
      <CardMedia
        component="img"
        height="180"
        image={grain.imageUrl}
        alt={grain.name[lang]}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6">{grain.name[lang]}</Typography>
        <Typography variant="body1">{grain.price} ₹ {grain.unit}</Typography>
      </CardContent>
      <Box sx={{ p: 1 }}>
        <Typography variant="body2" color="text.secondary">
          Last updated: {relEn}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          शेवट अद्यतनित: {relMr}
        </Typography>
      </Box>
    </Card>
  );
}