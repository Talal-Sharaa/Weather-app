import React, { useState, useEffect } from "react";
import SearchForm from "./SearchForm";
import WeatherData from "./WeatherData";
import axios from "axios";
import { Box, Grid, Typography, Container, Paper, CircularProgress } from "@mui/material";

function App() {
  const [city, setCity] = useState("");
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState("");
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
  const unsplashAccessKey = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;

  const handleCityChange = (newCity) => {
    setCity(newCity);
  };

  const getWeatherData = async () => {
    if (!apiKey) {
      setError("API key is not available");
      return;
    }

    if (!city) {
      setError("City is not specified");
      return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      city
    )}&appid=${apiKey}&units=metric`;

    setLoading(true);
    try {
      const response = await axios.get(url);
      setWeatherInfo(response.data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (weatherInfo) {
      const fetchBackgroundImage = async () => {
        const url = `https://api.unsplash.com/photos/random?query=${weatherInfo.weather[0].main}&client_id=${unsplashAccessKey}`;
        try {
          const response = await axios.get(url);
          setBackgroundImage(response.data.urls.full);
        } catch (err) {
          console.error(err);
        }
      };
      fetchBackgroundImage();
    }
  }, [weatherInfo, unsplashAccessKey]);
  return (
    <Box
      sx={{
        padding: "20px",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ padding: "20px", backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12}>
              <Typography variant="h4" align="center" gutterBottom>
                Weather App
              </Typography>
            </Grid>
            <SearchForm onCityChange={handleCityChange} onSubmit={getWeatherData} />
            {loading && <CircularProgress />}
            {error && <Typography color="error">{error}</Typography>}
            {weatherInfo && <WeatherData weatherInfo={weatherInfo} />}
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}

export default App;
