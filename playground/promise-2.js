const request = require('request');

var geocodeAddress = (address) => {
    return new Promise((resolve, reject) => {
        var encodedAddress = encodeURIComponent(address);
        request({
            url: `http://www.mapquestapi.com/geocoding/v1/address?key=r3eeiKE9EDR64HncMUmnhU888fyx1lsG&location=${encodedAddress}`,
            json: true
        }, (error, response, body) => {
            if(error){
                reject('Unable to connect to MapQuest servers');
            }else if(!body.results[0].locations[0].adminArea5){
                reject('Unable to find Address');
            }else if(body.results[0].locations[0].adminArea5){
                resolve({
                    address: body.results[0].providedLocation.location,
                    latitude: body.results[0].locations[0].latLng.lat,
                    longitude: body.results[0].locations[0].latLng.lng
                });
            }
        });

    })

};

geocodeAddress('00000').then((location) => {
    console.log(JSON.stringify(location, undefined, 2));
}, (errorMessage) => {
    console.log(errorMessage);
});
