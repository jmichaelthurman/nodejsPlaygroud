const axios = require('axios');
const yargs = require('yargs');

const argv = yargs
  .options({
    a: {
      demand:true,
      alias: 'address',
      describe: 'Address for which to fetch weather',
      string: true
    }
  })
  .help()
  .alias('help','h')
  .argv;

 var encodedAddress = encodeURIComponent(argv.address);
 var geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

 axios.get(geocodeURL).then((response) =>{
   if(response.data.status === 'ZERO_RESULTS'){
     throw new Error('That address was not found.')
   }
   // console.log(response.data.results[0].geometry.location);
   // console.log(response.data.results[0].geometry.location.lat);
   // console.log(response.data.results[0].geometry.location.lng);
   var lat = (response.data.results[0].geometry.location.lat);
   var lon = (response.data.results[0].geometry.location.lng);
   var wxURL = `https://api.darksky.net/forecast/1cef34145d89f1aaad2f62bef3393a52/${lat},${lon}`
   axios.get(wxURL).then((response)=>{
     console.log(`Summary: ${response.data.currently.summary}`);
     console.log(`Currently: ${response.data.currently.temperature}º`);
     console.log(`Feels like: ${response.data.currently.apparentTemperature}º`);
   }).catch((error) =>{
     console.log(error);
   })
 }).catch((error) => {
   if(error.code === 'ENOTEFOUND'){
     console.log('Unable to reach API server.')
   }else{
     console.log(error.message);
   }
   //console.log(error);
 });
