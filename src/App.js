import React, {useState,useEffect} from 'react';
import {MenuItem,FormControl,Select,Card , CardContent} from "@material-ui/core";
import InfoBox from './InfoBox';
import Table from './Table';
import Map from './Map';
import {sortData} from './util.js'
import LineGraph from './LineGraph';
import "leaflet/dist/leaflet.css";

import './App.css';

function App() {
  const [countries,setCountries] = useState(['Pak','US','UK'])
  const [country,setCountry] = useState(['worldwide'])
  const [countryInfo,setCountryInfo] = useState({})
  const [tableData,setTableData] = useState([])

  useEffect(() =>{
    fetch('https:disease.sh/v3/covid-19/all')
    .then(response =>response.json())
    .then(data => {
      setCountryInfo(data);
    })
  } ,[])


  
  useEffect(() => {
    const getCountriesData = async () => {
       fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json()) 
      .then((data) => {
        const countries = data.map((country)=>({
            name:country.country,
            value:country.countryInfo.iso2
          }))
          let sortedData = sortData(data);
          setTableData(sortedData);
          setCountries(countries);  
      })     
    
    }
    getCountriesData();
   }, [] );
  const onCountryChange = async (event)=>{
    const countryCode = event.target.value;
    setCountry(countryCode);
    const url = countryCode === "worldwide" ? "https:disease.sh/v3/covid-19/all" : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    
    await fetch(url)
    .then(response => response.json())
    .then(data => {
      setCountry(countryCode);
      setCountryInfo(data);

    })
  
  
  }

  return (
    <div className='app' >
    <div className='app_left' >
    <div className='app_header' >
    <h1>Covid-19 Tracker</h1>
    <FormControl className="app_dropdown" >
    <Select variant="outlined" onChange={onCountryChange} value={country} >
      <MenuItem value="worldwide">WorldWide</MenuItem> 
     {countries.map((country)=>(
           <MenuItem value={country.value}>{country.name}</MenuItem>
     ))} 

    
    
    </Select>
    
    </FormControl>
    </div>
    <div className="app_stats" >
    <InfoBox title="Coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases}/>
    <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered}/>
    <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths}/>
    
    </div>
    <Map />
    
    </div>
  <Card className="app_right">
  
  <CardContent>
  <h3>Livecases by Country</h3>
     <Table countries={tableData} />
  <h3>WorldWide New Cases</h3>
  <LineGraph />
  </CardContent>
  
  </Card>
    </div>
  );
}

export default App;
