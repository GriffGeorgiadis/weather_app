const request = require('request');

var getWeather = (lat, lng, callback) => {

    request({
        url:`https://api.darksky.net/forecast/a0543d64aba7adb356d7c7a7662cf65c/${lat},${lng}`,
        json: true
    }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            callback(undefined, {
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature
            });
        } else {
            callback('unable to fetch weather');
        }
    });
};

module.exports.getWeather = getWeather;
