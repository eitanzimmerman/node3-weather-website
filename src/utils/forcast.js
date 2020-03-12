const request = require('request');

const forcast = (lat,lon, callback)=>{
    const URL =`https://api.darksky.net/forecast/48cd0deeec3a097fc0b4f6965851a7fa/${lat},${lon}`;
    request({url: URL, json: true}, (error, response)=>{
        if(error){
            callback('low level Error');
        } else if(response.body.error){
            callback('Coordinate error, try agian.');
        }else{
        const temp = response.body.currently.temperature;
        const rainChance = response.body.currently.precipProbability;
       callback(undefined,`The temparture outside is ${temp} dgrees and there is a ${rainChance}% chance of rain`)
        }
    })

}

module.exports= forcast;
 