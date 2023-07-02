import React, { useState, useEffect } from "react";
import "./App.css";
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
import Infobox from "./components/Infobox";
import LineGraph from "./components/Linegraph";
import Table from "./components/Table";
import { sortData, prettyPrintStat } from "./util";
import numeral from "numeral";
import Map from "./components/Map";
import Statewise from "./components/Statewise"


function App() {
 const [countries,setcountries]=useState([]);
 const [country,setcountry]=useState("Worldwide");
 const [countryInfo,setcountryInfo]=useState([]);
 const [tabledata,settabledata]=useState([])
 const [casesType, setCasesType] = useState("cases");

//console.log(country);


//By default,it wii have worldwide cases on the UI//
useEffect( ()=>{
  const defaultinfo = async()=>{
    let res=await fetch("https://disease.sh/v3/covid-19/all");
  const data=await res.json();
  setcountryInfo(data);
  }
  defaultinfo();
},[])
//here,we end//

//here,we pull out the request from the api as app compoenet loads//
 useEffect(() => {
   const getCountriesdata = async () =>{
     try{
     let res=await fetch("https://disease.sh/v3/covid-19/countries");
     const data=await res.json();
     if(!data) 
     console.log("data not received from api");
     else{
      console.log(data);
       const countries= data.map((country)=>({
         name: country.country,
         value:country.countryInfo.iso2,
       })
       )
      
       const sorteddata= sortData(data);
       settabledata(sorteddata);
       //console.log(sorteddata);
      
      setcountries(countries);
     }
     
  }
  catch(err){
    console.log(err)
}
   
  }
  getCountriesdata();
   
 }, [])
 //here,we end//


//here,on changing the country name in dropdown,we are pulling its countrycode and its respective data//
 const onCountrychange=async(e)=>{
  const countryCode = e.target.value;
  console.log(countryCode);
  const url= countryCode==="Worldwide"?"https://disease.sh/v3/covid-19/countries/all":`https://disease.sh/v3/covid-19/countries/${countryCode}` 
  const res=await fetch(url);
  const data=await res.json();
  setcountry(countryCode);//storing the code of each country ,we can pass it any time
  setcountryInfo(data);
  //console.log("countryinfo>>>>", countryInfo);
}
//here we end//

  return (
   <div className="app">
    <div className="app_left">
     <div className="app_header">
     <div className="app_header_title">
      <h1>Covid-19-Tracker</h1>
     </div>
    <FormControl className="app_header_dropdown">
     <Select variant="outlined"  onChange={onCountrychange} value={country}>
     <MenuItem value={country}>Worldwide</MenuItem>
        {countries.map((country) => (
          <MenuItem value={country.value}>{country.name}</MenuItem>
          ))}
     </Select>
    </FormControl> 
   </div>
   <div className="app_stats">
     <div className="infobox_card" >
   <Infobox title="CoronaVirus Cases" cases={countryInfo.cases} total={countryInfo.todayCases} />
   </div>
   <div className="infobox_card" >
   <Infobox title="Recovered" cases={countryInfo.recovered} total={countryInfo.todayRecovered} />
   </div>
   <div className="infobox_card" >
   <Infobox title="Deaths till date !!!" cases={countryInfo.deaths} total={countryInfo.todayDeaths} />
   </div>
   </div>
   <div className="statebox">
   <h2 className="statebox_header">State-Wise Data of INDIA</h2>
   <div className="state">
   <tr >
   <td className="state_state">State</td>
   <td className="state_state">Cases</td>
   <td className="state_state">Recovered</td>
   <td className="state_state">Deaths</td>
   </tr>
   </div>
   <div className="statemenu">
   <Statewise />
   </div>
   </div>
   </div>



    <div className="app_right">
    <Card>
         <CardContent> 

           <h2 className="app_right_header">Worldwide new {casesType}</h2>
            <LineGraph casesType={casesType} />
            <h2 className="app_right_header"> Live Cases Of Countries</h2>
           <Table countries={tabledata} />
           
          
        </CardContent>
        </Card>
    </div>
   </div>
    
    
  );
}

export default App;
