import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";

function SearchForm({ onCityChange, onSubmit }) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    onCityChange(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <TextField 
          type="text" 
          value={inputValue} 
          onChange={handleInputChange} 
          label="City" 
          variant="outlined" 
          sx={{ marginRight: '10px' }}
        />
        <Button type="submit" variant="contained">Search</Button>
      </Box>
    </form>
  );
}

export default SearchForm;