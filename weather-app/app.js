const geocode = require('./geocode/geocode.js');
const yargs = require('yargs');
const forecast = require('./weather/forecast.js');
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

  geocode.geocodeAddress(argv.address).then((results)=>{
    console.log(JSON.stringify(results,undefined,2))
  //}).then((results)=>{
    return forecast.wx(results.lat, results.lon);
  }).then((results)=>{
    console.log(results);
  }).catch((errorMessage)=>{
    console.log(errorMessage);
  });

// geocode.geocodeAddress(argv.address,(error, results) =>{
//   if(error){
//     console.log(error);
//   } else {
//     console.log(results.address);
//     forecast.wx(results.lat, results.lon,(errorMessage, wxResults) =>{
//       if(errorMessage){
//         console.log(`Error: ${errorMessage}`);
//       } else {
//         console.log(`Currently, it's ${wxResults.temperature} It feels like ${wxResults.apparentTemperature}`);
//       }
//     });
//   }
// });




/*
var request = require('request');
request({
  url: 'https://api.darksky.net/forecast/1cef34145d89f1aaad2f62bef3393a52/35.4662541,-94.33596349999999',
  json: true
}, (error, response, body)=>{
  if(error){
    console.log('Unable to reach server.')
  }else if (response.statusCode === 404 || response.statusCode === 400) {
    console.log('Access to server denied.')
  }else if(response.statusCode === 200) {
console.log(`Temperature: ${JSON.stringify(body.currently.temperature,undefined,2)}`);
}
});
*/
//https://api.darksky.net/forecast/1cef34145d89f1aaad2f62bef3393a52/lat,lon
