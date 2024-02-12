import * as React from 'react';
import { Typography, Card, CardContent } from '@mui/material';

function WeatherData({ weatherInfo }) {
  return (
    <Card sx={{ minWidth: 275, margin: '20px' }}>
      <CardContent>
        <Typography variant="h5">
          {weatherInfo.name}, {weatherInfo.sys.country}
        </Typography>
        <Typography variant="body1">
          Temperature: {weatherInfo.main.temp} °C
        </Typography>
        <Typography variant="body2">
          Description: {weatherInfo.weather[0].description}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default WeatherData;
