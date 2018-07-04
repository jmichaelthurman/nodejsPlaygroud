var request = require('request');

var geocodeAddress = (address) => {
  return new Promise ((resolve, reject) => {
    if(address === '00000' || address === 00000){
      reject('Error: enter a valid address')
    } else {
      var encodedAddress = encodeURIComponent(address);
      request({
        url:`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
        json: true
      },(error,response,body)=>{
        if(error){
          reject('Error: Unable to connect to Google.');
        } else if (body.status === 'ZERO_RESULTS') {
          reject(`Status: ${body.status}: Unable to find a matching location.`);
        } else if (body.status === 'OK') {
          resolve({
            address: body.results[0].formatted_address,
            lat: body.results[0].geometry.location.lat,
            lon: body.results[0].geometry.location.lng
          })
          }
      });
    }
  });
}

// var geocodeAddress = (address, callback) => {
//   var encodedAddress = encodeURIComponent(address);
//   request({
//     url:`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
//     json: true
//   },(error,response,body)=>{
//     if(error){
//       callback('Error: Unable to connect to Google.');
//     } else if (body.status === 'ZERO_RESULTS') {
//       callback(`Status: ${body.status}: Unable to find a matching location.`);
//     } else if (body.status === 'OK') {
//       callback(undefined,{
//         address: body.results[0].formatted_address,
//         lat: body.results[0].geometry.location.lat,
//         lon: body.results[0].geometry.location.lng
//       })
//       }
//   });
// }

module.exports.geocodeAddress = geocodeAddress;
