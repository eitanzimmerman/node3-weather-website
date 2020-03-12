const request = require('request');

const geocode = (adress, callback) => {
    const URL=`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(adress)}.json?access_token=pk.eyJ1IjoiZWl0YW56IiwiYSI6ImNrNzlpZGgzODBwY3MzZm9nNnU3dG5oaGUifQ.9NcKlO_MSAHVuNfjYzhSIw&limit=1`
    request({url:URL, json: true},(error, response)=>{
        if(error){
            callback('Unable to connect to location services!')
        }else if(response.body.features.length===0){
            callback('Unable to find location. try again')
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports= geocode;