const yargs = require('yargs');
const axios = require('axios');


const argv = yargs
    .options({
        a: {
            alias: 'address',
            describe: 'Adress to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

if (argv.address === ''){
    argv.address = '06824'
}

var encodedAddress = encodeURIComponent(argv.address);

var geocodeUrl = `http://www.mapquestapi.com/geocoding/v1/address?key=r3eeiKE9EDR64HncMUmnhU888fyx1lsG&location=${encodedAddress}`;

axios.get(geocodeUrl).then((response) => {
    if (response.data.status === 'ZERO_RESULTS') {
        throw new Error('Unable to find that address.')
    }
    var lat = response.data.results[0].locations[0].latLng.lat;
    var lng = response.data.results[0].locations[0].latLng.lng;
    var weatherUrl = `https://api.darksky.net/forecast/a0543d64aba7adb356d7c7a7662cf65c/${lat},${lng}`;
    console.log(response.data.results[0].formatted_address);
    return axios.get(weatherUrl);
}).then((response) => {
    var temperature = response.data.currently.temperature;
    var apparentTemperature = response.data.currently.apparentTemperature;
    var summary = response.data.currently.summary;
    console.log(`Its currently ${summary}\nWith a temp of ${temperature}\nIt feels like ${apparentTemperature}`);
}).catch((e) => {
    if (e.code === 'ENOTFOUND') {
        console.log('Unable to connect to api servers');
    } else {
        console.log(e.message);
    }
})
