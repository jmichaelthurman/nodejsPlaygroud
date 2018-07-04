var request = require('request');

var wx = (lat,lon) => {
  return new Promise ((resolve,reject)=>{
    request({
    url: `https://api.darksky.net/forecast/1cef34145d89f1aaad2f62bef3393a52/${lat},${lon}`,
    json: true
    }, (error, response, body)=>{
      if(error){
        reject('Unable to reach server.')
      }else if (response.statusCode === 404 || response.statusCode === 400) {
        reject('Access to server denied.')
      }else if(response.statusCode === 200) {
        resolve({
            temperature: body.currently.temperature,
            apparentTemperature: body.currently.apparentTemperature
          });
        }
      })
    });
};

module.exports.wx = wx;
