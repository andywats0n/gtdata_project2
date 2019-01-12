const center = [39.8283, -98.5795];
let mapUrl = `https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=${API_KEY}`;
let month = 8;
let year = 2017;

var precipArray = [];
var snowArray = [];
var mintempArray = [];
var maxtempArray = [];

let precipLayer = L.layerGroup(precipArray);
let snowLayer = L.layerGroup(snowArray);
let mintempLayer = L.layerGroup(mintempArray);
let maxtempLayer = L.layerGroup(maxtempArray);

let overlayMaps = {
  Precipitation: precipLayer,
  Snow: snowLayer,
  MinTemperatures: mintempLayer,
  MaxTemperatures: maxtempLayer
};

let primeTile = L.tileLayer(mapUrl, { id: 'mapbox.streets' });

let baseMaps = {
  "Base Map": primeTile
};

let map = L.map('mapid', {
  center:center,
  zoom: 5.15,
  layers: [primeTile, snowLayer]
});

// precipitation
let precipUrl = `http://localhost:5000/api/filterprcp/${month}/${year}`
d3.json(precipUrl, function(response) {

  for (var i = 0; i < response.length; i++) {
    var record = response[i];
    precipArray.push([record.Lat, record.Long, record['Prcp(in)']]);
  }
    var heat = L.heatLayer(precipArray, {
        radius: 30,
        blur: 15,
        gradient: {0.3: 'blue', .5: 'lime', 1: 'red'}
      }).addTo(map);
    });

// snow
let snowUrl = `http://localhost:5000/api/filtersnow/${month}/${year}`
d3.json(snowUrl, function(response) {

  for (var i = 0; i < response.length; i++) {
    var record = response[i];
    snowArray.push([record.Lat, record.Long, record['Snow(in)']]);
  }
    var heat = L.heatLayer(snowArray, {
        radius: 30,
        blur: 15,
        gradient: {0.3: 'blue', .7: 'lime', 1: 'red'}
      }).addTo(map);
    });

// mintemp
let mintempUrl = `http://localhost:5000/api/filtermint/${month}/${year}`
d3.json(mintempUrl, function(response) {

  for (var i = 0; i < response.length; i++) {
    var record = response[i];
    mintempArray.push([record.Lat, record.Long, record['Temp(F)']]);
  }
    var heat = L.heatLayer(mintempArray, {
        radius: 20,
        blur: 20,
        gradient: {0.4: 'blue', .8: 'lime', 1: 'red'}
      }).addTo(map);
    });

// maxtemp
let maxtempUrl = `http://localhost:5000/api/filtermaxt/${month}/${year}`
d3.json(maxtempUrl, function(response) {

  for (var i = 0; i < response.length; i++) {
    var record = response[i];
    maxtempArray.push([record.Lat, record.Long, record['Temp(F)']]);
  }
    var heat = L.heatLayer(maxtempArray, {
        radius: 50,
        blur: 15
      }).addTo(map);
    });

L.control.layers(baseMaps, overlayMaps, {collapsed: false}).addTo(map);



// let myurl = 'http://localhost:5000/api/maxt';
// d3.json(myurl, function(response) {
//   var heatArray = [];
//   for (var i = 0; i < response.length; i++) {
//     var record = response[i];
//     heatArray.push([record.Lat, record.Long, record['Temp(F)']]);
//   }

// var heat = L.heatLayer(heatArray, {
//     radius: 50,
//     blur: 15
// }).addTo(mymap);
// });

// mymap.addEventListener('click', e => {console.log(e.latlng.lat, e.latlng.lng)});
