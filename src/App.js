import React from 'react';
import './App.css';

function App() {
  return (
    <div className='app' >
    <h1>Covid-19 Tracker</h1>
    <FormControl className="app_dropdown" >
    <Select variant="outlined" value="abc" >

    <MenuItem value="worldwide">WorldWide</MenuItem>
    <MenuItem value="worldwide">WorldWide</MenuItem>
    <MenuItem value="worldwide">WorldWide</MenuItem>
    <MenuItem value="worldwide">WorldWide</MenuItem>
    </Select>
    
    </FormControl>
    </div>
  );
}

export default App;
